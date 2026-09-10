import type {
  WordParagraphDto
} from "../types/checker.types";


// =========================================================
// CHECK OFFICE.JS RUNTIME
// =========================================================

export function isOfficeJsAvailable(): boolean {

  try {

    return (
      typeof Office !== "undefined" &&
      typeof Word !== "undefined" &&
      Office.context != null &&
      Office.context.requirements != null &&
      typeof Office.context.requirements
        .isSetSupported === "function"
    );

  } catch {

    return false;

  }

}


// =========================================================
// SUPPORT WORD PARAGRAPH IDS
// =========================================================

export function supportsParagraphIds(): boolean {

  if (!isOfficeJsAvailable()) {
    return false;
  }


  try {

    return Office.context.requirements
      .isSetSupported(
        "WordApi",
        "1.6"
      );

  } catch {

    return false;

  }

}


// =========================================================
// OFFICE WEB ADD-IN
// =========================================================

export async function getDocumentParagraphs():
Promise<WordParagraphDto[]> {

  if (!isOfficeJsAvailable()) {

    throw new Error(
      "Office.js không khả dụng trong môi trường hiện tại."
    );

  }


  if (!supportsParagraphIds()) {

    throw new Error(
      "Phiên bản Word hiện tại chưa hỗ trợ WordApi 1.6."
    );

  }


  return Word.run(
    async context => {

      const paragraphs =
        context.document.body.paragraphs;


      paragraphs.load(
        "items/text,items/uniqueLocalId"
      );


      await context.sync();


      return paragraphs.items

        .filter(
          paragraph =>
            paragraph.text
              .trim()
              .length > 0
        )

        .map(
          paragraph => ({
            paragraphId:
              paragraph.uniqueLocalId,

            text:
              paragraph.text.trim()
          })
        );

    }
  );

}


// =========================================================
// VSTO / WEBVIEW2
// Convert plain Word text -> paragraphs
// =========================================================

export function createParagraphsFromText(
  text: string
):
WordParagraphDto[] {

  if (
    !text ||
    !text.trim()
  ) {

    return [];

  }


  return text

    // Word thường dùng \r giữa các paragraph
    .split(
      /\r\n|\r|\n/
    )

    .map(
      paragraph =>
        paragraph.trim()
    )

    .filter(
      paragraph =>
        paragraph.length > 0
    )

    .map(
      (
        paragraph,
        index
      ) => ({

        // VSTO không có uniqueLocalId của Office.js
        // nên tạo id tạm phục vụ Checker API
        paragraphId:
          `vsto-paragraph-${index + 1}`,

        text:
          paragraph

      })
    );

}