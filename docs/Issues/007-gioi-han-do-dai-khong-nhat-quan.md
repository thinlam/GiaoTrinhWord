# ISSUE-007 — Giới hạn độ dài văn bản không nhất quán giữa 2 backend

- **Mức độ:** Thấp
- **File liên quan:** `api/checker/check.ts` (dòng ~121, 287), `server/GiaoTrinh.Checker.Api/Controllers/CheckerController.cs` (dòng ~51)
- **Trạng thái:** Mở

## Mô tả

| Backend | Giới hạn | HTTP status trả về | Thông báo |
|---|---|---|---|
| Vercel | 60.000 ký tự | `413 Payload Too Large` | `"Tài liệu quá dài. Tối đa 60,000 ký tự..."` |
| .NET | 50.000 ký tự | `400 Bad Request` | `"Văn bản quá dài cho một lần kiểm tra."` |

## Ảnh hưởng

- Người dùng gặp ngưỡng chặn khác nhau tùy backend.
- Phía client (`checker-api.ts`) hiển thị nguyên body lỗi của backend (có thể tiếng Việt/Vercel là "60,000" còn .NET là "50.000"), gây bối rối.

## Gợi ý sửa

- Thống nhất một con số (ví dụ 50.000) ở cả 2 backend.
- Hoặc tốt hơn: đưa giới hạn về **cấu hình client** (`CHECKER_CONFIG`) để frontend chặn sớm và hiển thị thông báo chuẩn trước khi gửi API.