# Tài liệu nghiệp vụ — Giáo Trình Word Add-in

> Bộ tài liệu mô tả **toàn bộ nghiệp vụ** của project `GiaoTrinhWord` — một Microsoft Word Add-in gồm 2 chức năng chính:
>
> 1. **Giáo Trình Word** — Trung tâm học & tra cứu Microsoft Word (38 bài học) chạy ngay trong Word.
> 2. **Trợ lý viết (Checker AI)** — Kiểm tra chính tả, ngữ pháp, dấu câu, dùng từ, rõ ràng, văn phong và ngữ cảnh bằng AI.

## Cấu trúc tài liệu

| File | Nội dung |
|---|---|
| [`01-tong-quan-kien-truc.md`](01-tong-quan-kien-truc.md) | Kiến trúc tổng quan, các thành phần, công nghệ và luồng dữ liệu. |
| [`02-giao-trinh-hoc-word.md`](02-giao-trinh-hoc-word.md) | Nghiệp vụ Giáo Trình: 38 bài học, tìm kiếm, màn hình và UI. |
| [`03-kien-tra-van-ban.md`](03-kien-tra-van-ban.md) | Nghiệp vụ Checker AI: toàn bộ luồng kiểm tra, annotation, sửa lỗi. |
| [`04-cau-truc-du-lieu.md`](04-cau-truc-du-lieu.md) | Data model: kiểu TypeScript, DTO, JSON Schema của AI. |
| [`05-vsto-webview2-bridge.md`](05-vsto-webview2-bridge.md) | Giao thức bridge giữa VSTO (C#) và WebView2 (TypeScript). |
| [`06-backend-api.md`](06-backend-api.md) | Backend: Vercel Serverless + ASP.NET Core, endpoint, giới hạn, mã lỗi. |
| [`07-build-run-deploy.md`](07-build-run-deploy.md) | Build, chạy local, sideload, deploy Vercel / chạy .NET API. |
| [`Issues/`](Issues/README.md) | Danh sách vấn đề phát hiện khi review toàn bộ nghiệp vụ. |

## Chỉ mục nghiệp vụ nhanh

| Nghiệp vụ | Vị trí code chính |
|---|---|
| Khởi động taskpane | `src/taskpane/taskpane.ts` |
| Dữ liệu 38 bài học | `src/lessons/lessons.ts` (5.226 dòng) |
| Render phím tắt | `src/ui/shortcut-ui.ts`, `src/lessons/shortcut-details.ts` |
| UI Checker | `src/ui/checker-ui.ts` |
| Gọi API Checker | `src/api/checker-api.ts`, `src/checker/checker.service.ts` |
| Đọc tài liệu Word | `src/word/document-reader.ts` |
| Gạch chân lỗi (annotation) | `src/word/annotation-manager.ts` |
| Áp dụng gợi ý sửa lỗi | `src/word/replacement-manager.ts` |
| Lưu trữ issue trong phiên | `src/checker/issue-store.ts` |
| Backend Vercel | `api/checker/check.ts` |
| Backend .NET | `server/GiaoTrinh.Checker.Api/` |
| Manifest (ribbon) | `manifest.xml` |

## Tóm tắt kiến trúc

```
┌──────────────────────────────────────────────────────────────┐
│                    Microsoft Word                            │
│  ┌──────────┐      ┌───────────────────────────────┐         │
│  │  Ribbon  │─────▶│  Taskpane (WebView2/IFrame)  │         │
│  │GIAO TRINH│      │  taskpane.ts                  │         │
│  │ WORD     │      │  ├─ Giáo Trình (38 bài)       │         │
│  └──────────┘      │  └─ Checker AI (UI + logic)   │         │
│                    └──────────────┬────────────────┘         │
└───────────────────────────────────┼──────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
   ┌─────────────────┐   ┌────────────────────┐   ┌──────────────────────┐
   │ Office.js (Word │   │ VSTO WebView2       │   │ Backend Checker API  │
   │ API, direct doc │   │ bridge (C# đọc text)│   │  Vercel OR .NET API  │
   │ access)         │   └────────────────────┘   └──────────┬───────────┘
   └─────────────────┘                                       ▼
                                                     OpenAI (JSON schema)
```

- **Runtime 1 — Office Web Add-in:** taskpane dùng Office.js (`Word.run`) đọc trực tiếp document, gạch chân lỗi bằng Word critique annotations (WordApi ≥ 1.7), tự sửa text.
- **Runtime 2 — VSTO + WebView2:** C# (project VSTO ngoài repo này) đọc nội dung Word rồi `postMessage` cho taskpane; taskpane vẫn gọi Checker API; C# xử lý annotation và thay thế văn bản.
- **Backend:** 2 lựa chọn — Vercel Serverless (`api/checker/check.ts`) hoặc ASP.NET Core (`server/GiaoTrinh.Checker.Api`). Cả hai gọi OpenAI với **JSON Schema strict** để bắt AI trả đúng cấu trúc.

> Lưu ý: Bộ tài liệu mô tả đúng hành vi code hiện tại (commit `99e71d6`). Các điểm bất nhất/thiếu sót được liệt kê trong [`Issues/`](Issues/README.md).