using System.Text.Json;
using GiaoTrinh.Checker.Api.Models;
using OpenAI.Chat;

namespace GiaoTrinh.Checker.Api.Services;

public sealed class OpenAiWritingChecker
    : IWritingChecker
{
    private readonly ChatClient _client;

    public OpenAiWritingChecker(
        ChatClient client)
    {
        _client = client;
    }

    public async Task<CheckDocumentResponse>
        CheckAsync(
            CheckDocumentRequest request,
            CancellationToken cancellationToken = default)
    {
        if (request.Paragraphs.Count == 0)
        {
            return new CheckDocumentResponse
            {
                DetectedLanguage = "unknown",
                Score = 100
            };
        }

        var payload =
            JsonSerializer.Serialize(
                new
                {
                    language =
                        request.Language,

                    paragraphs =
                        request.Paragraphs
                },
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy =
                        JsonNamingPolicy.CamelCase
                });

        List<ChatMessage> messages =
        [
            new SystemChatMessage(
                GetSystemPrompt()),

            new UserChatMessage(
                payload)
        ];

        var options =
            new ChatCompletionOptions
            {
                ResponseFormat =
                    ChatResponseFormat
                        .CreateJsonSchemaFormat(
                            jsonSchemaFormatName:
                                "writing_check",

                            jsonSchema:
                                BinaryData.FromBytes(
                                    GetJsonSchema()),

                            jsonSchemaIsStrict:
                                true)
            };

        ChatCompletion completion =
            await _client.CompleteChatAsync(
                messages,
                options,
                cancellationToken);

        var json =
            completion.Content[0].Text;

        var aiResult =
            JsonSerializer.Deserialize<
                AiCheckResult>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive =
                        true
                });

        if (aiResult is null)
        {
            throw new InvalidOperationException(
                "Không đọc được kết quả AI."
            );
        }

        var issues =
            new List<WritingIssueDto>();

        foreach (
            var aiIssue
            in aiResult.Issues)
        {
            var paragraph =
                request.Paragraphs
                    .FirstOrDefault(
                        x =>
                            x.ParagraphId ==
                            aiIssue.ParagraphId);

            if (paragraph is null)
            {
                continue;
            }

            var issue =
                ValidateIssue(
                    paragraph,
                    aiIssue);

            if (issue is not null)
            {
                issues.Add(issue);
            }
        }

        issues =
            issues
                .GroupBy(
                    x =>
                        new
                        {
                            x.ParagraphId,
                            x.Start,
                            x.Length,
                            x.Category
                        })
                .Select(x => x.First())
                .ToList();

        return new CheckDocumentResponse
        {
            DetectedLanguage =
                aiResult.DetectedLanguage,

            Score =
                CalculateScore(issues),

            Issues =
                issues
        };
    }

    private static int CalculateScore(
        List<WritingIssueDto> issues)
    {
        var penalty = 0;

        foreach (var issue in issues)
        {
            penalty +=
                issue.Severity switch
                {
                    "error" => 7,
                    "warning" => 3,
                    "suggestion" => 1,
                    _ => 1
                };
        }

        return Math.Clamp(
            100 - penalty,
            0,
            100);
    }

    private static WritingIssueDto?
        ValidateIssue(
            ParagraphRequest paragraph,
            AiIssue aiIssue)
    {
        if (
            string.IsNullOrWhiteSpace(
                aiIssue.Original))
        {
            return null;
        }

        if (
            aiIssue.Original ==
            aiIssue.Replacement)
        {
            return null;
        }

        var text =
            paragraph.Text;

        var start =
            aiIssue.Start;

        var validStart =
            start >= 0 &&
            start +
            aiIssue.Original.Length
            <= text.Length;

        if (validStart)
        {
            var actualText =
                text.Substring(
                    start,
                    aiIssue.Original.Length);

            validStart =
                actualText ==
                aiIssue.Original;
        }

        if (!validStart)
        {
            var occurrences =
                FindOccurrences(
                    text,
                    aiIssue.Original);

            /*
             * Nếu chỉ xuất hiện đúng 1 lần
             * thì có thể định vị an toàn.
             *
             * Nếu xuất hiện nhiều lần mà
             * AI trả offset sai thì bỏ issue,
             * tránh sửa nhầm vị trí.
             */
            if (occurrences.Count != 1)
            {
                return null;
            }

            start =
                occurrences[0];
        }

        return new WritingIssueDto
        {
            Id =
                Guid.NewGuid()
                    .ToString(),

            ParagraphId =
                paragraph.ParagraphId,

            Start =
                start,

            Length =
                aiIssue.Original.Length,

            Original =
                aiIssue.Original,

            Replacement =
                aiIssue.Replacement,

            Language =
                aiIssue.Language,

            Category =
                aiIssue.Category,

            Severity =
                aiIssue.Severity,

            Title =
                aiIssue.Title,

            Message =
                aiIssue.Message,

            Confidence =
                Math.Clamp(
                    aiIssue.Confidence,
                    0,
                    1)
        };
    }

    private static List<int>
        FindOccurrences(
            string text,
            string search)
    {
        var result =
            new List<int>();

        var position = 0;

        while (true)
        {
            var index =
                text.IndexOf(
                    search,
                    position,
                    StringComparison.Ordinal);

            if (index < 0)
            {
                break;
            }

            result.Add(index);

            position =
                index +
                Math.Max(
                    search.Length,
                    1);
        }

        return result;
    }

    private static string
        GetSystemPrompt()
    {
        return """
You are a professional bilingual proofreading engine
for a Microsoft Word writing assistant.

The user provides paragraphs from a Word document.

You must inspect Vietnamese, English,
and mixed Vietnamese-English text.

Detect genuine issues in:
- spelling
- grammar
- punctuation
- word choice
- clarity
- style
- context

IMPORTANT RULES:

1. Do not unnecessarily rewrite correct text.

2. Do not flag proper nouns, personal names,
company names, brands, APIs, programming
languages, abbreviations, product names,
or technical terminology unless there is
a clear linguistic mistake.

3. For Vietnamese, preserve all Vietnamese
diacritics.

4. For English, check:
- spelling
- subject-verb agreement
- tense
- article usage
- prepositions
- plural/singular
- punctuation
- natural word choice
- grammatical construction

5. original MUST be copied EXACTLY
from the provided paragraph.

6. Mark the smallest useful span.
Do not mark the entire paragraph if
only one word or phrase is incorrect.

7. paragraphId MUST be copied EXACTLY
from the input.

8. start is zero-based and refers
to the start of original inside
the paragraph.

9. length MUST equal original length.

10. replacement is the corrected
replacement for original only.

11. confidence must be between 0 and 1.

Severity:
error = clear spelling or grammar mistake.
warning = probable grammar/context/word-choice problem.
suggestion = optional clarity or style improvement.

If text is correct, do not create an issue.

Respond only according to the JSON schema.
""";
    }

    private static byte[]
        GetJsonSchema()
    {
        return """
{
  "type": "object",
  "properties": {
    "detectedLanguage": {
      "type": "string",
      "enum": [
        "vi",
        "en",
        "mixed",
        "unknown"
      ]
    },
    "issues": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "paragraphId": {
            "type": "string"
          },
          "start": {
            "type": "integer"
          },
          "length": {
            "type": "integer"
          },
          "original": {
            "type": "string"
          },
          "replacement": {
            "type": "string"
          },
          "language": {
            "type": "string",
            "enum": [
              "vi",
              "en",
              "mixed",
              "unknown"
            ]
          },
          "category": {
            "type": "string",
            "enum": [
              "spelling",
              "grammar",
              "punctuation",
              "word_choice",
              "clarity",
              "style",
              "context"
            ]
          },
          "severity": {
            "type": "string",
            "enum": [
              "error",
              "warning",
              "suggestion"
            ]
          },
          "title": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "confidence": {
            "type": "number"
          }
        },
        "required": [
          "paragraphId",
          "start",
          "length",
          "original",
          "replacement",
          "language",
          "category",
          "severity",
          "title",
          "message",
          "confidence"
        ],
        "additionalProperties": false
      }
    }
  },
  "required": [
    "detectedLanguage",
    "issues"
  ],
  "additionalProperties": false
}
"""u8.ToArray();
    }

    private sealed class AiCheckResult
    {
        public string DetectedLanguage
        {
            get;
            set;
        } = "unknown";

        public List<AiIssue> Issues
        {
            get;
            set;
        } = [];
    }

    private sealed class AiIssue
    {
        public string ParagraphId
        {
            get;
            set;
        } = string.Empty;

        public int Start
        {
            get;
            set;
        }

        public int Length
        {
            get;
            set;
        }

        public string Original
        {
            get;
            set;
        } = string.Empty;

        public string Replacement
        {
            get;
            set;
        } = string.Empty;

        public string Language
        {
            get;
            set;
        } = "unknown";

        public string Category
        {
            get;
            set;
        } = "grammar";

        public string Severity
        {
            get;
            set;
        } = "warning";

        public string Title
        {
            get;
            set;
        } = string.Empty;

        public string Message
        {
            get;
            set;
        } = string.Empty;

        public double Confidence
        {
            get;
            set;
        }
    }
}