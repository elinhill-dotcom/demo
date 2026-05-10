"use client";

import { useRouter } from "next/navigation";
import type { ShopLocale } from "@/i18n/shop-locale";

export function LocaleToggle({
  locale,
  ariaLabel,
}: {
  locale: ShopLocale;
  ariaLabel: string;
}) {
  const router = useRouter();

  async function setLocale(next: ShopLocale) {
    if (next === locale) return;
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    router.refresh();
  }

  return (
    <div
      className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2 py-1.5"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => void setLocale("nl")}
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
          locale === "nl"
            ? "bg-white text-black"
            : "text-white/65 hover:text-white"
        }`}
        aria-pressed={locale === "nl"}
      >
        NL
      </button>
      <span className="text-white/35 select-none text-[10px]" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => void setLocale("en")}
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
          locale === "en"
            ? "bg-white text-black"
            : "text-white/65 hover:text-white"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
