import type { Metadata } from "next";
import { adminMessages, adminPageTitle } from "@/i18n/admin-locale";
import { prisma } from "@/lib/prisma";
import { getShopLocale } from "@/lib/shop-locale-server";
import { CatalogHeadingForm } from "./CatalogHeadingForm";
import { CheckoutNoticeForm } from "./CheckoutNoticeForm";
import { NextOrderCountdownForm } from "./NextOrderCountdownForm";
import { StorefrontCopyForm } from "./StorefrontCopyForm";

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
      nextOrderAt: null,
      countdownEnabled: false,
      countdownTextNl: "",
      countdownTextEn: "",
      headerTaglineNl: "",
      headerTaglineEn: "",
      headerTitleNl: "",
      headerTitleEn: "",
      homeIntroTextNl: "",
      homeIntroTextEn: "",
      homeEmptyTextNl: "",
      homeEmptyTextEn: "",
      footerNoteNl: "",
      footerNoteEn: "",
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

      <section className="border-t border-white/10 pt-10">
        <h2 className="text-lg font-semibold text-white">
          {t.nextOrderSectionTitle}
        </h2>
        <div className="mt-6">
          <NextOrderCountdownForm
            initialNextOrderAt={settings.nextOrderAt ? settings.nextOrderAt.toISOString() : null}
            initialCountdownEnabled={settings.countdownEnabled ?? false}
            initialCountdownTextNl={settings.countdownTextNl ?? ""}
            initialCountdownTextEn={settings.countdownTextEn ?? ""}
          />
        </div>
      </section>

      <section className="border-t border-white/10 pt-10">
        <h2 className="text-lg font-semibold text-white">
          {t.storefrontCopySectionTitle}
        </h2>
        <div className="mt-6">
          <StorefrontCopyForm
            initialHeaderTaglineNl={settings.headerTaglineNl ?? ""}
            initialHeaderTaglineEn={settings.headerTaglineEn ?? ""}
            initialHeaderTitleNl={settings.headerTitleNl ?? ""}
            initialHeaderTitleEn={settings.headerTitleEn ?? ""}
            initialHomeIntroTextNl={settings.homeIntroTextNl ?? ""}
            initialHomeIntroTextEn={settings.homeIntroTextEn ?? ""}
            initialHomeEmptyTextNl={settings.homeEmptyTextNl ?? ""}
            initialHomeEmptyTextEn={settings.homeEmptyTextEn ?? ""}
            initialFooterNoteNl={settings.footerNoteNl ?? ""}
            initialFooterNoteEn={settings.footerNoteEn ?? ""}
          />
        </div>
      </section>
    </main>
  );
}
