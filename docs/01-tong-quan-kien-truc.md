# 01 — Tổng quan kiến trúc

## 1. Giới thiệu project

`GiaoTrinhWord` là một **Microsoft Word Add-in** dạng TaskPane, đăng ký một nút trên ribbon **Home → GIÁO TRÌNH WORD → "Mở Giáo Trình"** (xem `manifest.xml`).

Add-in gồm 2 module nghiệp vụ độc lập, được thiết kế để **không ảnh hưởng lẫn nhau**:

1. **Giáo Trình Word** (module chính): 38 bài học về Word từ cơ bản → chuyên nghiệp, có tìm kiếm và phân nhóm theo 5 cấp độ.
2. **Trợ lý viết — Checker AI** (module phụ): kiểm tra toàn bộ văn bản, hiển thị danh sách lỗi, cho phép **Chấp nhận / Bỏ qua** từng gợi ý, đánh dấu trực tiếp trong tài liệu.

## 2. Công nghệ

| Thành phần | Công nghệ |
|---|---|
| Frontend | TypeScript, Office.js (`office-js`), Webpack 5, HTML/CSS |
| Runtime chính | Word Desktop (Web Add-in TaskPane, `ReadWriteDocument`) |
| Runtime phụ | VSTO + WebView2 (bridge qua `window.chrome.webview`) |
| Backend (lựa chọn 1) | Vercel Serverless Function (`api/checker/check.ts`) → OpenAI Responses API |
| Backend (lựa chọn 2) | ASP.NET Core (.NET 10) `server/GiaoTrinh.Checker.Api` → OpenAI Chat API |
| Build | `webpack --mode production/development`, `babel-loader`, `office-addin-debugging` |

## 3. Cấu trúc thư mục

```
├── api/checker/check.ts            # Vercel Serverless Function (Checker API)
├── assets/                         # Icon add-in
├── manifest.xml                    # Khai báo add-in (ribbon, URL, quyền)
├── server/GiaoTrinh.Checker.Api/   # Backend ASP.NET Core (tùy chọn)
├── src/
│   ├── api/checker-api.ts          # Fetch Checker API từ taskpane
│   ├── checker/                    # Service + issue store (client)
│   │   ├── checker.service.ts
│   │   └── issue-store.ts
│   ├── commands/                   # Add-in commands (FunctionFile)
│   │   ├── commands.html / .ts
│   │   └── commands.word.ts        # (code mẫu, xem Issues/003)
│   ├── config/checker.config.ts    # Cấu hình Checker (API base, timeout)
│   ├── lessons/                    # Dữ liệu bài học + shortcut details
│   │   ├── lessons.ts              # 38 bài học
│   │   └── shortcut-details.ts     # Bảng chi tiết phím tắt
│   ├── taskpane/                   # Entry của taskpane
│   │   ├── taskpane.html / .ts / .css
│   │   └── word.ts                 # (code mẫu, xem Issues/002)
│   ├── types/                      # Các interface dùng chung
│   ├── ui/                         # Render UI
│   │   ├── checker-ui.ts
│   │   └── shortcut-ui.ts
│   └── word/                       # Tương tác tài liệu Word
│       ├── annotation-manager.ts
│       ├── document-reader.ts
│       └── replacement-manager.ts
├── webpack.config.js               # Build dev/prod
├── vercel.json                     # Rewrite / → taskpane.html
└── package.json
```

## 4. Luồng khởi động taskpane

Quy trình trong `src/taskpane/taskpane.ts` (`startApplication()`):

1. **Không dùng `Office.onReady()` để chặn giao diện** — VSTO WebView2 chỉ cần DOM tải xong là render được.
2. Gọi `initializeDOM()` — lấy các element **bắt buộc** của Giáo Trình; thiếu sẽ ném lỗi rõ ràng. Các element của Checker được lấy **tùy chọn** (nullable) để Checker hỏng không làm chết Giáo Trình.
3. `bindEvents()` — tìm kiếm, mở bài học, quay lại, mở Checker...
4. `showApplication()` — ẩn màn hình loading (`#sideload-msg`), hiện `#app-body`.
5. `renderHome()` — vẽ danh sách bài học theo cấp độ.
6. `initChecker()` — khởi tạo Checker riêng biệt trong `try/catch`; lỗi Checker chỉ log, không chặn ứng dụng.

Nếu startup thật sự lỗi, `showStartupError()` hiển thị card lỗi thay vì màn hình loading treo mãi.

## 5. Hai runtime của Checker

| | **Office Web Add-in** | **VSTO + WebView2** |
|---|---|---|
| Cách nhận dạng | `typeof Office/Word` tồn tại + `isSetSupported` | `window.chrome?.webview` tồn tại |
| Lấy văn bản | `document-reader.ts` `getDocumentParagraphs()` (WordApi 1.6, cần `uniqueLocalId`) | Bridge `GET_DOCUMENT_TEXT` (C# đọc text, gửi qua WebView2) |
| Gạch chân lỗi | `annotation-manager.ts` `applyAnnotations()` (Word critique, WordApi 1.7) | Bridge `APPLY_ANNOTATIONS` |
| Sửa lỗi | `replacement-manager.ts` `replaceIssue()` | Bridge `ACCEPT_ISSUE` |
| Bỏ qua lỗi | `removeAnnotation()` | Bridge `IGNORE_ISSUE` |

Chi tiết luồng Checker: [`03-kien-tra-van-ban.md`](03-kien-tra-van-ban.md). Chi tiết bridge: [`05-vsto-webview2-bridge.md`](05-vsto-webview2-bridge.md).

## 6. Luồng dữ liệu Checker

```
Taskpane UI (checker-ui.ts)
   │  runChecker()
   ▼
executeDocumentCheck()
   ├─ VSTO?  → sendVstoRequest("GET_DOCUMENT_TEXT") → checkDocumentText(text)
   └─ Office?→ checkEntireDocument() → getDocumentParagraphs()
                    │  paragraphs: [{ paragraphId, text }]
                    ▼
checker.service.checkParagraphs() → checker-api.checkDocumentApi()
                    │  POST { language:"auto", paragraphs }
                    ▼
        Backend (Vercel | .NET) → OpenAI (JSON Schema strict)
                    │  { detectedLanguage, score, issues[] }
                    ▼
renderResult() + setIssues() + applyIssueAnnotations()
                    │
   Người dùng: Chấp nhận → acceptIssue() → replaceIssue()/ACCEPT_ISSUE → removeAnnotation
   Người dùng: Bỏ qua   → ignoreIssue() → removeAnnotation()/IGNORE_ISSUE
```

## 7. Điểm thiết kế quan trọng

- **Fail-safe:** Checker là module phụ; toàn bộ khởi tạo và annotation đều bọc `try/catch` để không làm hỏng Giáo Trình.
- **UI trước, annotation sau:** kết quả kiểm tra hiển thị trước, lỗi đánh dấu trong Word không làm mất kết quả.
- **An toàn khi sửa text:** `replacement-manager.ts` chỉ sửa khi văn bản tại vị trí vẫn khớp `original` (tránh sửa nhầm khi tài liệu đã thay đổi).
- **Timeouts:** Checker API 60 giây (`CHECKER_CONFIG.REQUEST_TIMEOUT`), bridge VSTO 30 giây.
- **Giới hạn độ dài:** Vercel 60.000 ký tự (HTTP 413), .NET 50.000 ký tự (HTTP 400).