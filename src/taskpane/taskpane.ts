/* global Office */

import { lessons } from "../lessons/lessons";

import type {
  Lesson,
  LessonLevel
} from "../lessons/lessons";


const LEVEL_ORDER: LessonLevel[] = [
  "CƠ BẢN",
  "TRUNG CẤP",
  "NÂNG CAO",
  "TRA CỨU",
  "THỰC HÀNH"
];


const LEVEL_INFO: Record<
  LessonLevel,
  {
    icon: string;
    description: string;
  }
> = {

  "CƠ BẢN": {
    icon: "●",
    description: "Kiến thức nền tảng"
  },

  "TRUNG CẤP": {
    icon: "●",
    description: "Kỹ năng xử lý tài liệu"
  },

  "NÂNG CAO": {
    icon: "●",
    description: "Tài liệu chuyên nghiệp"
  },

  "TRA CỨU": {
    icon: "●",
    description: "Tra cứu và xử lý lỗi"
  },

  "THỰC HÀNH": {
    icon: "●",
    description: "Bài tập và kiểm tra"
  }

};


/* =========================================================
   OFFICE READY
========================================================= */

Office.onReady((info) => {

  if (info.host !== Office.HostType.Word) {
    return;
  }


  const sideload =
    document.getElementById(
      "sideload-msg"
    );


  const app =
    document.getElementById(
      "app-body"
    );


  if (sideload) {
    sideload.style.display = "none";
  }


  if (app) {
    app.style.display = "block";
  }


  renderLessons(lessons);

  setupLessonClicks();

  setupSearch();

  setupBackButton();

  setupClearSearch();

});


/* =========================================================
   RENDER HOME
========================================================= */

function renderLessons(
  source: Lesson[]
): void {

  const container =
    document.getElementById(
      "lesson-groups"
    );


  if (!container) {
    return;
  }


  container.innerHTML = "";


  LEVEL_ORDER.forEach((level) => {

    const levelLessons =
      source.filter(
        lesson =>
          lesson.level === level
      );


    if (levelLessons.length === 0) {
      return;
    }


    const group =
      document.createElement(
        "section"
      );


    group.className =
      `lesson-group level-${levelToClass(level)}`;


    const heading =
      document.createElement(
        "div"
      );


    heading.className =
      "group-heading";


    heading.innerHTML = `
      <div class="group-title">
        <span class="level-dot"></span>

        <div>
          <strong>
            ${level}
          </strong>

          <small>
            ${LEVEL_INFO[level].description}
          </small>
        </div>
      </div>

      <span class="lesson-count">
        ${levelLessons.length}
      </span>
    `;


    group.appendChild(
      heading
    );


    const cards =
      document.createElement(
        "div"
      );


    cards.className =
      "lesson-cards";


    levelLessons.forEach(
      lesson => {

        cards.appendChild(
          createLessonCard(
            lesson
          )
        );

      }
    );


    group.appendChild(
      cards
    );


    container.appendChild(
      group
    );

  });


  updateSearchInfo(
    source.length
  );

}


/* =========================================================
   CREATE LESSON CARD
========================================================= */

function createLessonCard(
  lesson: Lesson
): HTMLButtonElement {

  const button =
    document.createElement(
      "button"
    );


  button.type = "button";

  button.className =
    "lesson-card";

  button.dataset.lessonId =
    lesson.id;


  button.innerHTML = `
    <div class="part-number">
      ${lesson.part}
    </div>

    <div class="card-content">

      <strong>
        ${lesson.title}
      </strong>

      <small>
        ${lesson.description}
      </small>

    </div>

    <div class="card-arrow">
      ›
    </div>
  `;


  return button;

}


/* =========================================================
   CLICK LESSON
========================================================= */

function setupLessonClicks(): void {

  document.addEventListener(
    "click",
    event => {

      const target =
        event.target as HTMLElement;


      const button =
        target.closest(
          ".lesson-card"
        ) as HTMLButtonElement | null;


      if (!button) {
        return;
      }


      const lessonId =
        button.dataset.lessonId;


      if (!lessonId) {
        return;
      }


      openLesson(
        lessonId
      );

    }
  );

}


/* =========================================================
   OPEN LESSON
========================================================= */

function openLesson(
  lessonId: string
): void {

  const lesson =
    lessons.find(
      item =>
        item.id === lessonId
    );


  if (!lesson) {

    console.error(
      "Không tìm thấy lesson:",
      lessonId
    );

    return;

  }


  const homeView =
    document.getElementById(
      "home-view"
    );


  const lessonView =
    document.getElementById(
      "lesson-view"
    );


  const title =
    document.getElementById(
      "lesson-title"
    );


  const description =
    document.getElementById(
      "lesson-description"
    );


  const level =
    document.getElementById(
      "lesson-level"
    );


  const part =
    document.getElementById(
      "lesson-part"
    );


  const content =
    document.getElementById(
      "lesson-content"
    );


  if (
    !homeView ||
    !lessonView ||
    !title ||
    !description ||
    !level ||
    !part ||
    !content
  ) {

    console.error(
      "Thiếu element HTML."
    );

    return;

  }


  title.textContent =
    lesson.title;


  description.textContent =
    lesson.description;


  level.textContent =
    lesson.level;


  level.className =
    `level-badge level-${levelToClass(lesson.level)}`;


  part.textContent =
    `PHẦN ${lesson.part}`;


  content.innerHTML =
    lesson.sections
      .map(
        section => `
          <section class="lesson-section">

            <h3>
              ${section.title}
            </h3>

            <div class="section-content">
              ${section.content}
            </div>

          </section>
        `
      )
      .join("");


  homeView.hidden =
    true;


  homeView.style.display =
    "none";


  lessonView.hidden =
    false;


  lessonView.style.display =
    "block";


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   BACK
========================================================= */

function setupBackButton(): void {

  const button =
    document.getElementById(
      "back-button"
    );


  button?.addEventListener(
    "click",
    showHome
  );

}


function showHome(): void {

  const homeView =
    document.getElementById(
      "home-view"
    );


  const lessonView =
    document.getElementById(
      "lesson-view"
    );


  if (lessonView) {

    lessonView.hidden =
      true;

    lessonView.style.display =
      "none";

  }


  if (homeView) {

    homeView.hidden =
      false;

    homeView.style.display =
      "block";

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch(): void {

  const input =
    document.getElementById(
      "search"
    ) as HTMLInputElement | null;


  if (!input) {
    return;
  }


  input.addEventListener(
    "input",
    () => {

      const query =
        normalizeText(
          input.value
        );


      if (!query) {

        renderLessons(
          lessons
        );

        return;

      }


      const filtered =
        lessons.filter(
          lesson =>
            lessonMatches(
              lesson,
              query
            )
        );


      renderLessons(
        filtered
      );

    }
  );

}


/* =========================================================
   SEARCH MATCHING
========================================================= */

function lessonMatches(
  lesson: Lesson,
  query: string
): boolean {

  const sectionText =
    lesson.sections
      .map(
        section =>
          `${section.title} ${stripHtml(section.content)}`
      )
      .join(" ");


  const searchable =
    normalizeText(
      [
        lesson.part.toString(),
        lesson.title,
        lesson.level,
        lesson.description,
        lesson.keywords.join(" "),
        sectionText
      ].join(" ")
    );


  return searchable.includes(
    query
  );

}


/* =========================================================
   CLEAR SEARCH
========================================================= */

function setupClearSearch(): void {

  const button =
    document.getElementById(
      "clear-search"
    );


  const input =
    document.getElementById(
      "search"
    ) as HTMLInputElement | null;


  button?.addEventListener(
    "click",
    () => {

      if (!input) {
        return;
      }


      input.value = "";


      renderLessons(
        lessons
      );


      input.focus();

    }
  );

}


/* =========================================================
   SEARCH RESULT
========================================================= */

function updateSearchInfo(
  count: number
): void {

  const element =
    document.getElementById(
      "search-result-info"
    );


  const input =
    document.getElementById(
      "search"
    ) as HTMLInputElement | null;


  if (!element) {
    return;
  }


  if (
    !input ||
    input.value.trim() === ""
  ) {

    element.innerHTML = "";

    return;

  }


  if (count === 0) {

    element.innerHTML = `
      <div class="no-result">
        Không tìm thấy bài học phù hợp.
      </div>
    `;

    return;

  }


  element.innerHTML = `
    <div class="result-info">
      Tìm thấy
      <strong>${count}</strong>
      bài học.
    </div>
  `;

}


/* =========================================================
   UTILS
========================================================= */

function normalizeText(
  value: string
): string {

  return value
    .normalize("NFD")
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


function stripHtml(
  html: string
): string {

  const element =
    document.createElement(
      "div"
    );


  element.innerHTML =
    html;


  return (
    element.textContent ||
    element.innerText ||
    ""
  );

}


function levelToClass(
  level: LessonLevel
): string {

  switch (level) {

    case "CƠ BẢN":
      return "basic";

    case "TRUNG CẤP":
      return "intermediate";

    case "NÂNG CAO":
      return "advanced";

    case "TRA CỨU":
      return "lookup";

    case "THỰC HÀNH":
      return "practice";

    default:
      return "basic";

  }

}