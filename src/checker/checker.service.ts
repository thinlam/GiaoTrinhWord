import {
  getDocumentParagraphs
} from "../word/document-reader";

import {
  checkDocumentApi
} from "../api/checker-api";

import type {
  CheckDocumentResponse
} from "../types/checker.types";

export async function checkEntireDocument():
Promise<CheckDocumentResponse> {

  const paragraphs =
    await getDocumentParagraphs();

  if (
    paragraphs.length === 0)
  {
    return {
      detectedLanguage:
        "unknown",

      score:
        100,

      issues:
        []
    };
  }

  return checkDocumentApi({
    language:
      "auto",

    paragraphs
  });
}