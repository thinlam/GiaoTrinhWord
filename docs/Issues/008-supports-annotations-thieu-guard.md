# ISSUE-008 — `annotation-manager.ts` truy cập `Office.context` không có guard

- **Mức độ:** Thấp
- **File liên quan:** `src/word/annotation-manager.ts` (`supportsAnnotations()`)
- **Trạng thái:** Mở

## Mô tả

```ts
export function supportsAnnotations(): boolean {
  return Office.context.requirements
    .isSetSupported("WordApi", "1.7");
}
```

Khác với `document-reader.ts` (có `isOfficeJsAvailable()` bọc `try/catch`), `supportsAnnotations()` truy cập trực tiếp `Office.context.requirements` — nếu gọi khi Office.js chưa sẵn sàng hoặc không tồn tại sẽ **throw** thay vì trả `false`.

Hiện tại:
- `applyAnnotations()` gọi `clearAllAnnotations()` **trước** khi kiểm tra `supportsAnnotations()`.
- `applyAnnotations()` chỉ được gọi từ `checker-ui.ts` khi `isOfficeJsRuntimeReady() === true`, nên trong luồng chuẩn không gặp lỗi. Tuy nhiên khi VSTO runtime, `applyIssueAnnotations()` đi nhánh bridge, không gọi hàm này.

## Ảnh hưởng

- Nếu sau này gọi `supportsAnnotations()` trong ngữ cảnh thiếu Office.js (mở taskpane trên browser, hoặc tái cấu trúc luồng annotation), sẽ throw `ReferenceError` thay vì graceful fallback.
- `clearAllAnnotations()` chạy trước `supportsAnnotations()` cũng hơi lãng phí khi không hỗ trợ annotation.

## Gợi ý sửa

Bọc `supportsAnnotations()` giống `document-reader.ts`:

```ts
export function supportsAnnotations(): boolean {
  try {
    return (
      typeof Office !== "undefined" &&
      Office.context != null &&
      Office.context.requirements != null &&
      typeof Office.context.requirements.isSetSupported === "function" &&
      Office.context.requirements.isSetSupported("WordApi", "1.7")
    );
  } catch {
    return false;
  }
}
```

Và trong `applyAnnotations()`, kiểm tra `supportsAnnotations()` **trước** khi `clearAllAnnotations()`.