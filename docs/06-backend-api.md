# 06 — Backend Checker API

Có **2 backend tương đương** — frontend gọi cùng một endpoint `POST /api/checker/check`. Cấu hình chọn backend bằng `CHECKER_CONFIG.API_BASE_URL` (rỗng = dùng relative `/api/checker/check`, thường trỏ tới backend deploy cùng origin).

## 1. So sánh 2 backend

| Tiêu chí | Vercel Serverless | ASP.NET Core (.NET 10) |
|---|---|---|
| File | `api/checker/check.ts` | `server/GiaoTrinh.Checker.Api/` |
| OpenAI API | Responses API (`/v1/responses`) | Chat API (`ChatClient`) |
| Model mặc định | `gpt-5-mini` (env `OPENAI_MODEL`) | `gpt-5.6-luna` (config `OpenAI:Model`) |
| API key | env `OPENAI_API_KEY` | config `OpenAI:ApiKey` |
| Giới hạn độ dài | **60.000** ký tự → HTTP 413 | **50.000** ký tự → HTTP 400 |
| Điểm (score) | Tin `score` AI trả (clamp 0..100) | Tính lại từ issues (error 7 / warning 3 / suggestion 1) |
| Issue id | AI trả, fallback `issue-N` | Server sinh `Guid` |
| Endpoint GET (test) | Có (thông tin service) | Không |

## 2. Request / Response chuẩn

```
POST /api/checker/check
Content-Type: application/json

{
  "language": "auto",
  "paragraphs": [
    { "paragraphId": "vsto-paragraph-1", "text": "..." }
  ]
}
```

```
200 OK
{
  "detectedLanguage": "vi",
  "score": 92,
  "issues": [
    {
      "id": "...", "paragraphId": "...", "start": 0, "length": 5,
      "original": "...", "replacement": "...",
      "language": "vi", "category": "spelling", "severity": "error",
      "title": "...", "message": "...", "confidence": 0.98
    }
  ]
}
```

Văn bản rỗng → `200 { detectedLanguage: "unknown", score: 100, issues: [] }`.

## 3. Vercel Serverless (`api/checker/check.ts`)

### 3.1. Quy trình `POST`
1. Lấy `OPENAI_API_KEY`; thiếu → `500 { error }`.
2. Parse body; không phải JSON → `400`.
3. Validate `paragraphs` là array; lọc paragraph hợp lệ (có `paragraphId`, `text` không rỗng), trim text.
4. Không còn paragraph → trả kết quả rỗng (unknown/100).
5. Gộp text và kiểm tra `> 60000` ký tự → `413`.
6. Gọi OpenAI Responses API với:
   - `input`: developer prompt + user payload JSON.
   - `text.format`: `json_schema` `strict: true`.
7. OpenAI HTTP lỗi → map: `401` → "OPENAI_API_KEY không hợp lệ.", `429` → giới hạn/credit; trả `502` (server error) hoặc `400`.
8. `extractOutputText()`: đọc item `output_text` trong `response.output`.
9. Parse JSON; lỗi parse → `502 "Không thể đọc kết quả từ AI."`.
10. `normalizeResult()` làm sạch (lọc paragraphId, clamp confidence/score, id mặc định).
11. Trả `200`.

### 3.2. `GET` (test)
Trả `200 { ok, service, endpoint, method, openaiConfigured }`.

## 4. ASP.NET Core (`server/GiaoTrinh.Checker.Api`)

### 4.1. Khởi động (`Program.cs`)
- `AddControllers`, `AddSingleton(ChatClient)`, `AddScoped<IWritingChecker, OpenAiWritingChecker>`.
- **Fail-fast:** thiếu `OpenAI:ApiKey` → `throw InvalidOperationException("Thiếu OpenAI API key.")` khi start.
- CORS policy `WordAddin` chỉ cho 2 origin: `https://localhost:3000` (dev webpack) và `https://giaotrinh-word.vercel.app` (prod).
- `UseHttpsRedirection` → mặc định dùng HTTPS.

### 4.2. Controller (`CheckerController`)
- `[Route("api/checker")] [HttpPost("check")]`.
- `paragraphs` rỗng → `200 { unknown, 100 }`.
- Tổng ký tự `> 50000` → `400 "Văn bản quá dài cho một lần kiểm tra."`.
- Gọi `IWritingChecker.CheckAsync(request, cancellationToken)`.

### 4.3. Service (`OpenAiWritingChecker`)
1. Serialize `{ language, paragraphs }` camelCase → user message.
2. System prompt (bilingual proofreading rules, quy tắc `original`/`start`/`length`/`confidence`).
3. `ChatResponseFormat.CreateJsonSchemaFormat("writing_check", strict: true)`.
4. Parse kết quả AI; null → `InvalidOperationException("Không đọc được kết quả AI.")`.
5. Với từng issue: tìm paragraph, `ValidateIssue()`:
   - Bỏ nếu `original` rỗng hoặc `original == replacement`.
   - Nếu `start` khớp nội dung → giữ nguyên.
   - Nếu không khớp → tìm occurrences; **đúng 1 lần** mới định vị lại, nhiều lần → bỏ.
6. Dedupe `(paragraphId, start, length, category)`.
7. `CalculateScore` + trả response.

## 5. Xử lý lỗi phía client

`checker-api.ts`:
- Timeout 60s (AbortController) → "Yêu cầu kiểm tra mất quá nhiều thời gian...".
- `!response.ok` → "Checker API <status>: <body>".
- `TypeError` → "Không thể kết nối tới Checker API (<url>).".
- `console.error` log lỗi.

## 6. Cấu hình & secrets

### Vercel
```
OPENAI_API_KEY=<key>
OPENAI_MODEL=<model, optional, default gpt-5-mini>
```

### .NET
`appsettings.json` hoặc User Secrets (`UserSecretsId: fe7e385b-...`):
```json
{ "OpenAI": { "ApiKey": "...", "Model": "gpt-5.6-luna" } }
```

### CORS
- Frontend dev chạy tại `https://localhost:3000`.
- Prod: `https://giaotrinh-word.vercel.app`.