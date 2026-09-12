# ISSUE-001 — Bộ lọc kết quả Checker không có logic

- **Mức độ:** Trung bình
- **File liên quan:** `src/taskpane/taskpane.html` (dòng ~889–936), `src/ui/checker-ui.ts`
- **Trạng thái:** Mở

## Mô tả

Trong HTML có sẵn thanh bộ lọc kết quả kiểm tra:

```html
<button data-checker-filter="all">Tất cả</button>
<button data-checker-filter="spelling">Chính tả</button>
<button data-checker-filter="grammar">Ngữ pháp</button>
<button data-checker-filter="context">Ngữ cảnh</button>
```

Nhưng trong `src/ui/checker-ui.ts` **không có bất kỳ code nào**:
- bind sự kiện click cho các nút `[data-checker-filter]`,
- hoặc lọc danh sách issue theo category.

`renderIssues()` luôn render toàn bộ `issues`; class `active` trên nút "Tất cả" là tĩnh trong HTML. Khi user bấm các nút này, **không có gì xảy ra**.

## Ảnh hưởng

- Người dùng thấy giao diện bộ lọc nhưng không dùng được → trải nghiệm lỗi về mặt UI (dead control).
- Với tài liệu dài, không lọc theo nhóm làm khó rà soát riêng "chính tả" hay "ngữ pháp".

## Gợi ý sửa

1. Trong `initChecker()` thêm event delegation cho `.checker-filter-bar`:
   - Click nút → đổi class `active`, lưu `activeFilter` (all/spelling/grammar/...).
   - Gọi lại `renderIssues(getIssues().filter(...))` (có thể cần giữ `setIssues` gốc để accept/ignore hoạt động đúng — nên lọc lúc render, không xóa khỏi store).
2. Nên đổi tên biến/phương thức để tái sử dụng: tách `renderIssues(issues)` hiện tại thành hàm nhận danh sách đã lọc.
3. Cân nhắc thêm category `punctuation`, `word_choice`, `clarity`, `style` vào danh sách nút hoặc dùng dropdown.