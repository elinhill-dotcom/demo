import type { Metadata } from "next";
import { adminMessages, adminPageTitle } from "@/i18n/admin-locale";
import { prisma } from "@/lib/prisma";
import { getShopLocale } from "@/lib/shop-locale-server";
import { CatalogHeadingForm } from "./CatalogHeadingForm";
import { CheckoutNoticeForm } from "./CheckoutNoticeForm";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getShopLocale();
  return { title: adminPageTitle(locale, "metaCheckoutNotice") };
}

export default async function AdminCheckoutSettingsPage() {
  const locale = await getShopLocale();
  const t = adminMessages[locale];

  const settings = await prisma.appSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      checkoutNotice: "",
      homeHeadingNl: "",
      homeHeadingEn: "",
    },
    update: {},
  });

  return (
    <main className="space-y-14">
      <section>
        <h1 className="text-xl font-semibold text-white">{t.checkoutNoticePageTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-400">
          {t.checkoutNoticePageIntro}
        </p>
        <div className="mt-8">
          <CheckoutNoticeForm
            initialCheckoutNotice={settings.checkoutNotice ?? ""}
          />
        </div>
      </section>

      <section className="border-t border-white/10 pt-10">
        <h2 className="text-lg font-semibold text-white">
          {t.catalogHeadingSectionTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-400">
          {t.catalogHeadingSectionIntro}
        </p>
        <div className="mt-6">
          <CatalogHeadingForm
            initialHomeHeadingNl={settings.homeHeadingNl ?? ""}
            initialHomeHeadingEn={settings.homeHeadingEn ?? ""}
          />
        </div>
      </section>
    </main>
  );
}
