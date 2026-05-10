import type { Metadata } from "next";
import { CartProvider } from "@/context/cart-context";
import { ShopLocaleProvider } from "@/context/shop-locale-context";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterNote } from "@/components/FooterNote";
import { getShopLocale } from "@/lib/shop-locale-server";
import { shopMessages, shopMeta } from "@/i18n/shop-locale";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getShopLocale();
  const meta = shopMeta[locale];

  return {
    title: {
      default: meta.title,
      template: meta.titleTemplate,
    },
    description: meta.description,
  };
}

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getShopLocale();
  const messages = shopMessages[locale];
  const settingsRow = await prisma.appSettings.findUnique({ where: { id: 1 } });
  const headerTagline =
    (locale === "nl"
      ? settingsRow?.headerTaglineNl?.trim()
      : settingsRow?.headerTaglineEn?.trim()) || "";
  const headerTitle =
    (locale === "nl"
      ? settingsRow?.headerTitleNl?.trim()
      : settingsRow?.headerTitleEn?.trim()) || "";
  const footerNote =
    (locale === "nl"
      ? settingsRow?.footerNoteNl?.trim()
      : settingsRow?.footerNoteEn?.trim()) || "";

  return (
    <CartProvider>
      <ShopLocaleProvider locale={locale} messages={messages}>
        <SiteHeader headerTagline={headerTagline} headerTitle={headerTitle} />
        <div className="flex flex-1 flex-col bg-[#faf7f2]">{children}</div>
        <FooterNote footerNote={footerNote} />
      </ShopLocaleProvider>
    </CartProvider>
  );
}
