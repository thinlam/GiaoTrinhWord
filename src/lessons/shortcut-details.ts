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

  },

  // =========================================================
  // QUẢN LÝ TÀI LIỆU
  // =========================================================

  "Ctrl + P": {
    description: "Mở giao diện in tài liệu.",
    steps: [
      "Mở tài liệu cần in.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím P.",
      "Kiểm tra máy in, số bản in và phạm vi trang.",
      "Bấm Print khi đã kiểm tra xong."
    ],
    result:
      "Word mở giao diện Print để xem trước và thiết lập việc in tài liệu.",
    tip:
      "Nên kiểm tra Print Preview trước khi in để tránh sai lề, thiếu trang hoặc in nhầm số lượng."
  },

  "Ctrl + W": {
    description: "Đóng tài liệu Word đang mở.",
    steps: [
      "Kiểm tra tài liệu đã được lưu hay chưa.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím W."
    ],
    result:
      "Tài liệu hiện tại được đóng.",
    tip:
      "Nếu tài liệu chưa lưu thay đổi, Word sẽ hỏi bạn có muốn lưu trước khi đóng hay không."
  },

  // =========================================================
  // ĐỊNH DẠNG CHỮ
  // =========================================================

  "Ctrl + B": {
    description: "Bật hoặc tắt định dạng chữ in đậm.",
    steps: [
      "Bôi đen nội dung cần định dạng.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím B."
    ],
    result:
      "Nội dung được chuyển sang chữ in đậm hoặc bỏ in đậm nếu định dạng đang được bật.",
    tip:
      "B = Bold. Thường dùng cho tiêu đề, từ khóa hoặc nội dung cần nhấn mạnh."
  },

  "Ctrl + I": {
    description: "Bật hoặc tắt định dạng chữ in nghiêng.",
    steps: [
      "Bôi đen nội dung cần định dạng.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím I."
    ],
    result:
      "Nội dung được chuyển sang chữ in nghiêng hoặc bỏ in nghiêng.",
    tip:
      "I = Italic. Thường dùng cho thuật ngữ, tên tác phẩm hoặc nội dung cần nhấn nhẹ."
  },

  "Ctrl + U": {
    description: "Bật hoặc tắt gạch chân văn bản.",
    steps: [
      "Bôi đen nội dung cần định dạng.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím U."
    ],
    result:
      "Nội dung được gạch chân hoặc bỏ gạch chân.",
    tip:
      "U = Underline."
  },

  "Ctrl + D": {
    description: "Mở hộp thoại Font.",
    steps: [
      "Bôi đen nội dung cần định dạng.",
      "Nhấn Ctrl + D.",
      "Chọn Font, Font Style, Size, Color, Underline hoặc Effects.",
      "Bấm OK."
    ],
    result:
      "Word áp dụng các thiết lập Font đã chọn cho nội dung.",
    tip:
      "Hữu ích khi cần chỉnh nhiều thuộc tính chữ trong cùng một hộp thoại."
  },

  "Ctrl + Shift + >": {
    description: "Tăng cỡ chữ của nội dung được chọn.",
    steps: [
      "Bôi đen nội dung cần tăng cỡ chữ.",
      "Nhấn giữ Ctrl và Shift.",
      "Nhấn phím >."
    ],
    result:
      "Cỡ chữ của nội dung được tăng lên mức tiếp theo.",
    tip:
      "Có thể nhấn nhiều lần để tiếp tục tăng cỡ chữ."
  },

  "Ctrl + Shift + <": {
    description: "Giảm cỡ chữ của nội dung được chọn.",
    steps: [
      "Bôi đen nội dung cần giảm cỡ chữ.",
      "Nhấn giữ Ctrl và Shift.",
      "Nhấn phím <."
    ],
    result:
      "Cỡ chữ của nội dung được giảm xuống mức tiếp theo.",
    tip:
      "Có thể nhấn nhiều lần để tiếp tục giảm cỡ chữ."
  },

  "Shift + F3": {
    description: "Chuyển nhanh giữa chữ thường và chữ hoa.",
    steps: [
      "Bôi đen từ hoặc đoạn văn bản cần thay đổi.",
      "Nhấn giữ Shift.",
      "Nhấn F3.",
      "Nhấn Shift + F3 nhiều lần để chuyển qua các kiểu chữ."
    ],
    result:
      "Word luân phiên giữa chữ thường, CHỮ HOA và kiểu Viết Hoa Chữ Cái Đầu.",
    tip:
      "Rất hữu ích khi nhập nội dung sai kiểu chữ hoa hoặc chữ thường."
  },

  // =========================================================
  // CĂN CHỈNH ĐOẠN VĂN
  // =========================================================

  "Ctrl + L": {
    description: "Căn trái đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn hoặc bôi đen nhiều đoạn.",
      "Nhấn giữ Ctrl.",
      "Nhấn L."
    ],
    result:
      "Đoạn văn được căn về lề trái.",
    tip:
      "L = Left."
  },

  "Ctrl + E": {
    description: "Căn giữa đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn hoặc bôi đen nội dung.",
      "Nhấn giữ Ctrl.",
      "Nhấn E."
    ],
    result:
      "Đoạn văn được căn giữa.",
    tip:
      "Thường dùng để căn giữa tiêu đề."
  },

  "Ctrl + R": {
    description: "Căn phải đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn hoặc bôi đen nội dung.",
      "Nhấn giữ Ctrl.",
      "Nhấn R."
    ],
    result:
      "Đoạn văn được căn về phía phải.",
    tip:
      "R = Right."
  },

  "Ctrl + J": {
    description: "Căn đều văn bản ở cả lề trái và lề phải.",
    steps: [
      "Bôi đen đoạn văn cần căn chỉnh.",
      "Nhấn giữ Ctrl.",
      "Nhấn J."
    ],
    result:
      "Các dòng trong đoạn được giãn để hai cạnh trái và phải thẳng đều.",
    tip:
      "Justify thường được sử dụng trong báo cáo, luận văn và tài liệu hành chính."
  },

  // =========================================================
  // DI CHUYỂN CON TRỎ
  // =========================================================

  "Home": {
    description: "Di chuyển con trỏ về đầu dòng hiện tại.",
    steps: [
      "Đặt con trỏ tại bất kỳ vị trí nào trong dòng.",
      "Nhấn Home."
    ],
    result:
      "Con trỏ được đưa về đầu dòng."
  },

  "End": {
    description: "Di chuyển con trỏ về cuối dòng hiện tại.",
    steps: [
      "Đặt con trỏ tại bất kỳ vị trí nào trong dòng.",
      "Nhấn End."
    ],
    result:
      "Con trỏ được đưa về cuối dòng."
  },

  "Ctrl + Home": {
    description: "Di chuyển nhanh về đầu tài liệu.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn Home."
    ],
    result:
      "Con trỏ được chuyển đến vị trí đầu tiên của tài liệu.",
    tip:
      "Hữu ích khi đang làm việc với tài liệu dài."
  },

  "Ctrl + End": {
    description: "Di chuyển nhanh đến cuối tài liệu.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn End."
    ],
    result:
      "Con trỏ được chuyển đến cuối tài liệu.",
    tip:
      "Hữu ích khi cần nhanh chóng đến phần cuối của tài liệu dài."
  },

  // =========================================================
  // XÓA VĂN BẢN
  // =========================================================

  "Ctrl + Backspace": {
    description: "Xóa nhanh một từ phía trước con trỏ.",
    steps: [
      "Đặt con trỏ ngay sau từ cần xóa.",
      "Nhấn giữ Ctrl.",
      "Nhấn Backspace."
    ],
    result:
      "Một từ phía trước con trỏ được xóa.",
    tip:
      "Nhanh hơn việc nhấn Backspace từng ký tự."
  },

  "Ctrl + Delete": {
    description: "Xóa nhanh một từ phía sau con trỏ.",
    steps: [
      "Đặt con trỏ ngay trước từ cần xóa.",
      "Nhấn giữ Ctrl.",
      "Nhấn Delete."
    ],
    result:
      "Một từ phía sau con trỏ được xóa.",
    tip:
      "Hữu ích khi chỉnh sửa văn bản nhanh."
  },

  // =========================================================
  // TÌM KIẾM VÀ THAY THẾ
  // =========================================================

  "Ctrl + F": {
    description: "Tìm kiếm nội dung trong tài liệu.",
    steps: [
      "Nhấn Ctrl + F.",
      "Navigation Pane xuất hiện.",
      "Nhập từ hoặc cụm từ cần tìm.",
      "Word hiển thị các kết quả tìm thấy.",
      "Chọn kết quả để chuyển đến vị trí tương ứng."
    ],
    result:
      "Các vị trí có nội dung trùng với từ khóa được Word đánh dấu.",
    tip:
      "Có thể dùng Ctrl + F để điều hướng nhanh trong tài liệu dài."
  },

  "Ctrl + H": {
    description: "Mở chức năng Find and Replace.",
    steps: [
      "Nhấn Ctrl + H.",
      "Nhập nội dung cần tìm vào ô Find what.",
      "Nhập nội dung mới vào ô Replace with.",
      "Chọn Replace để thay từng kết quả.",
      "Hoặc chọn Replace All để thay tất cả."
    ],
    result:
      "Word tìm và thay thế nội dung theo thiết lập.",
    tip:
      "Nên kiểm tra kỹ trước khi dùng Replace All vì có thể thay cả những vị trí không mong muốn."
  },

  // =========================================================
  // LINE SPACING
  // =========================================================

  "Ctrl + 1": {
    description: "Đặt giãn dòng 1.0 cho đoạn văn.",
    steps: [
      "Bôi đen đoạn văn cần chỉnh.",
      "Nhấn Ctrl + 1."
    ],
    result:
      "Khoảng cách dòng của đoạn văn được đặt thành 1.0.",
    tip:
      "Phù hợp với tài liệu cần trình bày nội dung gọn."
  },

  "Ctrl + 2": {
    description: "Đặt giãn dòng 2.0 cho đoạn văn.",
    steps: [
      "Bôi đen đoạn văn cần chỉnh.",
      "Nhấn Ctrl + 2."
    ],
    result:
      "Khoảng cách dòng của đoạn văn được đặt thành 2.0.",
    tip:
      "Thường dùng khi tài liệu yêu cầu khoảng cách dòng lớn để dễ ghi chú hoặc chỉnh sửa."
  },

  "Ctrl + 5": {
    description: "Đặt giãn dòng 1.5 cho đoạn văn.",
    steps: [
      "Bôi đen đoạn văn cần chỉnh.",
      "Nhấn Ctrl + 5."
    ],
    result:
      "Khoảng cách dòng của đoạn văn được đặt thành 1.5.",
    tip:
      "Line Spacing 1.5 thường được yêu cầu trong báo cáo, bài tập và luận văn."
  },

  // =========================================================
  // NGẮT TRANG VÀ NGẮT CỘT
  // =========================================================

  "Ctrl + Enter": {
    description: "Chèn Page Break để chuyển nội dung sang trang mới.",
    steps: [
      "Đặt con trỏ trước nội dung cần chuyển sang trang mới.",
      "Nhấn giữ Ctrl.",
      "Nhấn Enter."
    ],
    result:
      "Word tạo Page Break và đưa nội dung phía sau sang trang tiếp theo.",
    tip:
      "Nên dùng Ctrl + Enter thay vì nhấn Enter nhiều lần để chuyển sang trang mới."
  },

  "Ctrl + Shift + Enter": {
    description: "Chèn Column Break.",
    steps: [
      "Đặt con trỏ tại vị trí cần chuyển sang cột tiếp theo.",
      "Nhấn giữ Ctrl và Shift.",
      "Nhấn Enter."
    ],
    result:
      "Nội dung phía sau con trỏ được chuyển sang cột tiếp theo.",
    tip:
      "Chỉ thực sự hữu ích khi tài liệu đang sử dụng bố cục nhiều cột."
  },

  // =========================================================
  // ĐIỀU HƯỚNG
  // =========================================================

  "Ctrl + G": {
    description: "Mở chức năng Go To để chuyển nhanh đến một vị trí trong tài liệu.",
    steps: [
      "Nhấn Ctrl + G.",
      "Chọn loại vị trí như Page, Section, Line hoặc Bookmark.",
      "Nhập số trang, số dòng hoặc thông tin cần chuyển đến.",
      "Bấm Go To."
    ],
    result:
      "Word chuyển con trỏ nhanh đến vị trí được chỉ định.",
    tip:
      "Rất hữu ích khi làm việc với tài liệu có nhiều trang."
  },

  // =========================================================
  // HYPERLINK
  // =========================================================

  "Ctrl + K": {
    description: "Chèn hoặc chỉnh sửa Hyperlink.",
    steps: [
      "Bôi đen văn bản hoặc chọn đối tượng cần tạo liên kết.",
      "Nhấn Ctrl + K.",
      "Nhập địa chỉ website, email hoặc vị trí cần liên kết.",
      "Bấm OK."
    ],
    result:
      "Văn bản hoặc đối tượng được chuyển thành Hyperlink.",
    tip:
      "Có thể dùng Hyperlink để liên kết website, email, file hoặc một vị trí khác trong tài liệu."
  },

  // =========================================================
  // INDENT
  // =========================================================

  "Ctrl + M": {
    description: "Tăng thụt lề trái của đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn hoặc chọn nhiều đoạn.",
      "Nhấn Ctrl + M."
    ],
    result:
      "Đoạn văn được thụt vào thêm một mức từ lề trái.",
    tip:
      "Có thể nhấn nhiều lần để tiếp tục tăng mức thụt lề."
  },

  "Ctrl + Shift + M": {
    description: "Giảm thụt lề trái của đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn đang được thụt lề.",
      "Nhấn Ctrl + Shift + M."
    ],
    result:
      "Mức thụt lề trái của đoạn được giảm.",
    tip:
      "Có thể sử dụng để hoàn tác từng mức Indent đã tạo bằng Ctrl + M."
  },

  "Ctrl + T": {
    description: "Tạo Hanging Indent cho đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn hoặc bôi đen các đoạn cần chỉnh.",
      "Nhấn Ctrl + T."
    ],
    result:
      "Dòng đầu giữ vị trí, các dòng tiếp theo của đoạn được thụt vào.",
    tip:
      "Hanging Indent thường được sử dụng trong danh mục tài liệu tham khảo."
  },

  "Ctrl + Shift + T": {
    description: "Giảm Hanging Indent.",
    steps: [
      "Đặt con trỏ trong đoạn đang có Hanging Indent.",
      "Nhấn Ctrl + Shift + T."
    ],
    result:
      "Mức Hanging Indent của đoạn được giảm.",
    tip:
      "Dùng để giảm từng mức Hanging Indent đã tạo trước đó."
  },

  // =========================================================
  // BULLETS
  // =========================================================

  "Ctrl + Shift + L": {
    description: "Tạo nhanh danh sách Bullets.",
    steps: [
      "Bôi đen các đoạn cần tạo danh sách hoặc đặt con trỏ tại dòng mới.",
      "Nhấn Ctrl + Shift + L."
    ],
    result:
      "Word áp dụng kiểu Bullet List mặc định.",
    tip:
      "Sau khi tạo danh sách có thể dùng Tab và Shift + Tab để thay đổi cấp danh sách."
  },

  // =========================================================
  // XÓA ĐỊNH DẠNG
  // =========================================================

  "Ctrl + Space": {
    description: "Xóa định dạng ký tự trực tiếp.",
    steps: [
      "Bôi đen nội dung đang bị sai định dạng.",
      "Nhấn Ctrl + Space."
    ],
    result:
      "Các định dạng ký tự trực tiếp được loại bỏ và văn bản quay về định dạng của Style hiện tại.",
    tip:
      "Rất hữu ích khi copy nội dung từ Internet bị sai Font, Font Size hoặc màu chữ."
  },

  "Ctrl + Q": {
    description: "Xóa định dạng Paragraph trực tiếp.",
    steps: [
      "Đặt con trỏ trong đoạn cần sửa hoặc chọn nhiều đoạn.",
      "Nhấn Ctrl + Q."
    ],
    result:
      "Các định dạng Paragraph trực tiếp được đưa về thiết lập của Style hiện tại.",
    tip:
      "Ctrl + Q xử lý định dạng đoạn; Ctrl + Space xử lý định dạng ký tự."
  },

  // =========================================================
  // LẶP THAO TÁC
  // =========================================================

  "F4": {
    description: "Lặp lại thao tác gần nhất.",
    steps: [
      "Thực hiện một thao tác trong Word.",
      "Chọn vị trí hoặc nội dung khác.",
      "Nhấn F4."
    ],
    result:
      "Word lặp lại thao tác gần nhất nếu thao tác đó hỗ trợ lặp lại.",
    tip:
      "Rất hữu ích khi cần áp dụng cùng một thao tác cho nhiều vị trí."
  },

  // =========================================================
  // KIỂM TRA CHÍNH TẢ
  // =========================================================

  "F7": {
    description: "Mở công cụ kiểm tra chính tả và ngữ pháp.",
    steps: [
      "Mở tài liệu cần kiểm tra.",
      "Nhấn F7.",
      "Xem các lỗi hoặc đề xuất Word phát hiện.",
      "Chọn sửa, bỏ qua hoặc thêm từ vào từ điển tùy trường hợp."
    ],
    result:
      "Word bắt đầu kiểm tra chính tả và ngữ pháp theo ngôn ngữ được thiết lập.",
    tip:
      "Khả năng kiểm tra phụ thuộc vào ngôn ngữ và phiên bản Microsoft Word đang sử dụng."
  },

  // =========================================================
  // PRINT PREVIEW
  // =========================================================

  "Ctrl + F2": {
    description: "Mở chế độ xem trước khi in.",
    steps: [
      "Mở tài liệu cần kiểm tra.",
      "Nhấn Ctrl + F2."
    ],
    result:
      "Word mở giao diện xem trước và thiết lập in.",
    tip:
      "Nên kiểm tra bố cục, lề, số trang và vị trí hình ảnh trước khi in."
  },

  // =========================================================
  // FOOTNOTE
  // =========================================================

  "Alt + Ctrl + F": {
    description: "Chèn Footnote tại vị trí con trỏ.",
    steps: [
      "Đặt con trỏ ngay sau nội dung cần chú thích.",
      "Nhấn giữ Alt và Ctrl.",
      "Nhấn F.",
      "Nhập nội dung chú thích ở cuối trang."
    ],
    result:
      "Word tạo số Footnote tự động và đưa con trỏ đến vùng chú thích cuối trang.",
    tip:
      "Footnote thường được sử dụng để giải thích thuật ngữ hoặc dẫn nguồn."
  },

  // =========================================================
  // ENDNOTE
  // =========================================================

  "Alt + Ctrl + D": {
    description: "Chèn Endnote.",
    steps: [
      "Đặt con trỏ ngay sau nội dung cần chú thích.",
      "Nhấn giữ Alt và Ctrl.",
      "Nhấn D.",
      "Nhập nội dung Endnote."
    ],
    result:
      "Word tạo Endnote và quản lý số thứ tự tự động.",
    tip:
      "Khác Footnote nằm cuối trang, Endnote thường được tập trung ở cuối tài liệu hoặc cuối Section."
  },

  // =========================================================
  // SHOW / HIDE
  // =========================================================

  "Ctrl + Shift + 8": {
    description: "Hiện hoặc ẩn các ký tự định dạng trong tài liệu.",
    steps: [
      "Nhấn giữ Ctrl và Shift.",
      "Nhấn phím 8."
    ],
    result:
      "Word hiển thị hoặc ẩn các ký tự định dạng như Paragraph Mark, Space, Tab, Page Break và Section Break.",
    tip:
      "Đây là phím rất quan trọng khi kiểm tra lỗi khoảng trắng, xuống dòng, nhảy trang hoặc bố cục."
  }

};