import type { ShortcutDetail } from "../types/shortcut.types";

export const SHORTCUT_DETAILS: Record<string, ShortcutDetail> = {
  "Ctrl + A": {
    description: "Chọn toàn bộ nội dung trong tài liệu.",
    steps: [
      "Đặt con trỏ trong tài liệu.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím A."
    ],
    result: "Toàn bộ nội dung trong tài liệu được chọn.",
    tip:
      "Thường dùng trước khi đổi font, cỡ chữ, căn chỉnh hoặc sao chép toàn bộ tài liệu."
  },

  "Ctrl + C": {
    description: "Sao chép nội dung đã chọn.",
    steps: [
      "Bôi đen văn bản, hình ảnh hoặc đối tượng cần sao chép.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím C."
    ],
    result:
      "Nội dung được lưu vào Clipboard nhưng nội dung gốc vẫn được giữ nguyên.",
    tip: "Sau khi Copy, dùng Ctrl + V để dán."
  },

  "Ctrl + X": {
    description: "Cắt nội dung để di chuyển sang vị trí khác.",
    steps: [
      "Chọn nội dung cần di chuyển.",
      "Nhấn giữ Ctrl.",
      "Nhấn X.",
      "Đặt con trỏ tại vị trí mới.",
      "Nhấn Ctrl + V."
    ],
    result:
      "Nội dung được di chuyển từ vị trí cũ sang vị trí mới.",
    tip:
      "Cut khác Copy ở chỗ nội dung được dùng để di chuyển thay vì tạo bản sao."
  },

  "Ctrl + V": {
    description: "Dán nội dung đang có trong Clipboard.",
    steps: [
      "Copy hoặc Cut nội dung trước.",
      "Đặt con trỏ tại vị trí cần chèn.",
      "Nhấn giữ Ctrl.",
      "Nhấn V."
    ],
    result:
      "Nội dung từ Clipboard được chèn tại vị trí con trỏ.",
    tip:
      "Khi dán từ Internet, có thể dùng Paste Options → Keep Text Only để tránh lỗi định dạng."
  },

  "Ctrl + Z": {
    description: "Hoàn tác thao tác vừa thực hiện.",
    steps: [
      "Khi vừa thực hiện nhầm một thao tác.",
      "Nhấn giữ Ctrl.",
      "Nhấn Z."
    ],
    result:
      "Word quay lại trạng thái trước thao tác gần nhất.",
    tip:
      "Có thể nhấn Ctrl + Z nhiều lần để hoàn tác nhiều bước."
  },

  "Ctrl + Y": {
    description: "Thực hiện lại thao tác vừa Undo.",
    steps: [
      "Sau khi dùng Ctrl + Z.",
      "Nhấn giữ Ctrl.",
      "Nhấn Y."
    ],
    result:
      "Thao tác vừa bị Undo được thực hiện lại."
  },

  "Ctrl + N": {
    description: "Tạo tài liệu Word mới.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn N."
    ],
    result:
      "Word tạo một Blank Document mới.",
    tip: "N = New."
  },

  "Ctrl + O": {
    description: "Mở tài liệu đã có.",
    steps: [
      "Nhấn Ctrl + O.",
      "Chọn vị trí chứa file.",
      "Chọn tài liệu.",
      "Bấm Open."
    ],
    result:
      "Tài liệu được mở trong Word.",
    tip: "O = Open."
  },

  "Ctrl + S": {
    description: "Lưu tài liệu.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn S.",
      "Nếu là lần lưu đầu tiên, chọn tên file và vị trí lưu."
    ],
    result:
      "Các thay đổi hiện tại được lưu.",
    tip:
      "Nên nhấn Ctrl + S thường xuyên trong quá trình làm việc."
  }
};