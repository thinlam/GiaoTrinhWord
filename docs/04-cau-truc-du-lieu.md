# 04 — Cấu trúc dữ liệu (Data model)

## 1. Client — `src/types/checker.types.ts`

```ts
type CheckerLanguage     = "vi" | "en" | "mixed" | "unknown";
type CheckerLanguageMode = "auto" | "vi" | "en";

type IssueCategory =
  | "spelling"    // Chính tả
  | "grammar"     // Ngữ pháp
  | "punctuation" // Dấu câu
  | "word_choice" // Dùng từ
  | "clarity"     // Rõ ràng
  | "style"       // Văn phong
  | "context";    // Ngữ cảnh

type IssueSeverity = "error" | "warning" | "suggestion";

interface WordParagraphDto {
  paragraphId: string;
  text: string;
}

interface WritingIssue {
  id: string;
  paragraphId: string;
  start: number;      // offset zero-based trong paragraph
  length: number;     // độ dài original
  original: string;
  replacement: string;
  language: CheckerLanguage;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  message: string;
  confidence: number; // [0,1]
  annotationId?: string; // chỉ set khi annotation Office.js thành công
}

interface CheckDocumentRequest {
  language: CheckerLanguageMode; // frontend luôn gửi "auto"
  paragraphs: WordParagraphDto[];
}

interface CheckDocumentResponse {
  detectedLanguage: CheckerLanguage;
  score: number;   // 0..100
  issues: WritingIssue[];
}
```

## 2. Lesson — `src/types/lesson.types.ts`

```ts
type LessonLevel = "CƠ BẢN" | "TRUNG CẤP" | "NÂNG CAO" | "TRA CỨU" | "THỰC HÀNH";

interface LessonSection {
  title: string;
  content: string; // HTML
}

interface Lesson {
  id: string;
  part: number;
  title: string;
  level: LessonLevel;
  description: string;
  keywords: string[];
  sections: LessonSection[];
}
```

## 3. Shortcut — `src/types/shortcut.types.ts`

```ts
interface ShortcutDetail {
  description?: string;
  steps?: string[];
  result?: string;
  tip?: string;
}
```

## 4. Cấu hình — `src/config/checker.config.ts`

```ts
export const CHECKER_CONFIG = {
  API_BASE_URL: "",     // rỗng → gọi relative /api/checker/check
  REQUEST_TIMEOUT: 60000 // ms
};
```

## 5. Backend .NET — `server/GiaoTrinh.Checker.Api/Models`

Khớp với client (ASP.NET Core mặc định serializes camelCase):

| C# | JSON | Ghi chú |
|---|---|---|
| `CheckDocumentRequest.Language` | `language` | mặc định `"auto"` |
| `CheckDocumentRequest.Paragraphs` | `paragraphs` | `List<ParagraphRequest>` |
| `ParagraphRequest.ParagraphId / Text` | `paragraphId / text` | |
| `CheckDocumentResponse.DetectedLanguage / Score / Issues` | `detectedLanguage / score / issues` | score mặc định `0` |
| `WritingIssueDto.*` | `id, paragraphId, start, length, original, replacement, language, category, severity, title, message, confidence` | |

> ⚠️ Chênh lệch nhỏ: `WritingIssueDto` có thêm `Title`; client `WritingIssue` bắt buộc `title` nhưng **không hiển thị** title trong card (chỉ hiển thị category/message).

## 6. JSON Schema AI

### 6.1. Vercel (`api/checker/check.ts` `getResponseSchema()`)
`text.format` = `json_schema`, `strict: true`. Schema yêu cầu:
- `detectedLanguage` enum `[vi, en, mixed, unknown]`.
- `score` integer 0..100.
- `issues[]`: `id, paragraphId, language(enum vi|en), category, severity, original, replacement, message, confidence(0..1)` — tất cả `required`, `additionalProperties: false`.

### 6.2. .NET (`OpenAiWritingChecker.GetJsonSchema()`)
`ChatResponseFormat.CreateJsonSchemaFormat("writing_check", strict)`:
- `detectedLanguage`, `issues[]`.
- Mỗi issue: `paragraphId, start, length, original, replacement, language(vi|en|mixed|unknown), category, severity, title, message, confidence` — đều `required`, `additionalProperties: false`.

> ⚠️ Sự khác biệt giữa 2 backend:
> - Vercel: AI tự trả `score` (frontend tin tưởng, chỉ clamp 0..100).
> - .NET: `score` do server tính lại từ danh sách issues (error=7, warning=3, suggestion=1 điểm trừ, clamp 0..100).
> - Vercel: `issue.language` chỉ `vi|en`; .NET cho phép thêm `mixed|unknown`.
> - Vercel: không có `title`/`start`/`length` trong schema nhưng `normalizeResult` giữ nguyên `...issue` nên nếu AI trả thêm vẫn sót lại (đã tắt `additionalProperties` ở cấp issue nên AI bị ép không trả thêm).

## 7. Normalize phía Vercel (`normalizeResult`)

- Lọc issue có `paragraphId` không thuộc danh sách paragraph gửi lên, thiếu `original`/`replacement`.
- `id` mặc định `issue-<index+1>` nếu AI không trả.
- Clamp `confidence` vào [0,1]; clamp + round `score` vào [0,100].
- `detectedLanguage` mặc định `"unknown"`.

## 8. Normalize phía .NET (`ValidateIssue`)

- Bỏ issue: `original` rỗng, hoặc `original === replacement`.
- Nếu offset `start` không khớp nội dung tại chỗ:
  - Tìm mọi vị trí xuất hiện `original` trong paragraph.
  - Chỉ định vị lại khi **xuất hiện đúng 1 lần**; nhiều lần → bỏ issue (tránh sửa nhầm).
- Dedupe issues trùng `(paragraphId, start, length, category)`.
- `Id = Guid.NewGuid()`, `confidence` clamp [0,1].
- `CalculateScore`: `penalty = Σ severity(error=7|warning=3|suggestion=1)`, `score = clamp(100 - penalty, 0, 100)`.