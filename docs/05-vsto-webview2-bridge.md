# 05 — Giao thức VSTO ↔ WebView2 Bridge

Khi add-in được nhúng trong **VSTO Add-in** (dùng WebView2), taskpane không truy cập trực tiếp document qua Office.js mà trao đổi với C# qua bridge. Toàn bộ code phía WebView2 nằm trong `src/ui/checker-ui.ts`.

> ⚠️ **Phần C# (VSTO project) KHÔNG nằm trong repo này.** Code comment trong `checker-ui.ts` nhắc rằng C# cần cấu hình `WebMessageReceived` trong `TaskPaneControl.cs`. Tài liệu này mô tả **hợp đồng (contract)** mà phía TypeScript đang triển khai.

## 1. Phát hiện runtime

```ts
getVstoBridge(): window.chrome?.webview ?? null
isVstoRuntime():  getVstoBridge() !== null
```

Nếu `window.chrome?.webview` tồn tại → coi là VSTO runtime. Khi đó mọi thao tác document (đọc text, annotation, sửa, bỏ qua) đều đi qua bridge.

## 2. Cơ chế request/response

### Gửi yêu cầu (`sendVstoRequest`)
```ts
bridge.postMessage({
  type,        // string: loại hành động
  requestId,   // string: "req-<timestamp>-<random>"
  data         // payload tùy loại
});
```
- Mỗi request được lưu trong `pendingBridgeRequests: Map<requestId, { resolve, reject, timer }>`.
- **Timeout mặc định 30.000 ms** → reject `"VSTO không phản hồi. Cần cấu hình WebMessageReceived trong TaskPaneControl.cs."`

### Nhận phản hồi (`handleVstoMessage`)
C# `postMessage` lại event `message` với:
```ts
{
  responseTo?: string,   // ưu tiên
  requestId?: string,    // fallback
  ok?: boolean,          // false = lỗi
  data?: unknown,
  message?: string       // mô tả lỗi khi ok=false
}
```
- Tìm `pendingBridgeRequests` theo `responseTo ?? requestId`.
- Clear timer, xóa khỏi map.
- `ok === false` → `reject(new Error(message ?? "VSTO không thể xử lý yêu cầu."))`.
- Ngược lại → `resolve(data)`.

## 3. Danh sách request types

| `type` | Payload gửi | Kỳ vọng phản hồi `data` | Mục đích |
|---|---|---|---|
| `GET_DOCUMENT_TEXT` | — | `{ text: string, isSelection?: boolean, documentName?: string }` | Lấy nội dung Word để kiểm tra |
| `APPLY_ANNOTATIONS` | `{ issues: WritingIssue[] }` | — | Gạch chân lỗi trong Word |
| `ACCEPT_ISSUE` | `{ issue: WritingIssue }` | `{ success: boolean }` | Thay thế text theo gợi ý |
| `IGNORE_ISSUE` | `{ issueId: string }` | — | Bỏ qua / gỡ đánh dấu 1 lỗi |

## 4. Quy trình từng nghiệp vụ

### 4.1. Kiểm tra văn bản
1. `executeDocumentCheck()` → `isVstoRuntime()` đúng → `GET_DOCUMENT_TEXT`.
2. Text rỗng → throw `"Tài liệu chưa có nội dung để kiểm tra."`.
3. `checkDocumentText(text)` → tách paragraph bằng `createParagraphsFromText()` → gọi Checker API như bình thường.

### 4.2. Đánh dấu lỗi
`applyIssueAnnotations(issues)` → gửi `APPLY_ANNOTATIONS { issues }`. Lỗi bridge không làm mất kết quả UI (bọc `try/catch` ở `runChecker`).

### 4.3. Chấp nhận gợi ý
`acceptIssue(issue)` → `ACCEPT_ISSUE { issue }` → nhận `{ success }`; chỉ xóa card khi `success === true`.

### 4.4. Bỏ qua
`ignoreIssue(issue)` → `IGNORE_ISSUE { issueId: issue.id }`.

## 5. Ghi chú triển khai C# (theo contract)

- WebView2 cần bật `AreDefaultScriptDialogsEnabled`/`WebMessageReceived` để:
  - Nhận: lắng nghe sự kiện `WebMessageReceived`, parse JSON `{ type, requestId, data }`.
  - Trả: `CoreWebView2.PostWebMessageAsJson(response)` với `{ responseTo: requestId, ok, data|message }`.
- Với `GET_DOCUMENT_TEXT`: C# dùng Word object model đọc document (hoặc selection) và trả text.
- `ACCEPT_ISSUE`: C# thay thế text tại `issue.start` với `issue.length`, kiểm tra nội dung hiện tại khớp `issue.original` trước khi thay (đồng nhất logic an toàn với `replacement-manager.ts`).