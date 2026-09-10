import {
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
    CheckDocumentResponse["detectedLanguage"]
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
    issues.length === 0
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
// RUN CHECKER
// =========================================================

async function runChecker():
Promise<void> {

  const button =
    document.getElementById(
      "checker-run"
    );


  const status =
    document.getElementById(
      "checker-status"
    );


  // Phải là button thật
  if (
    !(button instanceof HTMLButtonElement)
  ) {

    console.error(
      "Không tìm thấy button #checker-run."
    );

    return;

  }


  try {

    button.disabled =
      true;


    button.textContent =
      "Đang kiểm tra...";


    if (status) {

      status.textContent =
        "Đang phân tích nội dung tài liệu...";

    }


    // =====================================================
    // CHECK API
    // =====================================================

    const result =
      await checkEntireDocument();


    // =====================================================
    // STORE
    // =====================================================

    setIssues(
      result.issues
    );


    // =====================================================
    // WORD ANNOTATIONS
    // =====================================================

    await applyAnnotations(
      result.issues
    );


    // =====================================================
    // UI
    // =====================================================

    renderResult(
      result
    );


    if (status) {

      status.textContent =
        result.issues.length > 0

          ? `Đã tìm thấy ${result.issues.length} vấn đề.`

          : "Không phát hiện lỗi đáng kể.";

    }

  }
  catch (
    error
  ) {

    console.error(
      "Checker error:",
      error
    );


    if (status) {

      status.textContent =
        error instanceof Error

          ? error.message

          : "Không thể kiểm tra văn bản.";

    }

  }
  finally {

    button.disabled =
      false;


    button.textContent =
      "✨ Kiểm tra toàn bộ văn bản";

  }

}


// =========================================================
// HANDLE ISSUE CLICK
// =========================================================

async function handleIssueClick(
  event: Event
): Promise<void> {

  // EventTarget chưa chắc là Element
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
        (item) =>
          item.id === issueId
      );


  if (!issue) {

    return;

  }


  const action =
    actionElement.dataset.action;


  // =======================================================
  // ACCEPT
  // =======================================================

  if (
    action === "accept"
  ) {

    const success =
      await replaceIssue(
        issue
      );


    if (!success) {

      window.alert(
        "Văn bản đã thay đổi sau lần kiểm tra. Vui lòng kiểm tra lại."
      );

      return;

    }


    await removeAnnotation(
      issue.id
    );


    removeIssue(
      issue.id
    );


    card.remove();


    updateIssueCounter();


    return;

  }


  // =======================================================
  // IGNORE
  // =======================================================

  if (
    action === "ignore"
  ) {

    await removeAnnotation(
      issue.id
    );


    removeIssue(
      issue.id
    );


    card.remove();


    updateIssueCounter();

  }

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


  counter.textContent =
    String(
      getIssues().length
    );

}


// =========================================================
// INIT
// =========================================================

export function initChecker():
void {

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

}