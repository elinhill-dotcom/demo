import { cookies } from "next/headers";
import {
  LOCALE_COOKIE,
  type ShopLocale,
} from "@/i18n/shop-locale";

export async function getShopLocale(): Promise<ShopLocale> {
  const jar = await cookies();
  const v = jar.get(LOCALE_COOKIE)?.value;
  return v === "en" ? "en" : "nl";
}
