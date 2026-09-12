# Danh sách vấn đề (Issues) — review toàn bộ nghiệp vụ

Các vấn đề phát hiện trong quá trình review code (commit `99e71d6`). Mỗi issue có mô tả, vị trí code, ảnh hưởng và gợi ý sửa.

## Chỉ mục

| # | Issue | Mức độ | Trạng thái |
|---|---|---|---|
| [001](001-bộ-lọc-kết-quả-không-hoạt-động.md) | Bộ lọc kết quả Checker ("Tất cả / Chính tả / Ngữ pháp / Ngữ cảnh") có HTML nhưng **không có logic** | Trung bình | Mở |
| [002](002-code-mẫu-taskpane-word-ts.md) | `src/taskpane/word.ts` là code mẫu Microsoft còn sót (chèn "Hello World") | Thấp | Mở |
| [003](003-code-mẫu-commands-word-ts.md) | `src/commands/commands.word.ts` là code mẫu còn sót (associate "action", chèn "Hello World") | Thấp | Mở |
| [004](004-url-prod-contoso.md) | `webpack.config.js` `urlProd` còn placeholder `https://www.contoso.com/` | Trung bình | Mở |
| [005](005-manifest-tro-ve-vercel.md) | `manifest.xml` hardcode URL production → sideload local vẫn load site deployed | Trung bình | Mở |
| [006](006-score-khong-nhat-quan-2-backend.md) | Cách tính điểm không nhất quán giữa Vercel và .NET (AI trả score vs server tính) | Thấp | Mở |
| [007](007-gioi-han-do-dai-khong-nhat-quan.md) | Giới hạn độ dài khác nhau giữa 2 backend (60.000 vs 50.000 ký tự) | Thấp | Mở |
| [008](008-supports-annotations-thieu-guard.md) | `annotation-manager.ts` `supportsAnnotations()` truy cập `Office.context` không có guard | Thấp | Mở |

## Ghi chú

- **Mức độ:** Ảnh hưởng nghiệp vụ — Cao / Trung bình / Thấp.
- **Trạng thái:** Mở = chưa sửa. Khi sửa xong cập nhật thành "Đã sửa" kèm commit.
- Các vấn đề mang tính **cải tiến kiến trúc/deploy** nên đọc kèm `01-tong-quan-kien-truc.md` và `07-build-run-deploy.md`.