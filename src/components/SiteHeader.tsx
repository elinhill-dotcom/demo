"use client";

import Image from "next/image";
import Link from "next/link";
import { LocaleToggle } from "@/components/LocaleToggle";
import { useCart } from "@/context/cart-context";
import { useShopLocale, useShopT } from "@/context/shop-locale-context";

export function SiteHeader() {
  const t = useShopT();
  const locale = useShopLocale();
  const { itemCount } = useCart();

  return (
    <header className="border-b border-stone-200 bg-black text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/boergondisch-logo.png"
            alt="Boergondisch"
            width={56}
            height={56}
            className="rounded-sm border border-white/15"
          />
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-200/90">
              {t.tagline}
            </p>
            <p className="font-semibold text-lg leading-tight">{t.shopTitle}</p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-3 sm:gap-4 text-sm sm:ml-auto">
          <Link
            href="/"
            className="text-white/90 hover:text-amber-200 transition-colors"
          >
            {t.navProducts}
          </Link>
          <Link
            href="/checkout"
            title={t.navCheckout}
            aria-label={`${t.navCart}${itemCount > 0 ? ` (${itemCount})` : ""}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-black hover:bg-amber-100 transition-colors"
          >
            <span>{t.navCart}</span>
            {itemCount > 0 ? (
              <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-black tabular-nums">
                {itemCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/admin/login"
            className="text-white/55 hover:text-white/90 transition-colors text-xs"
          >
            {t.navAdmin}
          </Link>
          <LocaleToggle locale={locale} ariaLabel={t.language} />
        </nav>
      </div>
    </header>
  );
}
