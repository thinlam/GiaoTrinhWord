import "./taskpane.css";

import {
  lessons
} from "../lessons/lessons";

import type {
  Lesson,
  LessonLevel,
  LessonSection
} from "../types/lesson.types";

import {
  initChecker
} from "../ui/checker-ui";


// =========================================================
// CONFIG
// =========================================================

interface LevelConfig {
  description: string;
  className: string;
}


const LEVELS: Record<LessonLevel, LevelConfig> = {

  "CƠ BẢN": {
    description: "Kiến thức nền tảng",
    className: "level-basic"
  },

  "TRUNG CẤP": {
    description: "Kỹ năng xử lý tài liệu",
    className: "level-intermediate"
  },

  "NÂNG CAO": {
    description: "Kỹ năng Word chuyên nghiệp",
    className: "level-advanced"
  },

  "TRA CỨU": {
    description: "Mẹo, lỗi và kỹ thuật cần nhớ",
    className: "level-reference"
  },

  "THỰC HÀNH": {
    description: "Bài tập và kiểm tra kỹ năng",
    className: "level-practice"
  }

};


const LEVEL_ORDER: LessonLevel[] = [
  "CƠ BẢN",
  "TRUNG CẤP",
  "NÂNG CAO",
  "TRA CỨU",
  "THỰC HÀNH"
];


// =========================================================
// DOM
// =========================================================

let appBody: HTMLElement;

let sideloadMessage: HTMLElement;

let learningArea: HTMLElement;

let homeView: HTMLElement;

let lessonView: HTMLElement;

let lessonGroups: HTMLElement;

let searchResultInfo: HTMLElement;

let lessonContent: HTMLElement;

let searchInput: HTMLInputElement;

let clearSearchButton: HTMLButtonElement;


// Checker là chức năng phụ.
// Không được để thiếu DOM của Checker làm chết toàn bộ Giáo Trình.
let checkerPage: HTMLElement | null = null;

let openCheckerButton: HTMLButtonElement | null = null;

let checkerBackButton: HTMLButtonElement | null = null;

let checkerBackButtonBottom: HTMLButtonElement | null = null;


let introSection: HTMLElement | null = null;

let searchSection: HTMLElement | null = null;


let currentKeyword = "";

let appStarted = false;


// =========================================================
// START APPLICATION
// Không dùng Office.onReady() để chặn giao diện.
// VSTO WebView2 chỉ cần DOM tải xong là có thể render.
// =========================================================

function startApplication(): void {

  if (appStarted) {
    return;
  }

  appStarted = true;


  try {

    // 1. Lấy DOM bắt buộc của Giáo Trình.
    initializeDOM();

    // 2. Gắn event.
    bindEvents();

    // 3. Hiện ứng dụng trước.
    // Không để Checker/Office.js giữ màn hình loading.
    showApplication();

    // 4. Render danh sách bài học.
    renderHome();


    // 5. Khởi tạo Checker riêng biệt.
    // Checker lỗi thì Giáo Trình vẫn phải hoạt động.
    try {

      initChecker();

      console.log(
        "✅ Checker initialized."
      );

    } catch (checkerError) {

      console.error(
        "⚠️ Checker init failed:",
        checkerError
      );

    }


    console.log(
      "✅ Giao Trình Word started successfully."
    );

  } catch (error) {

    console.error(
      "❌ Giao Trình Word startup error:",
      error
    );

    showStartupError(
      error
    );

  }

}


// =========================================================
// DOM READY
// =========================================================

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    startApplication,
    {
      once: true
    }
  );

} else {

  startApplication();

}


// =========================================================
// STARTUP ERROR
// Nếu có lỗi thật thì hiển thị lỗi thay vì quay loading mãi.
// =========================================================

function showStartupError(
  error: unknown
): void {

  const message =
    error instanceof Error
      ? error.message
      : String(error);


  const loadingElement =
    document.getElementById(
      "sideload-msg"
    );


  const bodyElement =
    document.getElementById(
      "app-body"
    );


  if (bodyElement) {

    bodyElement.style.display =
      "none";

  }


  if (!loadingElement) {

    return;

  }


  loadingElement.style.display =
    "block";


  loadingElement.innerHTML = `

    <div
      style="
        max-width: 420px;
        margin: 48px auto;
        padding: 24px;
        text-align: center;
        font-family: Segoe UI, Arial, sans-serif;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      "
    >

      <div
        style="
          font-size: 34px;
          line-height: 1;
          margin-bottom: 14px;
        "
        aria-hidden="true"
      >
        ⚠️
      </div>


      <h3
        style="
          margin: 0 0 8px;
          color: #111827;
          font-size: 17px;
        "
      >
        Không thể tải Giáo Trình Word
      </h3>


      <p
        style="
          margin: 0;
          color: #667085;
          font-size: 13px;
          line-height: 1.6;
          word-break: break-word;
        "
      >
        ${escapeHtml(message)}
      </p>

    </div>

  `;

}


// =========================================================
// INIT DOM
// =========================================================

function initializeDOM(): void {

  // =======================================================
  // DOM BẮT BUỘC CỦA GIÁO TRÌNH
  // Thiếu các element này thì cần báo lỗi rõ ràng.
  // =======================================================

  appBody =
    getElement(
      "app-body"
    );


  sideloadMessage =
    getElement(
      "sideload-msg"
    );


  learningArea =
    getElement(
      "learning-area"
    );


  homeView =
    getElement(
      "home-view"
    );


  lessonView =
    getElement(
      "lesson-view"
    );


  lessonGroups =
    getElement(
      "lesson-groups"
    );


  searchResultInfo =
    getElement(
      "search-result-info"
    );


  lessonContent =
    getElement(
      "lesson-content"
    );


  searchInput =
    getElement<HTMLInputElement>(
      "search"
    );


  clearSearchButton =
    getElement<HTMLButtonElement>(
      "clear-search"
    );


  // =======================================================
  // DOM TÙY CHỌN CỦA CHECKER
  // Không dùng getElement() vì Checker có thể chưa tồn tại
  // trong một số giao diện/build.
  // =======================================================

  checkerPage =
    document.getElementById(
      "checker-page"
    );


  openCheckerButton =
    document.getElementById(
      "open-checker-button"
    ) as HTMLButtonElement | null;


  checkerBackButton =
    document.getElementById(
      "checker-back-button"
    ) as HTMLButtonElement | null;


  checkerBackButtonBottom =
    document.getElementById(
      "checker-back-button-bottom"
    ) as HTMLButtonElement | null;


  introSection =
    document.querySelector<HTMLElement>(
      ".intro-section"
    );


  searchSection =
    document.querySelector<HTMLElement>(
      ".search-section"
    );


  console.log(
    "DOM initialized",
    {
      hasCheckerPage:
        checkerPage !== null,

      hasOpenCheckerButton:
        openCheckerButton !== null,

      hasCheckerBackButton:
        checkerBackButton !== null,

      hasCheckerBackButtonBottom:
        checkerBackButtonBottom !== null
    }
  );

}


// =========================================================
// GET ELEMENT
// =========================================================

function getElement<
  T extends HTMLElement = HTMLElement
>(
  id: string
): T {

  const element =
    document.getElementById(
      id
    );


  if (!element) {

    throw new Error(
      `Không tìm thấy element #${id}`
    );

  }


  return element as T;

}


// =========================================================
// SHOW APP
// =========================================================

function showApplication(): void {

  sideloadMessage.style.display =
    "none";


  appBody.style.display =
    "block";

}


// =========================================================
// EVENTS
// =========================================================

function bindEvents(): void {

  searchInput.addEventListener(
    "input",
    handleSearch
  );


  clearSearchButton.addEventListener(
    "click",
    clearSearch
  );


  lessonGroups.addEventListener(
    "click",
    handleLessonClick
  );


  document
    .getElementById(
      "back-button"
    )
    ?.addEventListener(
      "click",
      showHomeView
    );


  document
    .getElementById(
      "back-button-bottom"
    )
    ?.addEventListener(
      "click",
      showHomeView
    );


  openCheckerButton?.addEventListener(
    "click",
    showCheckerView
  );


  checkerBackButton?.addEventListener(
    "click",
    showLearningView
  );


  checkerBackButtonBottom?.addEventListener(
    "click",
    showLearningView
  );

}


// =========================================================
// NORMALIZE
// =========================================================

function normalizeText(
  value: string
): string {

  return value

    .normalize(
      "NFD"
    )

    .replace(
      /[\u0300-\u036f]/g,
      ""
    )

    .replace(
      /đ/g,
      "d"
    )

    .replace(
      /Đ/g,
      "D"
    )

    .toLowerCase()

    .trim();

}


// =========================================================
// SEARCH
// =========================================================

function handleSearch(): void {

  currentKeyword =
    searchInput.value.trim();


  renderHome();

}


// =========================================================
// CLEAR SEARCH
// =========================================================

function clearSearch(): void {

  currentKeyword =
    "";


  searchInput.value =
    "";


  renderHome();


  searchInput.focus();

}


// =========================================================
// FILTER
// =========================================================

function getFilteredLessons():
Lesson[] {

  if (!currentKeyword) {

    return lessons;

  }


  const keyword =
    normalizeText(
      currentKeyword
    );


  return lessons.filter(
    (
      lesson: Lesson
    ) => {

      const text =
        normalizeText(
          [
            lesson.title,
            lesson.description,
            lesson.level,
            ...lesson.keywords
          ].join(
            " "
          )
        );


      return text.includes(
        keyword
      );

    }
  );

}


// =========================================================
// HOME
// =========================================================

function renderHome(): void {

  const filteredLessons =
    getFilteredLessons();


  clearSearchButton.style.visibility =
    currentKeyword
      ? "visible"
      : "hidden";


  renderSearchInfo(
    filteredLessons
  );


  renderLessonGroups(
    filteredLessons
  );

}


// =========================================================
// SEARCH INFO
// =========================================================

function renderSearchInfo(
  filteredLessons: Lesson[]
): void {

  if (!currentKeyword) {

    searchResultInfo.innerHTML =
      "";

    return;

  }


  searchResultInfo.innerHTML = `

    <div class="search-result-message">

      Tìm thấy

      <strong>
        ${filteredLessons.length}
      </strong>

      kết quả cho

      <span>
        “${escapeHtml(currentKeyword)}”
      </span>

    </div>

  `;

}


// =========================================================
// RENDER GROUPS
// =========================================================

function renderLessonGroups(
  filteredLessons: Lesson[]
): void {

  if (
    filteredLessons.length === 0
  ) {

    lessonGroups.innerHTML =
      renderEmptyState();

    return;

  }


  lessonGroups.innerHTML =
    LEVEL_ORDER
      .map(
        (
          level: LessonLevel
        ) =>
          renderLevel(
            level,
            filteredLessons
          )
      )
      .join(
        ""
      );

}


// =========================================================
// RENDER LEVEL
// =========================================================

function renderLevel(
  level: LessonLevel,
  filteredLessons: Lesson[]
): string {

  const levelLessons =
    filteredLessons.filter(
      (
        lesson: Lesson
      ) =>
        lesson.level ===
        level
    );


  if (
    levelLessons.length === 0
  ) {

    return "";

  }


  const config =
    LEVELS[level];


  return `

    <section
      class="
        lesson-group
        ${config.className}
      "
    >

      <div class="lesson-group-header">

        <div class="lesson-group-heading">

          <span
            class="lesson-group-dot"
            aria-hidden="true"
          ></span>


          <div>

            <h2>
              ${escapeHtml(level)}
            </h2>

            <p class="lesson-group-description">
              ${escapeHtml(config.description)}
            </p>

          </div>

        </div>


        <span class="lesson-group-count">

          ${levelLessons.length}

        </span>

      </div>


      <div class="lesson-list">

        ${levelLessons
          .map(
            renderLessonCard
          )
          .join(
            ""
          )}

      </div>

    </section>

  `;

}


// =========================================================
// LESSON CARD
// =========================================================

function renderLessonCard(
  lesson: Lesson
): string {

  return `

    <button
      class="lesson-card"
      type="button"
      data-lesson-id="${escapeHtml(
        lesson.id
      )}"
    >

      <span class="lesson-number">

        ${String(
          lesson.part
        ).padStart(
          2,
          "0"
        )}

      </span>


      <div class="lesson-card-content">

        <h3>

          ${escapeHtml(
            lesson.title
          )}

        </h3>


        <p>

          ${escapeHtml(
            lesson.description
          )}

        </p>

      </div>


      <span
        class="lesson-arrow"
        aria-hidden="true"
      >

        ›

      </span>

    </button>

  `;

}


// =========================================================
// EMPTY STATE
// =========================================================

function renderEmptyState():
string {

  return `

    <div class="empty-state">

      <div class="empty-state-icon">
        ⌕
      </div>


      <h3>
        Không tìm thấy bài học
      </h3>


      <p>

        Thử tìm bằng từ khóa khác như

        <strong>Ctrl + C</strong>,

        <strong>Mục lục</strong>

        hoặc

        <strong>Section</strong>.

      </p>


      <button
        id="empty-clear-search"
        type="button"
        class="empty-clear-button"
      >

        Xóa tìm kiếm

      </button>

    </div>

  `;

}


// =========================================================
// LESSON CLICK
// =========================================================

function handleLessonClick(
  event: MouseEvent
): void {

  if (
    !(event.target instanceof Element)
  ) {

    return;

  }


  const target =
    event.target;


  // =======================================================
  // CLEAR EMPTY SEARCH
  // =======================================================

  const emptyClear =
    target.closest(
      "#empty-clear-search"
    );


  if (
    emptyClear
  ) {

    clearSearch();

    return;

  }


  // =======================================================
  // LESSON CARD
  // =======================================================

  const card =
    target.closest<HTMLElement>(
      "[data-lesson-id]"
    );


  if (!card) {

    return;

  }


  const id =
    card.dataset.lessonId;


  if (!id) {

    return;

  }


  const lesson =
    lessons.find(
      (
        item: Lesson
      ) =>
        item.id ===
        id
    );


  if (!lesson) {

    return;

  }


  showLesson(
    lesson
  );

}


// =========================================================
// SHOW LESSON
// =========================================================

function showLesson(
  lesson: Lesson
): void {

  homeView.hidden =
    true;


  lessonView.hidden =
    false;


  if (
    introSection
  ) {

    introSection.style.display =
      "none";

  }


  if (
    searchSection
  ) {

    searchSection.style.display =
      "none";

  }


  renderLessonHeader(
    lesson
  );


  renderLessonSections(
    lesson
  );


  window.scrollTo({
    top:
      0,

    behavior:
      "smooth"
  });

}


// =========================================================
// LESSON HEADER
// =========================================================

function renderLessonHeader(
  lesson: Lesson
): void {

  const part =
    getElement(
      "lesson-part"
    );


  const level =
    getElement(
      "lesson-level"
    );


  const title =
    getElement(
      "lesson-title"
    );


  const description =
    getElement(
      "lesson-description"
    );


  part.textContent =
    `PHẦN ${lesson.part}`;


  level.textContent =
    lesson.level;


  level.className =
    `level-badge ${getLevelBadgeClass(
      lesson.level
    )}`;


  title.textContent =
    lesson.title;


  description.textContent =
    lesson.description;

}


// =========================================================
// LEVEL BADGE
// =========================================================

function getLevelBadgeClass(
  level: LessonLevel
): string {

  const classes:
    Record<
      LessonLevel,
      string
    > = {

      "CƠ BẢN":
        "badge-basic",

      "TRUNG CẤP":
        "badge-intermediate",

      "NÂNG CAO":
        "badge-advanced",

      "TRA CỨU":
        "badge-reference",

      "THỰC HÀNH":
        "badge-practice"

    };


  return classes[
    level
  ];

}


// =========================================================
// LESSON SECTIONS
// =========================================================

function renderLessonSections(
  lesson: Lesson
): void {

  lessonContent.innerHTML =
    lesson.sections
      .map(
        (
          section: LessonSection,
          index: number
        ) => `

          <article class="lesson-section">

            <div class="lesson-section-number">

              ${String(
                index + 1
              ).padStart(
                2,
                "0"
              )}

            </div>


            <h3>

              ${escapeHtml(
                section.title
              )}

            </h3>


            <div class="lesson-section-body">

              ${section.content}

            </div>

          </article>

        `
      )
      .join(
        ""
      );

}


// =========================================================
// HOME VIEW
// =========================================================

function showHomeView(): void {

  lessonView.hidden =
    true;


  homeView.hidden =
    false;


  if (
    introSection
  ) {

    introSection.style.display =
      "";

  }


  if (
    searchSection
  ) {

    searchSection.style.display =
      "";

  }


  renderHome();


  window.scrollTo({
    top:
      0,

    behavior:
      "smooth"
  });

}


// =========================================================
// SHOW CHECKER VIEW
// =========================================================

function showCheckerView(): void {

  if (!checkerPage) {

    console.warn(
      "Không tìm thấy #checker-page."
    );

    return;

  }


  learningArea.hidden =
    true;


  checkerPage.hidden =
    false;


  window.scrollTo({
    top:
      0,

    behavior:
      "smooth"
  });

}


// =========================================================
// SHOW LEARNING VIEW
// =========================================================

function showLearningView(): void {

  if (
    checkerPage
  ) {

    checkerPage.hidden =
      true;

  }


  learningArea.hidden =
    false;


  showHomeView();

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHtml(
  value: string
): string {

  return value

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}
