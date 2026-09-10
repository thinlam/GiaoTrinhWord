import {
  checkDocumentText,
  checkEntireDocument
} from "../checker/checker.service";

import {
  getIssues,
  removeIssue,
  setIssues
} from "../checker/issue-store";

import {
  applyAnnotations,
  removeAnnotation
} from "../word/annotation-manager";

import {
  replaceIssue
} from "../word/replacement-manager";

import type {
  CheckDocumentResponse,
  IssueCategory,
  WritingIssue
} from "../types/checker.types";


// =========================================================
// VSTO / WEBVIEW2 BRIDGE TYPES
// =========================================================

interface WebView2Bridge {
  postMessage(message: unknown): void;

  addEventListener(
    type: "message",
    listener: (event: MessageEvent) => void
  ): void;
}


interface BridgeResponse<T = unknown> {
  responseTo?: string;
  requestId?: string;
  type?: string;
  ok?: boolean;
  data?: T;
  message?: string;
}


interface PendingBridgeRequest {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  timer: number;
}


type BridgeWindow =
  Window & {
    chrome?: {
      webview?: WebView2Bridge;
    };
  };


// =========================================================
// STATE
// =========================================================

const pendingBridgeRequests =
  new Map<string, PendingBridgeRequest>();

let bridgeInitialized =
  false;

let checkerInitialized =
  false;


// =========================================================
// RUNTIME DETECTION
// =========================================================

function getVstoBridge():
WebView2Bridge | null {

  const currentWindow =
    window as BridgeWindow;


  return (
    currentWindow.chrome
      ?.webview ??
    null
  );

}


function isVstoRuntime():
boolean {

  return (
    getVstoBridge() !==
    null
  );

}


function isOfficeJsRuntimeReady():
boolean {

  try {

    return (
      typeof Office !==
        "undefined" &&

      typeof Word !==
        "undefined" &&

      Office.context !=
        null &&

      Office.context.requirements !=
        null &&

      typeof Office.context
        .requirements
        .isSetSupported ===
        "function"
    );

  } catch {

    return false;

  }

}


// =========================================================
// BRIDGE INITIALIZATION
// =========================================================

function initializeVstoBridge():
void {

  if (
    bridgeInitialized
  ) {

    return;

  }


  const bridge =
    getVstoBridge();


  if (!bridge) {

    return;

  }


  bridgeInitialized =
    true;


  bridge.addEventListener(
    "message",
    handleVstoMessage
  );


  console.log(
    "✅ VSTO WebView2 bridge detected."
  );

}


// =========================================================
// VSTO MESSAGE HANDLER
// =========================================================

function handleVstoMessage(
  event: MessageEvent
): void {

  const message =
    event.data as BridgeResponse;


  if (
    !message ||
    typeof message !==
      "object"
  ) {

    return;

  }


  const responseId =
    message.responseTo ??
    message.requestId;


  if (!responseId) {

    return;

  }


  const pending =
    pendingBridgeRequests.get(
      responseId
    );


  if (!pending) {

    return;

  }


  window.clearTimeout(
    pending.timer
  );


  pendingBridgeRequests.delete(
    responseId
  );


  if (
    message.ok ===
    false
  ) {

    pending.reject(
      new Error(
        message.message ??
        "VSTO không thể xử lý yêu cầu."
      )
    );

    return;

  }


  pending.resolve(
    message.data
  );

}


// =========================================================
// CREATE REQUEST ID
// =========================================================

function createRequestId():
string {

  return [
    "req",
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join(
    "-"
  );

}


// =========================================================
// SEND VSTO REQUEST
// =========================================================

function sendVstoRequest<T>(
  type: string,
  data?: unknown,
  timeoutMs = 30000
): Promise<T> {

  const bridge =
    getVstoBridge();


  if (!bridge) {

    return Promise.reject(
      new Error(
        "Không tìm thấy VSTO WebView2 bridge."
      )
    );

  }


  const requestId =
    createRequestId();


  return new Promise<T>(
    (
      resolve,
      reject
    ) => {

      const timer =
        window.setTimeout(
          () => {

            pendingBridgeRequests.delete(
              requestId
            );


            reject(
              new Error(
                "VSTO không phản hồi. " +
                "Cần cấu hình WebMessageReceived trong TaskPaneControl.cs."
              )
            );

          },
          timeoutMs
        );


      pendingBridgeRequests.set(
        requestId,
        {
          resolve:
            (
              value
            ) => resolve(
              value as T
            ),

          reject,

          timer
        }
      );


      bridge.postMessage({
        type,
        requestId,
        data
      });

    }
  );

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHtml(
  value: string
): string {

  const element =
    document.createElement(
      "div"
    );


  element.textContent =
    value;


  return element.innerHTML;

}


// =========================================================
// CATEGORY NAME
// =========================================================

function getCategoryName(
  category: IssueCategory
): string {

  const categories:
    Record<
      IssueCategory,
      string
    > = {

      spelling:
        "Chính tả",

      grammar:
        "Ngữ pháp",

      punctuation:
        "Dấu câu",

      word_choice:
        "Dùng từ",

      clarity:
        "Rõ ràng",

      style:
        "Văn phong",

      context:
        "Ngữ cảnh"

    };


  return categories[
    category
  ];

}


// =========================================================
// ISSUE ICON
// =========================================================

function getIssueIcon(
  issue: WritingIssue
): string {

  switch (
    issue.severity
  ) {

    case "error":

      return "🔴";


    case "warning":

      return "🟠";


    case "suggestion":

      return "🔵";


    default:

      return "•";

  }

}


// =========================================================
// LANGUAGE LABEL
// =========================================================

function getLanguageLabel(
  language:
    CheckDocumentResponse[
      "detectedLanguage"
    ]
): string {

  switch (
    language
  ) {

    case "vi":

      return "Tiếng Việt";


    case "en":

      return "English";


    case "mixed":

      return "VI + EN";


    default:

      return "Tự động";

  }

}


// =========================================================
// STATUS
// =========================================================

function setCheckerStatus(
  message: string,
  isError = false
): void {

  const status =
    document.getElementById(
      "checker-status"
    );


  if (!status) {

    return;

  }


  status.textContent =
    message;


  status.toggleAttribute(
    "data-error",
    isError
  );

}


// =========================================================
// RENDER RESULT
// =========================================================

function renderResult(
  result: CheckDocumentResponse
): void {

  const score =
    document.getElementById(
      "checker-score"
    );


  const count =
    document.getElementById(
      "checker-count"
    );


  const language =
    document.getElementById(
      "checker-language"
    );


  if (score) {

    score.textContent =
      String(
        result.score
      );

  }


  if (count) {

    count.textContent =
      String(
        result.issues.length
      );

  }


  if (language) {

    language.textContent =
      getLanguageLabel(
        result.detectedLanguage
      );

  }


  renderIssues(
    result.issues
  );

}


// =========================================================
// RENDER ISSUES
// =========================================================

function renderIssues(
  issues: WritingIssue[]
): void {

  const container =
    document.getElementById(
      "checker-issues"
    );


  if (!container) {

    return;

  }


  container.innerHTML =
    "";


  // =======================================================
  // EMPTY
  // =======================================================

  if (
    issues.length ===
    0
  ) {

    container.innerHTML = `

      <div class="checker-empty">

        <div class="checker-empty-icon">
          ✓
        </div>

        <strong>
          Văn bản trông ổn
        </strong>

        <p>
          Không phát hiện lỗi đáng kể.
        </p>

      </div>

    `;


    return;

  }


  // =======================================================
  // ISSUE CARDS
  // =======================================================

  for (
    const issue
    of issues
  ) {

    const card =
      document.createElement(
        "article"
      );


    card.className =
      `checker-issue checker-${issue.severity}`;


    card.dataset.issueId =
      issue.id;


    card.innerHTML = `

      <div class="checker-issue-header">

        <div class="checker-issue-type">

          <span>
            ${getIssueIcon(issue)}
          </span>

          <strong>
            ${getCategoryName(
              issue.category
            )}
          </strong>

        </div>

        <span class="checker-language-badge">
          ${escapeHtml(
            issue.language.toUpperCase()
          )}
        </span>

      </div>


      <div class="checker-original">
        ${escapeHtml(
          issue.original
        )}
      </div>


      <div class="checker-arrow">
        ↓
      </div>


      <button
        type="button"
        class="checker-replacement"
        data-action="accept"
      >
        ✓ ${escapeHtml(
          issue.replacement
        )}
      </button>


      <p class="checker-message">
        ${escapeHtml(
          issue.message
        )}
      </p>


      <div class="checker-confidence">

        Độ tin cậy:

        ${Math.round(
          issue.confidence *
          100
        )}%

      </div>


      <div class="checker-actions">

        <button
          type="button"
          class="checker-accept"
          data-action="accept"
        >
          Chấp nhận
        </button>

        <button
          type="button"
          class="checker-ignore"
          data-action="ignore"
        >
          Bỏ qua
        </button>

      </div>

    `;


    container.appendChild(
      card
    );

  }

}


// =========================================================
// VSTO DOCUMENT DATA
// =========================================================

interface VstoDocumentData {
  text: string;
  isSelection?: boolean;
  documentName?: string;
}


// =========================================================
// RUN CHECK BY CURRENT RUNTIME
// =========================================================

async function executeDocumentCheck():
Promise<CheckDocumentResponse> {

  // =======================================================
  // VSTO + WEBVIEW2
  // C# chỉ đọc nội dung Word.
  // TypeScript tiếp tục gọi Checker API.
  // =======================================================

  if (
    isVstoRuntime()
  ) {

    const documentData =
      await sendVstoRequest<VstoDocumentData>(
        "GET_DOCUMENT_TEXT"
      );

    if (
      !documentData ||
      !documentData.text ||
      !documentData.text.trim()
    ) {

      throw new Error(
        "Tài liệu chưa có nội dung để kiểm tra."
      );

    }

    console.log(
      "Đã nhận nội dung từ VSTO:",
      {
        documentName:
          documentData.documentName,

        isSelection:
          documentData.isSelection,

        textLength:
          documentData.text.length
      }
    );

    return checkDocumentText(
      documentData.text
    );

  }


  // =======================================================
  // OFFICE WEB ADD-IN
  // =======================================================

  if (
    isOfficeJsRuntimeReady()
  ) {

    return await checkEntireDocument();

  }


  throw new Error(
    "Không tìm thấy môi trường Microsoft Word hợp lệ."
  );

}


// =========================================================
// APPLY ANNOTATIONS BY CURRENT RUNTIME
// =========================================================

async function applyIssueAnnotations(
  issues: WritingIssue[]
): Promise<void> {

  if (
    issues.length ===
    0
  ) {

    return;

  }


  if (
    isVstoRuntime()
  ) {

    await sendVstoRequest(
      "APPLY_ANNOTATIONS",
      {
        issues
      }
    );

    return;

  }


  if (
    isOfficeJsRuntimeReady()
  ) {

    await applyAnnotations(
      issues
    );

  }

}


// =========================================================
// ACCEPT ISSUE BY CURRENT RUNTIME
// =========================================================

async function acceptIssue(
  issue: WritingIssue
): Promise<boolean> {

  if (
    isVstoRuntime()
  ) {

    const result =
      await sendVstoRequest<{
        success: boolean;
      }>(
        "ACCEPT_ISSUE",
        {
          issue
        }
      );


    return (
      result?.success ===
      true
    );

  }


  if (
    isOfficeJsRuntimeReady()
  ) {

    const success =
      await replaceIssue(
        issue
      );


    if (!success) {

      return false;

    }


    await removeAnnotation(
      issue.id
    );


    return true;

  }


  return false;

}


// =========================================================
// IGNORE ISSUE BY CURRENT RUNTIME
// =========================================================

async function ignoreIssue(
  issue: WritingIssue
): Promise<void> {

  if (
    isVstoRuntime()
  ) {

    await sendVstoRequest(
      "IGNORE_ISSUE",
      {
        issueId:
          issue.id
      }
    );

    return;

  }


  if (
    isOfficeJsRuntimeReady()
  ) {

    await removeAnnotation(
      issue.id
    );

  }

}


// =========================================================
// RUN CHECKER
// =========================================================

async function runChecker():
Promise<void> {

  const button =
    document.getElementById(
      "checker-run"
    );


  if (
    !(button instanceof HTMLButtonElement)
  ) {

    console.error(
      "Không tìm thấy button #checker-run."
    );

    return;

  }


  const defaultButtonText =
    button.textContent ||
    "✨ Kiểm tra toàn bộ văn bản";


  try {

    button.disabled =
      true;


    button.textContent =
      "Đang kiểm tra...";


    setCheckerStatus(
      isVstoRuntime()

        ? "Đang đọc nội dung từ Word và phân tích..."

        : "Đang phân tích nội dung tài liệu..."
    );


    // =====================================================
    // CHECK
    // =====================================================

    const result =
      await executeDocumentCheck();


    // =====================================================
    // STORE
    // =====================================================

    setIssues(
      result.issues
    );


    // =====================================================
    // UI FIRST
    // Không để lỗi annotation làm mất kết quả kiểm tra.
    // =====================================================

    renderResult(
      result
    );


    // =====================================================
    // ANNOTATIONS
    // =====================================================

    try {

      await applyIssueAnnotations(
        result.issues
      );

    } catch (
      annotationError
    ) {

      console.warn(
        "Không thể đánh dấu lỗi trực tiếp trong Word:",
        annotationError
      );

    }


    setCheckerStatus(
      result.issues.length > 0

        ? `Đã tìm thấy ${result.issues.length} vấn đề.`

        : "Không phát hiện lỗi đáng kể."
    );

  }
  catch (
    error
  ) {

    console.error(
      "Checker error:",
      error
    );


    const message =
      error instanceof Error

        ? error.message

        : "Không thể kiểm tra văn bản.";


    setCheckerStatus(
      message,
      true
    );

  }
  finally {

    button.disabled =
      false;


    button.textContent =
      defaultButtonText;

  }

}


// =========================================================
// HANDLE ISSUE CLICK
// =========================================================

async function handleIssueClick(
  event: Event
): Promise<void> {

  if (
    !(event.target instanceof Element)
  ) {

    return;

  }


  const actionElement =
    event.target.closest<HTMLElement>(
      "[data-action]"
    );


  if (!actionElement) {

    return;

  }


  const card =
    actionElement.closest<HTMLElement>(
      ".checker-issue"
    );


  if (!card) {

    return;

  }


  const issueId =
    card.dataset.issueId;


  if (!issueId) {

    return;

  }


  const issue =
    getIssues()
      .find(
        (
          item
        ) =>
          item.id ===
          issueId
      );


  if (!issue) {

    return;

  }


  const action =
    actionElement.dataset.action;


  disableIssueCard(
    card,
    true
  );


  try {

    // =====================================================
    // ACCEPT
    // =====================================================

    if (
      action ===
      "accept"
    ) {

      const success =
        await acceptIssue(
          issue
        );


      if (!success) {

        window.alert(
          "Văn bản đã thay đổi sau lần kiểm tra. " +
            "Vui lòng kiểm tra lại."
        );

        return;

      }


      removeIssue(
        issue.id
      );


      card.remove();


      updateIssueCounter();


      setCheckerStatus(
        "Đã áp dụng gợi ý."
      );


      return;

    }


    // =====================================================
    // IGNORE
    // =====================================================

    if (
      action ===
      "ignore"
    ) {

      await ignoreIssue(
        issue
      );


      removeIssue(
        issue.id
      );


      card.remove();


      updateIssueCounter();


      setCheckerStatus(
        "Đã bỏ qua vấn đề."
      );

    }

  }
  catch (
    error
  ) {

    console.error(
      "Issue action error:",
      error
    );


    setCheckerStatus(
      error instanceof Error

        ? error.message

        : "Không thể xử lý gợi ý.",
      true
    );

  }
  finally {

    if (
      document.body.contains(
        card
      )
    ) {

      disableIssueCard(
        card,
        false
      );

    }

  }

}


// =========================================================
// DISABLE ISSUE CARD
// =========================================================

function disableIssueCard(
  card: HTMLElement,
  disabled: boolean
): void {

  const buttons =
    card.querySelectorAll<
      HTMLButtonElement
    >(
      "button"
    );


  buttons.forEach(
    (
      button
    ) => {

      button.disabled =
        disabled;

    }
  );

}


// =========================================================
// UPDATE COUNTER
// =========================================================

function updateIssueCounter():
void {

  const counter =
    document.getElementById(
      "checker-count"
    );


  if (!counter) {

    return;

  }


  const issueCount =
    getIssues().length;


  counter.textContent =
    String(
      issueCount
    );


  if (
    issueCount ===
    0
  ) {

    renderIssues(
      []
    );

    setCheckerStatus(
      "Đã xử lý tất cả vấn đề."
    );

  }

}


// =========================================================
// INIT
// =========================================================

export function initChecker():
void {

  if (
    checkerInitialized
  ) {

    return;

  }


  checkerInitialized =
    true;


  // Khởi tạo bridge nếu đang chạy bằng VSTO WebView2.
  initializeVstoBridge();


  const checkButton =
    document.getElementById(
      "checker-run"
    );


  if (
    checkButton instanceof HTMLButtonElement
  ) {

    checkButton.addEventListener(
      "click",
      () => {

        void runChecker();

      }
    );

  } else {

    console.warn(
      "Không tìm thấy #checker-run."
    );

  }


  const issueContainer =
    document.getElementById(
      "checker-issues"
    );


  issueContainer
    ?.addEventListener(
      "click",
      (
        event
      ) => {

        void handleIssueClick(
          event
        );

      }
    );


  // Hiển thị runtime để debug.
  console.log(
    "Checker runtime:",
    {
      vsto:
        isVstoRuntime(),

      officeJs:
        isOfficeJsRuntimeReady()
    }
  );

}
