import {
  createParagraphsFromText,
  getDocumentParagraphs
} from "../word/document-reader";


import {
  checkDocumentApi
} from "../api/checker-api";


import type {
  CheckDocumentResponse,
  WordParagraphDto
} from "../types/checker.types";


// =========================================================
// CHECK OFFICE DOCUMENT
// Dùng khi chạy Office Web Add-in
// =========================================================

export async function checkEntireDocument():
Promise<CheckDocumentResponse> {

  const paragraphs =
    await getDocumentParagraphs();


  return checkParagraphs(
    paragraphs
  );

}


// =========================================================
// CHECK VSTO DOCUMENT TEXT
// Dùng khi text được C# gửi qua WebView2
// =========================================================

export async function checkDocumentText(
  text: string
):
Promise<CheckDocumentResponse> {

  const paragraphs =
    createParagraphsFromText(
      text
    );


  return checkParagraphs(
    paragraphs
  );

}


// =========================================================
// CHECK PARAGRAPHS
// Dùng chung cho cả VSTO và Office.js
// =========================================================

export async function checkParagraphs(
  paragraphs: WordParagraphDto[]
):
Promise<CheckDocumentResponse> {

  if (
    !paragraphs ||
    paragraphs.length === 0
  ) {

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