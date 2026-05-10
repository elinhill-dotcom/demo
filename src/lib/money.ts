import type { ShopLocale } from "@/i18n/shop-locale";

/** `amountCents` is EUR minor units (100 = 1 €). */
export function formatEuro(
  amountCents: number,
  locale: ShopLocale = "nl",
): string {
  const localeTag = locale === "nl" ? "nl-NL" : "en-GB";
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountCents / 100);
}
