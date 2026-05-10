"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleToggle } from "@/components/LocaleToggle";
import { useAdminLocale, useAdminT } from "@/context/admin-locale-context";
import { logoutAdmin } from "./(panel)/actions";

function adminNavItemActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function adminNavLinkClass(active: boolean, isStorefront = false): string {
  if (active) {
    return "inline-flex items-center rounded-full bg-amber-200 px-3 py-1.5 font-semibold text-black shadow-sm ring-2 ring-amber-50/70 transition-colors hover:bg-amber-100";
  }
  return isStorefront
    ? "inline-flex items-center rounded-full border border-amber-400/25 px-3 py-1.5 font-medium text-amber-200/90 transition-colors hover:border-amber-300/45 hover:bg-amber-400/10 hover:text-amber-50"
    : "inline-flex items-center rounded-full border border-transparent px-3 py-1.5 font-medium text-stone-400 transition-colors hover:border-white/10 hover:bg-white/5 hover:text-white";
}

export function AdminPanelBar() {
  const t = useAdminT();
  const locale = useAdminLocale();
  const pathname = usePathname();

  return (
    <div className="border-b border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <p className="text-sm font-medium text-stone-200">{t.navAdminLabel}</p>
        <nav className="flex flex-wrap items-center gap-2 text-sm sm:gap-3">
          <Link
            href="/admin"
            aria-current={adminNavItemActive(pathname, "/admin") ? "page" : undefined}
            className={adminNavLinkClass(adminNavItemActive(pathname, "/admin"))}
          >
            {t.navOrders}
          </Link>
          <Link
            href="/admin/products"
            aria-current={
              adminNavItemActive(pathname, "/admin/products") ? "page" : undefined
            }
            className={adminNavLinkClass(adminNavItemActive(pathname, "/admin/products"))}
          >
            {t.navProducts}
          </Link>
          <Link
            href="/admin/settings"
            aria-current={
              adminNavItemActive(pathname, "/admin/settings") ? "page" : undefined
            }
            className={adminNavLinkClass(adminNavItemActive(pathname, "/admin/settings"))}
          >
            {t.navCheckoutNotice}
          </Link>
          <Link
            href="/admin/subscribers"
            aria-current={
              adminNavItemActive(pathname, "/admin/subscribers") ? "page" : undefined
            }
            className={adminNavLinkClass(adminNavItemActive(pathname, "/admin/subscribers"))}
          >
            {t.navMailList}
          </Link>
          <Link
            href="/"
            aria-current={adminNavItemActive(pathname, "/") ? "page" : undefined}
            className={adminNavLinkClass(adminNavItemActive(pathname, "/"), true)}
          >
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
