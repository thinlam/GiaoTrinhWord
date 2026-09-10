// =========================================================
// /api/checker/check.ts
// Backend Checker API - Vercel Function
// =========================================================


// =========================================================
// TYPES
// =========================================================

type InputLanguage =
  | "auto"
  | "vi"
  | "en";


interface WordParagraphDto {
  paragraphId: string;
  text: string;
}


interface CheckDocumentRequest {
  language: InputLanguage;
  paragraphs: WordParagraphDto[];
}


type DetectedLanguage =
  | "vi"
  | "en"
  | "mixed"
  | "unknown";


type IssueCategory =
  | "spelling"
  | "grammar"
  | "punctuation"
  | "word_choice"
  | "clarity"
  | "style"
  | "context";


type IssueSeverity =
  | "error"
  | "warning"
  | "suggestion";


interface WritingIssue {
  id: string;

  paragraphId: string;

  language:
    | "vi"
    | "en";

  category: IssueCategory;

  severity: IssueSeverity;

  original: string;

  replacement: string;

  message: string;

  confidence: number;
}


interface CheckDocumentResponse {
  detectedLanguage: DetectedLanguage;

  score: number;

  issues: WritingIssue[];
}


// =========================================================
// OPENAI RESPONSE TYPE
// =========================================================

interface OpenAIResponseContent {
  type?: string;
  text?: string;
}


interface OpenAIResponseItem {
  type?: string;
  content?: OpenAIResponseContent[];
}


interface OpenAIResponse {
  output?: OpenAIResponseItem[];

  error?: {
    message?: string;
  };
}


// =========================================================
// CONSTANTS
// =========================================================

const OPENAI_API_URL =
  "https://api.openai.com/v1/responses";


const DEFAULT_MODEL =
  "gpt-5-mini";


const MAX_DOCUMENT_LENGTH =
  60000;


// =========================================================
// POST
// =========================================================

export async function POST(
  request: Request
): Promise<Response> {

  try {

    // =====================================================
    // ENVIRONMENT
    // =====================================================

    const apiKey =
      process.env.OPENAI_API_KEY;


    if (!apiKey) {

      return jsonResponse(
        {
          error:
            "OPENAI_API_KEY chưa được cấu hình trên Vercel."
        },
        500
      );

    }


    const model =
      process.env.OPENAI_MODEL?.trim() ||
      DEFAULT_MODEL;


    // =====================================================
    // READ BODY
    // =====================================================

    let body:
      CheckDocumentRequest;


    try {

      body =
        (await request.json()) as
          CheckDocumentRequest;

    } catch {

      return jsonResponse(
        {
          error:
            "Request body không phải JSON hợp lệ."
        },
        400
      );

    }


    // =====================================================
    // VALIDATE REQUEST
    // =====================================================

    if (
      !body ||
      !Array.isArray(
        body.paragraphs
      )
    ) {

      return jsonResponse(
        {
          error:
            "Thiếu paragraphs."
        },
        400
      );

    }


    const paragraphs =
      body.paragraphs

        .filter(
          (
            paragraph
          ): paragraph is WordParagraphDto =>
            Boolean(
              paragraph &&
              typeof paragraph.paragraphId ===
                "string" &&
              typeof paragraph.text ===
                "string" &&
              paragraph.text.trim().length >
                0
            )
        )

        .map(
          paragraph => ({
            paragraphId:
              paragraph.paragraphId,

            text:
              paragraph.text.trim()
          })
        );


    // =====================================================
    // EMPTY DOCUMENT
    // =====================================================

    if (
      paragraphs.length ===
      0
    ) {

      const emptyResult:
        CheckDocumentResponse = {

        detectedLanguage:
          "unknown",

        score:
          100,

        issues:
          []

      };


      return jsonResponse(
        emptyResult,
        200
      );

    }


    // =====================================================
    // LIMIT INPUT
    // =====================================================

    const documentText =
      paragraphs
        .map(
          paragraph =>
            paragraph.text
        )
        .join(
          "\n"
        );


    if (
      documentText.length >
      MAX_DOCUMENT_LENGTH
    ) {

      return jsonResponse(
        {
          error:
            `Tài liệu quá dài. Tối đa ${MAX_DOCUMENT_LENGTH.toLocaleString()} ký tự cho một lần kiểm tra.`
        },
        413
      );

    }


    // =====================================================
    // PROMPT DATA
    // =====================================================

    const inputData =
      JSON.stringify(
        {
          language:
            body.language ??
            "auto",

          paragraphs
        }
      );


    // =====================================================
    // CALL OPENAI RESPONSES API
    // =====================================================

    const openAIResponse =
      await fetch(
        OPENAI_API_URL,
        {
          method:
            "POST",

          headers: {

            "Authorization":
              `Bearer ${apiKey}`,

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              {
                model,

                input: [
                  {
                    role:
                      "developer",

                    content: [
                      {
                        type:
                          "input_text",

                        text:
                          buildSystemPrompt()
                      }
                    ]
                  },

                  {
                    role:
                      "user",

                    content: [
                      {
                        type:
                          "input_text",

                        text:
                          inputData
                      }
                    ]
                  }
                ],

                text: {
                  format: {
                    type:
                      "json_schema",

                    name:
                      "writing_checker_response",

                    strict:
                      true,

                    schema:
                      getResponseSchema()
                  }
                }
              }
            )
        }
      );


    // =====================================================
    // OPENAI HTTP ERROR
    // =====================================================

    if (
      !openAIResponse.ok
    ) {

      const errorText =
        await openAIResponse.text();


      console.error(
        "OpenAI API error:",
        openAIResponse.status,
        errorText
      );


      return jsonResponse(
        {
          error:
            createOpenAIErrorMessage(
              openAIResponse.status,
              errorText
            )
        },
        openAIResponse.status >= 500
          ? 502
          : 400
      );

    }


    // =====================================================
    // PARSE OPENAI RESPONSE
    // =====================================================

    const openAIResult =
      (await openAIResponse.json()) as
        OpenAIResponse;


    const outputText =
      extractOutputText(
        openAIResult
      );


    if (!outputText) {

      console.error(
        "OpenAI không trả output_text:",
        JSON.stringify(
          openAIResult
        )
      );


      return jsonResponse(
        {
          error:
            "AI không trả về kết quả kiểm tra."
        },
        502
      );

    }


    // =====================================================
    // PARSE STRUCTURED RESULT
    // =====================================================

    let result:
      CheckDocumentResponse;


    try {

      result =
        JSON.parse(
          outputText
        ) as CheckDocumentResponse;

    } catch (
      error
    ) {

      console.error(
        "Không parse được AI JSON:",
        outputText,
        error
      );


      return jsonResponse(
        {
          error:
            "Không thể đọc kết quả từ AI."
        },
        502
      );

    }


    // =====================================================
    // NORMALIZE
    // =====================================================

    const normalized =
      normalizeResult(
        result,
        paragraphs
      );


    return jsonResponse(
      normalized,
      200
    );

  }
  catch (
    error
  ) {

    console.error(
      "Checker API error:",
      error
    );


    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Checker API xảy ra lỗi."
      },
      500
    );

  }

}


// =========================================================
// OPTIONAL GET
// Dùng để test endpoint trên trình duyệt
// =========================================================

export async function GET():
Promise<Response> {

  return jsonResponse(
    {
      ok:
        true,

      service:
        "Giao Trinh Word Checker API",

      endpoint:
        "/api/checker/check",

      method:
        "POST",

      openaiConfigured:
        Boolean(
          process.env.OPENAI_API_KEY
        )
    },
    200
  );

}


// =========================================================
// SYSTEM PROMPT
// =========================================================

function buildSystemPrompt():
string {

  return `
Bạn là công cụ kiểm tra văn bản chuyên nghiệp tích hợp trong Microsoft Word.

Nhiệm vụ:
- Phát hiện lỗi chính tả.
- Phát hiện lỗi ngữ pháp.
- Phát hiện lỗi dấu câu.
- Phát hiện cách dùng từ không phù hợp.
- Phát hiện câu khó hiểu hoặc thiếu rõ ràng.
- Phát hiện lỗi văn phong đáng chú ý.
- Phát hiện lỗi phụ thuộc ngữ cảnh.

Yêu cầu:
1. Không tự ý thay đổi ý nghĩa của tác giả.
2. Chỉ tạo issue khi thực sự có lỗi hoặc có cải thiện rõ ràng.
3. Không tạo quá nhiều góp ý vụn vặt.
4. original phải là nội dung xuất hiện chính xác trong paragraph.
5. replacement phải là nội dung đề xuất thay cho original.
6. paragraphId phải giữ nguyên paragraphId được gửi vào.
7. confidence nằm trong khoảng 0 đến 1.
8. severity:
   - error: lỗi rõ ràng.
   - warning: có khả năng sai hoặc nên sửa.
   - suggestion: cải thiện cách diễn đạt.
9. category chỉ được là:
   spelling,
   grammar,
   punctuation,
   word_choice,
   clarity,
   style,
   context.
10. Nếu văn bản đúng, trả issues rỗng.
11. detectedLanguage:
   - vi: chủ yếu tiếng Việt.
   - en: chủ yếu tiếng Anh.
   - mixed: trộn Việt và Anh.
   - unknown: không xác định.
12. score từ 0 đến 100:
   - 90-100: rất tốt.
   - 75-89: khá tốt.
   - 50-74: cần cải thiện.
   - dưới 50: có nhiều vấn đề.

Thông báo giải thích issue nên ngắn gọn, dễ hiểu và phù hợp với ngôn ngữ của đoạn văn.
`.trim();

}


// =========================================================
// JSON SCHEMA
// =========================================================

function getResponseSchema():
Record<string, unknown> {

  return {

    type:
      "object",

    additionalProperties:
      false,

    properties: {

      detectedLanguage: {
        type:
          "string",

        enum: [
          "vi",
          "en",
          "mixed",
          "unknown"
        ]
      },


      score: {
        type:
          "integer",

        minimum:
          0,

        maximum:
          100
      },


      issues: {

        type:
          "array",

        items: {

          type:
            "object",

          additionalProperties:
            false,

          properties: {

            id: {
              type:
                "string"
            },


            paragraphId: {
              type:
                "string"
            },


            language: {
              type:
                "string",

              enum: [
                "vi",
                "en"
              ]
            },


            category: {
              type:
                "string",

              enum: [
                "spelling",
                "grammar",
                "punctuation",
                "word_choice",
                "clarity",
                "style",
                "context"
              ]
            },


            severity: {
              type:
                "string",

              enum: [
                "error",
                "warning",
                "suggestion"
              ]
            },


            original: {
              type:
                "string"
            },


            replacement: {
              type:
                "string"
            },


            message: {
              type:
                "string"
            },


            confidence: {
              type:
                "number",

              minimum:
                0,

              maximum:
                1
            }

          },

          required: [
            "id",
            "paragraphId",
            "language",
            "category",
            "severity",
            "original",
            "replacement",
            "message",
            "confidence"
          ]
        }
      }

    },

    required: [
      "detectedLanguage",
      "score",
      "issues"
    ]

  };

}


// =========================================================
// EXTRACT RESPONSE TEXT
// =========================================================

function extractOutputText(
  response: OpenAIResponse
): string {

  if (
    !Array.isArray(
      response.output
    )
  ) {

    return "";

  }


  for (
    const item
    of response.output
  ) {

    if (
      !Array.isArray(
        item.content
      )
    ) {

      continue;

    }


    for (
      const content
      of item.content
    ) {

      if (
        content.type ===
          "output_text" &&
        typeof content.text ===
          "string"
      ) {

        return content.text;

      }

    }

  }


  return "";

}


// =========================================================
// NORMALIZE RESULT
// =========================================================

function normalizeResult(
  result: CheckDocumentResponse,
  paragraphs: WordParagraphDto[]
): CheckDocumentResponse {

  const validParagraphIds =
    new Set(
      paragraphs.map(
        paragraph =>
          paragraph.paragraphId
      )
    );


  const issues =
    Array.isArray(
      result.issues
    )
      ? result.issues
      : [];


  const normalizedIssues:
    WritingIssue[] =
      issues

        .filter(
          issue =>
            Boolean(
              issue &&
              issue.original &&
              issue.replacement !==
                undefined &&
              validParagraphIds.has(
                issue.paragraphId
              )
            )
        )

        .map(
          (
            issue,
            index
          ) => ({

            ...issue,

            id:
              issue.id ||
              `issue-${index + 1}`,

            confidence:
              Math.max(
                0,
                Math.min(
                  1,
                  Number(
                    issue.confidence
                  ) || 0
                )
              )

          })
        );


  return {

    detectedLanguage:
      result.detectedLanguage ??
      "unknown",

    score:
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            Number(
              result.score
            ) || 0
          )
        )
      ),

    issues:
      normalizedIssues

  };

}


// =========================================================
// OPENAI ERROR MESSAGE
// =========================================================

function createOpenAIErrorMessage(
  status: number,
  rawMessage: string
): string {

  if (
    status === 401
  ) {

    return "OPENAI_API_KEY không hợp lệ.";

  }


  if (
    status === 429
  ) {

    return (
      "OpenAI API hiện không thể xử lý yêu cầu do giới hạn hoặc tài khoản API không còn credit."
    );

  }


  try {

    const parsed =
      JSON.parse(
        rawMessage
      );


    const message =
      parsed?.error?.message;


    if (
      typeof message ===
        "string" &&
      message.trim()
    ) {

      return message;

    }

  } catch {

    // Ignore parse error
  }


  return (
    `OpenAI API trả lỗi HTTP ${status}.`
  );

}


// =========================================================
// JSON RESPONSE
// =========================================================

function jsonResponse(
  data: unknown,
  status = 200
): Response {

  return Response.json(
    data,
    {
      status,

      headers: {
        "Cache-Control":
          "no-store"
      }
    }
  );

}