"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleToggle } from "@/components/LocaleToggle";
import { useCart } from "@/context/cart-context";
import { useShopLocale, useShopT } from "@/context/shop-locale-context";

export function SiteHeader({
  headerTagline,
  headerTitle,
}: {
  headerTagline?: string;
  headerTitle?: string;
}) {
  const t = useShopT();
  const locale = useShopLocale();
  const { itemCount } = useCart();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCheckout = pathname === "/checkout";

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
              {headerTagline?.trim().length ? headerTagline : t.tagline}
            </p>
            <p className="font-semibold text-lg leading-tight">
              {headerTitle?.trim().length ? headerTitle : t.shopTitle}
            </p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 text-sm sm:ml-auto">
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={
              isHome
                ? "inline-flex items-center rounded-full bg-amber-200 px-4 py-2 font-semibold text-black shadow-sm ring-2 ring-amber-50/80 transition-colors hover:bg-amber-100"
                : "inline-flex items-center rounded-full border border-transparent px-4 py-2 font-medium text-white/80 transition-colors hover:border-white/15 hover:bg-white/5 hover:text-amber-100"
            }
          >
            {t.navProducts}
          </Link>
          <Link
            href="/checkout"
            title={t.navCheckout}
            aria-label={`${t.navCart}${itemCount > 0 ? ` (${itemCount})` : ""}`}
            aria-current={isCheckout ? "page" : undefined}
            className={
              isCheckout
                ? "inline-flex items-center gap-2 rounded-full bg-amber-200 px-4 py-2 font-semibold text-black shadow-sm ring-2 ring-amber-50/80 transition-colors hover:bg-amber-100"
                : "inline-flex items-center gap-2 rounded-full border border-white/25 bg-transparent px-4 py-2 font-medium text-white/90 transition-colors hover:border-amber-200/55 hover:bg-white/5 hover:text-amber-100"
            }
          >
            <span>{t.navCart}</span>
            {itemCount > 0 ? (
              <span
                className={
                  isCheckout
                    ? "rounded-full bg-amber-600/20 px-2 py-0.5 text-xs font-semibold text-black tabular-nums"
                    : "rounded-full bg-amber-400/25 px-2 py-0.5 text-xs font-semibold text-amber-100 tabular-nums"
                }
              >
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
