# 02 — Nghiệp vụ Giáo Trình Word (38 bài học)

Module chính của add-in: một trung tâm học + tra cứu Microsoft Word chạy ngay trong taskpane, hoàn toàn **offline** (không gọi API), dữ liệu nằm trong code.

## 1. Dữ liệu bài học

- Nguồn: `src/lessons/lessons.ts` — mảng `lessons: Lesson[]`, 38 bài (part 1 → 38).
- Cấu trúc `Lesson` (`src/types/lesson.types.ts`):

```ts
interface Lesson {
  id: string;            // slug duy nhất
  part: number;          // số phần (1..38)
  title: string;
  level: LessonLevel;    // 1 trong 5 cấp độ
  description: string;
  keywords: string[];    // từ khóa phục vụ tìm kiếm
  sections: LessonSection[]; // nội dung từng mục
}
```

- `LessonSection { title, content }` — `content` là chuỗi HTML được chèn trực tiếp vào DOM.

### 5 cấp độ (LessonLevel)

| Level | Mô tả | Class |
|---|---|---|
| `CƠ BẢN` | Kiến thức nền tảng | `level-basic` |
| `TRUNG CẤP` | Kỹ năng xử lý tài liệu | `level-intermediate` |
| `NÂNG CAO` | Kỹ năng Word chuyên nghiệp | `level-advanced` |
| `TRA CỨU` | Mẹo, lỗi và kỹ thuật cần nhớ | `level-reference` |
| `THỰC HÀNH` | Bài tập và kiểm tra kỹ năng | `level-practice` |

Thứ tự hiển thị cố định: `LEVEL_ORDER` trong `taskpane.ts`.

### Phân bố 38 bài

| Cấp độ | Phần | Số bài |
|---|---|---|
| CƠ BẢN | 1–7 | 7 |
| TRUNG CẤP | 8–12 | 5 |
| NÂNG CAO | 13–25 | 13 |
| TRA CỨU | 26–31 | 6 |
| THỰC HÀNH | 32–38 | 7 |

Danh sách đầy đủ theo part:

1. `lam-quen-word` — Làm quen với Microsoft Word
2. `phim-tat-co-ban` — Phím tắt Word cơ bản
3. `soan-thao` — Nhập và chỉnh sửa văn bản
4. `dinh-dang-chu` — Định dạng chữ
5. `dinh-dang-doan` — Định dạng đoạn văn
6. `bullets-numbering` — Bullets, Numbering và Multilevel List
7. `tab-ruler` — Tab và Ruler
8. `page-setup` — Page Setup
9. `bang` — Làm việc với bảng
10. `hinh-anh` — Chèn và xử lý hình ảnh
11. `shapes-smartart` — Shapes, Icons, SmartArt và Text Box
12. `header-footer` — Header, Footer và Page Number
13. `styles` — Styles và Heading
14. `muc-luc` — Mục lục tự động
15. `caption` — Caption và danh mục hình/bảng
16. `cross-reference` — Cross-reference
17. `footnote-endnote` — Footnote và Endnote
18. `find-replace-nang-cao` — Find & Replace nâng cao
19. `phim-tat-nang-cao` — Các phím tắt Word nâng cao
20. `review` — Review — Nhận xét và theo dõi thay đổi
21. `protect-document` — Protect Document — Bảo vệ tài liệu
22. `mail-merge` — Mail Merge — Trộn thư
23. `navigation-pane` — Navigation Pane
24. `section-nang-cao` — Section nâng cao
25. `danh-so-trang` — Đánh số trang chuyên nghiệp
26. `phim-alt` — Phím Alt và KeyTips trong Word
27. `show-hide` — Show/Hide Formatting Marks
28. `loi-thuong-gap` — Các lỗi Word thường gặp
29. `phuc-hoi-file` — Phục hồi file Word
30. `nguyen-tac-word` — Nguyên tắc soạn Word chuyên nghiệp
31. `quy-trinh-bao-cao` — Quy trình làm báo cáo Word chuyên nghiệp
32. `thuc-hanh-co-ban` — Bài thực hành tổng hợp cơ bản
33. `thuc-hanh-trung-cap` — Bài thực hành trung cấp
34. `thuc-hanh-nang-cao` — Bài thực hành nâng cao
35. `thuc-hanh-mail-merge` — Bài thực hành Mail Merge
36. `bang-phim-tat` — Bảng phím tắt cần thuộc
37. `bai-kiem-tra` — Bài kiểm tra kỹ năng
38. `checklist` — Checklist Word chuyên nghiệp

## 2. Các khối nội dung tái sử dụng trong bài học

Trong `lessons.ts` có các helper render HTML:

- `wordGuide({ purpose, path, steps, result, example, tip, warning, note })` — khối hướng dẫn chuẩn: "Dùng để làm gì?", "Vị trí trên Word", "Cách thực hiện", "Kết quả", "Ví dụ", "Ghi chú/Mẹo/Lưu ý".
- `wordPath(...items)` — chuỗi điều hướng `File → Save`.
- `terminologyTable(rows)` — bảng thuật ngữ 3 cột (English / Tiếng Việt / Ý nghĩa).
- `shortcut(combo, title, extra?)` — thẻ phím tắt kiểu `<details>`.
- `shortcutGroup(title, items)` — nhóm các thẻ phím tắt.

## 3. Màn hình & điều hướng

### 3.1. Home view (`#home-view`)
- **Intro + nút Checker** (`#open-checker-button`) → mở trang Checker.
- **Ô tìm kiếm** (`#search`) + nút xóa (`#clear-search`), placeholder gợi ý "Ctrl + J, mục lục, Section...".
- **Danh sách bài học** (`#lesson-groups`): nhóm theo level, mỗi nhóm có header + số lượng + danh sách thẻ bài (`data-lesson-id`).
- Thẻ bài: `PHẦN XX` (2 chữ số), title, description, mũi tên ›.

### 3.2. Lesson view (`#lesson-view`)
- Toolbar: nút **Quay lại** (2 chỗ: trên `#back-button`, dưới `#back-button-bottom`) + `PHẦN N`.
- Header: badge level (`#lesson-level`), tiêu đề (`#lesson-title`), mô tả (`#lesson-description`).
- Nội dung (`#lesson-content`): render từng `section` dạng `<article class="lesson-section">` với số thứ tự 2 chữ số, tiêu đề, và `content` (HTML).

### 3.3. Checker view (`#checker-page`)
- Được bật/ẩn bởi `showCheckerView()` / `showLearningView()` — chỉ là chuyển `hidden` giữa `#learning-area` và `#checker-page`. Chi tiết nghiệp vụ Checker ở [`03-kien-tra-van-ban.md`](03-kien-tra-van-ban.md).

## 4. Tìm kiếm

- Sự kiện `input` trên `#search` → `handleSearch()` → `renderHome()`.
- **Chuẩn hóa tiếng Việt không dấu** (`normalizeText` trong `taskpane.ts`):
  1. `String.normalize("NFD")` + bỏ `[\u0300-\u036f]` (tách dấu tiếng Việt).
  2. `đ → d`, `Đ → D`.
  3. `toLowerCase()` + `trim()`.
- Từ khóa được chuẩn hóa và so `includes()` với chuỗi gộp `[title, description, level, ...keywords]` của từng bài.
- **Empty state:** khi không có kết quả hiển thị thông báo "Không tìm thấy bài học" + nút "Xóa tìm kiếm" (`#empty-clear-search`).
- Kết quả tìm kiếm hiển thị "Tìm thấy **N** kết quả cho "từ khóa"" (`#search-result-info`).

> Lưu ý: chuẩn hóa `đ → d` dùng regex chữ `đ` — do đó khi gõ không dấu, "định dạng" được tìm bằng "dinh dang" ✓. Các từ tiếng Việt có chữ "d" lẫn lộn với "đ" được xử lý theo hướng bỏ dấu nên tìm kiếm khá bao dung.

## 5. Xử lý XSS

Mọi dữ liệu hiển thị từ bài học (title, description, level, keywords) được chạy qua `escapeHtml()` khi nhúng vào chuỗi HTML. Riêng `section.content` là HTML đã được soạn thủ công trong source (đáng tin cậy), được chèn trực tiếp.

## 6. Dữ liệu phím tắt

- `src/lessons/shortcut-details.ts` — `SHORTCUT_DETAILS: Record<string, ShortcutDetail>` chứa chi tiết (description, steps, result, tip) cho từng tổ hợp phím.
- `src/ui/shortcut-ui.ts`:
  - `shortcut(combo, title, extra)` — render `<details class="gt-shortcut-card">`: keys dạng `<kbd>`, tên, mô tả; mở rộng hiển thị **CÁCH THAO TÁC** (steps), **Kết quả** ✓, **Mẹo** 💡.
  - Nếu `extra` trùng key sẽ override dữ liệu trong `SHORTCUT_DETAILS` (spread `{ ...base, ...extra }`).
  - `createDefaultSteps()` — tự sinh steps mặc định từ combo khi chưa khai báo (1 phím → 1 bước; nhiều phím → "Nhấn giữ X + Y" rồi "nhấn Z").

## 7. Cấu hình hiển thị

- Header brand "GIÁO TRÌNH WORD", badge version `2026`.
- Search helper ghi "38 phần • Cơ bản → Nâng cao" — khớp đúng số bài hiện có (38).
- Footer "Microsoft Word Learning Center".