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

          <div class="shortcut">
            <kbd>Ctrl + N</kbd>
            <span>Tạo tài liệu Word mới.</span>
          </div>
        `
      },

      {
        title: "1.4. Mở tài liệu",
        content: `
          <div class="shortcut">
            <kbd>Ctrl + O</kbd>
            <span>Mở tài liệu.</span>
          </div>
        `
      },

      {
        title: "1.5. Lưu tài liệu",
        content: `
          <div class="shortcut">
            <kbd>Ctrl + S</kbd>
            <span>Lưu tài liệu.</span>
          </div>

          <div class="note">
            Nên thường xuyên sử dụng Ctrl + S trong quá trình làm việc.
          </div>
        `
      },

      {
        title: "1.6. Save và Save As",
        content: `
          <p>
            <strong>Save:</strong> Lưu thay đổi vào file hiện tại.
          </p>

          <p>
            <strong>Save As:</strong> Tạo bản sao hoặc lưu sang tên,
            thư mục hoặc định dạng khác.
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
        content: `
        <div class="shortcut-item">

          <div class="shortcut">
            <kbd>Ctrl + A</kbd>
            <span>Chọn tất cả.</span>
          </div>

          <figure class="shortcut-illustration">

            <img
              src="/assets/lessons/keyboard/ctrl-a.png"
              alt="Minh họa phím Ctrl và A trên bàn phím"
              loading="lazy"
            />

            <figcaption>
              Nhấn giữ <strong>Ctrl</strong>, sau đó nhấn <strong>A</strong>.
            </figcaption>

          </figure>

        </div>
          <div class="shortcut"><kbd>Ctrl + C</kbd><span>Sao chép.</span></div>
          <div class="shortcut"><kbd>Ctrl + X</kbd><span>Cắt.</span></div>
          <div class="shortcut"><kbd>Ctrl + V</kbd><span>Dán.</span></div>
          <div class="shortcut"><kbd>Ctrl + Z</kbd><span>Hoàn tác.</span></div>
          <div class="shortcut"><kbd>Ctrl + Y</kbd><span>Làm lại.</span></div>
        `
      },

      {
        title: "2.7. Quản lý file",
        content: `
          <div class="shortcut"><kbd>Ctrl + N</kbd><span>Tạo tài liệu mới.</span></div>
          <div class="shortcut"><kbd>Ctrl + O</kbd><span>Mở tài liệu.</span></div>
          <div class="shortcut"><kbd>Ctrl + S</kbd><span>Lưu.</span></div>
          <div class="shortcut"><kbd>Ctrl + P</kbd><span>In.</span></div>
          <div class="shortcut"><kbd>Ctrl + W</kbd><span>Đóng tài liệu.</span></div>
        `
      },

      {
        title: "2.8. Định dạng chữ",
        content: `
          <div class="shortcut"><kbd>Ctrl + B</kbd><span>In đậm.</span></div>
          <div class="shortcut"><kbd>Ctrl + I</kbd><span>In nghiêng.</span></div>
          <div class="shortcut"><kbd>Ctrl + U</kbd><span>Gạch chân.</span></div>
          <div class="shortcut"><kbd>Ctrl + D</kbd><span>Mở Font Dialog.</span></div>
          <div class="shortcut"><kbd>Shift + F3</kbd><span>Đổi HOA/thường.</span></div>
        `
      },

      {
        title: "2.9. Căn lề",
        content: `
          <div class="shortcut"><kbd>Ctrl + L</kbd><span>Căn trái.</span></div>
          <div class="shortcut"><kbd>Ctrl + E</kbd><span>Căn giữa.</span></div>
          <div class="shortcut"><kbd>Ctrl + R</kbd><span>Căn phải.</span></div>
          <div class="shortcut"><kbd>Ctrl + J</kbd><span>Căn đều hai bên.</span></div>
        `
      },

      {
        title: "2.10. Di chuyển con trỏ",
        content: `
          <div class="shortcut"><kbd>Home</kbd><span>Đầu dòng.</span></div>
          <div class="shortcut"><kbd>End</kbd><span>Cuối dòng.</span></div>
          <div class="shortcut"><kbd>Ctrl + Home</kbd><span>Đầu tài liệu.</span></div>
          <div class="shortcut"><kbd>Ctrl + End</kbd><span>Cuối tài liệu.</span></div>
        `
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
          <p><strong>Enter:</strong> Tạo đoạn văn mới.</p>
          <p><strong>Shift + Enter:</strong> Xuống dòng trong cùng đoạn.</p>

          <div class="warning">
            Không nên nhấn Enter liên tục để tạo khoảng cách.
            Hãy sử dụng Paragraph Spacing.
          </div>
        `
      },

      {
        title: "3.2. Xóa văn bản",
        content: `
          <ul>
            <li>Backspace: Xóa ký tự phía trước.</li>
            <li>Delete: Xóa ký tự phía sau.</li>
            <li>Ctrl + Backspace: Xóa từ phía trước.</li>
            <li>Ctrl + Delete: Xóa từ phía sau.</li>
          </ul>
        `
      },

      {
        title: "3.3. Find",
        content: `
          <div class="shortcut">
            <kbd>Ctrl + F</kbd>
            <span>Tìm kiếm nội dung trong tài liệu.</span>
          </div>
        `
      },

      {
        title: "3.4. Replace",
        content: `
          <div class="shortcut">
            <kbd>Ctrl + H</kbd>
            <span>Tìm và thay thế nội dung.</span>
          </div>

          <p>
            Có thể sử dụng Replace All để thay thế tất cả kết quả.
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
            <tr><th>Nội dung</th><th>Cỡ tham khảo</th></tr>
            <tr><td>Nội dung</td><td>12–14</td></tr>
            <tr><td>Tiêu đề nhỏ</td><td>14–16</td></tr>
            <tr><td>Tiêu đề lớn</td><td>18–24</td></tr>
          </table>
        `
      },

      {
        title: "4.3. Bold – Italic – Underline",
        content: `
          <div class="shortcut"><kbd>Ctrl + B</kbd><span>In đậm.</span></div>
          <div class="shortcut"><kbd>Ctrl + I</kbd><span>In nghiêng.</span></div>
          <div class="shortcut"><kbd>Ctrl + U</kbd><span>Gạch chân.</span></div>
        `
      },

      {
        title: "4.6. Change Case",
        content: `
          <div class="shortcut">
            <kbd>Shift + F3</kbd>
            <span>Chuyển chữ thường / Viết Hoa / CHỮ HOA.</span>
          </div>
        `
      },

      {
        title: "4.7. Clear Formatting",
        content: `
          <div class="shortcut">
            <kbd>Ctrl + Space</kbd>
            <span>Loại bỏ nhiều định dạng ký tự trực tiếp.</span>
          </div>
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
        content: `
          <div class="shortcut"><kbd>Ctrl + L</kbd><span>Căn trái.</span></div>
          <div class="shortcut"><kbd>Ctrl + E</kbd><span>Căn giữa.</span></div>
          <div class="shortcut"><kbd>Ctrl + R</kbd><span>Căn phải.</span></div>
          <div class="shortcut"><kbd>Ctrl + J</kbd><span>Căn đều.</span></div>
        `
      },

      {
        title: "5.2. Line Spacing",
        content: `
          <div class="shortcut"><kbd>Ctrl + 1</kbd><span>Dãn dòng 1.</span></div>
          <div class="shortcut"><kbd>Ctrl + 2</kbd><span>Dãn dòng 2.</span></div>
          <div class="shortcut"><kbd>Ctrl + 5</kbd><span>Dãn dòng 1.5.</span></div>
        `
      },

      {
        title: "5.3. Paragraph Spacing",
        content: `
          <p>
            Khoảng cách giữa các đoạn gồm Before và After.
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
            1 → 1.1 → 1.1.1...
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
            <li>Portrait: Trang dọc.</li>
            <li>Landscape: Trang ngang.</li>
          </ul>
        `
      },

      {
        title: "8.3. Size",
        content: `
          <p>Khổ giấy thông dụng nhất là A4.</p>
        `
      },

      {
        title: "8.4. Page Break",
        content: `
          <div class="shortcut">
            <kbd>Ctrl + Enter</kbd>
            <span>Chuyển sang trang mới đúng cách.</span>
          </div>
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
          <p>Insert → Table.</p>
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
          <p>Insert → Pictures.</p>
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
          <p>Crop dùng để cắt phần thừa của ảnh.</p>
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
          <p>Insert → Page Number.</p>
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
            Nếu chèn thêm hình ở giữa, Caption có thể giúp Word
            quản lý lại số thứ tự.
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
          <p>
            Ctrl + H → More → Format.
          </p>

          <p>
            Có thể tìm theo Font, Bold, Paragraph hoặc ký tự đặc biệt.
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
        content: `
          <div class="shortcut"><kbd>Ctrl + Enter</kbd><span>Page Break.</span></div>
          <div class="shortcut"><kbd>Ctrl + Shift + Enter</kbd><span>Column Break.</span></div>
          <div class="shortcut"><kbd>Ctrl + F</kbd><span>Find.</span></div>
          <div class="shortcut"><kbd>Ctrl + H</kbd><span>Replace.</span></div>
          <div class="shortcut"><kbd>Ctrl + G</kbd><span>Go To.</span></div>
          <div class="shortcut"><kbd>Ctrl + K</kbd><span>Hyperlink.</span></div>
          <div class="shortcut"><kbd>Ctrl + D</kbd><span>Font Dialog.</span></div>
          <div class="shortcut"><kbd>Ctrl + M</kbd><span>Tăng Indent.</span></div>
          <div class="shortcut"><kbd>Ctrl + T</kbd><span>Hanging Indent.</span></div>
          <div class="shortcut"><kbd>Ctrl + Q</kbd><span>Xóa định dạng Paragraph.</span></div>
          <div class="shortcut"><kbd>F4</kbd><span>Lặp thao tác.</span></div>
          <div class="shortcut"><kbd>F7</kbd><span>Kiểm tra chính tả.</span></div>
        `
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
          <p>Review → New Comment.</p>
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
          <p>Review → Restrict Editing.</p>

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
            Mail Merge dùng để tạo hàng loạt tài liệu từ một mẫu
            và nguồn dữ liệu.
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
          <div class="shortcut">
            <kbd>Ctrl + F</kbd>
            <span>Mở Navigation Pane.</span>
          </div>

          <p>
            Nếu tài liệu sử dụng Heading đúng cách, Navigation Pane
            sẽ hiển thị cấu trúc chương và mục.
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
            Nhấn Alt để Word hiển thị các ký tự tương ứng với từng tab.
          </p>

          <table>
            <tr><th>Phím</th><th>Tab</th></tr>
            <tr><td>H</td><td>Home</td></tr>
            <tr><td>N</td><td>Insert</td></tr>
            <tr><td>P</td><td>Layout</td></tr>
            <tr><td>S</td><td>References</td></tr>
            <tr><td>R</td><td>Review</td></tr>
            <tr><td>W</td><td>View</td></tr>
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
          <div class="shortcut">
            <kbd>Ctrl + Shift + 8</kbd>
            <span>Hiện/ẩn các ký tự định dạng.</span>
          </div>

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
            Nếu cần ổn định, có thể sử dụng In Line with Text.
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
            Có thể dùng Paste as Text, Clear Formatting
            hoặc Ctrl + Space.
          </p>
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
            Kiểm tra Section Break, Link to Previous
            và Format Page Numbers.
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
            Khi Word bị tắt đột ngột, kiểm tra Document Recovery.
          </p>

          <p>
            File → Info → Manage Document → Recover Unsaved Documents.
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
            <li>Không dùng Space nhiều lần để căn chỉnh.</li>
            <li>Không dùng Enter nhiều lần để sang trang.</li>
            <li>Không tự đánh số tiêu đề bằng tay trong tài liệu lớn.</li>
            <li>Không tự gõ số hình.</li>
            <li>Không tự gõ mục lục.</li>
            <li>Không định dạng từng tiêu đề bằng tay.</li>
            <li>Tài liệu dài nên dùng Heading, Caption, Cross-reference và Section.</li>
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
            <li>Tạo tài liệu Báo cáo thực hành Microsoft Word.</li>
            <li>Viết phần giới thiệu.</li>
            <li>Tạo danh sách Bullet.</li>
            <li>Tạo Numbering.</li>
            <li>Tạo bảng 5 sinh viên.</li>
            <li>Chèn hình ảnh.</li>
            <li>Font Times New Roman, cỡ 13.</li>
            <li>Line spacing 1.5.</li>
            <li>Đánh số trang.</li>
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
          <p>Tạo tài liệu khoảng 8–10 trang gồm:</p>

          <ul>
            <li>Trang bìa.</li>
            <li>Mục lục.</li>
            <li>Chương 1.</li>
            <li>Chương 2.</li>
            <li>Kết luận.</li>
            <li>Tài liệu tham khảo.</li>
          </ul>

          <p>Sử dụng Heading, Multilevel List, Caption và Page Number.</p>
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
            <li>Tạo Excel có HoTen, NgaySinh, Lop, Diem.</li>
            <li>Nhập 10 người.</li>
            <li>Tạo mẫu Giấy chứng nhận trong Word.</li>
            <li>Chèn các Merge Field.</li>
            <li>Finish & Merge để tạo 10 chứng nhận.</li>
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
        content: `
          <div class="shortcut"><kbd>Ctrl + A</kbd><span>Chọn tất cả.</span></div>
          <div class="shortcut"><kbd>Ctrl + C</kbd><span>Copy.</span></div>
          <div class="shortcut"><kbd>Ctrl + X</kbd><span>Cut.</span></div>
          <div class="shortcut"><kbd>Ctrl + V</kbd><span>Paste.</span></div>
          <div class="shortcut"><kbd>Ctrl + Z</kbd><span>Undo.</span></div>
          <div class="shortcut"><kbd>Ctrl + S</kbd><span>Save.</span></div>
          <div class="shortcut"><kbd>Ctrl + F</kbd><span>Find.</span></div>
          <div class="shortcut"><kbd>Ctrl + H</kbd><span>Replace.</span></div>
        `
      },

      {
        title: "Mức 2 — Soạn thảo",
        content: `
          <div class="shortcut"><kbd>Ctrl + B</kbd><span>Bold.</span></div>
          <div class="shortcut"><kbd>Ctrl + I</kbd><span>Italic.</span></div>
          <div class="shortcut"><kbd>Ctrl + U</kbd><span>Underline.</span></div>
          <div class="shortcut"><kbd>Ctrl + J</kbd><span>Justify.</span></div>
        `
      },

      {
        title: "Mức 4 — Chuyên nghiệp",
        content: `
          <div class="shortcut"><kbd>Ctrl + Enter</kbd><span>Page Break.</span></div>
          <div class="shortcut"><kbd>Ctrl + Shift + 8</kbd><span>Hiện ký tự ẩn.</span></div>
          <div class="shortcut"><kbd>Shift + F3</kbd><span>Change Case.</span></div>
          <div class="shortcut"><kbd>F4</kbd><span>Lặp thao tác.</span></div>
          <div class="shortcut"><kbd>F7</kbd><span>Kiểm tra chính tả.</span></div>
        `
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
          <div class="shortcut">
            <kbd>Ctrl + Shift + 8</kbd>
            <span>Kiểm tra ký tự định dạng ẩn.</span>
          </div>

          <div class="shortcut">
            <kbd>Ctrl + S</kbd>
            <span>Lưu tài liệu.</span>
          </div>

          <p>
            Sau khi kiểm tra hoàn tất có thể xuất PDF.
          </p>
        `
      }
    ]
  }

];
