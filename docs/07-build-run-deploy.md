# 07 — Build, chạy & deploy

## 1. Yêu cầu

- Node.js + npm
- .NET SDK 10 (nếu dùng backend .NET)
- Microsoft 365 / Word Desktop (để sideload test)
- VSTO project riêng (không nằm trong repo) nếu muốn chạy runtime VSTO + WebView2

## 2. Cài đặt

```bash
npm install
```

## 3. Scripts (package.json)

| Lệnh | Chức năng |
|---|---|
| `npm run build` | Build production (`webpack --mode production`) |
| `npm run build:dev` | Build development |
| `npm run dev-server` | Dev server webpack (port 3000, HTTPS) |
| `npm run start` | `office-addin-debugging start manifest.xml` (sideload Word) |
| `npm run stop` | Dừng sideload |
| `npm run watch` | Build watch |
| `npm run lint` / `lint:fix` | `office-addin-lint check/fix` |
| `npm run validate` | Validate `manifest.xml` |
| `npm run signin` / `signout` | Đăng nhập/ra M365 |

## 4. Chạy dev (Web Add-in)

1. `npm run dev-server` — server tại `https://localhost:3000` (tự sinh cert).
2. `npm run start` — sideload add-in vào Word (dùng `manifest.xml`).
3. Word mở taskpane.

> ⚠️ **Lưu ý quan trọng:** `manifest.xml` hiện **hardcode URL production** `https://giaotrinh-word.vercel.app` ở `SourceLocation`, `AppDomains`, icon, `CommandsUrl`... Do đó khi sideload, taskpane sẽ load từ **site đã deploy** chứ không phải dev server local — xem [`Issues/005`](Issues/005-manifest-tro-ve-vercel.md).

## 5. Build production & deploy Vercel

1. `npm run build` → output `dist/`.
2. Kiểm tra `dist/manifest.xml` (webpack copy từ `manifest*.xml`).
   - ⚠️ `webpack.config.js` có `urlProd = "https://www.contoso.com/"` (placeholder). Khi build production, transform sẽ thay `https://localhost:3000/` → `https://www.contoso.com/` — vì manifest hiện không chứa `localhost:3000` nên không đổi gì. Xem [`Issues/004`](Issues/004-url-prod-contoso.md).
3. Deploy lên Vercel:
   - Project `giaotrinh-word` (đã liên kết trong `.vercel/project.json`).
   - `vercel.json` rewrite `/` → `/taskpane.html`.
   - Set env `OPENAI_API_KEY` (+ `OPENAI_MODEL` tùy chọn).
4. Serverless function tự expose tại `/api/checker/check`.

## 6. Chạy backend .NET

```bash
cd server/GiaoTrinh.Checker.Api
dotnet user-secrets set "OpenAI:ApiKey" "<key>"     # hoặc sửa appsettings
dotnet run
```

- HTTP: `http://localhost:5107` · HTTPS: `https://localhost:7028`.
- Endpoint: `POST http://localhost:5107/api/checker/check`.
- CORS đã cho phép `https://localhost:3000` và `https://giaotrinh-word.vercel.app`.
- Để frontend dùng backend .NET: set `CHECKER_CONFIG.API_BASE_URL = "https://localhost:7028"` (chú ý cert https localhost).

## 7. Validate manifest

```bash
npm run validate
```

## 8. Kiến trúc build (webpack)

- Entry: `polyfill`, `taskpane` (`taskpane.ts` + `taskpane.html`), `commands` (`commands.ts`).
- Output: `dist/` (`output.clean: true`).
- Plugins: `HtmlWebpackPlugin` (taskpane.html, commands.html), `CopyWebpackPlugin` (assets/, manifest*.xml).
- Dev server: HTTPS port 3000, header `Access-Control-Allow-Origin: *`.