import type {
  WritingIssue
} from "../types/checker.types";

const annotationIds =
  new Map<string, string>();

export function supportsAnnotations():
boolean {

  return Office.context.requirements
    .isSetSupported(
      "WordApi",
      "1.7");
}

function getColor(
  issue: WritingIssue
): Word.CritiqueColorScheme {

  switch (
    issue.severity)
  {
    case "error":

      return Word
        .CritiqueColorScheme
        .red;

    case "warning":

      return Word
        .CritiqueColorScheme
        .berry;

    case "suggestion":

      return Word
        .CritiqueColorScheme
        .blue;

    default:

      return Word
        .CritiqueColorScheme
        .lavender;
  }
}

export async function applyAnnotations(
  issues: WritingIssue[]
): Promise<void> {

  await clearAllAnnotations();

  if (
    !supportsAnnotations() ||
    issues.length === 0)
  {
    return;
  }

  await Word.run(
    async context => {

      const groups =
        new Map<
          string,
          WritingIssue[]
        >();

      for (
        const issue
        of issues)
      {
        const list =
          groups.get(
            issue.paragraphId)
          ?? [];

        list.push(issue);

        groups.set(
          issue.paragraphId,
          list);
      }

      const pending:
        Array<{
          issues:
            WritingIssue[];

          result:
            OfficeExtension
              .ClientResult<
                string[]
              >;
        }> = [];

      for (
        const [
          paragraphId,
          paragraphIssues
        ]
        of groups)
      {
        const paragraph =
          context.document
            .getParagraphByUniqueLocalId(
              paragraphId);

        const critiques:
          Word.Critique[] =
          paragraphIssues.map(
            issue => ({
              start:
                issue.start,

              length:
                issue.length,

              colorScheme:
                getColor(issue)
            })
          );

        const result =
          paragraph
            .insertAnnotations({
              critiques
            });

        pending.push({
          issues:
            paragraphIssues,

          result
        });
      }

      await context.sync();

      for (
        const item
        of pending)
      {
        const ids =
          item.result.value;

        for (
          let index = 0;
          index < ids.length;
          index++)
        {
          const issue =
            item.issues[index];

          const annotationId =
            ids[index];

          issue.annotationId =
            annotationId;

          annotationIds.set(
            issue.id,
            annotationId);
        }
      }
    }
  );
}

export async function
removeAnnotation(
  issueId: string
): Promise<void> {

  const annotationId =
    annotationIds.get(
      issueId);

  if (!annotationId)
  {
    return;
  }

  try {

    await Word.run(
      async context => {

        const annotation =
          context.document
            .getAnnotationById(
              annotationId);

        annotation.delete();

        await context.sync();
      });

  } catch (
    error)
  {
    console.warn(
      "Annotation đã bị xóa:",
      error
    );
  }

  annotationIds.delete(
    issueId);
}

export async function
clearAllAnnotations():
Promise<void> {

  const ids =
    Array.from(
      annotationIds.values());

  for (
    const id of ids)
  {
    try {

      await Word.run(
        async context => {

          const annotation =
            context.document
              .getAnnotationById(
                id);

          annotation.delete();

          await context.sync();
        });

    } catch {
      // Annotation có thể
      // không còn tồn tại.
    }
  }

  annotationIds.clear();
}