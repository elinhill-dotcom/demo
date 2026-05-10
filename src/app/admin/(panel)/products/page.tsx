import type { Metadata } from "next";
import { adminPageTitle } from "@/i18n/admin-locale";
import { getShopLocale } from "@/lib/shop-locale-server";
import { ProductsAdmin } from "./ProductsAdmin";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getShopLocale();
  return { title: adminPageTitle(locale, "metaProducts") };
}

export default function AdminProductsPage() {
  return <ProductsAdmin />;
}
