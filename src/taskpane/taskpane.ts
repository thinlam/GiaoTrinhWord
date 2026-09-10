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

let checkerPage: HTMLElement;

let lessonGroups: HTMLElement;

let searchResultInfo: HTMLElement;

let lessonContent: HTMLElement;

let searchInput: HTMLInputElement;

let clearSearchButton: HTMLButtonElement;

let openCheckerButton: HTMLButtonElement;

let checkerBackButton: HTMLButtonElement;

let checkerBackButtonBottom: HTMLButtonElement;

let introSection: HTMLElement | null;

let searchSection: HTMLElement | null;


let currentKeyword = "";


// =========================================================
// START OFFICE
// =========================================================

Office.onReady((info) => {

  if (
    info.host !==
    Office.HostType.Word
  ) {

    console.warn(
      "Add-in này chỉ hỗ trợ Microsoft Word."
    );

    return;

  }


  initializeDOM();

  bindEvents();

  initChecker();

  showApplication();

  renderHome();

});


// =========================================================
// INIT DOM
// =========================================================

function initializeDOM(): void {

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


  checkerPage =
    getElement(
      "checker-page"
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


  openCheckerButton =
    getElement<HTMLButtonElement>(
      "open-checker-button"
    );


  checkerBackButton =
    getElement<HTMLButtonElement>(
      "checker-back-button"
    );


  checkerBackButtonBottom =
    getElement<HTMLButtonElement>(
      "checker-back-button-bottom"
    );


  introSection =
    document.querySelector(
      ".intro-section"
    );


  searchSection =
    document.querySelector(
      ".search-section"
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


  openCheckerButton.addEventListener(
    "click",
    showCheckerView
  );


  checkerBackButton.addEventListener(
    "click",
    showLearningView
  );


  checkerBackButtonBottom.addEventListener(
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
              ${level}
            </h2>

            <p class="lesson-group-description">
              ${config.description}
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

  checkerPage.hidden =
    true;


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