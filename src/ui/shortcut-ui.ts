import {
  SHORTCUT_DETAILS
} from "../lessons/shortcut-details";

import type {
  ShortcutDetail
} from "../types/shortcut.types";

function splitShortcutKeys(
  combo: string
): string[] {
  return combo
    .split(" + ")
    .map((key) => key.trim())
    .filter(Boolean);
}

function renderShortcutKeys(
  combo: string
): string {
  const keys = splitShortcutKeys(combo);

  return `
    <div class="gt-key-combination">
      ${keys
        .map(
          (key, index) => `
            ${
              index > 0
                ? `<span class="gt-key-plus">+</span>`
                : ""
            }

            <kbd class="gt-key">
              ${key}
            </kbd>
          `
        )
        .join("")}
    </div>
  `;
}

function createDefaultSteps(
  combo: string
): string[] {
  const keys = splitShortcutKeys(combo);

  if (keys.length === 1) {
    return [
      `Nhấn phím <strong>${keys[0]}</strong>.`
    ];
  }

  const finalKey =
    keys[keys.length - 1];

  const holdingKeys =
    keys.slice(0, -1);

  return [
    `Nhấn giữ ${holdingKeys
      .map(
        (key) =>
          `<strong>${key}</strong>`
      )
      .join(" + ")}.`,

    `Trong khi vẫn giữ phím trên, nhấn <strong>${finalKey}</strong>.`
  ];
}

export function shortcut(
  combo: string,
  title: string,
  extra?: ShortcutDetail
): string {
  const base =
    SHORTCUT_DETAILS[combo] || {};

  const detail: ShortcutDetail = {
    ...base,
    ...extra
  };

  const steps =
    detail.steps &&
    detail.steps.length > 0
      ? detail.steps
      : createDefaultSteps(combo);

  return `
    <details class="gt-shortcut-card">

      <summary class="gt-shortcut-summary">

        <div class="gt-shortcut-main">

          ${renderShortcutKeys(combo)}

          <div class="gt-shortcut-text">

            <strong class="gt-shortcut-name">
              ${title}
            </strong>

            ${
              detail.description
                ? `
                  <span class="gt-shortcut-description">
                    ${detail.description}
                  </span>
                `
                : ""
            }

          </div>

        </div>

        <span class="gt-shortcut-chevron">
          ›
        </span>

      </summary>

      <div class="gt-shortcut-body">

        <div class="gt-shortcut-section">

          <div class="gt-shortcut-section-title">
            CÁCH THAO TÁC
          </div>

          <ol class="gt-shortcut-steps">

            ${steps
              .map(
                (step, index) => `
                  <li>

                    <span class="gt-step-number">
                      ${index + 1}
                    </span>

                    <span class="gt-step-text">
                      ${step}
                    </span>

                  </li>
                `
              )
              .join("")}

          </ol>

        </div>

        ${
          detail.result
            ? `
              <div class="gt-shortcut-result">

                <span class="gt-result-icon">
                  ✓
                </span>

                <div>
                  <strong>Kết quả</strong>
                  <p>${detail.result}</p>
                </div>

              </div>
            `
            : ""
        }

        ${
          detail.tip
            ? `
              <div class="gt-shortcut-tip">

                <span class="gt-tip-icon">
                  💡
                </span>

                <div>
                  <strong>Mẹo</strong>
                  <p>${detail.tip}</p>
                </div>

              </div>
            `
            : ""
        }

      </div>

    </details>
  `;
}

export function shortcutGroup(
  title: string,
  items: string
): string {
  return `
    <section class="gt-shortcut-group">

      <div class="gt-shortcut-group-title">
        ${title}
      </div>

      <div class="gt-shortcut-list">
        ${items}
      </div>

    </section>
  `;
}