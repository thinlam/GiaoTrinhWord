import {
  CHECKER_CONFIG
} from "../config/checker.config";


import type {
  CheckDocumentRequest,
  CheckDocumentResponse
} from "../types/checker.types";


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


  try {

    // =====================================================
    // CALL BACKEND API
    // =====================================================

    const response =
      await fetch(
        `${CHECKER_CONFIG.API_BASE_URL}/api/checker/check`,
        {
          method: "POST",

          headers: {
            "Content-Type":
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

    if (
      !response.ok
    ) {

      const message =
        await response.text();


      throw new Error(
        `Checker API ${response.status}: ${message}`
      );

    }


    // =====================================================
    // READ RESPONSE
    // =====================================================

    const result:
      CheckDocumentResponse =
        await response.json();


    return result;

  }
  catch (
    error
  ) {

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
    // NETWORK / BACKEND ERROR
    // =====================================================

    if (
      error instanceof TypeError
    ) {

      throw new Error(
        "Không thể kết nối tới Checker API. Vui lòng kiểm tra backend đang chạy."
      );

    }


    throw error;

  }
  finally {

    // =====================================================
    // CLEAR TIMEOUT
    // =====================================================

    window.clearTimeout(
      timeout
    );

  }

}