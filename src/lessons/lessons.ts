import type { Lesson } from "../types/lesson.types";

import {
  shortcut,
  shortcutGroup
} from "../ui/shortcut-ui";

type WordPathItem = readonly [
  english: string,
  vietnamese: string
];

interface WordGuideOptions {
  purpose?: string;
  path?: WordPathItem[];
  steps?: string[];
  result?: string;
  example?: string;
  tip?: string;
  warning?: string;
  note?: string;
}

const wordCommand = (
  english: string,
  vietnamese: string
): string => `
  <span class="word-command">
    <strong>${english}</strong>
    <span class="word-command-vi">(${vietnamese})</span>
  </span>
`;

const wordPath = (
  ...items: WordPathItem[]
): string => `
  <div class="word-path">
    <div class="lesson-block-title">Vị trí trên Word</div>
    <div class="word-path-items">
      ${items
        .map(([english, vietnamese]) =>
          wordCommand(english, vietnamese)
        )
        .join('<span class="word-path-arrow"> → </span>')}
    </div>
  </div>
`;

const lessonSteps = (
  steps: string[]
): string => `
  <div class="lesson-steps">
    <div class="lesson-block-title">Cách thực hiện</div>
    <ol>
      ${steps
        .map(
          (step, index) => `
            <li>
              <strong>Bước ${index + 1}:</strong>
              ${step}
            </li>
          `
        )
        .join("")}
    </ol>
  </div>
`;

const wordGuide = ({
  purpose,
  path,
  steps,
  result,
  example,
  tip,
  warning,
  note
}: WordGuideOptions): string => `
  ${
    purpose
      ? `
        <div class="lesson-purpose">
          <div class="lesson-block-title">Dùng để làm gì?</div>
          <p>${purpose}</p>
        </div>
      `
      : ""
  }

  ${
    path?.length
      ? wordPath(...path)
      : ""
  }

  ${
    steps?.length
      ? lessonSteps(steps)
      : ""
  }

  ${
    result
      ? `
        <div class="lesson-result">
          <div class="lesson-block-title">Kết quả</div>
          <p>${result}</p>
        </div>
      `
      : ""
  }

  ${
    example
      ? `
        <div class="lesson-example">
          <div class="lesson-block-title">Ví dụ</div>
          <div>${example}</div>
        </div>
      `
      : ""
  }

  ${
    note
      ? `
        <div class="note">
          <strong>Ghi chú:</strong>
          ${note}
        </div>
      `
      : ""
  }

  ${
    tip
      ? `
        <div class="note">
          <strong>Mẹo:</strong>
          ${tip}
        </div>
      `
      : ""
  }

  ${
    warning
      ? `
        <div class="warning">
          <strong>Lưu ý:</strong>
          ${warning}
        </div>
      `
      : ""
  }
`;

const terminologyTable = (
  rows: Array<[string, string, string]>
): string => `
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th>Thuật ngữ</th>
          <th>Tiếng Việt</th>
          <th>Ý nghĩa</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            ([english, vietnamese, meaning]) => `
              <tr>
                <td><strong>${english}</strong></td>
                <td>${vietnamese}</td>
                <td>${meaning}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;

export const lessons: Lesson[] = [
  // =========================================================
  // PHẦN 1
  // =========================================================

  {
    id: "lam-quen-word",
    part: 1,
    title: "Làm quen với Microsoft Word",
    level: "CƠ BẢN",
    description: "Giới thiệu Microsoft Word, giao diện và các thao tác tạo, mở, lưu tài liệu theo cả giao diện tiếng Anh và tiếng Việt.",
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
            <strong>Microsoft Word</strong> là phần mềm xử lý văn bản thuộc bộ
            Microsoft Office/Microsoft 365. Word được dùng để tạo, chỉnh sửa,
            định dạng, in và chia sẻ tài liệu.
          </p>
          <p>Các công việc thường gặp:</p>
          <ul>
            <li>Soạn văn bản, công văn, thông báo và hợp đồng.</li>
            <li>Viết báo cáo, tiểu luận, luận văn và giáo trình.</li>
            <li>Tạo biểu mẫu, bảng biểu, thư mời và giấy chứng nhận.</li>
            <li>Chèn hình ảnh, sơ đồ, bảng, mục lục và số trang.</li>
            <li>Kiểm tra, nhận xét và cộng tác bằng Review/Track Changes.</li>
          </ul>
          <div class="note">
            <strong>Mục tiêu:</strong> không chỉ biết gõ chữ mà còn biết tổ chức
            tài liệu để Word tự quản lý Heading, mục lục, Caption, số trang và Section.
          </div>
        `
      },

      {
        title: "1.2. Giao diện Microsoft Word",
        content: `
          ${terminologyTable([
            ["Quick Access Toolbar", "Thanh công cụ truy cập nhanh", "Thường chứa Save, Undo, Redo."],
            ["Title Bar", "Thanh tiêu đề", "Hiển thị tên tài liệu và ứng dụng."],
            ["Ribbon", "Dải băng", "Chứa các tab, nhóm lệnh và nút chức năng."],
            ["Document Area", "Vùng soạn thảo", "Khu vực nhập và chỉnh sửa nội dung."],
            ["Status Bar", "Thanh trạng thái", "Hiển thị trang, số từ, ngôn ngữ và chế độ xem."],
            ["Zoom", "Thu phóng", "Phóng to/thu nhỏ màn hình hiển thị tài liệu."]
          ])}
          <p><strong>Các tab quan trọng:</strong></p>
          ${terminologyTable([
            ["File", "Tệp", "Tạo, mở, lưu, in, xuất và thiết lập Word."],
            ["Home", "Trang đầu", "Định dạng chữ, đoạn văn, Bullets, Numbering, Styles."],
            ["Insert", "Chèn", "Chèn bảng, ảnh, Shape, Header/Footer, số trang..."],
            ["Design", "Thiết kế", "Theme, màu, font và nền tài liệu."],
            ["Layout", "Bố trí", "Lề, hướng giấy, khổ giấy, Breaks, Indent, Spacing."],
            ["References", "Tham chiếu", "Mục lục, Caption, Footnote, Cross-reference."],
            ["Mailings", "Gửi thư", "Mail Merge/Trộn thư."],
            ["Review", "Xem lại", "Chính tả, Comment, Track Changes, Protect."],
            ["View", "Xem", "Ruler, Navigation Pane, Zoom và chế độ hiển thị."]
          ])}
          <div class="note">
            Tên tiếng Việt có thể khác nhẹ giữa các phiên bản Microsoft 365/Office,
            vì vậy giáo trình luôn ghi <strong>English (Tiếng Việt)</strong> để dễ đối chiếu.
          </div>
        `
      },

      {
        title: "1.3. Tạo tài liệu mới",
        content: `
          ${wordGuide({
            purpose: "Tạo một tài liệu Word trống để bắt đầu soạn thảo.",
            path: [["File", "Tệp"], ["New", "Mới"], ["Blank Document", "Tài liệu trống"]],
            steps: [
              "Mở Microsoft Word.",
              "Chọn File (Tệp) → New (Mới).",
              "Chọn Blank Document (Tài liệu trống).",
              "Bắt đầu nhập nội dung."
            ],
            result: "Một tài liệu Word mới được tạo.",
            tip: "Có thể dùng Ctrl + N để tạo nhanh tài liệu mới."
          })}
          ${shortcut("Ctrl + N", "Tạo tài liệu Word mới")}
        `
      },

      {
        title: "1.4. Mở tài liệu",
        content: `
          ${wordGuide({
            purpose: "Mở một file Word đã có trên máy, OneDrive hoặc vị trí lưu khác.",
            path: [["File", "Tệp"], ["Open", "Mở"]],
            steps: [
              "Chọn File → Open.",
              "Chọn Recent nếu file vừa mở gần đây hoặc Browse để duyệt thư mục.",
              "Chọn file .docx/.doc cần mở.",
              "Bấm Open (Mở)."
            ],
            result: "Tài liệu được mở để xem hoặc chỉnh sửa.",
            tip: "Ctrl + O mở nhanh màn hình Open."
          })}
          ${shortcut("Ctrl + O", "Mở tài liệu")}
        `
      },

      {
        title: "1.5. Lưu tài liệu",
        content: `
          ${wordGuide({
            purpose: "Lưu nội dung đang làm để tránh mất dữ liệu.",
            path: [["File", "Tệp"], ["Save", "Lưu"]],
            steps: [
              "Nhấn Ctrl + S hoặc chọn File → Save.",
              "Nếu là lần lưu đầu tiên, chọn vị trí lưu.",
              "Nhập tên file rõ ràng.",
              "Kiểm tra định dạng, thông thường là Word Document (*.docx).",
              "Bấm Save."
            ],
            result: "Các thay đổi hiện tại được ghi vào file.",
            warning: "Nên lưu thường xuyên, đặc biệt trước khi chỉnh sửa lớn, đóng Word hoặc tắt máy."
          })}
          ${shortcut("Ctrl + S", "Lưu tài liệu")}
        `
      },

     {
      title: "1.6. Save và Save As — Lưu và Lưu dưới dạng",

      content: `
        <p>
          Trong Microsoft Word,
          <strong>Save (Lưu)</strong>
          và
          <strong>Save As (Lưu dưới dạng)</strong>
          đều dùng để lưu tài liệu nhưng mục đích sử dụng khác nhau.
        </p>


        <!-- =====================================================
            SO SÁNH SAVE VÀ SAVE AS
        ====================================================== -->

        <table>
          <thead>
            <tr>
              <th>Chức năng</th>
              <th>Tiếng Việt</th>
              <th>Khi nào sử dụng?</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <strong>Save</strong>
              </td>

              <td>
                Lưu
              </td>

              <td>
                Lưu các thay đổi vào chính file đang làm việc.
              </td>
            </tr>

            <tr>
              <td>
                <strong>Save As</strong>
              </td>

              <td>
                Lưu dưới dạng
              </td>

              <td>
                Tạo một file mới, đổi tên file, đổi thư mục lưu
                hoặc đổi định dạng file.
              </td>
            </tr>
          </tbody>
        </table>


        <!-- =====================================================
            SAVE
        ====================================================== -->

        <h4>Save — Lưu tài liệu hiện tại</h4>

        <p>
          <strong>Save (Lưu)</strong>
          được sử dụng để lưu những thay đổi mới vào
          <strong>chính file Word đang làm việc</strong>.
        </p>

        <div class="word-path">
          <strong>Vị trí trên Word:</strong>

          File (Tệp)

          <span class="word-path-arrow"> → </span>

          Save (Lưu)
        </div>


        ${shortcut(
          "Ctrl + S",
          "Lưu tài liệu hiện tại"
        )}


        <div class="lesson-steps">
          <strong>Cách thực hiện:</strong>

          <ol>
            <li>
              <strong>Bước 1:</strong>
              Mở tài liệu Word đang làm việc.
            </li>

            <li>
              <strong>Bước 2:</strong>
              Bấm
              <strong>File (Tệp)</strong>
              ở góc trên bên trái.
            </li>

            <li>
              <strong>Bước 3:</strong>
              Chọn
              <strong>Save (Lưu)</strong>.
            </li>

            <li>
              <strong>Bước 4:</strong>
              Hoặc sử dụng phím tắt
              <strong>Ctrl + S</strong>
              để lưu nhanh.
            </li>
          </ol>
        </div>


        <div class="lesson-result">
          <strong>Kết quả:</strong>

          <p>
            Những thay đổi vừa thực hiện được lưu vào
            <strong>file hiện tại</strong>.
          </p>

          <p>
            Tên file và vị trí lưu không thay đổi.
          </p>
        </div>


        <div class="lesson-example">
          <strong>Ví dụ:</strong>

          <p>
            Bạn đang chỉnh sửa:
          </p>

          <p>
            <strong>BaoCaoThucTap.docx</strong>
          </p>

          <p>
            Sau khi thêm nội dung, nhấn:
          </p>

          <p>
            <strong>Ctrl + S</strong>
          </p>

          <p>
            Word sẽ cập nhật nội dung mới vào chính file
            <strong>BaoCaoThucTap.docx</strong>.
          </p>
        </div>


        <div class="note">
          <strong>Mẹo:</strong>

          Nên nhấn
          <strong>Ctrl + S</strong>
          thường xuyên trong quá trình làm việc để hạn chế mất dữ liệu
          khi Word hoặc máy tính gặp sự cố.
        </div>


        <div class="warning">
          <strong>Lưu ý:</strong>

          Save không tạo thêm một file mới.
          Những thay đổi sẽ được lưu trực tiếp vào file hiện tại.
        </div>


        <!-- =====================================================
            SAVE AS
        ====================================================== -->

        <h4>Save As — Lưu dưới dạng</h4>

        <p>
          <strong>Save As (Lưu dưới dạng)</strong>
          được sử dụng khi muốn tạo
          <strong>một file mới từ tài liệu hiện tại</strong>.
        </p>

        <p>
          File ban đầu vẫn có thể được giữ nguyên,
          trong khi bạn tạo thêm một phiên bản khác để tiếp tục chỉnh sửa.
        </p>


        <div class="word-path">
          <strong>Vị trí trên Word:</strong>

          File (Tệp)

          <span class="word-path-arrow"> → </span>

          Save As (Lưu dưới dạng)

          <span class="word-path-arrow"> → </span>

          This PC (Lưu trên máy tính)
        </div>


        <div class="lesson-purpose">
          <strong>Save As thường được sử dụng khi:</strong>

          <ul>
            <li>
              Muốn tạo một bản sao của tài liệu.
            </li>

            <li>
              Muốn đổi tên file.
            </li>

            <li>
              Muốn lưu file sang thư mục khác.
            </li>

            <li>
              Muốn giữ lại file gốc trước khi chỉnh sửa.
            </li>

            <li>
              Muốn lưu tài liệu sang định dạng khác.
            </li>

            <li>
              Muốn chuyển tài liệu Word sang PDF.
            </li>
          </ul>
        </div>


        <!-- =====================================================
            SAVE AS THEO THIS PC
        ====================================================== -->

        <h4>Cách Save As bằng This PC — Lưu trên máy tính</h4>

        <div class="lesson-steps">
          <strong>Cách thực hiện:</strong>

          <ol>

            <li>
              <strong>Bước 1:</strong>

              Mở tài liệu Word cần lưu thành một file mới.
            </li>


            <li>
              <strong>Bước 2:</strong>

              Bấm
              <strong>File (Tệp)</strong>
              ở góc trên bên trái của Microsoft Word.
            </li>


            <li>
              <strong>Bước 3:</strong>

              Trong menu File, chọn
              <strong>Save As (Lưu dưới dạng)</strong>.
            </li>


            <li>
              <strong>Bước 4:</strong>

              Chọn
              <strong>This PC (Lưu trên máy tính)</strong>.

              <p>
                Tùy phiên bản Word,
                bạn có thể thấy các thư mục gần đây
                hoặc nút
                <strong>Browse (Duyệt)</strong>
                để tự chọn thư mục.
              </p>
            </li>


            <li>
              <strong>Bước 5:</strong>

              Chọn thư mục muốn lưu file.

              <p>
                Ví dụ:
              </p>

              <p>
                <strong>
                  Documents
                  → BaoCao
                  → BaoCaoThucTap
                </strong>
              </p>
            </li>


            <li>
              <strong>Bước 6:</strong>

              Tại ô
              <strong>File name (Tên tệp)</strong>,
              nhập tên file mới.

              <p>
                Ví dụ:
              </p>

              <p>
                <strong>BaoCaoThucTap_Final.docx</strong>
              </p>
            </li>


            <li>
              <strong>Bước 7:</strong>

              Tại
              <strong>Save as type (Loại tệp)</strong>,
              kiểm tra định dạng cần lưu.
            </li>


            <li>
              <strong>Bước 8:</strong>

              Nếu muốn tiếp tục chỉnh sửa tài liệu bằng Word,
              chọn:

              <p>
                <strong>
                  Word Document (*.docx)
                </strong>
              </p>
            </li>


            <li>
              <strong>Bước 9:</strong>

              Kiểm tra lại:

              <ul>
                <li>Thư mục lưu.</li>
                <li>Tên file.</li>
                <li>Định dạng file.</li>
              </ul>
            </li>


            <li>
              <strong>Bước 10:</strong>

              Bấm
              <strong>Save (Lưu)</strong>.
            </li>

          </ol>
        </div>


        <div class="lesson-result">
          <strong>Kết quả:</strong>

          <p>
            Word tạo một file mới trong thư mục đã chọn.
          </p>

          <p>
            Nếu bạn đặt tên mới hoặc lưu ở vị trí khác,
            file Word ban đầu vẫn được giữ lại.
          </p>
        </div>


        <!-- =====================================================
            VÍ DỤ SAVE AS
        ====================================================== -->

        <div class="lesson-example">
          <strong>Ví dụ thực tế:</strong>

          <p>
            Bạn đang có file:
          </p>

          <p>
            <strong>BaoCao.docx</strong>
          </p>

          <p>
            Bạn muốn giữ lại file này và tạo thêm
            một phiên bản mới để tiếp tục chỉnh sửa.
          </p>

          <p>
            Thực hiện:
          </p>

          <p>
            <strong>
              File (Tệp)
              → Save As (Lưu dưới dạng)
              → This PC (Lưu trên máy tính)
            </strong>
          </p>

          <p>
            Chọn thư mục:
          </p>

          <p>
            <strong>
              Documents
              → BaoCao
            </strong>
          </p>

          <p>
            Tại
            <strong>File name (Tên tệp)</strong>,
            nhập:
          </p>

          <p>
            <strong>
              BaoCao_PhienBanMoi.docx
            </strong>
          </p>

          <p>
            Tại
            <strong>Save as type</strong>,
            chọn:
          </p>

          <p>
            <strong>
              Word Document (*.docx)
            </strong>
          </p>

          <p>
            Sau đó bấm:
          </p>

          <p>
            <strong>Save (Lưu)</strong>
          </p>
        </div>


        <div class="lesson-result">
          <strong>Sau khi Save As:</strong>

          <ul>
            <li>
              <strong>BaoCao.docx</strong>
              — file ban đầu.
            </li>

            <li>
              <strong>BaoCao_PhienBanMoi.docx</strong>
              — file mới vừa tạo.
            </li>
          </ul>
        </div>


        <!-- =====================================================
            THIS PC
        ====================================================== -->

        <h4>This PC — Lưu trên máy tính</h4>

        <p>
          <strong>This PC</strong>
          được sử dụng khi muốn lưu tài liệu trực tiếp
          vào ổ đĩa hoặc thư mục trên máy tính.
        </p>


        <div class="lesson-steps">
          <strong>Ví dụ vị trí lưu:</strong>

          <ul>
            <li>Desktop.</li>

            <li>Documents.</li>

            <li>Downloads.</li>

            <li>Ổ C.</li>

            <li>Ổ D.</li>

            <li>Ổ E.</li>

            <li>USB hoặc ổ đĩa ngoài.</li>
          </ul>
        </div>


        <div class="note">
          <strong>Ghi chú:</strong>

          Sau khi chọn
          <strong>This PC</strong>,
          một số phiên bản Word có thể hiển thị
          các thư mục đã sử dụng gần đây.

          Nếu không thấy thư mục cần lưu,
          chọn
          <strong>Browse (Duyệt)</strong>
          để tự tìm thư mục trên máy tính.
        </div>


        <!-- =====================================================
            FILE NAME
        ====================================================== -->

        <h4>File name — Tên tệp</h4>

        <p>
          Tại ô
          <strong>File name (Tên tệp)</strong>,
          nhập tên muốn đặt cho tài liệu.
        </p>


        <div class="lesson-example">
          <strong>Ví dụ tên file:</strong>

          <ul>
            <li>
              BaoCaoThucTap.docx
            </li>

            <li>
              BaoCaoThucTap_Final.docx
            </li>

            <li>
              BaoCaoThucTap_2026.docx
            </li>

            <li>
              HopDong_KhachHangA.docx
            </li>

            <li>
              GiaoTrinhMicrosoftWord.docx
            </li>
          </ul>
        </div>


        <div class="note">
          <strong>Mẹo:</strong>

          Nên đặt tên file rõ ràng,
          dễ hiểu và thể hiện được nội dung hoặc phiên bản của tài liệu.
        </div>


        <!-- =====================================================
            SAVE AS TYPE
        ====================================================== -->

        <h4>Save as type — Chọn loại tệp</h4>

        <p>
          Tại mục
          <strong>Save as type (Loại tệp)</strong>,
          chọn định dạng phù hợp với mục đích sử dụng.
        </p>


        <table>
          <thead>
            <tr>
              <th>Định dạng</th>
              <th>Tên</th>
              <th>Khi nào sử dụng?</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>
                <strong>.docx</strong>
              </td>

              <td>
                Word Document
              </td>

              <td>
                Định dạng Word thông dụng.
                Có thể tiếp tục mở và chỉnh sửa bằng Microsoft Word.
              </td>
            </tr>


            <tr>
              <td>
                <strong>.doc</strong>
              </td>

              <td>
                Word 97–2003 Document
              </td>

              <td>
                Dùng khi cần tương thích với
                các phiên bản Microsoft Word rất cũ.
              </td>
            </tr>


            <tr>
              <td>
                <strong>.pdf</strong>
              </td>

              <td>
                PDF
              </td>

              <td>
                Thường dùng để gửi tài liệu,
                nộp báo cáo, gửi CV hoặc chuẩn bị in.
              </td>
            </tr>


            <tr>
              <td>
                <strong>.rtf</strong>
              </td>

              <td>
                Rich Text Format
              </td>

              <td>
                Định dạng văn bản có khả năng
                tương thích với nhiều phần mềm.
              </td>
            </tr>


            <tr>
              <td>
                <strong>.txt</strong>
              </td>

              <td>
                Plain Text
              </td>

              <td>
                Chỉ lưu nội dung chữ và
                không giữ phần lớn định dạng của Word.
              </td>
            </tr>

          </tbody>
        </table>


        <!-- =====================================================
            LƯU PDF
        ====================================================== -->

        <h4>Lưu tài liệu Word thành PDF bằng Save As</h4>

        <div class="word-path">
          <strong>Vị trí trên Word:</strong>

          File (Tệp)

          <span class="word-path-arrow"> → </span>

          Save As (Lưu dưới dạng)

          <span class="word-path-arrow"> → </span>

          This PC (Lưu trên máy tính)
        </div>


        <div class="lesson-steps">
          <strong>Cách thực hiện:</strong>

          <ol>

            <li>
              <strong>Bước 1:</strong>

              Chọn
              <strong>File (Tệp)</strong>.
            </li>


            <li>
              <strong>Bước 2:</strong>

              Chọn
              <strong>Save As (Lưu dưới dạng)</strong>.
            </li>


            <li>
              <strong>Bước 3:</strong>

              Chọn
              <strong>This PC (Lưu trên máy tính)</strong>.
            </li>


            <li>
              <strong>Bước 4:</strong>

              Chọn thư mục muốn lưu.
            </li>


            <li>
              <strong>Bước 5:</strong>

              Tại
              <strong>File name</strong>,
              nhập tên file.
            </li>


            <li>
              <strong>Bước 6:</strong>

              Tại
              <strong>Save as type</strong>,
              chọn:

              <p>
                <strong>
                  PDF (*.pdf)
                </strong>
              </p>
            </li>


            <li>
              <strong>Bước 7:</strong>

              Bấm
              <strong>Save (Lưu)</strong>.
            </li>

          </ol>
        </div>


        <div class="lesson-example">
          <strong>Ví dụ:</strong>

          <p>
            File Word:
          </p>

          <p>
            <strong>
              BaoCaoThucTap.docx
            </strong>
          </p>

          <p>
            Thực hiện:
          </p>

          <p>
            <strong>
              File
              → Save As
              → This PC
              → Save as type
              → PDF (*.pdf)
              → Save
            </strong>
          </p>

          <p>
            Kết quả:
          </p>

          <p>
            <strong>
              BaoCaoThucTap.pdf
            </strong>
          </p>
        </div>


        <div class="lesson-result">
          <strong>Kết quả:</strong>

          <p>
            Word tạo một file PDF từ tài liệu hiện tại.
          </p>

          <p>
            File Word gốc vẫn được giữ lại.
          </p>
        </div>


        <div class="note">
          <strong>Khi nào nên dùng PDF?</strong>

          <ul>
            <li>Gửi CV.</li>
            <li>Nộp báo cáo.</li>
            <li>Gửi hợp đồng để xem.</li>
            <li>Gửi tài liệu cho người khác.</li>
            <li>Chuẩn bị tài liệu để in.</li>
            <li>Muốn hạn chế việc bố cục thay đổi giữa các máy.</li>
          </ul>
        </div>


        <!-- =====================================================
            SAVE AS SANG THƯ MỤC KHÁC
        ====================================================== -->

        <h4>Save As sang một thư mục khác</h4>

        <div class="lesson-example">
          <strong>Ví dụ:</strong>

          <p>
            File hiện tại đang nằm tại:
          </p>

          <p>
            <strong>
              Downloads/BaoCao.docx
            </strong>
          </p>

          <p>
            Muốn tạo thêm một bản trong:
          </p>

          <p>
            <strong>
              Documents/BaoCaoThucTap/
            </strong>
          </p>

          <p>
            Thực hiện:
          </p>

          <ol>
            <li>
              File (Tệp).
            </li>

            <li>
              Save As (Lưu dưới dạng).
            </li>

            <li>
              This PC (Lưu trên máy tính).
            </li>

            <li>
              Chọn Documents.
            </li>

            <li>
              Mở thư mục BaoCaoThucTap.
            </li>

            <li>
              Nhập tên file mới.
            </li>

            <li>
              Bấm Save.
            </li>
          </ol>
        </div>


        <!-- =====================================================
            FILE ĐÃ TỒN TẠI
        ====================================================== -->

        <h4>Save As khi file đã tồn tại</h4>

        <p>
          Nếu trong thư mục đã có một file
          <strong>cùng tên</strong>,
          Word có thể hỏi bạn có muốn
          thay thế file hiện tại hay không.
        </p>


        <div class="warning">
          <strong>Cẩn thận:</strong>

          <p>
            Nếu chọn thay thế,
            file cũ có thể bị ghi đè bởi file mới.
          </p>

          <p>
            Nếu muốn giữ cả hai phiên bản,
            hãy đổi tên file mới trước khi bấm Save.
          </p>
        </div>


        <!-- =====================================================
            PHÂN BIỆT SAVE / SAVE AS
        ====================================================== -->

        <h4>Phân biệt Save và Save As qua tình huống thực tế</h4>


        <div class="lesson-example">
          <strong>Tình huống 1 — Chỉ muốn lưu thay đổi</strong>

          <p>
            Bạn đang chỉnh sửa:
          </p>

          <p>
            <strong>BaoCao.docx</strong>
          </p>

          <p>
            Bạn chỉ muốn lưu phần nội dung vừa sửa.
          </p>

          <p>
            → Sử dụng:
            <strong>Save / Ctrl + S</strong>.
          </p>
        </div>


        <div class="lesson-example">
          <strong>Tình huống 2 — Muốn giữ bản cũ</strong>

          <p>
            Bạn đang có:
          </p>

          <p>
            <strong>BaoCao.docx</strong>
          </p>

          <p>
            Bạn muốn giữ bản này và tạo thêm:
          </p>

          <p>
            <strong>BaoCao_Final.docx</strong>
          </p>

          <p>
            → Sử dụng:
            <strong>
              File → Save As → This PC
            </strong>.
          </p>
        </div>


        <div class="lesson-example">
          <strong>Tình huống 3 — Muốn gửi bản PDF</strong>

          <p>
            Bạn đã hoàn thành:
          </p>

          <p>
            <strong>BaoCao.docx</strong>
          </p>

          <p>
            Bạn muốn gửi cho người khác dưới dạng PDF.
          </p>

          <p>
            → Sử dụng:
          </p>

          <p>
            <strong>
              File
              → Save As
              → This PC
              → Save as type
              → PDF (*.pdf)
              → Save
            </strong>
          </p>
        </div>


        <!-- =====================================================
            LỖI THƯỜNG GẶP
        ====================================================== -->

        <div class="warning">
          <strong>Các lỗi thường gặp khi Save / Save As:</strong>

          <ul>

            <li>
              Dùng Save khi muốn giữ file cũ,
              khiến nội dung của file cũ bị thay đổi.
            </li>

            <li>
              Save As nhưng chọn nhầm thư mục
              nên sau đó không tìm thấy file.
            </li>

            <li>
              Đặt tên file giống file đã tồn tại
              và vô tình ghi đè file cũ.
            </li>

            <li>
              Chọn nhầm định dạng file.
            </li>

            <li>
              Lưu thành .txt làm mất hình ảnh,
              bảng và phần lớn định dạng.
            </li>

            <li>
              Xuất PDF nhưng không mở lại kiểm tra
              trước khi gửi.
            </li>

          </ul>
        </div>


        <!-- =====================================================
            GHI NHỚ
        ====================================================== -->

        <div class="note">
          <strong>Nguyên tắc dễ nhớ:</strong>

          <p>
            <strong>Save</strong>
            = lưu tiếp vào file hiện tại.
          </p>

          <p>
            <strong>Save As</strong>
            = tạo một bản lưu mới hoặc thay đổi
            tên file, thư mục hoặc định dạng.
          </p>

          <p>
            Khi muốn lưu file trên máy tính:
          </p>

          <p>
            <strong>
              File
              → Save As
              → This PC
              → chọn thư mục
              → File name
              → Save as type
              → Save
            </strong>
          </p>
        </div>
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
    description: "Các phím tắt quan trọng giúp thao tác Word nhanh, chính xác và giảm phụ thuộc vào chuột.",
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
        title: "2.1. Chọn, sao chép, cắt và dán",
        content: shortcutGroup(
          "Chọn · Sao chép · Cắt · Dán · Hoàn tác",
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
        title: "2.2. Quản lý tài liệu",
        content: shortcutGroup(
          "Tạo · Mở · Lưu · In · Đóng",
          `
            ${shortcut("Ctrl + N", "Tạo tài liệu mới")}
            ${shortcut("Ctrl + O", "Mở tài liệu")}
            ${shortcut("Ctrl + S", "Lưu tài liệu")}
            ${shortcut("Ctrl + P", "Mở màn hình in")}
            ${shortcut("Ctrl + W", "Đóng tài liệu hiện tại")}
          `
        )
      },

      {
        title: "2.3. Định dạng chữ",
        content: shortcutGroup(
          "Định dạng văn bản",
          `
            ${shortcut("Ctrl + B", "In đậm")}
            ${shortcut("Ctrl + I", "In nghiêng")}
            ${shortcut("Ctrl + U", "Gạch chân")}
            ${shortcut("Ctrl + D", "Mở hộp thoại Font")}
            ${shortcut("Ctrl + Shift + >", "Tăng cỡ chữ")}
            ${shortcut("Ctrl + Shift + <", "Giảm cỡ chữ")}
            ${shortcut("Shift + F3", "Đổi HOA/thường")}
          `
        )
      },

      {
        title: "2.4. Căn chỉnh đoạn văn",
        content: shortcutGroup(
          "Căn lề đoạn",
          `
            ${shortcut("Ctrl + L", "Căn trái")}
            ${shortcut("Ctrl + E", "Căn giữa")}
            ${shortcut("Ctrl + R", "Căn phải")}
            ${shortcut("Ctrl + J", "Căn đều hai bên")}
          `
        )
      },

      {
        title: "2.5. Di chuyển con trỏ",
        content: shortcutGroup(
          "Điều hướng",
          `
            ${shortcut("Home", "Về đầu dòng")}
            ${shortcut("End", "Về cuối dòng")}
            ${shortcut("Ctrl + Home", "Về đầu tài liệu")}
            ${shortcut("Ctrl + End", "Về cuối tài liệu")}
            ${shortcut("Ctrl + →", "Sang từ tiếp theo")}
            ${shortcut("Ctrl + ←", "Về từ phía trước")}
          `
        )
      },

      {
        title: "2.6. Chọn văn bản bằng bàn phím",
        content: shortcutGroup(
          "Chọn nhanh",
          `
            ${shortcut("Shift + →", "Chọn từng ký tự sang phải")}
            ${shortcut("Shift + ←", "Chọn từng ký tự sang trái")}
            ${shortcut("Ctrl + Shift + →", "Chọn từng từ sang phải")}
            ${shortcut("Ctrl + Shift + ←", "Chọn từng từ sang trái")}
            ${shortcut("Shift + End", "Chọn đến cuối dòng")}
            ${shortcut("Shift + Home", "Chọn đến đầu dòng")}
            ${shortcut("Ctrl + Shift + End", "Chọn đến cuối tài liệu")}
            ${shortcut("Ctrl + Shift + Home", "Chọn đến đầu tài liệu")}
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
    description: "Nhập văn bản đúng cách, phân biệt Enter/Shift+Enter, xóa nhanh, tìm kiếm và thay thế.",
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
          ${terminologyTable([
            ["Enter", "Tạo đoạn mới", "Kết thúc đoạn hiện tại và tạo Paragraph mới."],
            ["Shift + Enter", "Xuống dòng", "Xuống dòng nhưng vẫn ở cùng một Paragraph."]
          ])}
          ${wordGuide({
            purpose: "Giúp kiểm soát cấu trúc đoạn văn và khoảng cách đúng chuẩn.",
            steps: [
              "Dùng Enter khi bắt đầu một đoạn nội dung mới.",
              "Dùng Shift + Enter khi chỉ muốn xuống dòng trong cùng đoạn, ví dụ địa chỉ hoặc thơ.",
              "Muốn tạo khoảng cách giữa các đoạn, dùng Paragraph Spacing thay vì Enter nhiều lần."
            ],
            warning: "Nhấn Enter liên tục để tạo khoảng trắng dễ làm bố cục thay đổi khi thêm/xóa nội dung."
          })}
        `
      },

      {
        title: "3.2. Xóa văn bản",
        content: `
          ${terminologyTable([
            ["Backspace", "Xóa phía trước con trỏ", "Xóa ký tự nằm bên trái con trỏ."],
            ["Delete", "Xóa phía sau con trỏ", "Xóa ký tự nằm bên phải con trỏ."],
            ["Ctrl + Backspace", "Xóa từ phía trước", "Xóa nhanh cả từ bên trái."],
            ["Ctrl + Delete", "Xóa từ phía sau", "Xóa nhanh cả từ bên phải."]
          ])}
          ${shortcut("Ctrl + Backspace", "Xóa một từ phía trước")}
          ${shortcut("Ctrl + Delete", "Xóa một từ phía sau")}
        `
      },

      {
        title: "3.3. Find — Tìm kiếm",
        content: `
          ${wordGuide({
            purpose: "Tìm nhanh một từ, cụm từ hoặc nội dung trong tài liệu dài.",
            path: [["Home", "Trang đầu"], ["Find", "Tìm"]],
            steps: [
              "Nhấn Ctrl + F.",
              "Nhập từ hoặc cụm từ vào ô Search document.",
              "Word tô sáng các kết quả tìm thấy.",
              "Bấm từng kết quả trong Navigation Pane để chuyển đến vị trí tương ứng."
            ],
            example: "Tài liệu 50 trang: tìm “Microsoft Word” mà không cần đọc từng trang."
          })}
          ${shortcut("Ctrl + F", "Tìm kiếm nội dung")}
        `
      },

      {
        title: "3.4. Replace — Tìm và thay thế",
        content: `
          ${wordGuide({
            purpose: "Thay một từ/cụm từ bằng nội dung khác ở một vị trí hoặc toàn bộ tài liệu.",
            path: [["Home", "Trang đầu"], ["Replace", "Thay thế"]],
            steps: [
              "Nhấn Ctrl + H.",
              "Nhập nội dung cũ vào Find what.",
              "Nhập nội dung mới vào Replace with.",
              "Chọn Find Next để xem từng kết quả.",
              "Chọn Replace để thay từng vị trí hoặc Replace All để thay tất cả.",
              "Đọc thông báo số lần đã thay thế."
            ],
            example: "Find what: Công Ty ABC → Replace with: Công ty ABC.",
            warning: "Với tài liệu quan trọng, nên kiểm tra vài kết quả bằng Replace trước khi dùng Replace All."
          })}
          ${shortcut("Ctrl + H", "Tìm và thay thế")}
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
    description: "Thiết lập Font, Font Size, kiểu chữ, màu, highlight, Change Case và Clear Formatting.",
    keywords: [
      "font",
      "font size",
      "bold",
      "italic",
      "underline",
      "font color",
      "highlight",
      "change case",
      "clear formatting"
    ],
    sections: [
      {
        title: "4.1. Font — Kiểu chữ",
        content: `
          ${wordGuide({
            purpose: "Chọn kiểu chữ cho nội dung hoặc tiêu đề.",
            path: [["Home", "Trang đầu"], ["Font", "Phông chữ"]],
            steps: [
              "Bôi đen nội dung cần đổi font.",
              "Mở Home → nhóm Font.",
              "Bấm hộp tên font.",
              "Nhập hoặc chọn font, ví dụ Times New Roman, Arial, Calibri, Aptos.",
              "Nhấn Enter hoặc chọn font trong danh sách."
            ],
            tip: "Tài liệu chuyên nghiệp nên thống nhất font và ưu tiên dùng Styles thay vì đổi từng đoạn thủ công."
          })}
        `
      },

      {
        title: "4.2. Font Size — Cỡ chữ",
        content: `
          ${wordGuide({
            purpose: "Điều chỉnh kích thước chữ.",
            path: [["Home", "Trang đầu"], ["Font Size", "Cỡ chữ"]],
            steps: [
              "Bôi đen nội dung.",
              "Chọn ô Font Size.",
              "Chọn hoặc nhập cỡ mong muốn.",
              "Nhấn Enter."
            ],
            example: "Cỡ nội dung thường 12–14; tiêu đề lớn có thể 16–24 tùy quy định.",
            warning: "Cỡ chữ chính thức phải theo yêu cầu của cơ quan, trường học hoặc mẫu tài liệu; các số trên chỉ là tham khảo."
          })}
          ${shortcut("Ctrl + Shift + >", "Tăng cỡ chữ")}
          ${shortcut("Ctrl + Shift + <", "Giảm cỡ chữ")}
        `
      },

      {
        title: "4.3. Bold, Italic, Underline",
        content: `
          ${wordGuide({
            purpose: "Nhấn mạnh nội dung bằng in đậm, in nghiêng hoặc gạch chân.",
            path: [["Home", "Trang đầu"], ["Font", "Phông chữ"]],
            steps: [
              "Bôi đen nội dung.",
              "Bấm B (Bold) để in đậm, I (Italic) để in nghiêng hoặc U (Underline) để gạch chân.",
              "Bấm lại nút tương ứng để tắt định dạng."
            ],
            tip: "Không nên dùng quá nhiều kiểu nhấn mạnh trong cùng một đoạn vì sẽ làm tài liệu rối."
          })}
          ${shortcut("Ctrl + B", "In đậm")}
          ${shortcut("Ctrl + I", "In nghiêng")}
          ${shortcut("Ctrl + U", "Gạch chân")}
        `
      },

      {
        title: "4.4. Font Color — Màu chữ",
        content: `
          ${wordGuide({
            path: [["Home", "Trang đầu"], ["Font Color", "Màu phông chữ"]],
            steps: [
              "Bôi đen văn bản.",
              "Bấm mũi tên cạnh Font Color.",
              "Chọn màu trong Theme Colors/Standard Colors.",
              "Dùng More Colors nếu cần màu cụ thể."
            ],
            warning: "Văn bản hành chính/báo cáo thường nên dùng màu chữ thống nhất; không dùng quá nhiều màu nếu không có mục đích rõ ràng."
          })}
        `
      },

      {
        title: "4.5. Text Highlight Color — Tô sáng",
        content: `
          ${wordGuide({
            purpose: "Đánh dấu tạm hoặc làm nổi bật một đoạn giống bút dạ quang.",
            path: [["Home", "Trang đầu"], ["Text Highlight Color", "Màu tô sáng văn bản"]],
            steps: [
              "Chọn nội dung.",
              "Mở Text Highlight Color.",
              "Chọn màu.",
              "Để bỏ highlight, chọn No Color."
            ]
          })}
        `
      },

      {
        title: "4.6. Change Case — Đổi HOA/thường",
        content: `
          ${wordGuide({
            purpose: "Chuyển nhanh chữ thường, CHỮ HOA hoặc Viết Hoa Chữ Đầu.",
            path: [["Home", "Trang đầu"], ["Change Case", "Đổi chữ hoa/thường"]],
            steps: [
              "Bôi đen nội dung.",
              "Bấm Change Case (Aa).",
              "Chọn Sentence case, lowercase, UPPERCASE, Capitalize Each Word hoặc tOGGLE cASE."
            ],
            tip: "Shift + F3 cho phép chuyển vòng qua một số kiểu HOA/thường phổ biến."
          })}
          ${shortcut("Shift + F3", "Đổi HOA / thường")}
        `
      },

      {
        title: "4.7. Clear Formatting — Xóa định dạng",
        content: `
          ${wordGuide({
            purpose: "Loại bỏ định dạng ký tự lộn xộn và đưa văn bản về định dạng cơ bản của Style.",
            path: [["Home", "Trang đầu"], ["Clear All Formatting", "Xóa tất cả định dạng"]],
            steps: [
              "Bôi đen nội dung cần làm sạch.",
              "Bấm Clear All Formatting trong nhóm Font.",
              "Áp lại Style/font theo chuẩn tài liệu nếu cần."
            ],
            tip: "Ctrl + Space xóa phần lớn định dạng ký tự trực tiếp, rất hữu ích khi copy nội dung từ Internet."
          })}
          ${shortcut("Ctrl + Space", "Xóa định dạng ký tự")}
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
    description: "Căn lề, dãn dòng, khoảng cách đoạn và Indent để bố cục văn bản ổn định.",
    keywords: [
      "paragraph",
      "alignment",
      "line spacing",
      "paragraph spacing",
      "indent",
      "first line",
      "hanging indent",
      "ctrl 1",
      "ctrl 2",
      "ctrl 5"
    ],
    sections: [
      {
        title: "5.1. Alignment — Căn đoạn",
        content: `
          ${terminologyTable([
            ["Align Left", "Căn trái", "Nội dung thẳng theo lề trái."],
            ["Center", "Căn giữa", "Thường dùng cho tiêu đề."],
            ["Align Right", "Căn phải", "Có thể dùng cho ngày tháng/chữ ký."],
            ["Justify", "Căn đều hai bên", "Thường dùng cho báo cáo, luận văn, công văn."]
          ])}
          ${wordGuide({
            path: [["Home", "Trang đầu"], ["Paragraph", "Đoạn văn"]],
            steps: [
              "Chọn đoạn cần căn.",
              "Bấm Align Left, Center, Align Right hoặc Justify.",
              "Kiểm tra toàn bộ đoạn sau khi căn."
            ]
          })}
          ${shortcut("Ctrl + L", "Căn trái")}
          ${shortcut("Ctrl + E", "Căn giữa")}
          ${shortcut("Ctrl + R", "Căn phải")}
          ${shortcut("Ctrl + J", "Căn đều hai bên")}
        `
      },

      {
        title: "5.2. Line Spacing — Dãn dòng",
        content: `
          ${wordGuide({
            purpose: "Điều chỉnh khoảng cách giữa các dòng trong cùng một đoạn.",
            path: [["Home", "Trang đầu"], ["Paragraph", "Đoạn văn"], ["Line and Paragraph Spacing", "Giãn dòng và đoạn"]],
            steps: [
              "Chọn đoạn văn.",
              "Bấm Line and Paragraph Spacing.",
              "Chọn 1.0, 1.15, 1.5, 2.0... hoặc Line Spacing Options để thiết lập chi tiết.",
              "Kiểm tra kết quả."
            ],
            warning: "Không tạo dãn dòng bằng cách nhấn Enter."
          })}
          ${shortcut("Ctrl + 1", "Dãn dòng 1.0")}
          ${shortcut("Ctrl + 2", "Dãn dòng 2.0")}
          ${shortcut("Ctrl + 5", "Dãn dòng 1.5")}
        `
      },

      {
        title: "5.3. Paragraph Spacing — Khoảng cách đoạn",
        content: `
          ${terminologyTable([
            ["Before", "Trước đoạn", "Khoảng cách trước Paragraph."],
            ["After", "Sau đoạn", "Khoảng cách sau Paragraph."]
          ])}
          ${wordGuide({
            purpose: "Tạo khoảng cách giữa các đoạn một cách ổn định thay vì chèn dòng trống.",
            path: [["Layout", "Bố trí"], ["Spacing", "Khoảng cách"]],
            steps: [
              "Chọn đoạn văn.",
              "Trong Layout, tìm nhóm Paragraph.",
              "Nhập giá trị Before và After.",
              "Hoặc mở Paragraph Dialog để thiết lập chính xác hơn."
            ],
            tip: "Nếu tài liệu có nhiều đoạn cùng kiểu, nên chỉnh Paragraph Spacing trong Style để áp dụng đồng bộ."
          })}
        `
      },

      {
        title: "5.4. Indent — Thụt lề",
        content: `
          ${terminologyTable([
            ["Left Indent", "Thụt trái", "Dịch toàn bộ đoạn vào từ lề trái."],
            ["Right Indent", "Thụt phải", "Dịch đoạn vào từ lề phải."],
            ["First Line Indent", "Thụt dòng đầu", "Chỉ dòng đầu tiên thụt vào."],
            ["Hanging Indent", "Thụt treo", "Dòng đầu giữ nguyên, các dòng sau thụt vào."]
          ])}
          ${wordGuide({
            purpose: "Tạo bố cục đoạn văn, trích dẫn hoặc danh mục tài liệu tham khảo đúng chuẩn.",
            path: [["Home", "Trang đầu"], ["Paragraph", "Đoạn văn"], ["Paragraph Dialog", "Hộp thoại Đoạn văn"]],
            steps: [
              "Chọn đoạn cần thiết lập.",
              "Mở Paragraph Dialog.",
              "Trong Indentation, nhập Left/Right.",
              "Trong Special, chọn First line hoặc Hanging.",
              "Nhập By để đặt độ thụt.",
              "Bấm OK."
            ],
            warning: "Không dùng nhiều Space để tạo thụt đầu dòng."
          })}
          ${shortcut("Ctrl + M", "Tăng Indent")}
          ${shortcut("Ctrl + Shift + M", "Giảm Indent")}
          ${shortcut("Ctrl + T", "Tạo Hanging Indent")}
          ${shortcut("Ctrl + Shift + T", "Giảm Hanging Indent")}
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
    title: "Bullets, Numbering và Multilevel List",
    level: "CƠ BẢN",
    description: "Tạo danh sách dấu đầu dòng, danh sách đánh số và cấu trúc nhiều cấp cho tài liệu.",
    keywords: [
      "bullet",
      "bullets",
      "numbering",
      "multilevel list",
      "danh sach",
      "danh sach da cap",
      "continue numbering",
      "restart numbering"
    ],
    sections: [
      {
        title: "6.1. Bullets — Dấu đầu dòng",
        content: `
          <p>
            <strong>Bullets</strong> dùng cho các mục ngang hàng, không cần thứ tự trước sau.
          </p>
          ${terminologyTable([
            ["Bullets", "Dấu đầu dòng", "Tạo danh sách không cần thứ tự."],
            ["Bullet Library", "Thư viện dấu đầu dòng", "Chọn kiểu •, ○, ■, ✓..."],
            ["Define New Bullet", "Xác định dấu đầu dòng mới", "Tạo ký hiệu/hình riêng."]
          ])}
          ${wordGuide({
            purpose: "Liệt kê tính năng, yêu cầu, tên phần mềm, vật dụng hoặc các ý ngang hàng.",
            path: [["Home", "Trang đầu"], ["Paragraph", "Đoạn văn"], ["Bullets", "Dấu đầu dòng"]],
            steps: [
              "Nhập mỗi mục trên một dòng hoặc bôi đen các dòng đã có.",
              "Mở Home → nhóm Paragraph.",
              "Bấm Bullets.",
              "Word thêm dấu đầu dòng vào từng đoạn.",
              "Nhấn Enter để tạo bullet tiếp theo; nhấn Enter hai lần để kết thúc danh sách."
            ],
            example: "<ul><li>Microsoft Word</li><li>Microsoft Excel</li><li>Microsoft PowerPoint</li></ul>",
            tip: "Bấm mũi tên ▼ cạnh Bullets để chọn Bullet Library hoặc Define New Bullet.",
            warning: "Không nên tự gõ • hoặc dấu - rồi dùng Space để căn; hãy để Word quản lý danh sách."
          })}
          ${shortcut("Ctrl + Shift + L", "Tạo danh sách Bullets")}
        `
      },

      {
        title: "6.2. Tạo mục con trong Bullets",
        content: `
          ${wordGuide({
            purpose: "Tạo danh sách chính và các mục con.",
            steps: [
              "Đặt con trỏ tại mục cần hạ xuống cấp con.",
              "Nhấn Tab để hạ một cấp.",
              "Nhấn Shift + Tab để đưa mục trở lại cấp trên.",
              "Có thể dùng Increase Indent/Decrease Indent trong nhóm Paragraph."
            ],
            example: "<ul><li>Microsoft Office<ul><li>Word</li><li>Excel</li><li>PowerPoint</li></ul></li></ul>"
          })}
        `
      },

      {
        title: "6.3. Numbering — Đánh số thứ tự",
        content: `
          ${wordGuide({
            purpose: "Tạo danh sách có thứ tự như quy trình, hướng dẫn hoặc các bước thực hiện.",
            path: [["Home", "Trang đầu"], ["Paragraph", "Đoạn văn"], ["Numbering", "Đánh số"]],
            steps: [
              "Nhập các bước, mỗi bước một dòng.",
              "Bôi đen các dòng.",
              "Mở Home → Paragraph → Numbering.",
              "Chọn kiểu 1,2,3; A,B,C; I,II,III... nếu cần.",
              "Nhấn Enter để tạo số tiếp theo; Enter hai lần để thoát."
            ],
            example: "<ol><li>Mở Word.</li><li>Tạo tài liệu.</li><li>Nhập nội dung.</li><li>Lưu tài liệu.</li></ol>"
          })}
        `
      },

      {
        title: "6.4. Continue, Restart và Set Numbering Value",
        content: `
          ${wordGuide({
            purpose: "Kiểm soát số bắt đầu của danh sách.",
            steps: [
              "Nhấp chuột phải vào số đầu danh sách.",
              "Chọn Continue Numbering để tiếp tục số từ danh sách trước.",
              "Chọn Restart at 1 để bắt đầu lại từ 1.",
              "Chọn Set Numbering Value để đặt giá trị bắt đầu tùy ý, ví dụ 5.",
              "Kiểm tra số thứ tự sau khi áp dụng."
            ],
            example: "Danh sách trước kết thúc ở 4 → Continue Numbering → danh sách mới bắt đầu ở 5."
          })}
        `
      },

      {
        title: "6.5. Multilevel List — Danh sách đa cấp",
        content: `
          ${wordGuide({
            purpose: "Tạo cấu trúc 1 → 1.1 → 1.1.1 cho chương, mục và mục con.",
            path: [["Home", "Trang đầu"], ["Paragraph", "Đoạn văn"], ["Multilevel List", "Danh sách đa cấp"]],
            steps: [
              "Đặt con trỏ tại tiêu đề cấp đầu.",
              "Bấm Multilevel List.",
              "Chọn mẫu có dạng 1, 1.1, 1.1.1.",
              "Nhập nội dung cấp 1.",
              "Nhấn Enter rồi Tab để xuống cấp 2.",
              "Nhấn Tab thêm lần nữa để xuống cấp 3.",
              "Dùng Shift + Tab để quay lên cấp trên."
            ],
            example: "<p><strong>1. CHƯƠNG 1</strong><br>1.1. Giới thiệu<br>1.2. Mục tiêu<br>&nbsp;&nbsp;1.2.1. Mục tiêu cụ thể</p>",
            warning: "Với báo cáo/luận văn dài, nên liên kết Multilevel List với Heading 1, Heading 2, Heading 3 thay vì chỉ đánh số thủ công."
          })}
        `
      },

      {
        title: "6.6. Multilevel List kết hợp Heading",
        content: `
          ${wordGuide({
            purpose: "Cho Word hiểu cấu trúc chương/mục để Navigation Pane và Table of Contents hoạt động đúng.",
            steps: [
              "Gán chương bằng Heading 1, mục bằng Heading 2, mục con bằng Heading 3.",
              "Mở Home → Multilevel List.",
              "Chọn mẫu có liên kết Heading 1/Heading 2/Heading 3.",
              "Kiểm tra số chương, mục và cấp con.",
              "Mở Navigation Pane để kiểm tra cấu trúc."
            ],
            result: "Khi thêm/xóa/di chuyển tiêu đề, Word có thể quản lý lại số và mục lục tốt hơn."
          })}
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
    description: "Sử dụng Tab Stop và Ruler để căn nội dung chính xác thay cho việc nhấn Space nhiều lần.",
    keywords: [
      "tab",
      "ruler",
      "space",
      "left tab",
      "center tab",
      "right tab",
      "decimal tab",
      "bar tab"
    ],
    sections: [
      {
        title: "7.1. Không dùng Space để căn chỉnh",
        content: `
          <div class="warning">
            <strong>Sai:</strong> nhấn Space nhiều lần để đẩy nội dung sang phải.
            Khi đổi font hoặc sửa nội dung, vị trí rất dễ lệch.
          </div>
          <div class="note">
            <strong>Đúng:</strong> dùng Tab, Ruler, Table, Paragraph hoặc Alignment.
          </div>
        `
      },

      {
        title: "7.2. Hiển thị Ruler — Thước",
        content: `
          ${wordGuide({
            purpose: "Hiển thị thước để đặt Tab Stop và điều chỉnh Indent.",
            path: [["View", "Xem"], ["Ruler", "Thước"]],
            steps: [
              "Mở tab View (Xem).",
              "Trong nhóm Show, tích Ruler.",
              "Thước ngang xuất hiện phía trên vùng soạn thảo.",
              "Nếu dùng chế độ Print Layout, thước giúp quan sát lề và vị trí Tab rõ hơn."
            ]
          })}
        `
      },

      {
        title: "7.3. Các loại Tab",
        content: `
          ${terminologyTable([
            ["Left Tab", "Tab trái", "Văn bản bắt đầu tại Tab và chạy sang phải."],
            ["Center Tab", "Tab giữa", "Văn bản căn giữa quanh vị trí Tab."],
            ["Right Tab", "Tab phải", "Văn bản kết thúc tại vị trí Tab."],
            ["Decimal Tab", "Tab thập phân", "Căn số theo dấu thập phân."],
            ["Bar Tab", "Tab đường dọc", "Tạo đường thẳng đứng tại vị trí Tab."]
          ])}
        `
      },

      {
        title: "7.4. Đặt Tab bằng Ruler",
        content: `
          ${wordGuide({
            steps: [
              "Bật Ruler.",
              "Bấm Tab Selector ở đầu bên trái thước để chọn loại Tab.",
              "Bấm vào vị trí mong muốn trên Ruler.",
              "Đặt con trỏ trước nội dung.",
              "Nhấn phím Tab để nội dung nhảy đến vị trí đã đặt.",
              "Kéo biểu tượng Tab trên Ruler để đổi vị trí; kéo ra khỏi Ruler để xóa Tab."
            ],
            example: "Họ tên [Tab] Nguyễn Văn A; MSSV [Tab] 123456; Lớp [Tab] CNTT01."
          })}
        `
      },

      {
        title: "7.5. Decimal Tab — Căn số thập phân",
        content: `
          ${wordGuide({
            purpose: "Căn giá tiền, điểm hoặc số liệu theo dấu thập phân.",
            steps: [
              "Chọn Decimal Tab trên Tab Selector.",
              "Bấm vị trí cần căn trên Ruler.",
              "Nhập từng số và nhấn Tab trước số.",
              "Các dấu thập phân sẽ thẳng hàng."
            ],
            example: "<pre>   12.50\n  125.75\n    8.00\n 1250.25</pre>",
            tip: "Nếu dữ liệu thật sự dạng bảng, Table thường ổn định hơn Tab cho danh sách lớn."
          })}
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
    description: "Thiết lập lề, hướng giấy, khổ giấy, Page Break và Section Break.",
    keywords: [
      "page setup",
      "margin",
      "margins",
      "orientation",
      "portrait",
      "landscape",
      "size",
      "a4",
      "page break",
      "section break"
    ],
    sections: [
      {
        title: "8.1. Margins — Lề trang",
        content: `
          ${wordGuide({
            purpose: "Thiết lập khoảng cách giữa nội dung và bốn mép trang.",
            path: [["Layout", "Bố trí"], ["Margins", "Lề"]],
            steps: [
              "Mở Layout → Margins.",
              "Chọn mẫu lề có sẵn như Normal/Narrow/Moderate.",
              "Nếu cần thông số riêng, chọn Custom Margins.",
              "Nhập Top, Bottom, Left, Right.",
              "Chọn Apply to nếu hộp thoại có tùy chọn phạm vi áp dụng.",
              "Bấm OK."
            ],
            warning: "Lề chuẩn phụ thuộc yêu cầu của đơn vị/trường học; không có một bộ số dùng cho mọi tài liệu."
          })}
          ${terminologyTable([
            ["Top", "Trên", "Khoảng cách đến mép trên."],
            ["Bottom", "Dưới", "Khoảng cách đến mép dưới."],
            ["Left", "Trái", "Khoảng cách đến mép trái."],
            ["Right", "Phải", "Khoảng cách đến mép phải."]
          ])}
        `
      },

      {
        title: "8.2. Orientation — Hướng giấy",
        content: `
          ${wordGuide({
            path: [["Layout", "Bố trí"], ["Orientation", "Hướng"]],
            steps: [
              "Mở Layout → Orientation.",
              "Chọn Portrait để dùng trang dọc.",
              "Chọn Landscape để dùng trang ngang."
            ],
            example: "<strong>Portrait:</strong> báo cáo/công văn. <strong>Landscape:</strong> bảng nhiều cột hoặc sơ đồ rộng.",
            warning: "Muốn chỉ xoay một trang giữa tài liệu, phải dùng Section Break trước và sau trang đó."
          })}
        `
      },

      {
        title: "8.3. Size — Khổ giấy",
        content: `
          ${wordGuide({
            path: [["Layout", "Bố trí"], ["Size", "Kích cỡ"]],
            steps: [
              "Mở Layout → Size.",
              "Chọn A4 hoặc khổ giấy được yêu cầu.",
              "Nếu cần kích thước riêng, chọn More Paper Sizes."
            ],
            tip: "A4 là khổ thường gặp trong tài liệu học tập và văn phòng tại Việt Nam."
          })}
        `
      },

      {
        title: "8.4. Page Break — Ngắt trang",
        content: `
          ${wordGuide({
            purpose: "Đưa nội dung tiếp theo sang trang mới đúng cách.",
            path: [["Insert", "Chèn"], ["Page Break", "Ngắt trang"]],
            steps: [
              "Đặt con trỏ trước nội dung cần sang trang mới.",
              "Nhấn Ctrl + Enter hoặc Insert → Page Break.",
              "Word tạo ký hiệu Page Break và chuyển nội dung phía sau sang trang mới."
            ],
            warning: "Không nhấn Enter nhiều lần để sang trang; khi thêm nội dung phía trên, trang sẽ bị lệch."
          })}
          ${shortcut("Ctrl + Enter", "Chèn Page Break")}
        `
      },

      {
        title: "8.5. Section Break — Ngắt phần",
        content: `
          ${wordGuide({
            purpose: "Chia tài liệu thành các phần có thể có lề, hướng giấy, Header/Footer hoặc số trang độc lập.",
            path: [["Layout", "Bố trí"], ["Breaks", "Ngắt"], ["Section Breaks", "Ngắt phần"]],
            steps: [
              "Đặt con trỏ tại vị trí muốn kết thúc Section hiện tại.",
              "Mở Layout → Breaks.",
              "Trong Section Breaks, chọn loại phù hợp.",
              "Bật Show/Hide nếu cần kiểm tra vị trí Section Break."
            ],
            warning: "Page Break chỉ chuyển trang; Section Break mới tạo ranh giới định dạng độc lập."
          })}
          ${terminologyTable([
            ["Next Page", "Trang tiếp theo", "Section mới bắt đầu ở trang kế tiếp."],
            ["Continuous", "Liên tục", "Section mới bắt đầu ngay tại vị trí hiện tại."],
            ["Even Page", "Trang chẵn", "Section mới bắt đầu ở trang chẵn tiếp theo."],
            ["Odd Page", "Trang lẻ", "Section mới bắt đầu ở trang lẻ tiếp theo."]
          ])}
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
    description: "Tạo, kẻ và chỉnh sửa Table: hàng, cột, Merge/Split Cells, AutoFit, Borders, Shading và lặp Header.",
    keywords: [
      "table",
      "bang",
      "ke bang",
      "draw table",
      "insert row",
      "insert column",
      "merge cells",
      "split cells",
      "split table",
      "autofit",
      "borders",
      "shading",
      "repeat header rows"
    ],
    sections: [
      {
        title: "9.1. Cấu trúc bảng",
        content: `
          ${terminologyTable([
            ["Table", "Bảng", "Khối dữ liệu gồm hàng và cột."],
            ["Row", "Hàng", "Các ô nằm theo chiều ngang."],
            ["Column", "Cột", "Các ô nằm theo chiều dọc."],
            ["Cell", "Ô", "Giao điểm của hàng và cột."],
            ["Header Row", "Hàng tiêu đề", "Hàng mô tả tên các cột."]
          ])}
        `
      },

      {
        title: "9.2. Tạo bảng nhanh bằng lưới",
        content: `
          ${wordGuide({
            purpose: "Tạo bảng thông thường nhanh bằng cách chọn số cột × số hàng.",
            path: [["Insert", "Chèn"], ["Table", "Bảng"]],
            steps: [
              "Đặt con trỏ tại vị trí cần chèn bảng.",
              "Mở Insert → Table.",
              "Di chuột trên lưới để chọn số cột × số hàng.",
              "Nhấp chuột để tạo bảng."
            ],
            example: "Bảng STT, Họ tên, MSSV, Lớp, Điểm + 5 sinh viên → 5 cột × 6 hàng."
          })}
        `
      },

      {
        title: "9.3. Insert Table — Tạo bảng bằng hộp thoại",
        content: `
          ${wordGuide({
            path: [["Insert", "Chèn"], ["Table", "Bảng"], ["Insert Table", "Chèn bảng"]],
            steps: [
              "Chọn Insert → Table → Insert Table.",
              "Nhập Number of columns.",
              "Nhập Number of rows.",
              "Chọn AutoFit behavior nếu cần.",
              "Bấm OK."
            ],
            example: "Columns = 10, Rows = 20 để tạo bảng 10 cột × 20 hàng."
          })}
        `
      },

      {
        title: "9.4. Draw Table — Kẻ bảng thủ công",
        content: `
          ${wordGuide({
            purpose: "Vẽ bảng/biểu mẫu có ô kích thước không đều hoặc cấu trúc đặc biệt.",
            path: [["Insert", "Chèn"], ["Table", "Bảng"], ["Draw Table", "Vẽ bảng"]],
            steps: [
              "Chọn Draw Table.",
              "Con trỏ chuyển thành biểu tượng bút.",
              "Kéo chuột để vẽ khung ngoài.",
              "Tiếp tục vẽ các đường chia hàng/cột.",
              "Nhấn Esc khi hoàn tất."
            ],
            warning: "Bảng thông thường nên dùng Insert Table để dễ kiểm soát và chỉnh sửa hơn."
          })}
        `
      },

      {
        title: "9.5. Thêm hàng và cột",
        content: `
          ${wordGuide({
            path: [["Table Layout", "Bố trí bảng"], ["Rows & Columns", "Hàng và cột"]],
            steps: [
              "Đặt con trỏ trong ô gần vị trí cần thêm.",
              "Chọn Insert Above/Insert Below để thêm hàng.",
              "Chọn Insert Left/Insert Right để thêm cột.",
              "Kiểm tra dữ liệu và định dạng sau khi thêm."
            ],
            tip: "Đặt con trỏ ở ô cuối cùng của bảng rồi nhấn Tab thường sẽ thêm một hàng mới."
          })}
        `
      },

      {
        title: "9.6. Xóa ô, hàng, cột hoặc bảng",
        content: `
          ${wordGuide({
            path: [["Table Layout", "Bố trí bảng"], ["Delete", "Xóa"]],
            steps: [
              "Chọn ô/hàng/cột cần xử lý.",
              "Mở Layout → Delete.",
              "Chọn Delete Cells, Delete Columns, Delete Rows hoặc Delete Table.",
              "Xác nhận bố cục sau khi xóa."
            ],
            warning: "Nhấn Delete trên bàn phím thường chỉ xóa nội dung trong ô, không xóa cấu trúc hàng/cột."
          })}
        `
      },

      {
        title: "9.7. Merge Cells — Gộp ô",
        content: `
          ${wordGuide({
            purpose: "Gộp nhiều ô thành một ô lớn, thường dùng cho tiêu đề chung.",
            path: [["Table Layout", "Bố trí bảng"], ["Merge Cells", "Gộp ô"]],
            steps: [
              "Bôi đen các ô cần gộp.",
              "Mở Table Layout.",
              "Bấm Merge Cells.",
              "Nhập nội dung vào ô đã gộp và căn chỉnh."
            ],
            example: "Gộp 5 ô trên cùng để tạo tiêu đề “DANH SÁCH SINH VIÊN”."
          })}
        `
      },

      {
        title: "9.8. Split Cells và Split Table",
        content: `
          ${wordGuide({
            purpose: "Chia một ô thành nhiều ô hoặc tách một bảng thành hai bảng.",
            steps: [
              "Để chia ô: chọn ô → Table Layout → Split Cells.",
              "Nhập Number of columns và Number of rows → OK.",
              "Để tách bảng: đặt con trỏ tại hàng muốn trở thành đầu bảng mới.",
              "Chọn Table Layout → Split Table."
            ],
            example: "Split Cells: Columns = 2, Rows = 2 → một ô được chia thành 4 ô."
          })}
        `
      },

      {
        title: "9.9. AutoFit — Tự động chỉnh kích thước",
        content: `
          ${wordGuide({
            path: [["Table Layout", "Bố trí bảng"], ["AutoFit", "Tự động điều chỉnh"]],
            steps: [
              "Chọn bảng.",
              "Mở Layout → AutoFit.",
              "Chọn chế độ phù hợp."
            ]
          })}
          ${terminologyTable([
            ["AutoFit Contents", "Theo nội dung", "Cột thay đổi theo nội dung."],
            ["AutoFit Window", "Theo cửa sổ", "Bảng giãn vừa chiều rộng trang."],
            ["Fixed Column Width", "Chiều rộng cố định", "Giữ chiều rộng cột ổn định."]
          ])}
        `
      },

      {
        title: "9.10. Distribute Rows/Columns và căn nội dung",
        content: `
          ${wordGuide({
            steps: [
              "Bôi đen các hàng/cột cần căn đều.",
              "Chọn Distribute Rows để các hàng có chiều cao bằng nhau.",
              "Chọn Distribute Columns để các cột có chiều rộng bằng nhau.",
              "Trong nhóm Alignment, chọn vị trí căn chữ trong ô: trên/giữa/dưới và trái/giữa/phải."
            ],
            example: "STT và Điểm thường căn giữa; Họ tên thường căn trái."
          })}
        `
      },

      {
        title: "9.11. Borders và Shading",
        content: `
          ${wordGuide({
            purpose: "Thiết kế đường viền và nền cho bảng.",
            path: [["Table Design", "Thiết kế bảng"], ["Borders / Shading", "Đường viền / Tô nền"]],
            steps: [
              "Chọn bảng hoặc các ô.",
              "Dùng Borders để chọn All Borders, Outside Borders, Inside Borders, No Border...",
              "Dùng Shading để tô màu nền cho Header hoặc ô cần nhấn mạnh.",
              "Nếu cần, chỉnh Pen Style/Weight/Color trước khi áp dụng Borders."
            ],
            warning: "Không nên dùng quá nhiều màu hoặc đường viền dày; ưu tiên bảng dễ đọc."
          })}
        `
      },

      {
        title: "9.12. Repeat Header Rows — Lặp hàng tiêu đề",
        content: `
          ${wordGuide({
            purpose: "Lặp hàng tiêu đề ở đầu mỗi trang khi bảng dài qua nhiều trang.",
            path: [["Table Layout", "Bố trí bảng"], ["Repeat Header Rows", "Lặp hàng tiêu đề"]],
            steps: [
              "Chọn hàng tiêu đề đầu bảng.",
              "Mở Table Layout.",
              "Bấm Repeat Header Rows.",
              "Cuộn sang trang tiếp theo để kiểm tra."
            ],
            tip: "Rất hữu ích cho danh sách dài, phụ lục và báo cáo nhiều trang."
          })}
        `
      },

      {
        title: "9.13. Bảng bị tràn khỏi trang",
        content: `
          ${wordGuide({
            steps: [
              "Chọn bảng → Table Layout → AutoFit → AutoFit Window.",
              "Kiểm tra chiều rộng cột và cỡ chữ.",
              "Nếu bảng quá nhiều cột, cân nhắc dùng Section Break và xoay riêng trang đó sang Landscape.",
              "Kiểm tra lại khi xuất PDF."
            ]
          })}
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
    title: "Chèn và xử lý hình ảnh",
    level: "TRUNG CẤP",
    description: "Chèn ảnh, thay đổi kích thước, Wrap Text, Position, Crop, Screenshot, Compress Pictures và Alt Text.",
    keywords: [
      "picture",
      "image",
      "hinh anh",
      "insert pictures",
      "resize",
      "wrap text",
      "position",
      "crop",
      "screenshot",
      "compress pictures",
      "alt text"
    ],
    sections: [
      {
        title: "10.1. Insert Pictures — Chèn ảnh",
        content: `
          ${wordGuide({
            purpose: "Chèn ảnh minh họa, ảnh chụp, logo hoặc sơ đồ vào tài liệu.",
            path: [["Insert", "Chèn"], ["Pictures", "Ảnh"]],
            steps: [
              "Đặt con trỏ tại vị trí cần chèn.",
              "Mở Insert → Pictures.",
              "Chọn nguồn ảnh: This Device, Stock Images hoặc Online Pictures (nếu phiên bản hỗ trợ).",
              "Chọn ảnh.",
              "Bấm Insert."
            ],
            result: "Ảnh được chèn vào tài liệu."
          })}
          ${terminologyTable([
            ["This Device", "Thiết bị này", "Chèn ảnh từ máy tính."],
            ["Stock Images", "Ảnh có sẵn", "Dùng thư viện ảnh Microsoft."],
            ["Online Pictures", "Ảnh trực tuyến", "Tìm ảnh trực tuyến nếu phiên bản hỗ trợ."]
          ])}
        `
      },

      {
        title: "10.2. Resize — Thay đổi kích thước",
        content: `
          ${wordGuide({
            steps: [
              "Nhấp vào ảnh.",
              "Đưa chuột đến điểm điều khiển ở góc.",
              "Kéo vào trong để thu nhỏ hoặc kéo ra ngoài để phóng to.",
              "Nếu cần số chính xác, dùng Height/Width trong Picture Format."
            ],
            warning: "Ưu tiên kéo ở góc để giữ tỷ lệ; kéo riêng cạnh ngang/dọc có thể làm ảnh méo."
          })}
        `
      },

      {
        title: "10.3. Wrap Text — Chữ bao quanh ảnh",
        content: `
          ${wordGuide({
            purpose: "Quy định cách văn bản nằm quanh hoặc chồng lên hình.",
            path: [["Picture Format", "Định dạng ảnh"], ["Wrap Text", "Ngắt dòng văn bản"]],
            steps: [
              "Chọn ảnh.",
              "Mở Picture Format → Wrap Text.",
              "Chọn kiểu bố trí phù hợp.",
              "Kiểm tra ảnh khi thêm/xóa văn bản xung quanh."
            ],
            tip: "In Line with Text thường ổn định nhất khi làm báo cáo/luận văn."
          })}
          ${terminologyTable([
            ["In Line with Text", "Cùng dòng với văn bản", "Ảnh hoạt động gần giống một ký tự."],
            ["Square", "Vuông", "Chữ chạy quanh khung chữ nhật của ảnh."],
            ["Tight", "Khít", "Chữ bám sát hình hơn."],
            ["Top and Bottom", "Trên và dưới", "Chữ chỉ nằm trên và dưới ảnh."],
            ["Behind Text", "Phía sau văn bản", "Ảnh nằm sau chữ."],
            ["In Front of Text", "Phía trước văn bản", "Ảnh nằm đè lên chữ."]
          ])}
        `
      },

      {
        title: "10.4. Position — Vị trí ảnh",
        content: `
          ${wordGuide({
            path: [["Picture Format", "Định dạng ảnh"], ["Position", "Vị trí"]],
            steps: [
              "Chọn ảnh.",
              "Mở Picture Format → Position.",
              "Chọn vị trí có sẵn hoặc More Layout Options để chỉnh chi tiết.",
              "Kiểm tra lại Anchor/Wrap Text nếu ảnh di chuyển không như mong muốn."
            ],
            note: "Position phát huy tác dụng rõ hơn khi ảnh không ở chế độ In Line with Text."
          })}
        `
      },

      {
        title: "10.5. Crop — Cắt ảnh",
        content: `
          ${wordGuide({
            purpose: "Loại bỏ phần thừa của hình.",
            path: [["Picture Format", "Định dạng ảnh"], ["Crop", "Cắt"]],
            steps: [
              "Chọn ảnh → Picture Format → Crop.",
              "Kéo các tay nắm màu đen vào trong để cắt phần thừa.",
              "Nhấn Enter hoặc bấm ra ngoài ảnh để hoàn tất.",
              "Có thể dùng Crop to Shape/Aspect Ratio nếu cần."
            ]
          })}
        `
      },

      {
        title: "10.6. Screenshot — Chụp màn hình",
        content: `
          ${wordGuide({
            purpose: "Chèn nhanh ảnh cửa sổ đang mở hoặc chụp một vùng màn hình.",
            path: [["Insert", "Chèn"], ["Screenshot", "Ảnh chụp màn hình"]],
            steps: [
              "Mở Insert → Screenshot.",
              "Chọn cửa sổ trong Available Windows hoặc chọn Screen Clipping.",
              "Nếu chọn Screen Clipping, kéo chuột khoanh vùng cần chụp.",
              "Ảnh được chèn trực tiếp vào Word."
            ],
            tip: "Hữu ích khi làm giáo trình, hướng dẫn sử dụng và báo cáo thực hành."
          })}
        `
      },

      {
        title: "10.7. Compress Pictures — Nén ảnh",
        content: `
          ${wordGuide({
            purpose: "Giảm dung lượng file Word khi tài liệu chứa nhiều ảnh.",
            path: [["Picture Format", "Định dạng ảnh"], ["Compress Pictures", "Nén ảnh"]],
            steps: [
              "Chọn một ảnh.",
              "Bấm Compress Pictures.",
              "Chọn có áp dụng cho ảnh hiện tại hay toàn bộ ảnh nếu tùy chọn xuất hiện.",
              "Chọn độ phân giải phù hợp.",
              "Bấm OK và kiểm tra chất lượng."
            ],
            warning: "Nén quá mạnh có thể làm ảnh mờ khi in hoặc phóng to."
          })}
        `
      },

      {
        title: "10.8. Alt Text — Văn bản thay thế",
        content: `
          ${wordGuide({
            purpose: "Mô tả hình ảnh cho khả năng truy cập và trình đọc màn hình.",
            steps: [
              "Nhấp chuột phải vào ảnh.",
              "Chọn View/Edit Alt Text tùy phiên bản.",
              "Viết mô tả ngắn gọn, nêu thông tin quan trọng của hình.",
              "Nếu hình chỉ mang tính trang trí, dùng tùy chọn đánh dấu Decorative nếu phù hợp."
            ],
            tip: "Tài liệu công khai/chuyên nghiệp nên bổ sung Alt Text cho hình có ý nghĩa."
          })}
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
    title: "Shapes, Icons, SmartArt và Text Box",
    level: "TRUNG CẤP",
    description: "Sử dụng các đối tượng đồ họa để tạo sơ đồ, hộp nội dung, biểu tượng và quy trình.",
    keywords: [
      "shapes",
      "icons",
      "smartart",
      "text box",
      "flowchart",
      "group",
      "align objects"
    ],
    sections: [
      {
        title: "11.1. Shapes — Hình dạng",
        content: `
          ${wordGuide({
            purpose: "Vẽ hình chữ nhật, hình tròn, mũi tên, đường thẳng, ký hiệu Flowchart...",
            path: [["Insert", "Chèn"], ["Shapes", "Hình dạng"]],
            steps: [
              "Mở Insert → Shapes.",
              "Chọn hình cần sử dụng.",
              "Nhấn giữ chuột và kéo trên trang để vẽ.",
              "Chọn Shape để mở Shape Format.",
              "Dùng Shape Fill để đổi màu nền, Shape Outline để chỉnh đường viền.",
              "Dùng Shape Effects khi cần hiệu ứng."
            ],
            tip: "Giữ Shift khi vẽ để tạo hình vuông/tròn cân đối hoặc đường thẳng theo góc cố định."
          })}
        `
      },

      {
        title: "11.2. Icons — Biểu tượng",
        content: `
          ${wordGuide({
            purpose: "Chèn biểu tượng vector có sẵn của Microsoft 365.",
            path: [["Insert", "Chèn"], ["Icons", "Biểu tượng"]],
            steps: [
              "Mở Insert → Icons.",
              "Tìm biểu tượng theo từ khóa hoặc danh mục.",
              "Chọn một hay nhiều biểu tượng.",
              "Bấm Insert.",
              "Dùng Graphics Format để đổi màu/kích thước nếu phiên bản hỗ trợ."
            ],
            note: "Một số phiên bản Office cũ có thể không có mục Icons."
          })}
        `
      },

      {
        title: "11.3. Text Box — Hộp văn bản",
        content: `
          ${wordGuide({
            purpose: "Tạo một vùng văn bản có thể di chuyển độc lập.",
            path: [["Insert", "Chèn"], ["Text Box", "Hộp văn bản"]],
            steps: [
              "Mở Insert → Text Box.",
              "Chọn mẫu có sẵn hoặc Draw Text Box.",
              "Kéo chuột để tạo hộp.",
              "Nhập nội dung.",
              "Dùng Shape Format để chỉnh Fill, Outline và Wrap Text."
            ],
            example: "Dùng Text Box để tạo hộp LƯU Ý, MẸO, CẢNH BÁO hoặc thông tin bên lề."
          })}
        `
      },

      {
        title: "11.4. SmartArt — Sơ đồ",
        content: `
          ${wordGuide({
            purpose: "Tạo nhanh sơ đồ quy trình, phân cấp, chu kỳ, quan hệ hoặc danh sách.",
            path: [["Insert", "Chèn"], ["SmartArt", "SmartArt"]],
            steps: [
              "Mở Insert → SmartArt.",
              "Chọn nhóm như List, Process, Cycle, Hierarchy, Relationship...",
              "Chọn mẫu và bấm OK.",
              "Nhập nội dung vào Text Pane hoặc trực tiếp trên các Shape.",
              "Dùng SmartArt Design để thêm Shape, đổi Layout hoặc màu."
            ],
            example: "Tiếp nhận → Xử lý → Kiểm tra → Phê duyệt → Hoàn thành."
          })}
        `
      },

      {
        title: "11.5. Align, Distribute và Group",
        content: `
          ${wordGuide({
            purpose: "Căn và di chuyển nhiều đối tượng chính xác thay vì căn bằng mắt.",
            steps: [
              "Giữ Ctrl và chọn nhiều Shape/Icon/Text Box.",
              "Mở Shape Format/Graphics Format.",
              "Chọn Align để căn trái, phải, giữa, trên hoặc dưới.",
              "Dùng Distribute Horizontally/Vertically để giãn đều.",
              "Chọn Group → Group để gộp các đối tượng.",
              "Dùng Ungroup khi cần chỉnh từng đối tượng."
            ],
            tip: "Group rất hữu ích khi đã hoàn thiện một sơ đồ và muốn di chuyển toàn bộ như một khối."
          })}
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
    description: "Tạo đầu trang, chân trang, số trang và các tùy chọn trang đầu/trang chẵn lẻ.",
    keywords: [
      "header",
      "footer",
      "page number",
      "different first page",
      "different odd even",
      "format page numbers"
    ],
    sections: [
      {
        title: "12.1. Header — Đầu trang",
        content: `
          ${wordGuide({
            purpose: "Hiển thị tên tài liệu, công ty, chương hoặc logo lặp lại ở đầu các trang.",
            path: [["Insert", "Chèn"], ["Header", "Đầu trang"]],
            steps: [
              "Mở Insert → Header.",
              "Chọn mẫu Header hoặc Edit Header.",
              "Nhập nội dung/chèn logo.",
              "Định dạng font và căn lề.",
              "Bấm Close Header and Footer hoặc nhấp đúp vùng nội dung để thoát."
            ]
          })}
        `
      },

      {
        title: "12.2. Footer — Chân trang",
        content: `
          ${wordGuide({
            purpose: "Hiển thị số trang, thông tin liên hệ hoặc ghi chú ở cuối các trang.",
            path: [["Insert", "Chèn"], ["Footer", "Chân trang"]],
            steps: [
              "Mở Insert → Footer.",
              "Chọn mẫu hoặc Edit Footer.",
              "Nhập nội dung.",
              "Định dạng và đóng Header/Footer."
            ]
          })}
        `
      },

      {
        title: "12.3. Page Number — Số trang",
        content: `
          ${wordGuide({
            purpose: "Đánh số trang tự động.",
            path: [["Insert", "Chèn"], ["Page Number", "Số trang"]],
            steps: [
              "Mở Insert → Page Number.",
              "Chọn Top of Page, Bottom of Page, Page Margins hoặc Current Position.",
              "Chọn mẫu hiển thị.",
              "Đóng Header/Footer."
            ],
            result: "Word tự cập nhật số trang khi thêm hoặc xóa trang."
          })}
        `
      },

      {
        title: "12.4. Different First Page — Trang đầu khác",
        content: `
          ${wordGuide({
            purpose: "Ẩn Header/Footer hoặc số trang ở trang bìa.",
            steps: [
              "Nhấp đúp Header hoặc Footer.",
              "Trong tab Header & Footer, tích Different First Page.",
              "Xóa nội dung/số trang ở vùng Header/Footer của trang đầu nếu cần.",
              "Kiểm tra trang 2 trở đi."
            ],
            example: "Trang bìa không có số, các trang sau vẫn có số trang."
          })}
        `
      },

      {
        title: "12.5. Different Odd & Even Pages",
        content: `
          ${wordGuide({
            purpose: "Tạo Header/Footer khác nhau cho trang chẵn và trang lẻ, thường dùng khi in sách hai mặt.",
            steps: [
              "Mở Header/Footer.",
              "Tích Different Odd & Even Pages.",
              "Nhập Header/Footer cho một trang lẻ.",
              "Chuyển sang trang chẵn và nhập nội dung riêng.",
              "Kiểm tra khi xem Print Preview."
            ]
          })}
        `
      },

      {
        title: "12.6. Format Page Numbers — Định dạng số trang",
        content: `
          ${wordGuide({
            path: [["Insert", "Chèn"], ["Page Number", "Số trang"], ["Format Page Numbers", "Định dạng số trang"]],
            steps: [
              "Mở Format Page Numbers.",
              "Chọn Number format: 1,2,3 hoặc i,ii,iii...",
              "Chọn Continue from previous section nếu tiếp tục số.",
              "Hoặc chọn Start at và nhập số bắt đầu.",
              "Bấm OK."
            ],
            note: "Để mỗi phần có kiểu số khác nhau, tài liệu phải được chia Section và thường cần tắt Link to Previous."
          })}
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
    title: "Styles và Heading",
    level: "NÂNG CAO",
    description: "Sử dụng Styles và Heading để quản lý định dạng và cấu trúc tài liệu dài.",
    keywords: [
      "style",
      "styles",
      "heading",
      "heading 1",
      "heading 2",
      "heading 3",
      "modify style",
      "navigation"
    ],
    sections: [
      {
        title: "13.1. Style là gì?",
        content: `
          <p>
            <strong>Style</strong> là bộ định dạng lưu sẵn gồm font, cỡ chữ, màu,
            Paragraph Spacing, căn lề và nhiều thuộc tính khác.
          </p>
          ${terminologyTable([
            ["Normal", "Bình thường", "Style cơ bản cho nội dung."],
            ["Title", "Tiêu đề tài liệu", "Dùng cho tên tài liệu."],
            ["Heading 1", "Tiêu đề cấp 1", "Chương/phần lớn."],
            ["Heading 2", "Tiêu đề cấp 2", "Mục."],
            ["Heading 3", "Tiêu đề cấp 3", "Mục con."]
          ])}
        `
      },

      {
        title: "13.2. Vì sao phải dùng Heading?",
        content: `
          <p>
            Heading không chỉ làm chữ to/đậm. Heading giúp Word
            <strong>hiểu cấu trúc tài liệu</strong>.
          </p>
          <ul>
            <li>Hiển thị đúng trong Navigation Pane.</li>
            <li>Tạo Table of Contents tự động.</li>
            <li>Tạo Cross-reference đến tiêu đề.</li>
            <li>Kết hợp Multilevel List để đánh số chương/mục.</li>
            <li>Chỉnh toàn bộ tiêu đề nhanh bằng Modify Style.</li>
          </ul>
          <div class="warning">
            Không nên chỉ tăng Font Size + Bold để giả làm Heading trong tài liệu dài.
          </div>
        `
      },

      {
        title: "13.3. Áp dụng Heading",
        content: `
          ${wordGuide({
            path: [["Home", "Trang đầu"], ["Styles", "Kiểu"]],
            steps: [
              "Đặt con trỏ trong dòng tiêu đề.",
              "Chọn Heading 1 cho chương.",
              "Chọn Heading 2 cho mục.",
              "Chọn Heading 3 cho mục con.",
              "Mở Navigation Pane để kiểm tra cấp tiêu đề."
            ]
          })}
        `
      },

      {
        title: "13.4. Modify Style — Chỉnh Style",
        content: `
          ${wordGuide({
            purpose: "Chỉnh một Style và cập nhật đồng loạt tất cả đoạn đang dùng Style đó.",
            steps: [
              "Trong Home → Styles, nhấp chuột phải vào Style.",
              "Chọn Modify.",
              "Chỉnh Font, Size, Bold, màu, Alignment.",
              "Bấm Format để chỉnh Paragraph, Numbering hoặc thuộc tính khác.",
              "Chọn tùy chọn áp dụng cho tài liệu hiện tại hoặc template nếu phù hợp.",
              "Bấm OK."
            ],
            result: "Các đoạn sử dụng Style được cập nhật đồng bộ.",
            tip: "Đây là cách quản lý định dạng chuyên nghiệp hơn việc sửa từng tiêu đề."
          })}
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
    description: "Tạo, tùy chỉnh và cập nhật Table of Contents dựa trên hệ thống Heading.",
    keywords: [
      "muc luc",
      "table of contents",
      "heading",
      "update table",
      "custom table of contents"
    ],
    sections: [
      {
        title: "14.1. Điều kiện trước khi tạo mục lục",
        content: `
          <p>Tiêu đề cần được gán Heading đúng cấp:</p>
          <ul>
            <li>Heading 1 — Chương/phần lớn.</li>
            <li>Heading 2 — Mục.</li>
            <li>Heading 3 — Mục con.</li>
          </ul>
          <div class="warning">
            Nếu tiêu đề chỉ được Bold/đổi cỡ chữ mà không dùng Heading,
            mục lục tự động có thể không nhận diện.
          </div>
        `
      },

      {
        title: "14.2. Chèn Table of Contents — Mục lục",
        content: `
          ${wordGuide({
            path: [["References", "Tham chiếu"], ["Table of Contents", "Mục lục"]],
            steps: [
              "Đặt con trỏ tại trang muốn đặt mục lục.",
              "Mở References.",
              "Bấm Table of Contents.",
              "Chọn Automatic Table 1/2 hoặc mẫu tự động.",
              "Word tạo mục lục từ Heading."
            ],
            result: "Tên tiêu đề và số trang được đưa vào mục lục tự động."
          })}
        `
      },

      {
        title: "14.3. Cập nhật mục lục",
        content: `
          ${wordGuide({
            steps: [
              "Nhấp vào mục lục.",
              "Bấm Update Table.",
              "Chọn Update page numbers only nếu chỉ thay đổi vị trí trang.",
              "Chọn Update entire table nếu có thêm/xóa/đổi tên tiêu đề.",
              "Bấm OK."
            ],
            tip: "Trước khi xuất PDF, nên dùng Update entire table để tránh thiếu tiêu đề."
          })}
        `
      },

      {
        title: "14.4. Custom Table of Contents",
        content: `
          ${wordGuide({
            purpose: "Tùy chỉnh số cấp Heading, dấu chấm dẫn và cách hiển thị số trang.",
            path: [["References", "Tham chiếu"], ["Table of Contents", "Mục lục"], ["Custom Table of Contents", "Mục lục tùy chỉnh"]],
            steps: [
              "Mở Custom Table of Contents.",
              "Chọn Show page numbers nếu cần hiện số trang.",
              "Chọn Right align page numbers để căn số trang bên phải.",
              "Chọn Tab leader.",
              "Thiết lập Show levels để chọn số cấp Heading.",
              "Bấm OK."
            ]
          })}
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
    title: "Caption và danh mục hình/bảng",
    level: "NÂNG CAO",
    description: "Đánh số tự động cho hình, bảng và tạo Table of Figures.",
    keywords: [
      "caption",
      "insert caption",
      "hinh 1",
      "bang 1",
      "new label",
      "table of figures",
      "danh muc hinh"
    ],
    sections: [
      {
        title: "15.1. Caption là gì?",
        content: `
          <p>
            <strong>Caption (Chú thích)</strong> giúp Word tự quản lý tên và số
            thứ tự của hình, bảng hoặc đối tượng.
          </p>
          <div class="lesson-example">
            <p>Hình 1. Kiến trúc hệ thống</p>
            <p>Hình 2. Giao diện đăng nhập</p>
            <p>Bảng 1. Danh sách sinh viên</p>
          </div>
        `
      },

      {
        title: "15.2. Chèn Caption",
        content: `
          ${wordGuide({
            path: [["References", "Tham chiếu"], ["Insert Caption", "Chèn chú thích"]],
            steps: [
              "Chọn hình hoặc bảng.",
              "Mở References → Insert Caption.",
              "Chọn Label phù hợp.",
              "Nhập nội dung chú thích phía sau số.",
              "Chọn Position: Above selected item hoặc Below selected item.",
              "Bấm OK."
            ],
            result: "Caption được Word đánh số tự động."
          })}
        `
      },

      {
        title: "15.3. Tạo Label tiếng Việt",
        content: `
          ${wordGuide({
            steps: [
              "Mở Insert Caption.",
              "Bấm New Label.",
              "Nhập “Hình” hoặc “Bảng”.",
              "Bấm OK.",
              "Chọn Label mới khi tạo Caption."
            ]
          })}
        `
      },

      {
        title: "15.4. Tại sao không nên tự gõ số hình?",
        content: `
          <p>
            Nếu tự gõ “Hình 1, Hình 2...” bằng tay, khi chèn thêm hình ở giữa
            bạn phải sửa các số phía sau. Caption giúp Word quản lý số thứ tự.
          </p>
          <div class="note">
            Sau khi thay đổi nhiều Caption, có thể Ctrl + A rồi F9 để cập nhật Field.
          </div>
        `
      },

      {
        title: "15.5. Table of Figures — Danh mục hình",
        content: `
          ${wordGuide({
            purpose: "Tạo danh sách tự động các hình hoặc bảng đã gắn Caption.",
            path: [["References", "Tham chiếu"], ["Insert Table of Figures", "Chèn danh mục hình"]],
            steps: [
              "Đảm bảo các hình đã có Caption.",
              "Đặt con trỏ tại vị trí cần danh mục.",
              "Mở References → Insert Table of Figures.",
              "Chọn Caption label cần thống kê.",
              "Bấm OK.",
              "Khi Caption thay đổi, nhấp vào danh mục và Update Field."
            ]
          })}
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
    description: "Tạo tham chiếu chéo tự động đến Heading, hình, bảng, Footnote hoặc Bookmark.",
    keywords: [
      "cross reference",
      "tham chieu",
      "bookmark",
      "heading",
      "figure",
      "table",
      "f9"
    ],
    sections: [
      {
        title: "16.1. Cross-reference là gì?",
        content: `
          <p>
            <strong>Cross-reference (Tham chiếu chéo)</strong> chèn một Field tham chiếu
            đến đối tượng khác trong cùng tài liệu.
          </p>
          <p>Có thể tham chiếu đến Heading, Figure, Table, Footnote, Endnote, Bookmark...</p>
          <div class="lesson-example">
            “Xem <strong>Hình 5</strong> để biết thêm chi tiết.”
          </div>
        `
      },

      {
        title: "16.2. Chèn Cross-reference",
        content: `
          ${wordGuide({
            path: [["References", "Tham chiếu"], ["Cross-reference", "Tham chiếu chéo"]],
            steps: [
              "Đặt con trỏ tại vị trí cần tham chiếu.",
              "Mở References → Cross-reference.",
              "Trong Reference type, chọn Heading/Figure/Table...",
              "Trong Insert reference to, chọn nội dung muốn hiển thị.",
              "Chọn đối tượng cần tham chiếu.",
              "Tích Insert as hyperlink nếu muốn có liên kết.",
              "Bấm Insert."
            ],
            result: "Tham chiếu được chèn dưới dạng Field và có thể cập nhật."
          })}
        `
      },

      {
        title: "16.3. Cập nhật Cross-reference",
        content: `
          ${wordGuide({
            steps: [
              "Chọn Cross-reference cần cập nhật và nhấn F9.",
              "Muốn cập nhật nhiều Field trong phần nội dung chính, dùng Ctrl + A rồi F9.",
              "Kiểm tra lại số hình, số bảng và số trang sau khi cập nhật."
            ],
            example: "Nếu Hình 5 trở thành Hình 6, Cross-reference có thể cập nhật theo."
          })}
          ${shortcut("F9", "Cập nhật Field")}
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
    description: "Tạo chú thích cuối trang hoặc cuối tài liệu/phần.",
    keywords: [
      "footnote",
      "endnote",
      "chu thich",
      "insert footnote",
      "insert endnote"
    ],
    sections: [
      {
        title: "17.1. Footnote — Chú thích cuối trang",
        content: `
          ${wordGuide({
            purpose: "Bổ sung giải thích, nguồn hoặc ghi chú ở cuối trang đang chứa ký hiệu.",
            path: [["References", "Tham chiếu"], ["Insert Footnote", "Chèn chú thích cuối trang"]],
            steps: [
              "Đặt con trỏ ngay sau từ/câu cần chú thích.",
              "Chọn References → Insert Footnote hoặc nhấn Alt + Ctrl + F.",
              "Word tạo số chú thích và đưa con trỏ xuống cuối trang.",
              "Nhập nội dung Footnote."
            ],
            tip: "Word tự quản lý số Footnote khi thêm/xóa chú thích."
          })}
          ${shortcut("Alt + Ctrl + F", "Chèn Footnote")}
        `
      },

      {
        title: "17.2. Endnote — Chú thích cuối tài liệu/phần",
        content: `
          ${wordGuide({
            purpose: "Tập trung chú thích ở cuối tài liệu hoặc cuối Section.",
            path: [["References", "Tham chiếu"], ["Insert Endnote", "Chèn chú thích cuối"]],
            steps: [
              "Đặt con trỏ tại vị trí cần ký hiệu.",
              "Chọn Insert Endnote hoặc nhấn Alt + Ctrl + D.",
              "Nhập nội dung Endnote tại vùng Word đưa con trỏ đến."
            ]
          })}
          ${shortcut("Alt + Ctrl + D", "Chèn Endnote")}
        `
      },

      {
        title: "17.3. Tùy chỉnh Footnote/Endnote",
        content: `
          ${wordGuide({
            steps: [
              "Trong References, mở Footnotes Dialog bằng nút mũi tên nhỏ của nhóm Footnotes.",
              "Chọn Footnotes hoặc Endnotes.",
              "Chọn Number format.",
              "Thiết lập Start at/Numbering nếu cần.",
              "Chọn Apply."
            ],
            warning: "Yêu cầu trình bày chú thích khác nhau giữa các chuẩn học thuật; hãy theo quy định tài liệu của bạn."
          })}
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
    description: "Tìm và thay thế theo định dạng, ký tự đặc biệt và điều kiện nâng cao.",
    keywords: [
      "find replace",
      "ctrl h",
      "more",
      "format",
      "special",
      "replace all",
      "paragraph mark"
    ],
    sections: [
      {
        title: "18.1. Mở tùy chọn nâng cao",
        content: `
          ${wordGuide({
            steps: [
              "Nhấn Ctrl + H.",
              "Bấm More để mở các tùy chọn nâng cao.",
              "Dùng Match case nếu cần phân biệt HOA/thường.",
              "Dùng Find whole words only để chỉ tìm từ nguyên vẹn."
            ]
          })}
          ${shortcut("Ctrl + H", "Mở Find & Replace")}
        `
      },

      {
        title: "18.2. Tìm/thay theo định dạng",
        content: `
          ${wordGuide({
            purpose: "Tìm văn bản có Font/Bold/Paragraph cụ thể và thay định dạng mà không cần đổi nội dung.",
            steps: [
              "Mở Ctrl + H → More.",
              "Đặt con trỏ trong Find what.",
              "Bấm Format và chọn Font/Paragraph/Style...",
              "Thiết lập điều kiện định dạng cần tìm.",
              "Đặt con trỏ trong Replace with.",
              "Bấm Format và chọn định dạng mới.",
              "Dùng Find Next/Replace để kiểm tra trước khi Replace All."
            ],
            example: "Tìm toàn bộ chữ Bold màu đỏ và đổi về màu đen."
          })}
        `
      },

      {
        title: "18.3. Special — Ký tự đặc biệt",
        content: `
          ${wordGuide({
            purpose: "Tìm Paragraph Mark, Tab, Manual Line Break, Page Break và các ký tự đặc biệt.",
            steps: [
              "Mở Find & Replace → More.",
              "Bấm Special.",
              "Chọn ký tự cần tìm.",
              "Thiết lập Replace with phù hợp.",
              "Kiểm tra từng kết quả trước khi thay hàng loạt."
            ],
            example: "Tìm hai Paragraph Mark liên tiếp và thay bằng một Paragraph Mark để giảm dòng trống thừa.",
            warning: "Replace All với ký tự định dạng có thể làm thay đổi bố cục lớn; nên lưu bản sao trước."
          })}
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
    description: "Bộ phím tắt dùng khi soạn thảo và xử lý tài liệu chuyên nghiệp.",
    keywords: [
      "ctrl enter",
      "ctrl g",
      "ctrl k",
      "ctrl m",
      "ctrl t",
      "ctrl q",
      "f4",
      "f7",
      "f9",
      "footnote",
      "endnote"
    ],
    sections: [
      {
        title: "19.1. Bố cục và điều hướng",
        content: shortcutGroup(
          "Bố cục · Điều hướng",
          `
            ${shortcut("Ctrl + Enter", "Page Break")}
            ${shortcut("Ctrl + Shift + Enter", "Column Break")}
            ${shortcut("Ctrl + G", "Go To")}
            ${shortcut("Ctrl + K", "Chèn Hyperlink")}
            ${shortcut("Ctrl + Home", "Đầu tài liệu")}
            ${shortcut("Ctrl + End", "Cuối tài liệu")}
          `
        )
      },

      {
        title: "19.2. Định dạng đoạn",
        content: shortcutGroup(
          "Paragraph · Indent",
          `
            ${shortcut("Ctrl + M", "Tăng Indent")}
            ${shortcut("Ctrl + Shift + M", "Giảm Indent")}
            ${shortcut("Ctrl + T", "Hanging Indent")}
            ${shortcut("Ctrl + Shift + T", "Giảm Hanging Indent")}
            ${shortcut("Ctrl + Shift + L", "Bullet List")}
            ${shortcut("Ctrl + 1", "Line Spacing 1")}
            ${shortcut("Ctrl + 2", "Line Spacing 2")}
            ${shortcut("Ctrl + 5", "Line Spacing 1.5")}
            ${shortcut("Ctrl + Q", "Xóa định dạng Paragraph trực tiếp")}
          `
        )
      },

      {
        title: "19.3. Chỉnh sửa và Field",
        content: shortcutGroup(
          "Chỉnh sửa · Field",
          `
            ${shortcut("Ctrl + Space", "Xóa định dạng ký tự trực tiếp")}
            ${shortcut("Shift + F3", "Change Case")}
            ${shortcut("F4", "Lặp thao tác gần nhất")}
            ${shortcut("F7", "Kiểm tra chính tả/ngữ pháp")}
            ${shortcut("F9", "Cập nhật Field")}
            ${shortcut("Ctrl + F2", "Print Preview")}
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
    title: "Review — Nhận xét và theo dõi thay đổi",
    level: "NÂNG CAO",
    description: "Comments, Track Changes, Accept/Reject và Compare để cộng tác trên tài liệu.",
    keywords: [
      "review",
      "comment",
      "new comment",
      "track changes",
      "accept",
      "reject",
      "compare"
    ],
    sections: [
      {
        title: "20.1. Comments — Bình luận",
        content: `
          ${wordGuide({
            purpose: "Ghi nhận xét mà không sửa trực tiếp nội dung chính.",
            path: [["Review", "Xem lại"], ["New Comment", "Bình luận mới"]],
            steps: [
              "Bôi đen nội dung cần nhận xét hoặc đặt con trỏ tại vị trí.",
              "Chọn Review → New Comment.",
              "Nhập bình luận.",
              "Dùng Reply để trao đổi nếu tài liệu hỗ trợ cộng tác.",
              "Resolve/Delete khi vấn đề đã được xử lý."
            ]
          })}
        `
      },

      {
        title: "20.2. Track Changes — Theo dõi thay đổi",
        content: `
          ${wordGuide({
            purpose: "Ghi lại nội dung thêm, xóa và thay đổi định dạng để người khác xem xét.",
            path: [["Review", "Xem lại"], ["Track Changes", "Theo dõi thay đổi"]],
            steps: [
              "Mở Review.",
              "Bật Track Changes.",
              "Chỉnh sửa tài liệu như bình thường.",
              "Word đánh dấu các thay đổi.",
              "Dùng Display for Review/Show Markup để chọn cách hiển thị."
            ],
            warning: "Tắt Track Changes chỉ dừng ghi thay đổi mới; các thay đổi cũ vẫn còn cho đến khi Accept/Reject."
          })}
        `
      },

      {
        title: "20.3. Accept / Reject — Chấp nhận / Từ chối",
        content: `
          ${wordGuide({
            steps: [
              "Mở Review.",
              "Chọn một thay đổi.",
              "Bấm Accept để chấp nhận hoặc Reject để từ chối.",
              "Dùng Next/Previous để chuyển giữa các thay đổi.",
              "Chỉ dùng Accept All/Reject All khi đã chắc chắn."
            ]
          })}
        `
      },

      {
        title: "20.4. Compare — So sánh tài liệu",
        content: `
          ${wordGuide({
            purpose: "So sánh hai phiên bản Word và hiển thị khác biệt.",
            path: [["Review", "Xem lại"], ["Compare", "So sánh"]],
            steps: [
              "Chọn Review → Compare → Compare.",
              "Chọn Original document.",
              "Chọn Revised document.",
              "Thiết lập các loại thay đổi cần so sánh nếu cần.",
              "Bấm OK và xem kết quả."
            ],
            tip: "Hữu ích khi nhận lại một file đã được người khác chỉnh sửa nhưng không bật Track Changes."
          })}
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
    title: "Protect Document — Bảo vệ tài liệu",
    level: "NÂNG CAO",
    description: "Hạn chế chỉnh sửa, chỉ cho điền biểu mẫu hoặc kiểm soát quyền sửa nội dung.",
    keywords: [
      "protect document",
      "restrict editing",
      "bao ve",
      "read only",
      "forms",
      "stop protection"
    ],
    sections: [
      {
        title: "21.1. Restrict Editing — Hạn chế chỉnh sửa",
        content: `
          ${wordGuide({
            purpose: "Giới hạn loại chỉnh sửa mà người nhận được phép thực hiện.",
            path: [["Review", "Xem lại"], ["Restrict Editing", "Hạn chế chỉnh sửa"]],
            steps: [
              "Mở Review → Restrict Editing.",
              "Trong Editing restrictions, tích Allow only this type of editing in the document.",
              "Chọn kiểu hạn chế phù hợp.",
              "Bấm Yes, Start Enforcing Protection.",
              "Đặt mật khẩu nếu cần và ghi nhớ mật khẩu ở nơi an toàn."
            ],
            warning: "Nếu đặt mật khẩu rồi quên, việc gỡ bảo vệ có thể rất khó. Không dùng mật khẩu duy nhất đang dùng cho tài khoản khác."
          })}
          ${terminologyTable([
            ["No changes (Read only)", "Không thay đổi", "Người nhận chỉ đọc."],
            ["Tracked changes", "Theo dõi thay đổi", "Cho sửa nhưng mọi thay đổi được ghi nhận."],
            ["Comments", "Bình luận", "Chủ yếu cho phép nhận xét."],
            ["Filling in forms", "Điền biểu mẫu", "Cho phép điền các vùng biểu mẫu."]
          ])}
        `
      },

      {
        title: "21.2. Cho phép sửa một số khu vực",
        content: `
          ${wordGuide({
            purpose: "Khóa phần lớn tài liệu nhưng vẫn cho phép sửa một vài vùng.",
            steps: [
              "Bôi đen khu vực được phép chỉnh sửa.",
              "Mở Restrict Editing.",
              "Thiết lập Editing restrictions.",
              "Trong Exceptions, chọn người hoặc nhóm được phép sửa nếu phiên bản hỗ trợ.",
              "Bật bảo vệ.",
              "Thử mở và sửa để kiểm tra đúng phạm vi."
            ]
          })}
        `
      },

      {
        title: "21.3. Stop Protection — Dừng bảo vệ",
        content: `
          ${wordGuide({
            steps: [
              "Mở Review → Restrict Editing.",
              "Bấm Stop Protection.",
              "Nhập mật khẩu nếu Word yêu cầu.",
              "Kiểm tra tài liệu đã cho phép chỉnh sửa bình thường."
            ]
          })}
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
    title: "Mail Merge — Trộn thư",
    level: "NÂNG CAO",
    description: "Tạo hàng loạt thư mời, giấy chứng nhận, phiếu báo hoặc tài liệu từ một mẫu Word và nguồn dữ liệu.",
    keywords: [
      "mail merge",
      "tron thu",
      "excel",
      "merge field",
      "select recipients",
      "finish merge",
      "preview results"
    ],
    sections: [
      {
        title: "22.1. Mail Merge là gì?",
        content: `
          <p>
            <strong>Mail Merge (Trộn thư)</strong> kết hợp
            <strong>một mẫu Word</strong> với <strong>nguồn dữ liệu</strong>
            để sinh ra nhiều tài liệu có nội dung cá nhân hóa.
          </p>
          <p>Ứng dụng:</p>
          <ul>
            <li>Thư mời hàng loạt.</li>
            <li>Giấy chứng nhận.</li>
            <li>Phiếu điểm / phiếu báo.</li>
            <li>Hợp đồng theo mẫu.</li>
            <li>Nhãn thư và phong bì.</li>
          </ul>
        `
      },

      {
        title: "22.2. Chuẩn bị dữ liệu Excel",
        content: `
          <p>Dòng đầu của Excel nên là tên trường rõ ràng.</p>
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>HoTen</th><th>Lop</th><th>Diem</th><th>Email</th></tr>
              </thead>
              <tbody>
                <tr><td>Nguyễn Văn A</td><td>CNTT01</td><td>8.5</td><td>a@example.com</td></tr>
              </tbody>
            </table>
          </div>
          <div class="warning">
            Tránh gộp ô, hàng trống hoặc tiêu đề cột khó hiểu trong vùng dữ liệu dùng cho Mail Merge.
            Nên lưu và đóng Excel trước khi kết nối nếu Word gặp lỗi truy cập file.
          </div>
        `
      },

      {
        title: "22.3. Start Mail Merge — Bắt đầu",
        content: `
          ${wordGuide({
            path: [["Mailings", "Gửi thư"], ["Start Mail Merge", "Bắt đầu trộn thư"]],
            steps: [
              "Mở tài liệu mẫu Word.",
              "Mở Mailings.",
              "Bấm Start Mail Merge.",
              "Chọn loại tài liệu phù hợp, ví dụ Letters."
            ]
          })}
        `
      },

      {
        title: "22.4. Select Recipients — Chọn nguồn dữ liệu",
        content: `
          ${wordGuide({
            path: [["Mailings", "Gửi thư"], ["Select Recipients", "Chọn người nhận"], ["Use an Existing List", "Sử dụng danh sách hiện có"]],
            steps: [
              "Bấm Select Recipients.",
              "Chọn Use an Existing List.",
              "Chọn file Excel.",
              "Chọn Sheet chứa dữ liệu.",
              "Tích tùy chọn hàng đầu chứa tiêu đề cột nếu phù hợp.",
              "Bấm OK."
            ],
            tip: "Dùng Edit Recipient List để lọc, sắp xếp hoặc bỏ chọn một số người nhận."
          })}
        `
      },

      {
        title: "22.5. Insert Merge Field — Chèn trường dữ liệu",
        content: `
          ${wordGuide({
            steps: [
              "Đặt con trỏ tại vị trí cần dữ liệu cá nhân.",
              "Bấm Insert Merge Field.",
              "Chọn trường như HoTen, Lop, Diem...",
              "Lặp lại cho các vị trí khác.",
              "Định dạng chữ xung quanh Merge Field như văn bản bình thường."
            ],
            example: "Kính gửi: <strong>«HoTen»</strong><br>Lớp: <strong>«Lop»</strong><br>Điểm: <strong>«Diem»</strong>"
          })}
        `
      },

      {
        title: "22.6. Preview Results — Xem trước",
        content: `
          ${wordGuide({
            steps: [
              "Bấm Preview Results.",
              "Dùng mũi tên Previous/Next Record để xem từng bản ghi.",
              "Kiểm tra họ tên, ngày tháng, số và định dạng.",
              "Nếu dữ liệu sai, sửa ở nguồn hoặc điều chỉnh Field."
            ],
            warning: "Luôn xem thử nhiều bản ghi trước khi Finish & Merge."
          })}
        `
      },

      {
        title: "22.7. Finish & Merge — Hoàn tất",
        content: `
          ${wordGuide({
            path: [["Mailings", "Gửi thư"], ["Finish & Merge", "Hoàn tất và trộn"]],
            steps: [
              "Bấm Finish & Merge.",
              "Chọn Edit Individual Documents để tạo tài liệu kết quả.",
              "Hoặc chọn Print Documents nếu muốn in.",
              "Chọn All, Current record hoặc phạm vi From...To.",
              "Bấm OK.",
              "Kiểm tra file kết quả trước khi lưu/in."
            ],
            tip: "Edit Individual Documents thường an toàn hơn in trực tiếp vì có thể kiểm tra kết quả lần cuối."
          })}
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
    description: "Điều hướng nhanh trong tài liệu dài bằng Heading, trang và kết quả tìm kiếm.",
    keywords: [
      "navigation pane",
      "ctrl f",
      "heading",
      "dieu huong",
      "headings",
      "pages",
      "results"
    ],
    sections: [
      {
        title: "23.1. Mở Navigation Pane",
        content: `
          ${wordGuide({
            purpose: "Di chuyển nhanh giữa chương/mục hoặc kết quả tìm kiếm.",
            path: [["View", "Xem"], ["Navigation Pane", "Ngăn dẫn hướng"]],
            steps: [
              "Mở View → tích Navigation Pane hoặc nhấn Ctrl + F.",
              "Ngăn Navigation xuất hiện bên cạnh tài liệu.",
              "Chọn Headings, Pages hoặc Results tùy mục đích."
            ]
          })}
          ${shortcut("Ctrl + F", "Mở tìm kiếm/Navigation Pane")}
        `
      },

      {
        title: "23.2. Headings — Điều hướng theo tiêu đề",
        content: `
          ${wordGuide({
            steps: [
              "Đảm bảo tiêu đề đã dùng Heading 1/2/3.",
              "Mở Navigation Pane.",
              "Chọn tab Headings.",
              "Bấm một Heading để chuyển đến vị trí đó.",
              "Quan sát cấp thụt để kiểm tra cấu trúc tài liệu."
            ],
            warning: "Nếu tiêu đề không xuất hiện, hãy kiểm tra xem dòng đó có thật sự dùng Heading Style hay chỉ được Bold/đổi cỡ chữ."
          })}
        `
      },

      {
        title: "23.3. Pages và Results",
        content: `
          ${wordGuide({
            steps: [
              "Chọn Pages để xem thumbnail các trang.",
              "Nhập từ khóa vào ô Search để tìm nội dung.",
              "Chọn Results để xem các vị trí có từ khóa.",
              "Nhấp kết quả để Word chuyển đến đoạn tương ứng."
            ]
          })}
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
    description: "Chia tài liệu thành nhiều Section độc lập và kiểm soát Link to Previous.",
    keywords: [
      "section",
      "section break",
      "link to previous",
      "header footer",
      "landscape one page",
      "next page"
    ],
    sections: [
      {
        title: "24.1. Section dùng để làm gì?",
        content: `
          <p>Mỗi Section có thể có thiết lập riêng:</p>
          <ul>
            <li>Header và Footer.</li>
            <li>Page Number và kiểu số trang.</li>
            <li>Orientation: Portrait/Landscape.</li>
            <li>Margins.</li>
            <li>Columns.</li>
          </ul>
          <div class="note">
            Section là nền tảng để làm trang bìa không số, phần đầu dùng i/ii/iii,
            nội dung bắt đầu từ 1 hoặc chỉ xoay ngang một trang.
          </div>
        `
      },

      {
        title: "24.2. Tạo Section Break — Next Page",
        content: `
          ${wordGuide({
            path: [["Layout", "Bố trí"], ["Breaks", "Ngắt"], ["Next Page", "Trang tiếp theo"]],
            steps: [
              "Đặt con trỏ tại cuối phần cần tách.",
              "Mở Layout → Breaks.",
              "Trong Section Breaks chọn Next Page.",
              "Bật Show/Hide để kiểm tra dòng Section Break nếu cần."
            ],
            result: "Phần tiếp theo bắt đầu ở trang mới và thuộc Section mới."
          })}
        `
      },

      {
        title: "24.3. Link to Previous — Liên kết với phần trước",
        content: `
          ${wordGuide({
            purpose: "Quyết định Header/Footer của Section mới có dùng chung với Section trước hay không.",
            steps: [
              "Nhấp đúp Header hoặc Footer trong Section mới.",
              "Quan sát tab Header & Footer.",
              "Nếu Link to Previous đang bật và muốn Section độc lập, bấm để tắt.",
              "Chỉnh Header/Footer hoặc Page Number của Section mới.",
              "Kiểm tra Section trước không bị thay đổi."
            ],
            warning: "Nếu chưa tắt Link to Previous mà xóa/chỉnh Header hoặc số trang, Section trước có thể bị ảnh hưởng."
          })}
        `
      },

      {
        title: "24.4. Xoay ngang đúng một trang",
        content: `
          ${wordGuide({
            purpose: "Tạo một trang Landscape giữa các trang Portrait.",
            steps: [
              "Đặt con trỏ trước nội dung của trang cần xoay ngang.",
              "Chọn Layout → Breaks → Next Page.",
              "Đặt con trỏ cuối nội dung trang cần xoay.",
              "Tạo thêm Section Break → Next Page.",
              "Đặt con trỏ trong Section ở giữa.",
              "Chọn Layout → Orientation → Landscape.",
              "Kiểm tra các trang trước/sau vẫn Portrait."
            ],
            warning: "Cần hai Section Break để cô lập đúng trang cần xoay."
          })}
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
    description: "Đánh số khác nhau cho trang bìa, phần đầu và nội dung chính bằng Section.",
    keywords: [
      "page number",
      "danh so trang",
      "roman",
      "section break",
      "link to previous",
      "start at 1",
      "different first page"
    ],
    sections: [
      {
        title: "25.1. Mô hình thường gặp",
        content: `
          <p>Ví dụ tài liệu yêu cầu:</p>
          <ul>
            <li><strong>Trang bìa:</strong> không hiển thị số.</li>
            <li><strong>Phần đầu/mục lục:</strong> i, ii, iii...</li>
            <li><strong>Nội dung chính:</strong> 1, 2, 3...</li>
          </ul>
          <p>Giải pháp ổn định: chia tài liệu thành ít nhất <strong>3 Section</strong>.</p>
        `
      },

      {
        title: "25.2. Tạo các Section",
        content: `
          ${wordGuide({
            steps: [
              "Đặt con trỏ cuối trang bìa → Layout → Breaks → Next Page.",
              "Đặt con trỏ cuối phần đầu/mục lục → tạo Next Page Section Break lần nữa.",
              "Bật Show/Hide để kiểm tra hai Section Break.",
              "Xác định Section 1 = bìa, Section 2 = phần đầu, Section 3 = nội dung."
            ]
          })}
        `
      },

      {
        title: "25.3. Tắt Link to Previous",
        content: `
          ${wordGuide({
            steps: [
              "Mở Footer/Header của Section 2.",
              "Tắt Link to Previous.",
              "Mở Footer/Header của Section 3.",
              "Tắt Link to Previous.",
              "Kiểm tra chữ Same as Previous không còn tại vùng cần tách nếu phiên bản hiển thị."
            ],
            warning: "Đây là bước quan trọng nhất khi muốn mỗi Section có hệ thống số trang riêng."
          })}
        `
      },

      {
        title: "25.4. Trang bìa không số",
        content: `
          ${wordGuide({
            steps: [
              "Trong Section 1, không chèn Page Number hoặc xóa số trang của Section 1.",
              "Nếu tài liệu đơn giản chỉ cần ẩn trang đầu, có thể dùng Different First Page.",
              "Kiểm tra Section 2 không bị xóa số theo."
            ]
          })}
        `
      },

      {
        title: "25.5. Phần đầu dùng i, ii, iii",
        content: `
          ${wordGuide({
            steps: [
              "Đặt con trỏ trong Section 2.",
              "Chèn Page Number ở vị trí mong muốn.",
              "Mở Page Number → Format Page Numbers.",
              "Number format chọn i, ii, iii, ...",
              "Chọn Start at: i.",
              "Bấm OK."
            ]
          })}
        `
      },

      {
        title: "25.6. Nội dung chính bắt đầu từ 1",
        content: `
          ${wordGuide({
            steps: [
              "Đặt con trỏ trong Section 3.",
              "Chèn Page Number.",
              "Mở Format Page Numbers.",
              "Number format chọn 1, 2, 3, ...",
              "Chọn Start at: 1.",
              "Bấm OK.",
              "Kiểm tra vài trang tiếp theo."
            ],
            result: "Trang đầu nội dung chính hiển thị 1 dù trước đó đã có nhiều trang."
          })}
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
    title: "Phím Alt và KeyTips trong Word",
    level: "TRA CỨU",
    description: "Điều khiển Ribbon bằng bàn phím thông qua các KeyTips Word hiển thị.",
    keywords: [
      "alt",
      "keytips",
      "keyboard",
      "ribbon",
      "phim alt"
    ],
    sections: [
      {
        title: "26.1. KeyTips là gì?",
        content: `
          <p>
            Khi nhấn <strong>Alt</strong>, Word hiển thị các chữ/số nhỏ trên Ribbon.
            Đây là <strong>KeyTips</strong>. Bạn tiếp tục bấm đúng ký tự Word đang hiển thị
            để mở tab hoặc lệnh mà không cần chuột.
          </p>
          <div class="note">
            KeyTips có thể khác theo phiên bản, ngôn ngữ giao diện và cấu hình Ribbon.
            Vì vậy hãy <strong>theo ký tự đang hiển thị trên chính Word của bạn</strong>
            thay vì học thuộc một chuỗi cố định.
          </div>
        `
      },

      {
        title: "26.2. Cách dùng",
        content: `
          ${wordGuide({
            steps: [
              "Nhấn Alt một lần.",
              "Quan sát ký tự xuất hiện trên các tab Ribbon.",
              "Bấm ký tự của tab cần mở.",
              "Quan sát KeyTips mới xuất hiện trên các lệnh.",
              "Tiếp tục bấm ký tự tương ứng.",
              "Nhấn Esc để quay lại cấp trước hoặc thoát KeyTips."
            ],
            tip: "Học KeyTips cho vài lệnh dùng thường xuyên có thể tăng tốc thao tác mà không cần nhớ mọi phím tắt."
          })}
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
    description: "Hiển thị ký tự định dạng ẩn để kiểm tra Space, Tab, Enter, Page Break và Section Break.",
    keywords: [
      "show hide",
      "ctrl shift 8",
      "paragraph mark",
      "ky tu an",
      "page break",
      "section break",
      "tab mark"
    ],
    sections: [
      {
        title: "27.1. Bật/tắt Show/Hide",
        content: `
          ${wordGuide({
            purpose: "Nhìn thấy các ký tự định dạng không in ra giấy để tìm lỗi bố cục.",
            path: [["Home", "Trang đầu"], ["Paragraph", "Đoạn văn"], ["¶ Show/Hide", "Hiện/ẩn"]],
            steps: [
              "Bấm nút ¶ trong Home → Paragraph hoặc nhấn Ctrl + Shift + 8.",
              "Quan sát các ký hiệu xuất hiện.",
              "Sửa Space/Tab/Enter/Break thừa nếu cần.",
              "Bấm lại ¶ hoặc Ctrl + Shift + 8 để ẩn."
            ]
          })}
          ${shortcut("Ctrl + Shift + 8", "Hiện / ẩn ký tự định dạng")}
        `
      },

      {
        title: "27.2. Ý nghĩa các ký hiệu",
        content: `
          ${terminologyTable([
            ["¶", "Paragraph Mark", "Kết thúc một đoạn bằng Enter."],
            ["·", "Space", "Một dấu cách."],
            ["→", "Tab", "Ký hiệu Tab."],
            ["Page Break", "Ngắt trang", "Chuyển sang trang mới."],
            ["Section Break", "Ngắt phần", "Ranh giới giữa các Section."],
            ["↵", "Manual Line Break", "Xuống dòng bằng Shift + Enter."]
          ])}
          <div class="note">
            Các ký tự này chỉ hỗ trợ chỉnh sửa; chúng không xuất hiện khi in bình thường.
          </div>
        `
      },

      {
        title: "27.3. Khi nào nên bật?",
        content: `
          <ul>
            <li>Khi văn bản tự nhảy trang.</li>
            <li>Khi Header/Footer hoặc số trang hoạt động sai.</li>
            <li>Khi có quá nhiều dòng trống hoặc Space dư.</li>
            <li>Khi cần phân biệt Page Break và Section Break.</li>
            <li>Trước khi hoàn thiện một tài liệu dài.</li>
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
    description: "Tra cứu theo triệu chứng, nguyên nhân và quy trình sửa các lỗi bố cục phổ biến.",
    keywords: [
      "loi word",
      "nhay trang",
      "hinh anh",
      "sai font",
      "muc luc",
      "page number",
      "header",
      "table overflow"
    ],
    sections: [
      {
        title: "28.1. Văn bản bị nhảy trang",
        content: `
          <p><strong>Triệu chứng:</strong> cuối trang còn khoảng trống nhưng đoạn/tiêu đề tự sang trang sau.</p>
          ${wordGuide({
            steps: [
              "Bật Show/Hide bằng Ctrl + Shift + 8.",
              "Kiểm tra Page Break hoặc Section Break thừa.",
              "Nếu không có Break, chọn đoạn đang bị nhảy.",
              "Mở Paragraph Dialog → tab Line and Page Breaks.",
              "Kiểm tra Page break before, Keep with next, Keep lines together.",
              "Bỏ tùy chọn không cần thiết và kiểm tra lại."
            ],
            warning: "Không xóa Section Break nếu Section đó đang dùng số trang/Header/hướng giấy riêng mà chưa hiểu hậu quả."
          })}
        `
      },

      {
        title: "28.2. Hình ảnh chạy lung tung",
        content: `
          <p><strong>Nguyên nhân thường gặp:</strong> Wrap Text, Position hoặc Anchor.</p>
          ${wordGuide({
            steps: [
              "Chọn ảnh → Picture Format → Wrap Text.",
              "Nếu cần ổn định, thử In Line with Text.",
              "Nếu cần ảnh tự do, chọn Square/Tight và kiểm tra Position.",
              "Không dùng Space/Enter để đẩy ảnh.",
              "Kiểm tra lại khi thêm/xóa nội dung trước ảnh."
            ]
          })}
        `
      },

      {
        title: "28.3. Khoảng cách chữ hoặc từ không đều",
        content: `
          ${wordGuide({
            steps: [
              "Bật Show/Hide để kiểm tra Space/Tab dư.",
              "Kiểm tra Alignment; Justify có thể làm khoảng cách từ thay đổi trên dòng ngắn.",
              "Kiểm tra Font có bị trộn nhiều kiểu không.",
              "Mở Font Dialog → Advanced nếu nghi Character Spacing bị chỉnh.",
              "Dùng Clear Formatting/Ctrl + Space nếu đoạn bị định dạng lạ."
            ]
          })}
        `
      },

      {
        title: "28.4. Copy từ Internet bị sai font",
        content: `
          ${wordGuide({
            steps: [
              "Khi Paste, mở Paste Options.",
              "Chọn Keep Text Only nếu chỉ cần nội dung chữ.",
              "Nếu đã dán, bôi đen đoạn lỗi.",
              "Dùng Ctrl + Space hoặc Clear All Formatting.",
              "Áp lại Style/font chuẩn của tài liệu."
            ],
            tip: "Keep Text Only giúp tránh mang theo CSS/font/màu từ website."
          })}
          ${shortcut("Ctrl + Space", "Xóa định dạng ký tự")}
        `
      },

      {
        title: "28.5. Mục lục không cập nhật hoặc thiếu mục",
        content: `
          ${wordGuide({
            steps: [
              "Kiểm tra tiêu đề bị thiếu có dùng Heading đúng cấp không.",
              "Nếu chưa, áp dụng Heading.",
              "Nhấp vào Table of Contents.",
              "Bấm Update Table.",
              "Chọn Update entire table.",
              "Kiểm tra lại cấp Heading và số trang."
            ]
          })}
        `
      },

      {
        title: "28.6. Số trang sai hoặc bị giống nhau",
        content: `
          ${wordGuide({
            steps: [
              "Bật Show/Hide và kiểm tra Section Break.",
              "Mở Header/Footer của Section bị lỗi.",
              "Kiểm tra Link to Previous.",
              "Nếu Section cần độc lập, tắt Link to Previous.",
              "Mở Page Number → Format Page Numbers.",
              "Kiểm tra Continue from previous section hoặc Start at."
            ]
          })}
        `
      },

      {
        title: "28.7. Header của các chương bị giống nhau",
        content: `
          ${wordGuide({
            steps: [
              "Kiểm tra giữa các chương có Section Break không.",
              "Mở Header của chương mới.",
              "Tắt Link to Previous.",
              "Nhập Header riêng.",
              "Kiểm tra chương trước không đổi."
            ],
            warning: "Page Break không đủ để tạo Header độc lập; cần Section Break."
          })}
        `
      },

      {
        title: "28.8. Bảng vượt khỏi trang",
        content: `
          ${wordGuide({
            steps: [
              "Chọn bảng → Table Layout → AutoFit → AutoFit Window.",
              "Kiểm tra cỡ chữ và chiều rộng cột.",
              "Dùng Distribute Columns nếu phù hợp.",
              "Nếu bảng vẫn quá rộng, dùng Section Break để xoay riêng trang sang Landscape.",
              "Kiểm tra lại ở Print Preview/PDF."
            ]
          })}
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
    description: "Phục hồi tài liệu chưa lưu, file sau sự cố và thiết lập AutoRecover.",
    keywords: [
      "recover",
      "unsaved",
      "document recovery",
      "phuc hoi",
      "open and repair",
      "autorecover"
    ],
    sections: [
      {
        title: "29.1. Document Recovery",
        content: `
          ${wordGuide({
            purpose: "Mở lại bản Word tự phục hồi sau khi Word/Windows bị tắt đột ngột.",
            steps: [
              "Mở lại Word.",
              "Quan sát Document Recovery nếu xuất hiện.",
              "Mở bản có thời gian phù hợp.",
              "Kiểm tra nội dung.",
              "Dùng Save As để lưu thành file rõ ràng."
            ],
            warning: "Không đóng Document Recovery vội trước khi kiểm tra các bản có thể phục hồi."
          })}
        `
      },

      {
        title: "29.2. Recover Unsaved Documents",
        content: `
          ${wordGuide({
            purpose: "Tìm tài liệu chưa được Save chính thức.",
            path: [["File", "Tệp"], ["Info", "Thông tin"], ["Manage Document", "Quản lý tài liệu"], ["Recover Unsaved Documents", "Khôi phục tài liệu chưa lưu"]],
            steps: [
              "Mở File → Info.",
              "Bấm Manage Document.",
              "Chọn Recover Unsaved Documents.",
              "Mở file cần kiểm tra.",
              "Bấm Save As ngay sau khi xác nhận đúng nội dung."
            ],
            note: "Tên đường dẫn có thể khác nhẹ theo phiên bản Word."
          })}
        `
      },

      {
        title: "29.3. Open and Repair — Mở và sửa",
        content: `
          ${wordGuide({
            purpose: "Thử mở file Word bị lỗi bằng chế độ sửa chữa của Word.",
            path: [["File", "Tệp"], ["Open", "Mở"], ["Browse", "Duyệt"]],
            steps: [
              "Chọn File → Open → Browse.",
              "Chọn file bị lỗi.",
              "Bấm mũi tên ▼ cạnh nút Open.",
              "Chọn Open and Repair.",
              "Nếu mở được, Save As một file mới."
            ],
            warning: "Không đảm bảo phục hồi được mọi file; nên giữ bản sao và backup."
          })}
        `
      },

      {
        title: "29.4. AutoRecover — Tự lưu thông tin phục hồi",
        content: `
          ${wordGuide({
            path: [["File", "Tệp"], ["Options", "Tùy chọn"], ["Save", "Lưu"]],
            steps: [
              "Mở File → Options → Save.",
              "Kiểm tra Save AutoRecover information every ... minutes.",
              "Kiểm tra Keep the last AutoRecovered version if I close without saving nếu có.",
              "Thiết lập khoảng thời gian phù hợp.",
              "Bấm OK."
            ],
            warning: "AutoRecover không thay thế việc Ctrl + S, lưu OneDrive/version history hoặc backup định kỳ."
          })}
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
    description: "Các nguyên tắc giúp tài liệu ổn định, dễ chỉnh sửa và tự động hóa.",
    keywords: [
      "nguyen tac",
      "word chuyen nghiep",
      "space",
      "enter",
      "heading",
      "caption",
      "section",
      "styles"
    ],
    sections: [
      {
        title: "30.1. 10 nguyên tắc cốt lõi",
        content: `
          <ol>
            <li><strong>Không dùng Space nhiều lần để căn.</strong> Dùng Tab, Table, Alignment hoặc Indent.</li>
            <li><strong>Không dùng Enter nhiều lần để sang trang.</strong> Dùng Page Break.</li>
            <li><strong>Không tự gõ số chương/mục trong tài liệu dài.</strong> Dùng Heading + Multilevel List.</li>
            <li><strong>Không tự gõ Hình 1, Hình 2...</strong> Dùng Caption.</li>
            <li><strong>Không tự gõ mục lục.</strong> Dùng Table of Contents.</li>
            <li><strong>Không chỉnh từng tiêu đề bằng tay.</strong> Dùng Styles/Modify Style.</li>
            <li><strong>Dùng Section Break khi cần bố cục độc lập.</strong></li>
            <li><strong>Quản lý ảnh bằng Wrap Text/Position.</strong> Không đẩy ảnh bằng Space/Enter.</li>
            <li><strong>Bật Show/Hide khi tìm lỗi bố cục.</strong></li>
            <li><strong>Lưu và backup thường xuyên.</strong> Dùng Ctrl + S và lưu phiên bản quan trọng.</li>
          </ol>
        `
      },

      {
        title: "30.2. Thay thao tác thủ công bằng chức năng đúng",
        content: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Không nên</th><th>Nên dùng</th></tr>
              </thead>
              <tbody>
                <tr><td>Nhiều Space để căn</td><td>Tab / Table / Indent / Alignment</td></tr>
                <tr><td>Nhiều Enter để sang trang</td><td>Page Break</td></tr>
                <tr><td>Tự gõ 1.1, 1.2</td><td>Heading + Multilevel List</td></tr>
                <tr><td>Tự gõ số hình</td><td>Caption</td></tr>
                <tr><td>Tự gõ mục lục</td><td>Table of Contents</td></tr>
                <tr><td>Xoay ngang cả tài liệu</td><td>Section Break + Orientation</td></tr>
                <tr><td>Đẩy ảnh bằng Space</td><td>Wrap Text + Position</td></tr>
              </tbody>
            </table>
          </div>
        `
      },

      {
        title: "30.3. Quy tắc kiểm tra cuối",
        content: `
          <ul>
            <li>Heading đúng cấp và thống nhất.</li>
            <li>Font/Font Size/Paragraph Spacing thống nhất.</li>
            <li>Không có Space, Enter, Page Break hoặc Section Break thừa.</li>
            <li>Mục lục, Caption, Cross-reference đã cập nhật.</li>
            <li>Header/Footer/Page Number đúng từng Section.</li>
            <li>Bảng không vượt lề, ảnh không mờ hoặc chạy sai vị trí.</li>
            <li>Đã Ctrl + S và kiểm tra PDF.</li>
          </ul>
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
    description: "Quy trình từ thiết lập trang đến kiểm tra và xuất PDF.",
    keywords: [
      "bao cao",
      "report",
      "a4",
      "heading",
      "styles",
      "caption",
      "page number",
      "pdf",
      "checklist"
    ],
    sections: [
      {
        title: "31.1. Quy trình 12 bước",
        content: `
          <ol>
            <li><strong>Thiết lập trang:</strong> Size, Margins, Orientation.</li>
            <li><strong>Chọn hệ thống font:</strong> font nội dung và cỡ chữ theo yêu cầu.</li>
            <li><strong>Thiết lập Normal Style:</strong> font, line spacing, paragraph spacing.</li>
            <li><strong>Thiết lập Heading:</strong> Heading 1/2/3 và Multilevel List nếu cần.</li>
            <li><strong>Tạo cấu trúc tài liệu:</strong> bìa, mục lục, chương, kết luận, tài liệu tham khảo.</li>
            <li><strong>Nhập và chỉnh sửa nội dung:</strong> dùng Paragraph đúng cách.</li>
            <li><strong>Chèn bảng và hình:</strong> kiểm soát AutoFit, Wrap Text, Caption.</li>
            <li><strong>Tạo mục lục/danh mục hình:</strong> dùng Field tự động.</li>
            <li><strong>Thiết lập Section và số trang:</strong> tách bìa/phần đầu/nội dung.</li>
            <li><strong>Kiểm tra liên kết:</strong> Cross-reference, Header/Footer, Link to Previous.</li>
            <li><strong>Kiểm tra bố cục:</strong> bật Show/Hide, rà lỗi trang trắng, Break thừa.</li>
            <li><strong>Lưu và xuất PDF:</strong> kiểm tra lại PDF trước khi gửi/in.</li>
          </ol>
        `
      },

      {
        title: "31.2. Thiết lập trước khi nhập nội dung",
        content: `
          ${wordGuide({
            steps: [
              "Xác định yêu cầu khổ giấy, lề, font và cỡ chữ.",
              "Chọn Layout → Size/Margins/Orientation.",
              "Chỉnh Normal Style thay vì định dạng từng đoạn.",
              "Thiết lập Heading 1/2/3.",
              "Nếu có đánh số chương, thiết lập Multilevel List liên kết Heading.",
              "Tạo trước các Section nếu cấu trúc số trang phức tạp."
            ],
            tip: "Thiết lập chuẩn từ đầu giúp giảm rất nhiều công sửa format ở cuối."
          })}
        `
      },

      {
        title: "31.3. Kiểm tra trước khi xuất PDF",
        content: `
          <ul class="checklist-list">
            <li>☐ Mục lục đã Update entire table.</li>
            <li>☐ Caption và Cross-reference đã cập nhật Field.</li>
            <li>☐ Không có trang trắng ngoài ý muốn.</li>
            <li>☐ Số trang đúng từng Section.</li>
            <li>☐ Header/Footer không bị nối nhầm.</li>
            <li>☐ Bảng không tràn lề.</li>
            <li>☐ Hình ảnh rõ và đúng vị trí.</li>
            <li>☐ Không còn Comment/Track Changes ngoài ý muốn.</li>
            <li>☐ Đã kiểm tra chính tả.</li>
            <li>☐ Đã lưu file Word trước khi xuất.</li>
          </ul>
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
    description: "Bài thực hành tổng hợp tạo một tài liệu Word cơ bản hoàn chỉnh.",
    keywords: [
      "thuc hanh",
      "co ban",
      "bai tap",
      "bullet",
      "numbering",
      "table",
      "image"
    ],
    sections: [
      {
        title: "32.1. Đề bài",
        content: `
          <p>Tạo tài liệu có tiêu đề <strong>BÁO CÁO THỰC HÀNH MICROSOFT WORD</strong> gồm:</p>
          <ol>
            <li>Phần giới thiệu khoảng 2 đoạn.</li>
            <li>Danh sách Bullets: “Các chức năng chính của Microsoft Word”.</li>
            <li>Danh sách Numbering: “Quy trình tạo và lưu tài liệu”.</li>
            <li>Bảng danh sách 5 sinh viên: STT, Họ tên, MSSV, Lớp, Điểm.</li>
            <li>Chèn một hình ảnh minh họa.</li>
            <li>Đánh số trang.</li>
          </ol>
        `
      },

      {
        title: "32.2. Yêu cầu định dạng",
        content: `
          <ul class="checklist-list">
            <li>☐ Font Times New Roman, cỡ 13 hoặc theo yêu cầu của bài.</li>
            <li>☐ Tiêu đề in đậm và căn giữa.</li>
            <li>☐ Nội dung căn đều hai bên.</li>
            <li>☐ Line spacing 1.5.</li>
            <li>☐ Không dùng nhiều Space/Enter để căn.</li>
            <li>☐ Bảng vừa trang, Header bảng rõ ràng.</li>
            <li>☐ Ảnh không bị méo.</li>
            <li>☐ Có số trang.</li>
          </ul>
        `
      },

      {
        title: "32.3. Trình tự gợi ý",
        content: `
          ${wordGuide({
            steps: [
              "Tạo tài liệu mới và Save As với tên BaiTap_Word_CoBan.docx.",
              "Thiết lập font và đoạn.",
              "Nhập tiêu đề và phần giới thiệu.",
              "Tạo Bullets và Numbering bằng nút Word, không tự gõ dấu.",
              "Chèn bảng 5 cột × 6 hàng và nhập dữ liệu.",
              "Chèn ảnh và chỉnh Resize/Wrap Text.",
              "Chèn Page Number.",
              "Bật Show/Hide để kiểm tra.",
              "Ctrl + S và xem Print Preview."
            ]
          })}
        `
      },

      {
        title: "32.4. Tự đánh giá",
        content: `
          <p>Nếu hoàn thành mà không cần dùng nhiều Space/Enter để sửa bố cục, bạn đã nắm được nền tảng tốt.</p>
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
    description: "Tạo tài liệu 8–10 trang sử dụng Heading, Multilevel List, mục lục, Caption và số trang.",
    keywords: [
      "thuc hanh trung cap",
      "heading",
      "table of contents",
      "multilevel list",
      "caption",
      "page number"
    ],
    sections: [
      {
        title: "33.1. Cấu trúc tài liệu",
        content: `
          <p>Tạo tài liệu khoảng 8–10 trang gồm:</p>
          <ul>
            <li>Trang bìa.</li>
            <li>Mục lục tự động.</li>
            <li>Chương 1: có ít nhất mục 1.1 và 1.2.</li>
            <li>Chương 2: có ít nhất mục 2.1 và 2.2.</li>
            <li>Kết luận.</li>
            <li>Tài liệu tham khảo.</li>
          </ul>
        `
      },

      {
        title: "33.2. Yêu cầu kỹ thuật",
        content: `
          <ul class="checklist-list">
            <li>☐ Chương dùng Heading 1.</li>
            <li>☐ Mục dùng Heading 2.</li>
            <li>☐ Có Multilevel List 1 → 1.1 → 1.1.1 nếu cần.</li>
            <li>☐ Table of Contents tự động.</li>
            <li>☐ Ít nhất 2 hình có Caption.</li>
            <li>☐ Ít nhất 1 bảng có Caption.</li>
            <li>☐ Header/Footer phù hợp.</li>
            <li>☐ Page Number tự động.</li>
          </ul>
        `
      },

      {
        title: "33.3. Quy trình gợi ý",
        content: `
          ${wordGuide({
            steps: [
              "Thiết lập trang và Normal Style.",
              "Tạo Heading 1/2 và Multilevel List.",
              "Nhập cấu trúc Chương 1/2 trước.",
              "Mở Navigation Pane để kiểm tra Heading.",
              "Nhập nội dung, chèn bảng/hình.",
              "Thêm Caption.",
              "Chèn Table of Contents.",
              "Thiết lập Header/Footer/Page Number.",
              "Update entire table và cập nhật Field.",
              "Kiểm tra Show/Hide rồi xuất PDF thử."
            ]
          })}
        `
      },

      {
        title: "33.4. Tiêu chí đạt",
        content: `
          <p>
            Tài liệu phải tự cập nhật mục lục/số hình khi thêm nội dung;
            không phải sửa số chương hoặc số trang thủ công.
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
    description: "Tạo báo cáo 15–20 trang sử dụng Section, Caption, Cross-reference, danh mục hình/bảng và số trang nhiều kiểu.",
    keywords: [
      "thuc hanh nang cao",
      "section",
      "caption",
      "cross reference",
      "table of figures",
      "roman page number",
      "landscape"
    ],
    sections: [
      {
        title: "34.1. Yêu cầu tổng thể",
        content: `
          <ul>
            <li>Trang bìa không hiển thị số.</li>
            <li>Phần đầu dùng i, ii, iii...</li>
            <li>Nội dung chính bắt đầu từ 1.</li>
            <li>Ít nhất 3 chương.</li>
            <li>Ít nhất 6 hình và 3 bảng.</li>
            <li>Mục lục tự động.</li>
            <li>Danh mục hình và danh mục bảng.</li>
            <li>Có Footnote.</li>
            <li>Có ít nhất 2 Cross-reference.</li>
            <li>Có Header/Footer.</li>
            <li>Có một trang Landscape giữa các trang Portrait.</li>
          </ul>
        `
      },

      {
        title: "34.2. Kỹ năng bắt buộc",
        content: `
          <ul class="checklist-list">
            <li>☐ Heading 1/2/3 và Multilevel List.</li>
            <li>☐ Section Break đúng vị trí.</li>
            <li>☐ Link to Previous được kiểm soát.</li>
            <li>☐ Format Page Numbers đúng từng Section.</li>
            <li>☐ Caption tự động, không gõ số hình/bảng bằng tay.</li>
            <li>☐ Cross-reference là Field, không gõ “Hình 5” thủ công.</li>
            <li>☐ Một trang Landscape được cô lập bằng 2 Section Break.</li>
            <li>☐ Table of Contents/Table of Figures đã cập nhật.</li>
          </ul>
        `
      },

      {
        title: "34.3. Trình tự thực hiện",
        content: `
          ${wordGuide({
            steps: [
              "Lập cấu trúc tài liệu và các Section.",
              "Thiết lập Normal/Heading/Multilevel List.",
              "Thiết lập số trang cho từng Section.",
              "Nhập nội dung theo chương.",
              "Chèn hình/bảng và Caption.",
              "Chèn Footnote và Cross-reference.",
              "Tạo Table of Contents/Table of Figures.",
              "Tạo trang Landscape bằng Section riêng.",
              "Cập nhật tất cả Field.",
              "Bật Show/Hide và kiểm tra từng Section.",
              "Xuất PDF và rà soát lần cuối."
            ]
          })}
        `
      },

      {
        title: "34.4. Tiêu chí chuyên nghiệp",
        content: `
          <p>
            Sau khi chèn thêm một hình hoặc một mục mới ở giữa tài liệu,
            hệ thống số, mục lục và tham chiếu phải có thể cập nhật mà không sửa thủ công hàng loạt.
          </p>
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
    description: "Tạo 10 giấy chứng nhận tự động từ Word và Excel.",
    keywords: [
      "thuc hanh mail merge",
      "excel",
      "giay chung nhan",
      "merge field",
      "finish merge"
    ],
    sections: [
      {
        title: "35.1. Chuẩn bị Excel",
        content: `
          <p>Tạo file Excel với các cột:</p>
          <div class="table-scroll">
            <table>
              <thead><tr><th>HoTen</th><th>NgaySinh</th><th>Lop</th><th>Diem</th></tr></thead>
              <tbody><tr><td>Nguyễn Văn A</td><td>01/01/2005</td><td>CNTT01</td><td>8.5</td></tr></tbody>
            </table>
          </div>
          <p>Nhập ít nhất 10 người và lưu file.</p>
        `
      },

      {
        title: "35.2. Tạo mẫu Word",
        content: `
          <p>Tạo mẫu <strong>GIẤY CHỨNG NHẬN</strong> có các vị trí:</p>
          <ul>
            <li>Họ tên: «HoTen»</li>
            <li>Ngày sinh: «NgaySinh»</li>
            <li>Lớp: «Lop»</li>
            <li>Điểm: «Diem»</li>
          </ul>
          <div class="note">Các dấu «...» phải được chèn bằng Insert Merge Field, không tự gõ để giả lập Field.</div>
        `
      },

      {
        title: "35.3. Quy trình Mail Merge",
        content: `
          ${wordGuide({
            steps: [
              "Mailings → Start Mail Merge → Letters.",
              "Select Recipients → Use an Existing List → chọn Excel.",
              "Chọn Sheet dữ liệu.",
              "Insert Merge Field vào đúng vị trí.",
              "Preview Results và duyệt nhiều bản ghi.",
              "Finish & Merge → Edit Individual Documents → All.",
              "Kiểm tra 10 giấy chứng nhận đã tạo.",
              "Lưu file kết quả và xuất PDF nếu cần."
            ]
          })}
        `
      },

      {
        title: "35.4. Tiêu chí đạt",
        content: `
          <ul class="checklist-list">
            <li>☐ 10 bản ghi khác nhau hiển thị đúng người.</li>
            <li>☐ Không có trường «MergeField» bị bỏ sót.</li>
            <li>☐ Ngày/điểm có định dạng phù hợp.</li>
            <li>☐ Mẫu không bị lệch khi tên dài.</li>
            <li>☐ Đã xem Preview trước khi Finish & Merge.</li>
          </ul>
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
    description: "Tổng hợp phím tắt Word theo mức từ bắt buộc đến chuyên nghiệp.",
    keywords: [
      "bang phim tat",
      "ctrl a",
      "ctrl c",
      "ctrl j",
      "f7",
      "f9",
      "navigation"
    ],
    sections: [
      {
        title: "36.1. Mức 1 — Bắt buộc",
        content: shortcutGroup(
          "Phím tắt bắt buộc",
          `
            ${shortcut("Ctrl + A", "Chọn tất cả")}
            ${shortcut("Ctrl + C", "Copy")}
            ${shortcut("Ctrl + X", "Cut")}
            ${shortcut("Ctrl + V", "Paste")}
            ${shortcut("Ctrl + Z", "Undo")}
            ${shortcut("Ctrl + Y", "Redo")}
            ${shortcut("Ctrl + S", "Save")}
            ${shortcut("Ctrl + F", "Find")}
            ${shortcut("Ctrl + H", "Replace")}
          `
        )
      },

      {
        title: "36.2. Mức 2 — Soạn thảo",
        content: shortcutGroup(
          "Định dạng và căn đoạn",
          `
            ${shortcut("Ctrl + B", "Bold")}
            ${shortcut("Ctrl + I", "Italic")}
            ${shortcut("Ctrl + U", "Underline")}
            ${shortcut("Ctrl + L", "Align Left")}
            ${shortcut("Ctrl + E", "Center")}
            ${shortcut("Ctrl + R", "Align Right")}
            ${shortcut("Ctrl + J", "Justify")}
            ${shortcut("Ctrl + 1", "Line Spacing 1.0")}
            ${shortcut("Ctrl + 2", "Line Spacing 2.0")}
            ${shortcut("Ctrl + 5", "Line Spacing 1.5")}
          `
        )
      },

      {
        title: "36.3. Mức 3 — Di chuyển và chọn",
        content: shortcutGroup(
          "Điều hướng nhanh",
          `
            ${shortcut("Home", "Đầu dòng")}
            ${shortcut("End", "Cuối dòng")}
            ${shortcut("Ctrl + Home", "Đầu tài liệu")}
            ${shortcut("Ctrl + End", "Cuối tài liệu")}
            ${shortcut("Ctrl + →", "Sang từ tiếp theo")}
            ${shortcut("Ctrl + ←", "Về từ trước")}
            ${shortcut("Ctrl + Shift + →", "Chọn từ sang phải")}
            ${shortcut("Ctrl + Shift + ←", "Chọn từ sang trái")}
            ${shortcut("Shift + End", "Chọn đến cuối dòng")}
            ${shortcut("Shift + Home", "Chọn đến đầu dòng")}
          `
        )
      },

      {
        title: "36.4. Mức 4 — Chuyên nghiệp",
        content: shortcutGroup(
          "Tài liệu chuyên nghiệp",
          `
            ${shortcut("Ctrl + Enter", "Page Break")}
            ${shortcut("Ctrl + Shift + 8", "Show/Hide")}
            ${shortcut("Ctrl + Space", "Xóa định dạng ký tự")}
            ${shortcut("Ctrl + Q", "Xóa định dạng Paragraph")}
            ${shortcut("Ctrl + Shift + L", "Bullet List")}
            ${shortcut("Shift + F3", "Change Case")}
            ${shortcut("F4", "Lặp thao tác")}
            ${shortcut("F7", "Kiểm tra chính tả")}
            ${shortcut("F9", "Cập nhật Field")}
            ${shortcut("Alt + Ctrl + F", "Footnote")}
            ${shortcut("Alt + Ctrl + D", "Endnote")}
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
    description: "Đánh giá trình độ Word cơ bản, trung cấp, nâng cao và chuyên nghiệp bằng nhiệm vụ thực tế.",
    keywords: [
      "kiem tra",
      "test",
      "danh gia",
      "level",
      "word co ban",
      "word nang cao"
    ],
    sections: [
      {
        title: "37.1. Mức cơ bản",
        content: `
          <p><strong>Thời gian gợi ý:</strong> 20–30 phút.</p>
          <ol>
            <li>Tạo và lưu file mới.</li>
            <li>Nhập 3 đoạn văn; dùng Find/Replace ít nhất một lần.</li>
            <li>Định dạng Font, Size, Bold/Italic và Alignment.</li>
            <li>Tạo Bullets và Numbering.</li>
            <li>Tạo bảng 4 cột × 6 hàng.</li>
            <li>Chèn một ảnh, Resize và lưu file.</li>
          </ol>
        `
      },

      {
        title: "37.2. Mức trung cấp",
        content: `
          <p><strong>Thời gian gợi ý:</strong> 45–60 phút.</p>
          <ol>
            <li>Thiết lập A4, Margins, Line Spacing.</li>
            <li>Tạo Header/Footer và Page Number.</li>
            <li>Dùng Tab/Ruler thay Space để căn một nhóm thông tin.</li>
            <li>Tạo bảng có Merge Cells, AutoFit và Repeat Header Rows.</li>
            <li>Chèn hình và dùng Wrap Text/Crop.</li>
            <li>Tạo Heading 1/2 và Navigation Pane.</li>
          </ol>
        `
      },

      {
        title: "37.3. Mức nâng cao",
        content: `
          <p><strong>Thời gian gợi ý:</strong> 60–90 phút.</p>
          <ol>
            <li>Tạo Multilevel List liên kết Heading.</li>
            <li>Tạo Table of Contents tự động.</li>
            <li>Chèn Caption và Table of Figures.</li>
            <li>Tạo Cross-reference và Footnote.</li>
            <li>Tạo một trang Landscape bằng Section.</li>
            <li>Tạo số trang i/ii/iii rồi bắt đầu lại 1/2/3 ở nội dung.</li>
          </ol>
        `
      },

      {
        title: "37.4. Mức chuyên nghiệp",
        content: `
          <ol>
            <li>Tạo báo cáo 10+ trang theo Styles.</li>
            <li>Dùng Track Changes/Comments để review.</li>
            <li>Kiểm tra lỗi bằng Show/Hide và Navigation Pane.</li>
            <li>Cập nhật toàn bộ mục lục/Caption/Cross-reference.</li>
            <li>Chạy Mail Merge từ Excel.</li>
            <li>Xuất PDF sạch, không lỗi số trang hoặc bố cục.</li>
          </ol>
          <div class="note">
            Đạt mức chuyên nghiệp khi bạn có thể thêm/xóa nội dung mà tài liệu vẫn cập nhật
            tự động thay vì phải sửa số, mục lục và bố cục thủ công.
          </div>
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
    description: "Danh sách kiểm tra tài liệu trước khi gửi, in hoặc xuất PDF.",
    keywords: [
      "checklist",
      "kiem tra",
      "font",
      "heading",
      "pdf",
      "page number",
      "caption",
      "section"
    ],
    sections: [
      {
        title: "38.1. Nội dung",
        content: `
          <ul class="checklist-list">
            <li>☐ Không sai chính tả/ngữ pháp quan trọng.</li>
            <li>☐ Không thiếu tiêu đề, đoạn hoặc phụ lục.</li>
            <li>☐ Thuật ngữ và cách viết tên riêng thống nhất.</li>
            <li>☐ Không còn nội dung thử nghiệm hoặc placeholder.</li>
          </ul>
        `
      },

      {
        title: "38.2. Font và Paragraph",
        content: `
          <ul class="checklist-list">
            <li>☐ Font thống nhất theo quy định.</li>
            <li>☐ Font Size thống nhất.</li>
            <li>☐ Căn lề đoạn đúng.</li>
            <li>☐ Line Spacing đúng.</li>
            <li>☐ Paragraph Spacing đúng.</li>
            <li>☐ Không dùng nhiều Space/Enter để căn.</li>
          </ul>
        `
      },

      {
        title: "38.3. Trang và Section",
        content: `
          <ul class="checklist-list">
            <li>☐ Khổ giấy đúng.</li>
            <li>☐ Margins đúng.</li>
            <li>☐ Orientation đúng.</li>
            <li>☐ Không có trang trắng ngoài ý muốn.</li>
            <li>☐ Section Break đúng vị trí.</li>
            <li>☐ Link to Previous đúng trạng thái.</li>
            <li>☐ Page Number đúng kiểu và đúng số bắt đầu.</li>
          </ul>
        `
      },

      {
        title: "38.4. Hình và bảng",
        content: `
          <ul class="checklist-list">
            <li>☐ Hình rõ nét, không méo.</li>
            <li>☐ Wrap Text/Position ổn định.</li>
            <li>☐ Hình/bảng có Caption nếu tài liệu yêu cầu.</li>
            <li>☐ Bảng không vượt khỏi lề trang.</li>
            <li>☐ Hàng tiêu đề bảng lặp lại nếu bảng qua nhiều trang.</li>
            <li>☐ Borders/Shading thống nhất và dễ đọc.</li>
          </ul>
        `
      },

      {
        title: "38.5. Heading, mục lục và Field",
        content: `
          <ul class="checklist-list">
            <li>☐ Heading đúng cấp.</li>
            <li>☐ Multilevel List đúng.</li>
            <li>☐ Navigation Pane phản ánh đúng cấu trúc.</li>
            <li>☐ Table of Contents đã Update entire table.</li>
            <li>☐ Table of Figures đã cập nhật.</li>
            <li>☐ Cross-reference đúng số.</li>
            <li>☐ Đã cập nhật Field bằng F9 khi cần.</li>
          </ul>
        `
      },

      {
        title: "38.6. Review và bảo vệ",
        content: `
          <ul class="checklist-list">
            <li>☐ Không còn Comment chưa xử lý ngoài ý muốn.</li>
            <li>☐ Track Changes đã Accept/Reject theo yêu cầu.</li>
            <li>☐ Restrict Editing đúng trạng thái trước khi gửi.</li>
            <li>☐ Không để lộ thông tin thử nghiệm/nội bộ trong tài liệu phát hành.</li>
          </ul>
        `
      },

      {
        title: "38.7. Kiểm tra cuối và xuất PDF",
        content: `
          ${shortcut("Ctrl + Shift + 8", "Kiểm tra ký tự định dạng ẩn")}
          ${shortcut("F7", "Kiểm tra chính tả")}
          ${shortcut("Ctrl + S", "Lưu tài liệu")}
          ${wordGuide({
            steps: [
              "Bật Show/Hide và kiểm tra Break/Space/Enter thừa.",
              "Cập nhật mục lục, danh mục hình và Cross-reference.",
              "Kiểm tra số trang ở đầu và cuối mỗi Section.",
              "Mở Print Preview để kiểm tra trang.",
              "Ctrl + S.",
              "Xuất PDF.",
              "Mở chính file PDF vừa xuất và kiểm tra lại vài trang đầu, giữa, cuối."
            ],
            result: "Tài liệu sẵn sàng để gửi, in hoặc lưu trữ."
          })}
        `
      }
    ]
  }
];
