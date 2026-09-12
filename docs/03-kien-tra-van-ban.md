# 03 — Nghiệp vụ Trợ lý viết (Checker AI)

Module kiểm tra văn bản bằng AI, phát hiện lỗi **chính tả (spelling), ngữ pháp (grammar), dấu câu (punctuation), dùng từ (word_choice), rõ ràng (clarity), văn phong (style), ngữ cảnh (context)** trong văn bản tiếng Việt, tiếng Anh hoặc trộn cả hai.

## 1. Trạng thái & luồng tổng thể

```
[Trạng thái ban đầu]
  score = "--"   |   count = 0   |   "Sẵn sàng kiểm tra tài liệu."

[User nhấn "Kiểm tra toàn bộ văn bản"]
  runChecker():
    1. vô hiệu button, text "Đang kiểm tra..."
    2. executeDocumentCheck()  → lấy text/paragraphs theo runtime
    3. checkParagraphs()       → gọi Checker API
    4. setIssues(issues)       → lưu vào issue-store
    5. renderResult()          → hiển thị score/count/language/issue cards (UI trước)
    6. applyIssueAnnotations() → gạch chân lỗi trong Word (bọc try/catch, fail-safe)
    7. cập nhật status ("Đã tìm thấy N vấn đề." / "Không phát hiện lỗi đáng kể.")

[User tương tác 1 issue]
  Chấp nhận → acceptIssue() → sửa text + xóa annotation → xóa card → cập nhật counter
  Bỏ qua   → ignoreIssue()  → xóa annotation → xóa card → cập nhật counter
```

## 2. Lấy nội dung theo runtime

Trong `checker-ui.ts` → `executeDocumentCheck()`:

### 2.1. VSTO + WebView2
1. Gửi bridge request `GET_DOCUMENT_TEXT` (timeout 30s).
2. Nhận `VstoDocumentData { text, isSelection?, documentName? }`.
3. Nếu text rỗng → throw `"Tài liệu chưa có nội dung để kiểm tra."`.
4. `checkDocumentText(text)` → `createParagraphsFromText()` tách theo `\r\n | \r | \n`, trim, bỏ dòng rỗng, sinh `paragraphId = vsto-paragraph-<index+1>`.

### 2.2. Office Web Add-in
1. `checkEntireDocument()` → `getDocumentParagraphs()` (`document-reader.ts`).
2. Yêu cầu WordApi ≥ 1.6 (`uniqueLocalId`). Không hỗ trợ → throw.
3. `Word.run`: đọc `context.document.body.paragraphs`, load `text, uniqueLocalId`, lọc đoạn rỗng, trả về `[{ paragraphId: uniqueLocalId, text }]`.

### 2.3. Không phải môi trường nào
→ throw `"Không tìm thấy môi trường Microsoft Word hợp lệ."` (ví dụ mở taskpane trên trình duyệt thường).

## 3. Gọi Checker API (`checker-api.ts`)

- URL: `CHECKER_CONFIG.API_BASE_URL` (mặc định `""`) → nếu rỗng dùng relative `/api/checker/check`; nếu có sẽ nối `/api/checker/check`.
- `POST` JSON `{ language: "auto", paragraphs }`.
- **Timeout 60 giây** bằng `AbortController`; khi abort → throw `"Yêu cầu kiểm tra mất quá nhiều thời gian..."`.
- `!response.ok` → throw `"Checker API <status>: <body>"`.
- `TypeError` (mạng) → throw `"Không thể kết nối tới Checker API (<url>)."`.

## 4. Phản hồi & render (`renderResult`, `renderIssues`)

Cập nhật:
- `#checker-score` ← `result.score`
- `#checker-count` ← `result.issues.length`
- `#checker-language` ← nhãn theo `detectedLanguage` (vi="Tiếng Việt", en="English", mixed="VI + EN", khác="Tự động")
- `#checker-issues` ← từng card issue.

Mỗi **issue card** hiển thị:
- Icon theo severity: `error 🔴`, `warning 🟠`, `suggestion 🔵`.
- Tên category tiếng Việt (spelling→Chính tả, grammar→Ngữ pháp, punctuation→Dấu câu, word_choice→Dùng từ, clarity→Rõ ràng, style→Văn phong, context→Ngữ cảnh).
- Badge ngôn ngữ (`issue.language.toUpperCase()`).
- `original` (text gốc) → mũi tên ↓ → button đề xuất `✓ replacement`.
- `message` giải thích.
- Độ tin cậy `Math.round(confidence * 100)%`.
- 2 nút hành động: **Chấp nhận** (`data-action="accept"`), **Bỏ qua** (`data-action="ignore"`).
- Card rỗng: "Văn bản trông ổn — Không phát hiện lỗi đáng kể."

## 5. Đánh dấu lỗi trong Word (annotation)

### 5.1. Office.js — `annotation-manager.ts`
- `supportsAnnotations()`: cần WordApi ≥ 1.7 (critique annotations).
- `applyAnnotations(issues)`:
  1. `clearAllAnnotations()` trước (xóa các annotation cũ của phiên).
  2. Nhóm issue theo `paragraphId`.
  3. `context.document.getParagraphByUniqueLocalId(paragraphId)`.
  4. `insertAnnotations({ critiques })` với `{ start, length, colorScheme }`.
  5. Map `issue.annotationId` ← id annotation trả về (lưu vào `annotationIds`).
- Màu theo severity: error→`red`, warning→`berry`, suggestion→`blue`, default→`lavender`.
- `removeAnnotation(issueId)` / `clearAllAnnotations()`: xóa bằng `getAnnotationById()` + `delete()`; lỗi "đã bị xóa" chỉ `console.warn`.

### 5.2. VSTO — bridge
Gửi `APPLY_ANNOTATIONS` với `{ issues }`, C# đảm nhận việc đánh dấu.

## 6. Áp dụng gợi ý (accept)

### 6.1. Office.js — `replacement-manager.ts` `replaceIssue(issue)`
Quy trình an toàn chống sửa nhầm:
1. Lấy paragraph theo `paragraphId`, load text.
2. **Kiểm tra văn bản chưa đổi:** `currentText.substring(start, start + length) === issue.original`? Không khớp → trả `false` (không tự sửa).
3. `paragraph.search(original, { matchCase: true, matchWholeWord: false })`.
4. `getOccurrenceIndex()`: đếm vị trí xuất hiện; khớp với `start` → chọn đúng occurrence.
5. `targetRange.insertText(replacement, replace)` → `true`.

> Vì sao an toàn? Nếu AI trả offset cũ mà tài liệu đã thay đổi → `expectedText !== original` → từ chối. Nếu từ lặp nhiều lần → chọn đúng occurrence theo offset.

### 6.2. VSTO — bridge
Gửi `ACCEPT_ISSUE { issue }`, nhận `{ success }`; chỉ coi là thành công khi `success === true`.

Sau khi accept thành công (cả 2 runtime): `removeIssue(id)` → `card.remove()` → `updateIssueCounter()` → status "Đã áp dụng gợi ý."
Nếu fail (Office.js): `window.alert("Văn bản đã thay đổi sau lần kiểm tra. Vui lòng kiểm tra lại.")`.

## 7. Bỏ qua issue (ignore)

- VSTO: `IGNORE_ISSUE { issueId }`.
- Office.js: `removeAnnotation(issueId)`.
- Sau đó: `removeIssue(id)` → xóa card → `updateIssueCounter()` → status "Đã bỏ qua vấn đề."

## 8. Issue store (`issue-store.ts`)

Bộ nhớ trong phiên (module-level):
- `setIssues`, `getIssues`, `removeIssue(issueId)`, `clearIssues`.
- Dùng để tra cứu issue khi click accept/ignore và để `updateIssueCounter()`.

## 9. Counter & empty state

`updateIssueCounter()`:
- Cập nhật `#checker-count = getIssues().length`.
- Nếu về 0 → `renderIssues([])` (hiện "Văn bản trông ổn") + status "Đã xử lý tất cả vấn đề."

## 10. Khởi tạo Checker (`initChecker()`)

- Chạy 1 lần (`checkerInitialized` guard).
- `initializeVstoBridge()` nếu đang chạy VSTO (đăng ký listener `message`).
- Gắn `click` cho `#checker-run` và event delegation cho `#checker-issues`.
- Log runtime để debug.

## 11. Quy tắc nghiệp vụ từ phía AI (prompt)

- Không sửa lại văn bản đúng, không cờ danh từ riêng/tên thương hiệu/API/thuật ngữ trừ khi lỗi rõ ràng.
- `original` phải sao chép **chính xác** từ paragraph; `start` zero-based; `length` = độ dài original.
- `confidence` trong [0,1]; severity: error = lỗi rõ, warning = có khả năng sai, suggestion = cải thiện diễn đạt.
- Văn bản đúng → `issues: []`.

Chi tiết cấu trúc dữ liệu trả về: [`04-cau-truc-du-lieu.md`](04-cau-truc-du-lieu.md). Chi tiết 2 backend: [`06-backend-api.md`](06-backend-api.md).

## 12. Điểm cần lưu ý (đọc kèm Issues)

- Các nút lọc kết quả ("Tất cả / Chính tả / Ngữ pháp / Ngữ cảnh") tồn tại trong HTML nhưng **chưa có logic lọc** — xem `Issues/001`.
- `checker-api.ts` dùng `window.setTimeout` — chỉ chạy trong môi trường có `window` (taskpane), không dùng ở Node.