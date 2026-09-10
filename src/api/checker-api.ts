import {
  CHECKER_CONFIG
} from "../config/checker.config";

import type {
  CheckDocumentRequest,
  CheckDocumentResponse
} from "../types/checker.types";


// =========================================================
// GET API URL
// =========================================================

function getCheckerApiUrl(): string {

  const baseUrl =
    CHECKER_CONFIG.API_BASE_URL
      ?.trim()
      .replace(
        /\/+$/,
        ""
      ) ?? "";


  if (!baseUrl) {

    return "/api/checker/check";

  }


  return `${baseUrl}/api/checker/check`;

}


// =========================================================
// CHECK DOCUMENT API
// =========================================================

export async function checkDocumentApi(
  request: CheckDocumentRequest
): Promise<CheckDocumentResponse> {

  const controller =
    new AbortController();


  const timeout =
    window.setTimeout(
      () => {

        controller.abort();

      },
      CHECKER_CONFIG.REQUEST_TIMEOUT
    );


  const apiUrl =
    getCheckerApiUrl();


  try {

    console.log(
      "Checker API:",
      apiUrl
    );


    // =====================================================
    // CALL BACKEND
    // =====================================================

    const response =
      await fetch(
        apiUrl,
        {
          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json",

            "Accept":
              "application/json"

          },

          body:
            JSON.stringify(
              request
            ),

          signal:
            controller.signal
        }
      );


    // =====================================================
    // HANDLE HTTP ERROR
    // =====================================================

    if (!response.ok) {

      const message =
        await response.text();


      throw new Error(
        `Checker API ${response.status}: ${
          message ||
          response.statusText
        }`
      );

    }


    // =====================================================
    // RESPONSE
    // =====================================================

    const result =
      (await response.json()) as CheckDocumentResponse;


    return result;

  }
  catch (
    error
  ) {

    console.error(
      "Checker API Error:",
      {
        apiUrl,
        error
      }
    );


    // =====================================================
    // TIMEOUT
    // =====================================================

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {

      throw new Error(
        "Yêu cầu kiểm tra mất quá nhiều thời gian. Vui lòng thử lại."
      );

    }


    // =====================================================
    // NETWORK ERROR
    // =====================================================

    if (
      error instanceof TypeError
    ) {

      throw new Error(
        `Không thể kết nối tới Checker API (${apiUrl}).`
      );

    }


    throw error;

  }
  finally {

    window.clearTimeout(
      timeout
    );

  }

}