import type { ApiErrorCode } from "@/i18n/api-error-messages";
import { apiErrorMessages } from "@/i18n/api-error-messages";
import { NextResponse } from "next/server";

/** JSON error body for `/api/*`; clients should prefer `code` and map with `resolveApiMessageForLocale`. */
export function apiJsonError(code: ApiErrorCode, status: number) {
  return NextResponse.json(
    { code, error: apiErrorMessages[code].en },
    { status },
  );
}
