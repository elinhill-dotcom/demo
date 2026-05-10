import Link from "next/link";
import { getShopLocale } from "@/lib/shop-locale-server";
import { shopMessages } from "@/i18n/shop-locale";

export default async function ThanksPage() {
  const locale = await getShopLocale();
  const t = shopMessages[locale];

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center w-full">
      <h1 className="text-2xl font-semibold text-stone-900">{t.thankYouTitle}</h1>
      <p className="mt-4 text-stone-600 leading-relaxed">{t.thankYouBody}</p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
      >
        {t.backToShop}
      </Link>
    </main>
  );
}
