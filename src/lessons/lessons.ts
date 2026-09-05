// =========================================================
// SHORTCUT UI
// =========================================================

interface ShortcutDetail {
  description?: string;
  steps?: string[];
  result?: string;
  tip?: string;
}

const SHORTCUT_DETAILS: Record<string, ShortcutDetail> = {
  "Ctrl + A": {
    description: "Chọn toàn bộ nội dung trong tài liệu.",
    steps: [
      "Đặt con trỏ trong tài liệu.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím A."
    ],
    result: "Toàn bộ nội dung trong tài liệu được chọn.",
    tip: "Thường dùng trước khi đổi font, cỡ chữ, căn chỉnh hoặc sao chép toàn bộ tài liệu."
  },

  "Ctrl + C": {
    description: "Sao chép nội dung đã chọn.",
    steps: [
      "Bôi đen văn bản, hình ảnh hoặc đối tượng cần sao chép.",
      "Nhấn giữ phím Ctrl.",
      "Nhấn phím C."
    ],
    result: "Nội dung được lưu vào Clipboard nhưng nội dung gốc vẫn được giữ nguyên.",
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
    result: "Nội dung được di chuyển từ vị trí cũ sang vị trí mới.",
    tip: "Cut khác Copy ở chỗ nội dung được dùng để di chuyển thay vì tạo bản sao."
  },

  "Ctrl + V": {
    description: "Dán nội dung đang có trong Clipboard.",
    steps: [
      "Copy hoặc Cut nội dung trước.",
      "Đặt con trỏ tại vị trí cần chèn.",
      "Nhấn giữ Ctrl.",
      "Nhấn V."
    ],
    result: "Nội dung từ Clipboard được chèn tại vị trí con trỏ.",
    tip: "Khi dán từ Internet, có thể dùng Paste Options → Keep Text Only để tránh lỗi định dạng."
  },

  "Ctrl + Z": {
    description: "Hoàn tác thao tác vừa thực hiện.",
    steps: [
      "Khi vừa thực hiện nhầm một thao tác.",
      "Nhấn giữ Ctrl.",
      "Nhấn Z."
    ],
    result: "Word quay lại trạng thái trước thao tác gần nhất.",
    tip: "Có thể nhấn Ctrl + Z nhiều lần để hoàn tác nhiều bước."
  },

  "Ctrl + Y": {
    description: "Thực hiện lại thao tác vừa Undo.",
    steps: [
      "Sau khi dùng Ctrl + Z.",
      "Nhấn giữ Ctrl.",
      "Nhấn Y."
    ],
    result: "Thao tác vừa bị Undo được thực hiện lại."
  },

  "Ctrl + N": {
    description: "Tạo tài liệu Word mới.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn N."
    ],
    result: "Word tạo một Blank Document mới.",
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
    result: "Tài liệu được mở trong Word.",
    tip: "O = Open."
  },

  "Ctrl + S": {
    description: "Lưu tài liệu.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn S.",
      "Nếu là lần lưu đầu tiên, chọn tên file và vị trí lưu."
    ],
    result: "Các thay đổi hiện tại được lưu.",
    tip: "Nên nhấn Ctrl + S thường xuyên trong quá trình làm việc."
  },

  "Ctrl + P": {
    description: "Mở giao diện in tài liệu.",
    steps: [
      "Nhấn Ctrl + P.",
      "Chọn máy in.",
      "Kiểm tra phạm vi trang.",
      "Kiểm tra thiết lập.",
      "Bấm Print."
    ],
    result: "Tài liệu được gửi đến máy in khi xác nhận.",
    tip: "Nên kiểm tra Print Preview trước khi in."
  },

  "Ctrl + W": {
    description: "Đóng tài liệu hiện tại.",
    steps: [
      "Nhấn Ctrl + W.",
      "Nếu tài liệu chưa lưu, chọn Save hoặc Don't Save."
    ],
    result: "Tài liệu hiện tại được đóng."
  },

  "Ctrl + B": {
    description: "Bật hoặc tắt chữ in đậm.",
    steps: [
      "Chọn văn bản cần định dạng.",
      "Nhấn Ctrl + B."
    ],
    result: "Văn bản được in đậm hoặc bỏ in đậm.",
    tip: "B = Bold."
  },

  "Ctrl + I": {
    description: "Bật hoặc tắt chữ in nghiêng.",
    steps: [
      "Chọn văn bản cần định dạng.",
      "Nhấn Ctrl + I."
    ],
    result: "Văn bản được in nghiêng hoặc bỏ in nghiêng.",
    tip: "I = Italic."
  },

  "Ctrl + U": {
    description: "Bật hoặc tắt gạch chân.",
    steps: [
      "Chọn văn bản.",
      "Nhấn Ctrl + U."
    ],
    result: "Văn bản được gạch chân hoặc bỏ gạch chân.",
    tip: "U = Underline."
  },

  "Ctrl + D": {
    description: "Mở hộp thoại Font.",
    steps: [
      "Chọn văn bản cần định dạng.",
      "Nhấn Ctrl + D.",
      "Thiết lập Font, Font Style, Size hoặc Effects.",
      "Bấm OK."
    ],
    result: "Định dạng Font được áp dụng cho nội dung đã chọn."
  },

  "Ctrl + Shift + >": {
    description: "Tăng cỡ chữ.",
    steps: [
      "Chọn văn bản.",
      "Nhấn giữ Ctrl + Shift.",
      "Nhấn phím >."
    ],
    result: "Kích thước chữ tăng lên."
  },

  "Ctrl + Shift + <": {
    description: "Giảm cỡ chữ.",
    steps: [
      "Chọn văn bản.",
      "Nhấn giữ Ctrl + Shift.",
      "Nhấn phím <."
    ],
    result: "Kích thước chữ giảm xuống."
  },

  "Shift + F3": {
    description: "Chuyển chữ thường, Viết Hoa hoặc CHỮ HOA.",
    steps: [
      "Chọn văn bản.",
      "Nhấn Shift + F3.",
      "Nhấn lặp lại để chuyển qua các kiểu chữ."
    ],
    result: "Kiểu viết hoa của nội dung được thay đổi.",
    tip: "Rất hữu ích khi nhập sai kiểu chữ hoa/thường."
  },

  "Ctrl + L": {
    description: "Căn trái đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn hoặc chọn nhiều đoạn.",
      "Nhấn Ctrl + L."
    ],
    result: "Đoạn văn được căn trái."
  },

  "Ctrl + E": {
    description: "Căn giữa đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn.",
      "Nhấn Ctrl + E."
    ],
    result: "Đoạn văn được căn giữa.",
    tip: "Thường dùng cho tiêu đề."
  },

  "Ctrl + R": {
    description: "Căn phải đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn.",
      "Nhấn Ctrl + R."
    ],
    result: "Đoạn văn được căn về bên phải."
  },

  "Ctrl + J": {
    description: "Căn đều hai lề.",
    steps: [
      "Chọn đoạn văn.",
      "Nhấn Ctrl + J."
    ],
    result: "Văn bản được căn đều giữa lề trái và lề phải.",
    tip: "Rất thường dùng trong báo cáo, luận văn và công văn."
  },

  "Home": {
    description: "Di chuyển đến đầu dòng.",
    steps: ["Nhấn phím Home."],
    result: "Con trỏ chuyển đến đầu dòng hiện tại."
  },

  "End": {
    description: "Di chuyển đến cuối dòng.",
    steps: ["Nhấn phím End."],
    result: "Con trỏ chuyển đến cuối dòng hiện tại."
  },

  "Ctrl + Home": {
    description: "Di chuyển về đầu tài liệu.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn Home."
    ],
    result: "Con trỏ chuyển về đầu tài liệu."
  },

  "Ctrl + End": {
    description: "Di chuyển đến cuối tài liệu.",
    steps: [
      "Nhấn giữ Ctrl.",
      "Nhấn End."
    ],
    result: "Con trỏ chuyển đến cuối tài liệu."
  },

  "Ctrl + F": {
    description: "Tìm kiếm nội dung.",
    steps: [
      "Nhấn Ctrl + F.",
      "Nhập từ hoặc cụm từ cần tìm.",
      "Chọn kết quả trong Navigation Pane."
    ],
    result: "Word xác định các vị trí chứa nội dung cần tìm.",
    tip: "Trong Word, Ctrl + F cũng mở Navigation Pane."
  },

  "Ctrl + H": {
    description: "Tìm và thay thế nội dung.",
    steps: [
      "Nhấn Ctrl + H.",
      "Nhập nội dung vào Find what.",
      "Nhập nội dung mới vào Replace with.",
      "Chọn Replace hoặc Replace All."
    ],
    result: "Nội dung cũ được thay thế theo lựa chọn.",
    tip: "Cẩn thận khi dùng Replace All trên tài liệu lớn."
  },

  "Ctrl + Backspace": {
    description: "Xóa một từ phía trước con trỏ.",
    steps: [
      "Đặt con trỏ sau từ cần xóa.",
      "Nhấn Ctrl + Backspace."
    ],
    result: "Một từ phía trước con trỏ bị xóa."
  },

  "Ctrl + Delete": {
    description: "Xóa một từ phía sau con trỏ.",
    steps: [
      "Đặt con trỏ trước từ cần xóa.",
      "Nhấn Ctrl + Delete."
    ],
    result: "Một từ phía sau con trỏ bị xóa."
  },

  "Ctrl + Space": {
    description: "Xóa nhiều định dạng ký tự trực tiếp.",
    steps: [
      "Chọn văn bản.",
      "Nhấn Ctrl + Space."
    ],
    result: "Nhiều định dạng trực tiếp như font, màu hoặc style thủ công được loại bỏ.",
    tip: "Rất hữu ích với nội dung copy từ Internet."
  },

  "Ctrl + 1": {
    description: "Đặt dãn dòng 1.0.",
    steps: [
      "Chọn đoạn văn.",
      "Nhấn Ctrl + 1."
    ],
    result: "Line Spacing được đặt về 1.0."
  },

  "Ctrl + 2": {
    description: "Đặt dãn dòng 2.0.",
    steps: [
      "Chọn đoạn văn.",
      "Nhấn Ctrl + 2."
    ],
    result: "Line Spacing được đặt thành 2.0."
  },

  "Ctrl + 5": {
    description: "Đặt dãn dòng 1.5.",
    steps: [
      "Chọn đoạn văn.",
      "Nhấn Ctrl + 5."
    ],
    result: "Line Spacing được đặt thành 1.5."
  },

  "Ctrl + Enter": {
    description: "Chèn Page Break.",
    steps: [
      "Đặt con trỏ tại vị trí cần sang trang.",
      "Nhấn Ctrl + Enter."
    ],
    result: "Nội dung phía sau được chuyển sang trang mới.",
    tip: "Không nên nhấn Enter nhiều lần để sang trang."
  },

  "Ctrl + Shift + Enter": {
    description: "Chèn Column Break.",
    steps: [
      "Đặt con trỏ tại vị trí cần ngắt cột.",
      "Nhấn Ctrl + Shift + Enter."
    ],
    result: "Nội dung tiếp theo chuyển sang cột mới."
  },

  "Ctrl + G": {
    description: "Mở Go To.",
    steps: [
      "Nhấn Ctrl + G.",
      "Chọn loại vị trí cần đến.",
      "Nhập số trang hoặc thông tin tương ứng."
    ],
    result: "Word chuyển nhanh đến vị trí được chỉ định."
  },

  "Ctrl + K": {
    description: "Chèn Hyperlink.",
    steps: [
      "Chọn văn bản hoặc đối tượng.",
      "Nhấn Ctrl + K.",
      "Nhập địa chỉ liên kết.",
      "Bấm OK."
    ],
    result: "Hyperlink được chèn."
  },

  "Ctrl + M": {
    description: "Tăng thụt lề đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn.",
      "Nhấn Ctrl + M."
    ],
    result: "Đoạn văn được thụt vào thêm."
  },

  "Ctrl + Shift + M": {
    description: "Giảm thụt lề đoạn văn.",
    steps: [
      "Đặt con trỏ trong đoạn.",
      "Nhấn Ctrl + Shift + M."
    ],
    result: "Mức thụt lề đoạn văn giảm."
  },

  "Ctrl + T": {
    description: "Tạo Hanging Indent.",
    steps: [
      "Đặt con trỏ trong đoạn.",
      "Nhấn Ctrl + T."
    ],
    result: "Đoạn văn được áp dụng Hanging Indent."
  },

  "Ctrl + Shift + T": {
    description: "Giảm Hanging Indent.",
    steps: [
      "Đặt con trỏ trong đoạn.",
      "Nhấn Ctrl + Shift + T."
    ],
    result: "Mức Hanging Indent giảm."
  },

  "Ctrl + Q": {
    description: "Xóa định dạng Paragraph trực tiếp.",
    steps: [
      "Đặt con trỏ trong đoạn.",
      "Nhấn Ctrl + Q."
    ],
    result: "Các định dạng Paragraph trực tiếp được loại bỏ."
  },

  "Ctrl + Shift + L": {
    description: "Tạo Bullet List.",
    steps: [
      "Chọn các dòng cần tạo danh sách.",
      "Nhấn Ctrl + Shift + L."
    ],
    result: "Danh sách Bullet được tạo."
  },

  "Ctrl + Shift + 8": {
    description: "Hiện hoặc ẩn Formatting Marks.",
    steps: [
      "Nhấn Ctrl + Shift + 8."
    ],
    result: "Các ký tự định dạng như ¶, Tab, Space, Break được hiện hoặc ẩn.",
    tip: "Đây là phím rất hữu ích khi kiểm tra lỗi bố cục."
  },

  "F4": {
    description: "Lặp lại thao tác gần nhất.",
    steps: [
      "Thực hiện một thao tác định dạng.",
      "Chọn vị trí hoặc nội dung khác.",
      "Nhấn F4."
    ],
    result: "Word lặp lại thao tác trước đó."
  },

  "F7": {
    description: "Kiểm tra chính tả và ngữ pháp.",
    steps: ["Nhấn F7."],
    result: "Word mở công cụ kiểm tra chính tả/ngữ pháp."
  },

  "Ctrl + F2": {
    description: "Mở Print Preview.",
    steps: ["Nhấn Ctrl + F2."],
    result: "Word hiển thị chế độ xem trước khi in."
  },

  "Alt + Ctrl + F": {
    description: "Chèn Footnote.",
    steps: [
      "Đặt con trỏ sau nội dung cần chú thích.",
      "Nhấn Alt + Ctrl + F."
    ],
    result: "Một Footnote mới được tạo ở cuối trang."
  },

  "Alt + Ctrl + D": {
    description: "Chèn Endnote.",
    steps: [
      "Đặt con trỏ sau nội dung cần chú thích.",
      "Nhấn Alt + Ctrl + D."
    ],
    result: "Một Endnote được tạo."
  }
};


function splitShortcutKeys(combo: string): string[] {
  return combo
    .split(" + ")
    .map((key) => key.trim())
    .filter(Boolean);
}


function renderShortcutKeys(combo: string): string {
  const keys = splitShortcutKeys(combo);

  return `
    <div class="gt-key-combination">
      ${keys
        .map(
          (key, index) => `
            ${index > 0 ? `<span class="gt-key-plus">+</span>` : ""}
            <kbd class="gt-key">${key}</kbd>
          `
        )
        .join("")}
    </div>
  `;
}


function createDefaultSteps(combo: string): string[] {
  const keys = splitShortcutKeys(combo);

  if (keys.length === 1) {
    return [`Nhấn phím <strong>${keys[0]}</strong>.`];
  }

  const finalKey = keys[keys.length - 1];
  const holdingKeys = keys.slice(0, -1);

  return [
    `Nhấn giữ ${holdingKeys
      .map((key) => `<strong>${key}</strong>`)
      .join(" + ")}.`,
    `Trong khi vẫn giữ phím trên, nhấn <strong>${finalKey}</strong>.`
  ];
}


function shortcut(
  combo: string,
  title: string,
  extra?: ShortcutDetail
): string {
  const base = SHORTCUT_DETAILS[combo] || {};

  const detail: ShortcutDetail = {
    ...base,
    ...extra
  };

  const steps =
    detail.steps && detail.steps.length > 0
      ? detail.steps
      : createDefaultSteps(combo);

  return `
    <details class="gt-shortcut-card">

      <summary class="gt-shortcut-summary">

        <div class="gt-shortcut-main">

          ${renderShortcutKeys(combo)}

          <div class="gt-shortcut-text">
            <strong class="gt-shortcut-name">${title}</strong>

            ${
              detail.description
                ? `
                  <span class="gt-shortcut-description">
                    ${detail.description}
                  </span>
                `
                : ""
            }
          </div>

        </div>

        <span class="gt-shortcut-chevron">›</span>

      </summary>


      <div class="gt-shortcut-body">

        <div class="gt-shortcut-section">

          <div class="gt-shortcut-section-title">
            CÁCH THAO TÁC
          </div>

          <ol class="gt-shortcut-steps">

            ${steps
              .map(
                (step, index) => `
                  <li>
                    <span class="gt-step-number">
                      ${index + 1}
                    </span>

                    <span class="gt-step-text">
                      ${step}
                    </span>
                  </li>
                `
              )
              .join("")}

          </ol>

        </div>


        ${
          detail.result
            ? `
              <div class="gt-shortcut-result">

                <span class="gt-result-icon">✓</span>

                <div>
                  <strong>Kết quả</strong>
                  <p>${detail.result}</p>
                </div>

              </div>
            `
            : ""
        }


        ${
          detail.tip
            ? `
              <div class="gt-shortcut-tip">

                <span class="gt-tip-icon">💡</span>

                <div>
                  <strong>Mẹo</strong>
                  <p>${detail.tip}</p>
                </div>

              </div>
            `
            : ""
        }

      </div>

    </details>
  `;
}


function shortcutGroup(
  title: string,
  items: string
): string {
  return `
    <section class="gt-shortcut-group">

      <div class="gt-shortcut-group-title">
        ${title}
      </div>

      <div class="gt-shortcut-list">
        ${items}
      </div>

    </section>
  `;
}


// =========================================================
// TYPES
// =========================================================

export type LessonLevel =
  | "CƠ BẢN"
  | "TRUNG CẤP"
  | "NÂNG CAO"
  | "TRA CỨU"
  | "THỰC HÀNH";


export interface LessonSection {
  title: string;
  content: string;
}


export interface Lesson {
  id: string;
  part: number;
  title: string;
  level: LessonLevel;
  description: string;
  keywords: string[];
  sections: LessonSection[];
}


// =========================================================
// LESSONS
// =========================================================

export const lessons: Lesson[] = [

  // =========================================================
  // PHẦN 1
  // =========================================================

  {
    id: "lam-quen-word",
    part: 1,
    title: "Làm quen với Microsoft Word",
    level: "CƠ BẢN",

    description:
      "Giới thiệu Microsoft Word, giao diện và các thao tác tạo, mở, lưu tài liệu.",

    keywords: [
      "word",
      "giao dien",
      "ribbon",
      "save",
      "save as",
      "open",
      "new",
      "ctrl n",
      "ctrl o",
      "ctrl s"
    ],

    sections: [

      {
        title: "1.1. Microsoft Word là gì?",

        content: `
          <p>
            Microsoft Word là phần mềm xử lý văn bản thuộc bộ
            Microsoft Office/Microsoft 365.
          </p>

          <p>Word thường được sử dụng để:</p>

          <ul>
            <li>Soạn văn bản.</li>
            <li>Viết báo cáo.</li>
            <li>Làm bài tập.</li>
            <li>Viết luận văn.</li>
            <li>Viết hợp đồng.</li>
            <li>Tạo công văn và biểu mẫu.</li>
            <li>Tạo thư mời.</li>
            <li>In tài liệu.</li>
          </ul>
        `
      },


      {
        title: "1.2. Giao diện Microsoft Word",

        content: `
          <ul>
            <li><strong>Quick Access Toolbar:</strong> Save, Undo, Redo.</li>
            <li><strong>Title Bar:</strong> Hiển thị tên tài liệu.</li>
            <li><strong>Ribbon:</strong> Chứa các tab và nhóm lệnh.</li>
            <li><strong>Document Area:</strong> Vùng nhập nội dung.</li>
            <li><strong>Status Bar:</strong> Hiển thị trang, số từ, ngôn ngữ...</li>
            <li><strong>Zoom:</strong> Phóng to hoặc thu nhỏ tài liệu.</li>
          </ul>
        `
      },


      {
        title: "1.3. Tạo tài liệu mới",

        content: `
          <p>File → New → Blank Document.</p>

          ${shortcut(
            "Ctrl + N",
            "Tạo tài liệu Word mới"
          )}
        `
      },


      {
        title: "1.4. Mở tài liệu",

        content: `
          ${shortcut(
            "Ctrl + O",
            "Mở tài liệu"
          )}
        `
      },


      {
        title: "1.5. Lưu tài liệu",

        content: `
          ${shortcut(
            "Ctrl + S",
            "Lưu tài liệu"
          )}

          <div class="note">
            Nên thường xuyên sử dụng Ctrl + S trong quá trình làm việc.
          </div>
        `
      },


      {
        title: "1.6. Save và Save As",

        content: `
          <p>
            <strong>Save:</strong>
            Lưu thay đổi vào file hiện tại.
          </p>

          <p>
            <strong>Save As:</strong>
            Tạo bản sao hoặc lưu sang tên, thư mục hoặc định dạng khác.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 2
  // =========================================================

  {
    id: "phim-tat-co-ban",
    part: 2,
    title: "Phím tắt Word cơ bản",
    level: "CƠ BẢN",

    description:
      "Các phím tắt quan trọng giúp thao tác Word nhanh và chính xác hơn.",

    keywords: [
      "phim tat",
      "shortcut",
      "ctrl a",
      "ctrl c",
      "ctrl v",
      "ctrl x",
      "ctrl z",
      "ctrl y",
      "ctrl s",
      "ctrl j"
    ],

    sections: [

      {
        title: "2.1. Copy – Cut – Paste",

        content: shortcutGroup(
          "Sao chép · Cắt · Dán · Hoàn tác",

          `
            ${shortcut("Ctrl + A", "Chọn tất cả")}
            ${shortcut("Ctrl + C", "Sao chép")}
            ${shortcut("Ctrl + X", "Cắt")}
            ${shortcut("Ctrl + V", "Dán")}
            ${shortcut("Ctrl + Z", "Hoàn tác")}
            ${shortcut("Ctrl + Y", "Làm lại")}
          `
        )
      },


      {
        title: "2.7. Quản lý file",

        content: shortcutGroup(
          "Quản lý tài liệu",

          `
            ${shortcut("Ctrl + N", "Tạo tài liệu mới")}
            ${shortcut("Ctrl + O", "Mở tài liệu")}
            ${shortcut("Ctrl + S", "Lưu tài liệu")}
            ${shortcut("Ctrl + P", "In tài liệu")}
            ${shortcut("Ctrl + W", "Đóng tài liệu")}
          `
        )
      },


      {
        title: "2.8. Định dạng chữ",

        content: shortcutGroup(
          "Định dạng văn bản",

          `
            ${shortcut("Ctrl + B", "In đậm")}
            ${shortcut("Ctrl + I", "In nghiêng")}
            ${shortcut("Ctrl + U", "Gạch chân")}
            ${shortcut("Ctrl + D", "Mở Font Dialog")}
            ${shortcut("Ctrl + Shift + >", "Tăng cỡ chữ")}
            ${shortcut("Ctrl + Shift + <", "Giảm cỡ chữ")}
            ${shortcut("Shift + F3", "Đổi HOA/thường")}
          `
        )
      },


      {
        title: "2.9. Căn lề",

        content: shortcutGroup(
          "Căn chỉnh đoạn văn",

          `
            ${shortcut("Ctrl + L", "Căn trái")}
            ${shortcut("Ctrl + E", "Căn giữa")}
            ${shortcut("Ctrl + R", "Căn phải")}
            ${shortcut("Ctrl + J", "Căn đều hai bên")}
          `
        )
      },


      {
        title: "2.10. Di chuyển con trỏ",

        content: shortcutGroup(
          "Điều hướng trong tài liệu",

          `
            ${shortcut("Home", "Đầu dòng")}
            ${shortcut("End", "Cuối dòng")}
            ${shortcut("Ctrl + Home", "Đầu tài liệu")}
            ${shortcut("Ctrl + End", "Cuối tài liệu")}
          `
        )
      }

    ]
  },


  // =========================================================
  // PHẦN 3
  // =========================================================

  {
    id: "soan-thao",
    part: 3,
    title: "Nhập và chỉnh sửa văn bản",
    level: "CƠ BẢN",

    description:
      "Enter, Shift + Enter, xóa văn bản, Find và Replace.",

    keywords: [
      "enter",
      "shift enter",
      "backspace",
      "delete",
      "find",
      "replace",
      "ctrl f",
      "ctrl h"
    ],

    sections: [

      {
        title: "3.1. Enter và Shift + Enter",

        content: `
          <p>
            <strong>Enter:</strong>
            Tạo đoạn văn mới.
          </p>

          <p>
            <strong>Shift + Enter:</strong>
            Xuống dòng trong cùng đoạn.
          </p>

          <div class="warning">
            Không nên nhấn Enter liên tục để tạo khoảng cách.
            Hãy sử dụng Paragraph Spacing.
          </div>
        `
      },


      {
        title: "3.2. Xóa văn bản",

        content: `
          <p>
            Word hỗ trợ nhiều mức xóa khác nhau:
          </p>

          <ul>
            <li>
              <strong>Backspace:</strong>
              Xóa ký tự phía trước.
            </li>

            <li>
              <strong>Delete:</strong>
              Xóa ký tự phía sau.
            </li>
          </ul>

          ${shortcut(
            "Ctrl + Backspace",
            "Xóa một từ phía trước"
          )}

          ${shortcut(
            "Ctrl + Delete",
            "Xóa một từ phía sau"
          )}
        `
      },


      {
        title: "3.3. Find",

        content: `
          ${shortcut(
            "Ctrl + F",
            "Tìm kiếm nội dung"
          )}
        `
      },


      {
        title: "3.4. Replace",

        content: `
          ${shortcut(
            "Ctrl + H",
            "Tìm và thay thế"
          )}

          <p>
            Có thể sử dụng
            <strong>Replace All</strong>
            để thay thế tất cả kết quả.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 4
  // =========================================================

  {
    id: "dinh-dang-chu",
    part: 4,
    title: "Định dạng chữ",
    level: "CƠ BẢN",

    description:
      "Font, Font Size, Bold, Italic, Underline, màu chữ và Clear Formatting.",

    keywords: [
      "font",
      "font size",
      "bold",
      "italic",
      "underline",
      "highlight",
      "change case"
    ],

    sections: [

      {
        title: "4.1. Font",

        content: `
          <p>Các font thường gặp:</p>

          <ul>
            <li>Times New Roman.</li>
            <li>Arial.</li>
            <li>Calibri.</li>
            <li>Aptos.</li>
          </ul>
        `
      },


      {
        title: "4.2. Font Size",

        content: `
          <table>
            <tr>
              <th>Nội dung</th>
              <th>Cỡ tham khảo</th>
            </tr>

            <tr>
              <td>Nội dung</td>
              <td>12–14</td>
            </tr>

            <tr>
              <td>Tiêu đề nhỏ</td>
              <td>14–16</td>
            </tr>

            <tr>
              <td>Tiêu đề lớn</td>
              <td>18–24</td>
            </tr>
          </table>
        `
      },


      {
        title: "4.3. Bold – Italic – Underline",

        content: shortcutGroup(
          "Định dạng nhanh",

          `
            ${shortcut("Ctrl + B", "In đậm")}
            ${shortcut("Ctrl + I", "In nghiêng")}
            ${shortcut("Ctrl + U", "Gạch chân")}
          `
        )
      },


      {
        title: "4.6. Change Case",

        content: `
          ${shortcut(
            "Shift + F3",
            "Đổi HOA / thường"
          )}
        `
      },


      {
        title: "4.7. Clear Formatting",

        content: `
          ${shortcut(
            "Ctrl + Space",
            "Xóa định dạng ký tự"
          )}
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 5
  // =========================================================

  {
    id: "dinh-dang-doan",
    part: 5,
    title: "Định dạng đoạn văn",
    level: "CƠ BẢN",

    description:
      "Alignment, Line Spacing, Paragraph Spacing và Indent.",

    keywords: [
      "paragraph",
      "alignment",
      "line spacing",
      "indent",
      "ctrl 1",
      "ctrl 2",
      "ctrl 5"
    ],

    sections: [

      {
        title: "5.1. Alignment",

        content: shortcutGroup(
          "Căn chỉnh",

          `
            ${shortcut("Ctrl + L", "Căn trái")}
            ${shortcut("Ctrl + E", "Căn giữa")}
            ${shortcut("Ctrl + R", "Căn phải")}
            ${shortcut("Ctrl + J", "Căn đều")}
          `
        )
      },


      {
        title: "5.2. Line Spacing",

        content: shortcutGroup(
          "Dãn dòng",

          `
            ${shortcut("Ctrl + 1", "Dãn dòng 1.0")}
            ${shortcut("Ctrl + 2", "Dãn dòng 2.0")}
            ${shortcut("Ctrl + 5", "Dãn dòng 1.5")}
          `
        )
      },


      {
        title: "5.3. Paragraph Spacing",

        content: `
          <p>
            Khoảng cách giữa các đoạn gồm
            <strong>Before</strong>
            và
            <strong>After</strong>.
          </p>
        `
      },


      {
        title: "5.4. Indent",

        content: `
          <ul>
            <li>Left Indent.</li>
            <li>Right Indent.</li>
            <li>First Line Indent.</li>
            <li>Hanging Indent.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 6
  // =========================================================

  {
    id: "bullets-numbering",
    part: 6,
    title: "Bullets và Numbering",
    level: "CƠ BẢN",

    description:
      "Danh sách dấu đầu dòng, đánh số và Multilevel List.",

    keywords: [
      "bullet",
      "numbering",
      "multilevel list",
      "danh sach"
    ],

    sections: [

      {
        title: "6.1. Bullets",

        content: `
          <p>
            Bullets dùng cho danh sách không cần thứ tự.
          </p>
        `
      },


      {
        title: "6.2. Numbering",

        content: `
          <p>
            Numbering dùng khi thứ tự các bước có ý nghĩa.
          </p>
        `
      },


      {
        title: "6.3. Multilevel List",

        content: `
          <p>
            Dùng để tạo cấu trúc:
            <strong>1 → 1.1 → 1.1.1...</strong>
          </p>

          <div class="note">
            Rất hữu ích cho báo cáo, luận văn và giáo trình.
          </div>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 7
  // =========================================================

  {
    id: "tab-ruler",
    part: 7,
    title: "Tab và Ruler",
    level: "CƠ BẢN",

    description:
      "Sử dụng Tab và Ruler thay cho việc nhấn Space nhiều lần.",

    keywords: [
      "tab",
      "ruler",
      "space",
      "left tab",
      "center tab",
      "decimal tab"
    ],

    sections: [

      {
        title: "7.1. Không sử dụng Space để căn chỉnh",

        content: `
          <div class="warning">
            Không nên nhấn Space nhiều lần để căn nội dung.
          </div>

          <p>
            Nên dùng Tab, Table, Paragraph hoặc Alignment.
          </p>
        `
      },


      {
        title: "7.2. Các loại Tab",

        content: `
          <ul>
            <li>Left Tab.</li>
            <li>Center Tab.</li>
            <li>Right Tab.</li>
            <li>Decimal Tab.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 8
  // =========================================================

  {
    id: "page-setup",
    part: 8,
    title: "Page Setup",
    level: "TRUNG CẤP",

    description:
      "Margins, Orientation, Size, Page Break và Section Break.",

    keywords: [
      "page setup",
      "margin",
      "orientation",
      "portrait",
      "landscape",
      "page break",
      "section break"
    ],

    sections: [

      {
        title: "8.1. Margins",

        content: `
          <p>
            Layout → Margins.
          </p>

          <p>
            Bao gồm Top, Bottom, Left và Right.
          </p>
        `
      },


      {
        title: "8.2. Orientation",

        content: `
          <ul>
            <li>
              <strong>Portrait:</strong>
              Trang dọc.
            </li>

            <li>
              <strong>Landscape:</strong>
              Trang ngang.
            </li>
          </ul>
        `
      },


      {
        title: "8.3. Size",

        content: `
          <p>
            Khổ giấy thông dụng nhất là A4.
          </p>
        `
      },


      {
        title: "8.4. Page Break",

        content: `
          ${shortcut(
            "Ctrl + Enter",
            "Chèn Page Break"
          )}
        `
      },


      {
        title: "8.5. Section Break",

        content: `
          <p>
            Section Break chia tài liệu thành nhiều khu vực độc lập.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 9
  // =========================================================

  {
    id: "bang",
    part: 9,
    title: "Làm việc với bảng",
    level: "TRUNG CẤP",

    description:
      "Tạo và chỉnh sửa Table, Merge Cells, Split Cells và AutoFit.",

    keywords: [
      "table",
      "bang",
      "merge cells",
      "split cells",
      "autofit"
    ],

    sections: [

      {
        title: "9.1. Tạo bảng",

        content: `
          <p>
            Insert → Table.
          </p>
        `
      },


      {
        title: "9.2. Các thao tác quan trọng",

        content: `
          <ul>
            <li>Insert Row.</li>
            <li>Insert Column.</li>
            <li>Delete Row.</li>
            <li>Delete Column.</li>
            <li>Merge Cells.</li>
            <li>Split Cells.</li>
            <li>AutoFit.</li>
            <li>Distribute Rows.</li>
            <li>Distribute Columns.</li>
          </ul>
        `
      },


      {
        title: "9.5. AutoFit",

        content: `
          <ul>
            <li>AutoFit Contents.</li>
            <li>AutoFit Window.</li>
            <li>Fixed Column Width.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 10
  // =========================================================

  {
    id: "hinh-anh",
    part: 10,
    title: "Chèn hình ảnh",
    level: "TRUNG CẤP",

    description:
      "Insert Pictures, Resize, Wrap Text, Crop và Screenshot.",

    keywords: [
      "picture",
      "image",
      "hinh anh",
      "wrap text",
      "crop",
      "screenshot"
    ],

    sections: [

      {
        title: "10.1. Insert Pictures",

        content: `
          <p>
            Insert → Pictures.
          </p>
        `
      },


      {
        title: "10.2. Resize",

        content: `
          <p>
            Nên kéo từ các điểm ở góc ảnh để tránh làm ảnh bị méo.
          </p>
        `
      },


      {
        title: "10.3. Wrap Text",

        content: `
          <ul>
            <li>In Line with Text.</li>
            <li>Square.</li>
            <li>Tight.</li>
            <li>Behind Text.</li>
            <li>In Front of Text.</li>
          </ul>

          <div class="note">
            In Line with Text thường ổn định khi làm báo cáo.
          </div>
        `
      },


      {
        title: "10.4. Crop",

        content: `
          <p>
            Crop dùng để cắt phần thừa của ảnh.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 11
  // =========================================================

  {
    id: "shapes-smartart",
    part: 11,
    title: "Shapes, Icon, SmartArt và Text Box",
    level: "TRUNG CẤP",

    description:
      "Sử dụng các đối tượng đồ họa để tạo sơ đồ và hộp nội dung.",

    keywords: [
      "shapes",
      "icon",
      "smartart",
      "text box",
      "flowchart"
    ],

    sections: [

      {
        title: "11.1. Shapes",

        content: `
          <p>
            Có thể sử dụng Rectangle, Circle, Arrow, Line và Flowchart.
          </p>
        `
      },


      {
        title: "11.2. Text Box",

        content: `
          <p>
            Text Box là hộp văn bản có thể di chuyển tự do.
          </p>
        `
      },


      {
        title: "11.3. SmartArt",

        content: `
          <p>
            SmartArt giúp tạo sơ đồ và quy trình nhanh chóng.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 12
  // =========================================================

  {
    id: "header-footer",
    part: 12,
    title: "Header, Footer và Page Number",
    level: "TRUNG CẤP",

    description:
      "Tạo Header, Footer, số trang và Different First Page.",

    keywords: [
      "header",
      "footer",
      "page number",
      "different first page"
    ],

    sections: [

      {
        title: "12.1. Header",

        content: `
          <p>
            Nội dung xuất hiện ở đầu trang.
          </p>
        `
      },


      {
        title: "12.2. Footer",

        content: `
          <p>
            Nội dung xuất hiện ở cuối trang.
          </p>
        `
      },


      {
        title: "12.3. Page Number",

        content: `
          <p>
            Insert → Page Number.
          </p>
        `
      },


      {
        title: "12.4. Different First Page",

        content: `
          <p>
            Dùng khi không muốn trang đầu hiển thị Header/Footer.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 13
  // =========================================================

  {
    id: "styles",
    part: 13,
    title: "Styles",
    level: "NÂNG CAO",

    description:
      "Sử dụng Styles và Heading để quản lý tài liệu chuyên nghiệp.",

    keywords: [
      "style",
      "heading",
      "heading 1",
      "heading 2",
      "navigation"
    ],

    sections: [

      {
        title: "13.1. Style là gì?",

        content: `
          <p>
            Style là tập hợp các định dạng có sẵn:
            Normal, Title, Heading 1, Heading 2, Heading 3...
          </p>
        `
      },


      {
        title: "13.2. Vì sao phải dùng Heading?",

        content: `
          <p>
            Heading giúp Word hiểu cấu trúc tài liệu.
          </p>

          <ul>
            <li>Navigation Pane.</li>
            <li>Table of Contents.</li>
            <li>Cross-reference.</li>
            <li>Quản lý tài liệu dài.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 14
  // =========================================================

  {
    id: "muc-luc",
    part: 14,
    title: "Mục lục tự động",
    level: "NÂNG CAO",

    description:
      "Tạo và cập nhật Table of Contents dựa trên Heading.",

    keywords: [
      "muc luc",
      "table of contents",
      "heading",
      "update table"
    ],

    sections: [

      {
        title: "14.1. Điều kiện",

        content: `
          <p>
            Tiêu đề cần sử dụng Heading 1, Heading 2, Heading 3...
          </p>
        `
      },


      {
        title: "14.2. Chèn mục lục",

        content: `
          <p>
            References → Table of Contents.
          </p>
        `
      },


      {
        title: "14.3. Cập nhật mục lục",

        content: `
          <ul>
            <li>Update page numbers only.</li>
            <li>Update entire table.</li>
          </ul>

          <div class="note">
            Thông thường nên chọn Update entire table.
          </div>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 15
  // =========================================================

  {
    id: "caption",
    part: 15,
    title: "Caption",
    level: "NÂNG CAO",

    description:
      "Đánh số tự động cho hình ảnh và bảng.",

    keywords: [
      "caption",
      "insert caption",
      "hinh 1",
      "bang 1"
    ],

    sections: [

      {
        title: "Caption là gì?",

        content: `
          <p>
            Caption dùng để đánh số hình ảnh và bảng.
          </p>

          <p>
            References → Insert Caption.
          </p>
        `
      },


      {
        title: "Tại sao không nên tự gõ số hình?",

        content: `
          <p>
            Nếu chèn thêm hình ở giữa,
            Caption có thể giúp Word quản lý lại số thứ tự.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 16
  // =========================================================

  {
    id: "cross-reference",
    part: 16,
    title: "Cross-reference",
    level: "NÂNG CAO",

    description:
      "Tạo tham chiếu tự động đến Heading, hình, bảng hoặc Bookmark.",

    keywords: [
      "cross reference",
      "tham chieu",
      "bookmark"
    ],

    sections: [

      {
        title: "Cross-reference",

        content: `
          <p>
            Có thể tham chiếu đến Heading, Hình, Bảng và Bookmark.
          </p>

          <div class="note">
            Hữu ích cho luận văn, giáo trình và báo cáo kỹ thuật.
          </div>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 17
  // =========================================================

  {
    id: "footnote-endnote",
    part: 17,
    title: "Footnote và Endnote",
    level: "NÂNG CAO",

    description:
      "Tạo chú thích cuối trang hoặc cuối tài liệu.",

    keywords: [
      "footnote",
      "endnote",
      "chu thich"
    ],

    sections: [

      {
        title: "17.1. Footnote",

        content: `
          <p>
            Footnote là ghi chú nằm ở cuối trang.
          </p>
        `
      },


      {
        title: "17.2. Endnote",

        content: `
          <p>
            Endnote tập trung ghi chú ở cuối tài liệu hoặc cuối phần.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 18
  // =========================================================

  {
    id: "find-replace-nang-cao",
    part: 18,
    title: "Find & Replace nâng cao",
    level: "NÂNG CAO",

    description:
      "Tìm và thay thế theo định dạng Font, Bold, Paragraph và ký tự đặc biệt.",

    keywords: [
      "find replace",
      "ctrl h",
      "format",
      "replace all"
    ],

    sections: [

      {
        title: "Find & Replace nâng cao",

        content: `
          ${shortcut(
            "Ctrl + H",
            "Mở Find & Replace"
          )}

          <p>
            Chọn
            <strong>More → Format</strong>
            để tìm theo Font, Bold, Paragraph hoặc các thuộc tính khác.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 19
  // =========================================================

  {
    id: "phim-tat-nang-cao",
    part: 19,
    title: "Các phím tắt Word nâng cao",
    level: "NÂNG CAO",

    description:
      "Bộ phím tắt nâng cao dùng khi làm tài liệu chuyên nghiệp.",

    keywords: [
      "ctrl enter",
      "ctrl g",
      "ctrl k",
      "ctrl m",
      "ctrl t",
      "f4",
      "f7"
    ],

    sections: [

      {
        title: "Phím tắt nâng cao",

        content: shortcutGroup(
          "Bộ phím chuyên nghiệp",

          `
            ${shortcut("Ctrl + Enter", "Page Break")}
            ${shortcut("Ctrl + Shift + Enter", "Column Break")}
            ${shortcut("Ctrl + F", "Find")}
            ${shortcut("Ctrl + H", "Replace")}
            ${shortcut("Ctrl + G", "Go To")}
            ${shortcut("Ctrl + K", "Hyperlink")}
            ${shortcut("Ctrl + D", "Font Dialog")}
            ${shortcut("Ctrl + M", "Tăng Indent")}
            ${shortcut("Ctrl + Shift + M", "Giảm Indent")}
            ${shortcut("Ctrl + T", "Hanging Indent")}
            ${shortcut("Ctrl + Shift + T", "Giảm Hanging Indent")}
            ${shortcut("Ctrl + Shift + L", "Bullet List")}
            ${shortcut("Ctrl + 1", "Line Spacing 1")}
            ${shortcut("Ctrl + 2", "Line Spacing 2")}
            ${shortcut("Ctrl + 5", "Line Spacing 1.5")}
            ${shortcut("Ctrl + Space", "Xóa định dạng ký tự")}
            ${shortcut("Ctrl + Q", "Xóa định dạng Paragraph")}
            ${shortcut("Shift + F3", "Change Case")}
            ${shortcut("F4", "Lặp thao tác gần nhất")}
            ${shortcut("F7", "Kiểm tra chính tả")}
            ${shortcut("Ctrl + F2", "Print Preview")}
            ${shortcut("Ctrl + P", "Print")}
            ${shortcut("Alt + Ctrl + F", "Footnote")}
            ${shortcut("Alt + Ctrl + D", "Endnote")}
          `
        )
      }

    ]
  },


  // =========================================================
  // PHẦN 20
  // =========================================================

  {
    id: "review",
    part: 20,
    title: "Review",
    level: "NÂNG CAO",

    description:
      "Comments, Track Changes, Accept và Reject.",

    keywords: [
      "review",
      "comment",
      "track changes",
      "accept",
      "reject"
    ],

    sections: [

      {
        title: "20.1. Comments",

        content: `
          <p>
            Review → New Comment.
          </p>
        `
      },


      {
        title: "20.2. Track Changes",

        content: `
          <p>
            Theo dõi các chỉnh sửa được thực hiện trên tài liệu.
          </p>
        `
      },


      {
        title: "20.3. Accept / Reject",

        content: `
          <p>
            Chấp nhận hoặc từ chối các thay đổi được ghi nhận.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 21
  // =========================================================

  {
    id: "protect-document",
    part: 21,
    title: "Protect Document",
    level: "NÂNG CAO",

    description:
      "Hạn chế chỉnh sửa và bảo vệ nội dung tài liệu.",

    keywords: [
      "protect",
      "restrict editing",
      "bao ve"
    ],

    sections: [

      {
        title: "Protect Document",

        content: `
          <p>
            Review → Restrict Editing.
          </p>

          <ul>
            <li>Chỉ cho đọc.</li>
            <li>Chỉ cho điền Form.</li>
            <li>Chỉ cho sửa một số khu vực.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 22
  // =========================================================

  {
    id: "mail-merge",
    part: 22,
    title: "Mail Merge",
    level: "NÂNG CAO",

    description:
      "Tạo hàng loạt thư mời, giấy chứng nhận, phiếu báo và tài liệu.",

    keywords: [
      "mail merge",
      "tron thu",
      "excel",
      "merge field"
    ],

    sections: [

      {
        title: "Mail Merge là gì?",

        content: `
          <p>
            Mail Merge dùng để tạo hàng loạt tài liệu
            từ một mẫu và nguồn dữ liệu.
          </p>
        `
      },


      {
        title: "Quy trình",

        content: `
          <ol>
            <li>Chuẩn bị dữ liệu Excel.</li>
            <li>Mailings.</li>
            <li>Start Mail Merge.</li>
            <li>Select Recipients.</li>
            <li>Insert Merge Field.</li>
            <li>Finish & Merge.</li>
          </ol>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 23
  // =========================================================

  {
    id: "navigation-pane",
    part: 23,
    title: "Navigation Pane",
    level: "NÂNG CAO",

    description:
      "Điều hướng nhanh trong tài liệu dài bằng Heading.",

    keywords: [
      "navigation pane",
      "ctrl f",
      "heading",
      "dieu huong"
    ],

    sections: [

      {
        title: "Navigation Pane",

        content: `
          ${shortcut(
            "Ctrl + F",
            "Mở Navigation Pane"
          )}

          <p>
            Nếu tài liệu sử dụng Heading đúng cách,
            Navigation Pane sẽ hiển thị cấu trúc chương và mục.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 24
  // =========================================================

  {
    id: "section-nang-cao",
    part: 24,
    title: "Section nâng cao",
    level: "NÂNG CAO",

    description:
      "Chia tài liệu thành nhiều Section có bố cục độc lập.",

    keywords: [
      "section",
      "section break",
      "link to previous",
      "header footer"
    ],

    sections: [

      {
        title: "Section nâng cao",

        content: `
          <p>Mỗi Section có thể có:</p>

          <ul>
            <li>Header khác.</li>
            <li>Footer khác.</li>
            <li>Số trang khác.</li>
            <li>Orientation khác.</li>
            <li>Margins khác.</li>
          </ul>
        `
      },


      {
        title: "24.1. Link to Previous",

        content: `
          <div class="warning">
            Nếu muốn Header/Footer của Section mới độc lập,
            cần tắt Link to Previous.
          </div>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 25
  // =========================================================

  {
    id: "danh-so-trang",
    part: 25,
    title: "Đánh số trang chuyên nghiệp",
    level: "NÂNG CAO",

    description:
      "Đánh số trang khác nhau cho bìa, phần đầu và nội dung chính.",

    keywords: [
      "page number",
      "danh so trang",
      "roman",
      "section break",
      "link to previous"
    ],

    sections: [

      {
        title: "Đánh số trang chuyên nghiệp",

        content: `
          <p>Ví dụ:</p>

          <ul>
            <li>Trang bìa: Không đánh số.</li>
            <li>Phần đầu: i, ii, iii...</li>
            <li>Nội dung chính: 1, 2, 3...</li>
          </ul>

          <p>Cần kết hợp:</p>

          <ul>
            <li>Section Break.</li>
            <li>Page Number.</li>
            <li>Format Page Numbers.</li>
            <li>Link to Previous.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 26
  // =========================================================

  {
    id: "phim-alt",
    part: 26,
    title: "Phím Alt trong Word",
    level: "TRA CỨU",

    description:
      "Điều khiển Ribbon bằng bàn phím thông qua KeyTips.",

    keywords: [
      "alt",
      "keytips",
      "keyboard",
      "ribbon"
    ],

    sections: [

      {
        title: "Phím Alt",

        content: `
          <p>
            Nhấn Alt để Word hiển thị
            các ký tự tương ứng với từng tab.
          </p>

          <table>

            <tr>
              <th>Phím</th>
              <th>Tab</th>
            </tr>

            <tr>
              <td>H</td>
              <td>Home</td>
            </tr>

            <tr>
              <td>N</td>
              <td>Insert</td>
            </tr>

            <tr>
              <td>P</td>
              <td>Layout</td>
            </tr>

            <tr>
              <td>S</td>
              <td>References</td>
            </tr>

            <tr>
              <td>R</td>
              <td>Review</td>
            </tr>

            <tr>
              <td>W</td>
              <td>View</td>
            </tr>

          </table>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 27
  // =========================================================

  {
    id: "show-hide",
    part: 27,
    title: "Show/Hide Formatting Marks",
    level: "TRA CỨU",

    description:
      "Hiển thị các ký tự định dạng ẩn để kiểm tra bố cục.",

    keywords: [
      "show hide",
      "ctrl shift 8",
      "paragraph mark",
      "ky tu an"
    ],

    sections: [

      {
        title: "Show/Hide",

        content: `
          ${shortcut(
            "Ctrl + Shift + 8",
            "Hiện / ẩn ký tự định dạng"
          )}

          <p>Có thể thấy:</p>

          <ul>
            <li>Enter.</li>
            <li>Space.</li>
            <li>Tab.</li>
            <li>Page Break.</li>
            <li>Section Break.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 28
  // =========================================================

  {
    id: "loi-thuong-gap",
    part: 28,
    title: "Các lỗi Word thường gặp",
    level: "TRA CỨU",

    description:
      "Tra cứu nhanh các lỗi bố cục và định dạng thường gặp.",

    keywords: [
      "loi word",
      "nhay trang",
      "hinh anh",
      "sai font",
      "muc luc",
      "page number"
    ],

    sections: [

      {
        title: "28.1. Văn bản bị nhảy trang",

        content: `
          <p>
            Kiểm tra Page Break, Section Break, Paragraph,
            Keep with next và Page break before.
          </p>
        `
      },


      {
        title: "28.2. Hình ảnh chạy lung tung",

        content: `
          <p>
            Kiểm tra Wrap Text.
          </p>

          <div class="note">
            Nếu cần ổn định,
            có thể sử dụng In Line with Text.
          </div>
        `
      },


      {
        title: "28.3. Khoảng cách chữ không đều",

        content: `
          <p>
            Kiểm tra Font, Alignment, Justify,
            Character Spacing, Tab và Space dư.
          </p>
        `
      },


      {
        title: "28.4. Copy từ Internet bị sai font",

        content: `
          <p>
            Có thể dùng Paste as Text,
            Clear Formatting hoặc Ctrl + Space.
          </p>

          ${shortcut(
            "Ctrl + Space",
            "Xóa định dạng ký tự"
          )}
        `
      },


      {
        title: "28.5. Mục lục không cập nhật",

        content: `
          <p>
            Update Table → Update entire table.
          </p>
        `
      },


      {
        title: "28.6. Số trang bị sai",

        content: `
          <p>
            Kiểm tra Section Break,
            Link to Previous và Format Page Numbers.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 29
  // =========================================================

  {
    id: "phuc-hoi-file",
    part: 29,
    title: "Phục hồi file Word",
    level: "TRA CỨU",

    description:
      "Phục hồi tài liệu chưa lưu hoặc bị đóng đột ngột.",

    keywords: [
      "recover",
      "unsaved",
      "document recovery",
      "phuc hoi"
    ],

    sections: [

      {
        title: "Phục hồi tài liệu",

        content: `
          <p>
            Khi Word bị tắt đột ngột,
            kiểm tra Document Recovery.
          </p>

          <p>
            File → Info → Manage Document
            → Recover Unsaved Documents.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 30
  // =========================================================

  {
    id: "nguyen-tac-word",
    part: 30,
    title: "Nguyên tắc soạn Word chuyên nghiệp",
    level: "TRA CỨU",

    description:
      "Các nguyên tắc giúp tài liệu ổn định và dễ quản lý.",

    keywords: [
      "nguyen tac",
      "word chuyen nghiep",
      "space",
      "enter",
      "heading",
      "caption"
    ],

    sections: [

      {
        title: "7 nguyên tắc",

        content: `
          <ol>
            <li>
              Không dùng Space nhiều lần để căn chỉnh.
            </li>

            <li>
              Không dùng Enter nhiều lần để sang trang.
            </li>

            <li>
              Không tự đánh số tiêu đề bằng tay
              trong tài liệu lớn.
            </li>

            <li>
              Không tự gõ số hình.
            </li>

            <li>
              Không tự gõ mục lục.
            </li>

            <li>
              Không định dạng từng tiêu đề bằng tay.
            </li>

            <li>
              Tài liệu dài nên dùng Heading,
              Caption, Cross-reference và Section.
            </li>
          </ol>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 31
  // =========================================================

  {
    id: "quy-trinh-bao-cao",
    part: 31,
    title: "Quy trình làm báo cáo Word chuyên nghiệp",
    level: "TRA CỨU",

    description:
      "Quy trình 10 bước xây dựng một báo cáo Word.",

    keywords: [
      "bao cao",
      "report",
      "a4",
      "heading",
      "pdf"
    ],

    sections: [

      {
        title: "Quy trình 10 bước",

        content: `
          <ol>
            <li>Thiết lập trang.</li>
            <li>Chọn font chung.</li>
            <li>Thiết lập Normal Style.</li>
            <li>Thiết lập Heading.</li>
            <li>Nhập nội dung.</li>
            <li>Chèn hình và bảng.</li>
            <li>Tạo mục lục.</li>
            <li>Đánh số trang.</li>
            <li>Kiểm tra bằng Show/Hide.</li>
            <li>Xuất PDF.</li>
          </ol>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 32
  // =========================================================

  {
    id: "thuc-hanh-co-ban",
    part: 32,
    title: "Bài thực hành tổng hợp cơ bản",
    level: "THỰC HÀNH",

    description:
      "Bài thực hành tổng hợp các kỹ năng Word cơ bản.",

    keywords: [
      "thuc hanh",
      "co ban",
      "bai tap"
    ],

    sections: [

      {
        title: "Yêu cầu",

        content: `
          <ol>
            <li>
              Tạo tài liệu Báo cáo thực hành Microsoft Word.
            </li>

            <li>
              Viết phần giới thiệu.
            </li>

            <li>
              Tạo danh sách Bullet.
            </li>

            <li>
              Tạo Numbering.
            </li>

            <li>
              Tạo bảng 5 sinh viên.
            </li>

            <li>
              Chèn hình ảnh.
            </li>

            <li>
              Font Times New Roman, cỡ 13.
            </li>

            <li>
              Line spacing 1.5.
            </li>

            <li>
              Đánh số trang.
            </li>
          </ol>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 33
  // =========================================================

  {
    id: "thuc-hanh-trung-cap",
    part: 33,
    title: "Bài thực hành trung cấp",
    level: "THỰC HÀNH",

    description:
      "Tạo tài liệu khoảng 8–10 trang với Heading và mục lục.",

    keywords: [
      "thuc hanh trung cap",
      "heading",
      "table of contents"
    ],

    sections: [

      {
        title: "Yêu cầu",

        content: `
          <p>
            Tạo tài liệu khoảng 8–10 trang gồm:
          </p>

          <ul>
            <li>Trang bìa.</li>
            <li>Mục lục.</li>
            <li>Chương 1.</li>
            <li>Chương 2.</li>
            <li>Kết luận.</li>
            <li>Tài liệu tham khảo.</li>
          </ul>

          <p>
            Sử dụng Heading,
            Multilevel List,
            Caption và Page Number.
          </p>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 34
  // =========================================================

  {
    id: "thuc-hanh-nang-cao",
    part: 34,
    title: "Bài thực hành nâng cao",
    level: "THỰC HÀNH",

    description:
      "Tạo báo cáo 15–20 trang có Section, Caption và Cross-reference.",

    keywords: [
      "thuc hanh nang cao",
      "section",
      "caption",
      "cross reference"
    ],

    sections: [

      {
        title: "Yêu cầu",

        content: `
          <ul>
            <li>Trang bìa không đánh số.</li>
            <li>Phần đầu đánh số i, ii, iii.</li>
            <li>Nội dung chính đánh số 1, 2, 3...</li>
            <li>Ít nhất 3 chương.</li>
            <li>6 hình.</li>
            <li>3 bảng.</li>
            <li>Mục lục tự động.</li>
            <li>Danh mục hình và bảng.</li>
            <li>Footnote.</li>
            <li>Cross-reference.</li>
            <li>Một trang Landscape.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 35
  // =========================================================

  {
    id: "thuc-hanh-mail-merge",
    part: 35,
    title: "Bài thực hành Mail Merge",
    level: "THỰC HÀNH",

    description:
      "Tạo 10 giấy chứng nhận tự động bằng Word và Excel.",

    keywords: [
      "thuc hanh mail merge",
      "excel",
      "giay chung nhan"
    ],

    sections: [

      {
        title: "Yêu cầu",

        content: `
          <ol>
            <li>
              Tạo Excel có HoTen, NgaySinh, Lop, Diem.
            </li>

            <li>
              Nhập 10 người.
            </li>

            <li>
              Tạo mẫu Giấy chứng nhận trong Word.
            </li>

            <li>
              Chèn các Merge Field.
            </li>

            <li>
              Finish & Merge để tạo 10 chứng nhận.
            </li>
          </ol>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 36
  // =========================================================

  {
    id: "bang-phim-tat",
    part: 36,
    title: "Bảng phím tắt cần thuộc",
    level: "THỰC HÀNH",

    description:
      "Tổng hợp các phím tắt Word từ cơ bản đến chuyên nghiệp.",

    keywords: [
      "bang phim tat",
      "ctrl a",
      "ctrl c",
      "ctrl j",
      "f7"
    ],

    sections: [

      {
        title: "Mức 1 — Bắt buộc",

        content: shortcutGroup(
          "Phím tắt bắt buộc",

          `
            ${shortcut("Ctrl + A", "Chọn tất cả")}
            ${shortcut("Ctrl + C", "Copy")}
            ${shortcut("Ctrl + X", "Cut")}
            ${shortcut("Ctrl + V", "Paste")}
            ${shortcut("Ctrl + Z", "Undo")}
            ${shortcut("Ctrl + S", "Save")}
            ${shortcut("Ctrl + F", "Find")}
            ${shortcut("Ctrl + H", "Replace")}
          `
        )
      },


      {
        title: "Mức 2 — Soạn thảo",

        content: shortcutGroup(
          "Phím tắt soạn thảo",

          `
            ${shortcut("Ctrl + B", "Bold")}
            ${shortcut("Ctrl + I", "Italic")}
            ${shortcut("Ctrl + U", "Underline")}
            ${shortcut("Ctrl + J", "Justify")}
          `
        )
      },


      {
        title: "Mức 4 — Chuyên nghiệp",

        content: shortcutGroup(
          "Phím tắt chuyên nghiệp",

          `
            ${shortcut("Ctrl + Enter", "Page Break")}
            ${shortcut("Ctrl + Shift + 8", "Hiện ký tự ẩn")}
            ${shortcut("Shift + F3", "Change Case")}
            ${shortcut("F4", "Lặp thao tác")}
            ${shortcut("F7", "Kiểm tra chính tả")}
          `
        )
      }

    ]
  },


  // =========================================================
  // PHẦN 37
  // =========================================================

  {
    id: "bai-kiem-tra",
    part: 37,
    title: "Bài kiểm tra kỹ năng",
    level: "THỰC HÀNH",

    description:
      "Đánh giá trình độ Word cơ bản, trung cấp, nâng cao và chuyên nghiệp.",

    keywords: [
      "kiem tra",
      "test",
      "danh gia",
      "level"
    ],

    sections: [

      {
        title: "Word cơ bản",

        content: `
          <ul>
            <li>Tạo và lưu file.</li>
            <li>Copy/Cut/Paste.</li>
            <li>Định dạng chữ và đoạn.</li>
            <li>Tạo danh sách.</li>
            <li>Tạo bảng và chèn hình.</li>
          </ul>
        `
      },


      {
        title: "Word trung cấp",

        content: `
          <ul>
            <li>Tab và Page Setup.</li>
            <li>Header/Footer.</li>
            <li>Page Number.</li>
            <li>Styles và Heading.</li>
            <li>Table of Contents.</li>
          </ul>
        `
      },


      {
        title: "Word nâng cao",

        content: `
          <ul>
            <li>Section.</li>
            <li>Caption.</li>
            <li>Cross-reference.</li>
            <li>Footnote.</li>
            <li>Mail Merge.</li>
            <li>Track Changes.</li>
          </ul>
        `
      }

    ]
  },


  // =========================================================
  // PHẦN 38
  // =========================================================

  {
    id: "checklist",
    part: 38,
    title: "Checklist Word chuyên nghiệp",
    level: "THỰC HÀNH",

    description:
      "Danh sách kiểm tra tài liệu trước khi gửi, in hoặc xuất PDF.",

    keywords: [
      "checklist",
      "kiem tra",
      "font",
      "heading",
      "pdf",
      "page number"
    ],

    sections: [

      {
        title: "Nội dung",

        content: `
          <ul>
            <li>Không sai chính tả.</li>
            <li>Không thiếu nội dung.</li>
            <li>Tiêu đề thống nhất.</li>
          </ul>
        `
      },


      {
        title: "Font và Paragraph",

        content: `
          <ul>
            <li>Font thống nhất.</li>
            <li>Font Size thống nhất.</li>
            <li>Căn lề đúng.</li>
            <li>Line Spacing đúng.</li>
            <li>Paragraph Spacing đúng.</li>
          </ul>
        `
      },


      {
        title: "Trang",

        content: `
          <ul>
            <li>Khổ A4 đúng.</li>
            <li>Margins đúng.</li>
            <li>Orientation đúng.</li>
          </ul>
        `
      },


      {
        title: "Hình và bảng",

        content: `
          <ul>
            <li>Hình rõ nét.</li>
            <li>Hình căn đúng.</li>
            <li>Có Caption nếu cần.</li>
            <li>Bảng không vượt khỏi trang.</li>
          </ul>
        `
      },


      {
        title: "Kiểm tra cuối",

        content: `
          ${shortcut(
            "Ctrl + Shift + 8",
            "Kiểm tra ký tự định dạng ẩn"
          )}

          ${shortcut(
            "Ctrl + S",
            "Lưu tài liệu"
          )}

          <p>
            Sau khi kiểm tra hoàn tất
            có thể xuất PDF.
          </p>
        `
      }

    ]
  }

];
