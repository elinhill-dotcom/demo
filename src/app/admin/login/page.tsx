import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminPageTitle } from "@/i18n/admin-locale";
import { isAdminAuthenticated } from "@/lib/session";
import { getShopLocale } from "@/lib/shop-locale-server";
import { AdminLoginClient } from "./AdminLoginClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getShopLocale();
  return { title: adminPageTitle(locale, "metaLogin") };
}

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }
  return <AdminLoginClient />;
}
