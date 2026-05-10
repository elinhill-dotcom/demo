import type { ShopLocale } from "@/i18n/shop-locale";

/** Machine-readable API error codes returned in JSON `{ code }` (fallback `error` is English for logs). */
export const API_ERROR_CODES = [
  "UNAUTHORIZED",
  "INVALID_JSON",
  "INVALID_REQUEST",
  "INVALID_PAYLOAD",
  "INVALID_LOCALE",
  "NOT_FOUND",
  "VALIDATION_FAILED",
  "PRODUCT_UNAVAILABLE",
  "INCORRECT_PASSWORD",
  "INVALID_LOGIN_REQUEST",
  "UPLOAD_PARSE_FAILED",
  "NO_UPLOAD_FILE",
  "UPLOAD_MEDIA_INVALID",
  "UPLOAD_FILE_TOO_LARGE",
  "UPLOAD_TYPE_UNKNOWN",
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export const apiErrorMessages: Record<ApiErrorCode, { nl: string; en: string }> =
  {
    UNAUTHORIZED: {
      nl: "Je bent niet ingelogd of deze actie is niet toegestaan.",
      en: "You are not signed in or this action is not allowed.",
    },
    INVALID_JSON: {
      nl: "Ongeldige gegevens van de server (JSON).",
      en: "Invalid data from the server (JSON).",
    },
    INVALID_REQUEST: {
      nl: "Ongeldig verzoek.",
      en: "Invalid request.",
    },
    INVALID_PAYLOAD: {
      nl: "De ingevulde gegevens zijn ongeldig.",
      en: "The submitted data is invalid.",
    },
    INVALID_LOCALE: {
      nl: "Onbekende taalkeuze.",
      en: "Unknown language choice.",
    },
    NOT_FOUND: {
      nl: "Niet gevonden.",
      en: "Not found.",
    },
    VALIDATION_FAILED: {
      nl: "Controleer alle verplichte velden.",
      en: "Please check all required fields.",
    },
    PRODUCT_UNAVAILABLE: {
      nl: "Product niet beschikbaar.",
      en: "Product unavailable.",
    },
    INCORRECT_PASSWORD: {
      nl: "Onjuist wachtwoord.",
      en: "Incorrect password.",
    },
    INVALID_LOGIN_REQUEST: {
      nl: "Inlogverzoek ongeldig.",
      en: "Invalid login request.",
    },
    UPLOAD_PARSE_FAILED: {
      nl: "Kon de upload niet verwerken.",
      en: "Could not process the upload.",
    },
    NO_UPLOAD_FILE: {
      nl: "Geen bestand gekozen.",
      en: "No file provided.",
    },
    UPLOAD_MEDIA_INVALID: {
      nl: "Alleen JPEG, PNG of WebP zijn toegestaan.",
      en: "Only JPEG, PNG, or WebP are allowed.",
    },
    UPLOAD_FILE_TOO_LARGE: {
      nl: "Het bestand is te groot.",
      en: "File too large.",
    },
    UPLOAD_TYPE_UNKNOWN: {
      nl: "Onbekend afbeeldingstype.",
      en: "Unknown image type.",
    },
  };

export function resolveApiMessageForLocale(
  locale: ShopLocale,
  payload: unknown,
  fallback: string,
): string {
  if (!payload || typeof payload !== "object") return fallback;
  const raw = payload as { code?: unknown; error?: unknown };
  if (typeof raw.code === "string" && raw.code in apiErrorMessages) {
    const row = apiErrorMessages[raw.code as ApiErrorCode];
    return locale === "nl" ? row.nl : row.en;
  }
  if (typeof raw.error === "string" && raw.error.length > 0) return raw.error;
  return fallback;
}
