# ISSUE-003 — `src/commands/commands.word.ts` là code mẫu còn sót

- **Mức độ:** Thấp
- **File liên quan:** `src/commands/commands.word.ts`, `src/commands/commands.ts`, `manifest.xml`
- **Trạng thái:** Mở

## Mô tả

`src/commands/commands.word.ts` vẫn là code mẫu của template:

```ts
export async function insertBlueParagraphInWord(event: Office.AddinCommands.Event) {
  await Word.run(... chèn "Hello World" màu xanh ...);
  event.completed();
}

Office.onReady(async () => {
  Office.actions.associate("action", insertBlueParagraphInWord);
});
```

- `commands.ts` import `./commands.word`, và `commands.html` là `FunctionFile` được khai báo trong `manifest.xml` (`<FunctionFile resid="CommandsUrl"/>`).
- Tuy nhiên manifest **không khai báo bất kỳ `<Control xsi:type="Button">` với `<Action xsi:type="ExecuteFunction">`**, nên `Office.actions.associate("action", ...)` không bao giờ được trigger.
- Hàm `insertBlueParagraphInWord` (chèn "Hello World" màu xanh) chỉ chạy nếu có `FunctionCommand` gọi action `action`.

## Ảnh hưởng

- Dead code nhưng vẫn được bundle vào `commands.js` (FunctionFile được load khi Word khởi động add-in).
- Rủi ro tương tự ISSUE-002: nếu sau này thêm FunctionCommand mà quên đổi hàm, sẽ chèn "Hello World" vào tài liệu.

## Gợi ý sửa

- Xóa `insertBlueParagraphInWord` và `Office.actions.associate(...)`.
- Giữ `commands.ts` (import file) + `commands.html` để FunctionFile hợp lệ, hoặc nếu không dùng command chức năng nào thì cân nhắc bỏ `<FunctionFile>` khỏi manifest và thư mục `commands/`.
- Nếu muốn ribbon có thêm nút chạy chức năng, khai báo `<Action xsi:type="ExecuteFunction">` + tên function tương ứng trong manifest.