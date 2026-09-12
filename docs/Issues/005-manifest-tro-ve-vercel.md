# ISSUE-005 — `manifest.xml` hardcode URL production → sideload local vẫn load site deployed

- **Mức độ:** Trung bình
- **File liên quan:** `manifest.xml`
- **Trạng thái:** Mở

## Mô tả

`manifest.xml` hiện hardcode toàn bộ URL production:

- `<SourceLocation DefaultValue="https://giaotrinh-word.vercel.app/taskpane.html"/>`
- `<AppDomains><AppDomain>https://giaotrinh-word.vercel.app</AppDomain></AppDomains>`
- `<IconUrl>`, các `resid` của icon/commands/taskpane đều trỏ `https://giaotrinh-word.vercel.app/...`

Không có `https://localhost:3000` nào trong manifest. Do đó:
- Khi chạy `npm run dev-server` + `npm run start` (sideload), Word mở taskpane từ **site đã deploy** chứ không phải dev server local.
- Build production (transform `urlDev → urlProd`) không có tác dụng vì không có `localhost:3000` để thay.

## Ảnh hưởng

- **Không thể test code mới local:** mọi sửa đổi source phải deploy lên Vercel mới thấy được — vòng lặp dev chậm và rủi ro đưa code chưa test lên production.
- Backend .NET (CORS chỉ cho phép `https://localhost:3000` và vercel) sẽ không nhận request nếu taskpane load từ vercel mà `API_BASE_URL` trỏ localhost .NET.

## Gợi ý sửa

Áp dụng đúng cơ chế template:
1. Trong `manifest.xml`, thay các URL bằng `https://localhost:3000/...` (dev).
2. Đặt `urlProd = "https://giaotrinh-word.vercel.app/"` (xem ISSUE-004).
3. Webpack sẽ tự sinh `dist/manifest.xml` với URL production khi build, và giữ nguyên URL dev khi chạy dev-server.
4. Kiểm tra lại `AppDomains` chứa cả hai origin khi cần.