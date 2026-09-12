# ISSUE-004 — `webpack.config.js` còn placeholder URL production `contoso.com`

- **Mức độ:** Trung bình
- **File liên quan:** `webpack.config.js` (dòng 8)
- **Trạng thái:** Mở

## Mô tả

```js
const urlProd = "https://www.contoso.com/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION
```

Đây là placeholder từ template. Khi build production, `CopyWebpackPlugin` transform manifest:

```js
transform(content) {
  return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
}
```

Vì `manifest.xml` hiện **không chứa** `https://localhost:3000/` (đã hardcode `https://giaotrinh-word.vercel.app`), transform không đổi gì — may mắn không sinh URL sai, nhưng `urlProd` vẫn là placeholder gây nhầm lẫn.

## Ảnh hưởng

- Nếu sau này sửa `manifest.xml` để dùng `https://localhost:3000/` cho dev (chuẩn của template), build production sẽ ghi đè thành `https://www.contoso.com/` → **add-in production hỏng** (URL không tồn tại).
- Khó hiểu khi đọc code deploy.

## Gợi ý sửa

- Đặt `urlProd = "https://giaotrinh-word.vercel.app/"`.
- Và/hoặc chuẩn hoá manifest: dùng `https://localhost:3000/` trong `manifest.xml` (dev), để webpack transform sang production khi build — khớp với cơ chế template và giải quyết luôn ISSUE-005.