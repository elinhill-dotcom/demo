"use client";

import Link from "next/link";
import { LocaleToggle } from "@/components/LocaleToggle";
import { useAdminLocale, useAdminT } from "@/context/admin-locale-context";
import { logoutAdmin } from "./(panel)/actions";

export function AdminPanelBar() {
  const t = useAdminT();
  const locale = useAdminLocale();

  return (
    <div className="border-b border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <p className="text-sm font-medium text-stone-200">{t.navAdminLabel}</p>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-stone-400">
          <Link href="/admin" className="hover:text-white">
            {t.navOrders}
          </Link>
          <Link href="/admin/products" className="hover:text-white">
            {t.navProducts}
          </Link>
          <Link href="/admin/settings" className="hover:text-white">
            {t.navCheckoutNotice}
          </Link>
          <Link href="/admin/subscribers" className="hover:text-white">
            {t.navMailList}
          </Link>
          <Link href="/" className="text-amber-200/90 hover:text-amber-100">
            {t.navStorefront}
          </Link>
          <LocaleToggle locale={locale} ariaLabel={t.language} />
          <form action={logoutAdmin} className="inline">
            <button
              type="submit"
              className="text-stone-500 hover:text-stone-200 text-xs uppercase tracking-wide"
            >
              {t.navLogOut}
            </button>
          </form>
        </nav>
      </div>
    </div>
  );
}
