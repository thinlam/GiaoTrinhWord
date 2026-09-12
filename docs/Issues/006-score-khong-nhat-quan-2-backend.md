# ISSUE-006 — Cách tính điểm (score) không nhất quán giữa 2 backend

- **Mức độ:** Thấp
- **File liên quan:** `api/checker/check.ts`, `server/GiaoTrinh.Checker.Api/Services/OpenAiWritingChecker.cs`
- **Trạng thái:** Mở

## Mô tả

Cùng một văn bản, gửi tới 2 backend sẽ cho điểm khác nhau:

| Backend | Cách tính score |
|---|---|
| Vercel | **Tin AI trả `score`** (chỉ clamp 0..100). |
| .NET | Server **tự tính**: `penalty = Σ severity (error=7, warning=3, suggestion=1)`, `score = clamp(100 - penalty, 0, 100)`. |

Ngoài ra:
- Vercel cho AI trả `issue.language` enum `[vi, en]`; .NET cho phép `[vi, en, mixed, unknown]`.
- Vercel không yêu cầu `title`/`start`/`length`; .NET yêu cầu cả `start`, `length`, `title`.
- `id`: Vercel giữ id của AI (fallback `issue-N`), .NET luôn sinh `Guid`.

## Ảnh hưởng

- Người dùng dùng backend khác nhau sẽ thấy "Điểm văn bản" khác nhau cho cùng nội dung.
- Khó bảo trì khi có 2 luồng xử lý song song khác hành vi.

## Gợi ý sửa

- Thống nhất chỉ **một backend** là nguồn chân lý (khuyến nghị giữ .NET vì có validate vị trí + tính điểm chủ động, hoặc giữ Vercel nếu đang dùng serverless chính).
- Hoặc làm cho 2 backend cùng thuật toán: để AI trả `score` và 2 bên cùng clamp, hoặc cùng tính từ issues.
- Đồng bộ enum `issue.language` và danh sách field `required` giữa 2 JSON Schema.