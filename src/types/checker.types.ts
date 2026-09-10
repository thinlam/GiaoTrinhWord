export type CheckerLanguage =
  | "vi"
  | "en"
  | "mixed"
  | "unknown";

export type CheckerLanguageMode =
  | "auto"
  | "vi"
  | "en";

export type IssueCategory =
  | "spelling"
  | "grammar"
  | "punctuation"
  | "word_choice"
  | "clarity"
  | "style"
  | "context";

export type IssueSeverity =
  | "error"
  | "warning"
  | "suggestion";

export interface WordParagraphDto {
  paragraphId: string;
  text: string;
}

export interface WritingIssue {
  id: string;

  paragraphId: string;

  start: number;
  length: number;

  original: string;
  replacement: string;

  language: CheckerLanguage;

  category: IssueCategory;
  severity: IssueSeverity;

  title: string;
  message: string;

  confidence: number;

  annotationId?: string;
}

export interface CheckDocumentRequest {
  language: CheckerLanguageMode;

  paragraphs: WordParagraphDto[];
}

export interface CheckDocumentResponse {
  detectedLanguage: CheckerLanguage;

  score: number;

  issues: WritingIssue[];
}