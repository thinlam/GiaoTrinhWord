import type {
  WritingIssue
} from "../types/checker.types";

export async function replaceIssue(
  issue: WritingIssue
): Promise<boolean> {

  return Word.run(
    async context => {

      const paragraph =
        context.document
          .getParagraphByUniqueLocalId(
            issue.paragraphId);

      paragraph.load(
        "text");

      await context.sync();

      const currentText =
        paragraph.text;

      const expectedText =
        currentText.substring(
          issue.start,
          issue.start +
          issue.length);

      /*
       * Document đã thay đổi
       * sau lần check.
       *
       * Không được tự sửa
       * vì có thể sửa nhầm.
       */
      if (
        expectedText !==
        issue.original)
      {
        return false;
      }

      const matches =
        paragraph.search(
          issue.original,
          {
            matchCase:
              true,

            matchWholeWord:
              false
          });

      matches.load(
        "items/text");

      await context.sync();

      const occurrenceIndex =
        getOccurrenceIndex(
          currentText,
          issue.original,
          issue.start);

      if (
        occurrenceIndex < 0 ||
        occurrenceIndex >=
          matches.items.length)
      {
        return false;
      }

      const targetRange =
        matches.items[
          occurrenceIndex
        ];

      targetRange.insertText(
        issue.replacement,
        Word.InsertLocation.replace);

      await context.sync();

      return true;
    }
  );
}

function getOccurrenceIndex(
  text: string,
  search: string,
  targetStart: number
): number {

  let currentIndex =
    text.indexOf(
      search);

  let occurrence = 0;

  while (
    currentIndex >= 0)
  {
    if (
      currentIndex ===
      targetStart)
    {
      return occurrence;
    }

    occurrence++;

    currentIndex =
      text.indexOf(
        search,
        currentIndex +
        search.length);
  }

  return -1;
}