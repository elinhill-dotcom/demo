import Link from "next/link";
import { getShopLocale } from "@/lib/shop-locale-server";
import { shopMessages } from "@/i18n/shop-locale";

export default async function NotFound() {
  const locale = await getShopLocale();
  const t = shopMessages[locale];

  return (
    <main className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-sm uppercase tracking-wide text-stone-500">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold text-stone-900">
        {t.notFoundTitle}
      </h1>
      <p className="mt-3 text-stone-600 text-sm leading-relaxed">
        {t.notFoundLine1}{" "}
        {t.notFoundLine2Start}
        <Link href="/checkout/thank-you" className="underline">
          /checkout/thank-you
        </Link>
        {t.notFoundLine2End}
      </p>
      <div className="mt-10 flex flex-col gap-3 text-sm">
        <Link
          href="/"
          className="inline-flex justify-center rounded-full bg-black px-5 py-2.5 font-medium text-white hover:bg-stone-800"
        >
          {t.backToShop}
        </Link>
        <Link
          href="/checkout"
          className="text-stone-600 underline underline-offset-2 hover:text-stone-900"
        >
          {t.navCheckout}
        </Link>
      </div>
    </main>
  );
}
