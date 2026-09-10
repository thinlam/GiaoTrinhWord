
import type {
  WordParagraphDto
} from "../types/checker.types";

export function supportsParagraphIds(): boolean {
  return Office.context.requirements
    .isSetSupported("WordApi", "1.6");
}

export async function getDocumentParagraphs():
Promise<WordParagraphDto[]> {

  if (!supportsParagraphIds()) {
    throw new Error(
      "Phiên bản Word hiện tại chưa hỗ trợ WordApi 1.6."
    );
  }

  return Word.run(async context => {

    const paragraphs =
      context.document.body.paragraphs;

    paragraphs.load(
      "items/text,items/uniqueLocalId"
    );

    await context.sync();

    return paragraphs.items
      .filter(
        paragraph =>
          paragraph.text.trim().length > 0
      )
      .map(paragraph => ({
        paragraphId:
          paragraph.uniqueLocalId,

        text:
          paragraph.text
      }));
  });
}