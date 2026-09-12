# ISSUE-002 — `src/taskpane/word.ts` là code mẫu Microsoft còn sót

- **Mức độ:** Thấp
- **File liên quan:** `src/taskpane/word.ts`
- **Trạng thái:** Mở

## Mô tả

`src/taskpane/word.ts` vẫn giữ nguyên code mẫu từ template `Office-Addin-TaskPane`:

```ts
Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg")!.style.display = "none";
    document.getElementById("app-body")!.style.display = "flex";
    document.getElementById("run")!.onclick = runWord;
  }
});

export async function runWord() {
  return Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);
    paragraph.font.color = "blue";
    await context.sync();
  });
}
```

Đặc điểm:
- Không được import bởi entry nào (`webpack.config.js` chỉ import `taskpane.ts`), nên **không nằm trong bundle**.
- Nội dung nguy hiểm (chèn "Hello World" màu xanh vào tài liệu) chỉ kích hoạt nếu file được import và element `#run` tồn tại.

## Ảnh hưởng

- Dead code, gây nhầm lẫn khi đọc source.
- Nếu ai đó vô tình import file này vào, add-in sẽ chèn "Hello World" vào tài liệu người dùng — không phải hành vi mong muốn của Giáo Trình.

## Gợi ý sửa

Xóa file `src/taskpane/word.ts` (hoặc giữ lại chỉ để tham khảo trong thư mục ngoài `src/`). Kiểm tra lại không còn reference nào trong repo.