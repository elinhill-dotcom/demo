import { prisma } from "@/lib/prisma";
import { getShopLocale } from "@/lib/shop-locale-server";
import { shopMessages } from "@/i18n/shop-locale";
import { resolveProductListingCopy } from "@/lib/product-listing-copy";
import { ProductCard } from "@/components/ProductCard";
import { OrderCountdown } from "@/components/OrderCountdown";

export default async function HomePage() {
  const locale = await getShopLocale();
  const t = shopMessages[locale];

  const settingsRow = await prisma.appSettings.findUnique({
    where: { id: 1 },
  });
  const customHeading =
    (locale === "nl"
      ? settingsRow?.homeHeadingNl?.trim()
      : settingsRow?.homeHeadingEn?.trim()) || "";
  const catalogHeading =
    customHeading.length > 0 ? customHeading : t.homeHeading;

  const homeIntroText =
    (locale === "nl"
      ? settingsRow?.homeIntroTextNl?.trim()
      : settingsRow?.homeIntroTextEn?.trim()) || "";

  const homeEmptyText =
    (locale === "nl"
      ? settingsRow?.homeEmptyTextNl?.trim()
      : settingsRow?.homeEmptyTextEn?.trim()) || "";

  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  const nextOrderAtIso = settingsRow?.nextOrderAt
    ? settingsRow.nextOrderAt.toISOString()
    : null;
  const countdownEnabled = settingsRow?.countdownEnabled ?? false;
  const countdownText =
    (locale === "nl"
      ? settingsRow?.countdownTextNl?.trim()
      : settingsRow?.countdownTextEn?.trim()) || "";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 w-full">
      {countdownEnabled && nextOrderAtIso ? (
        <OrderCountdown locale={locale} targetIso={nextOrderAtIso} text={countdownText} />
      ) : null}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          {catalogHeading}
        </h1>
        <p className="mt-3 text-stone-600 leading-relaxed">
          {homeIntroText.length > 0 ? (
            homeIntroText
          ) : (
            <>
              {t.homeIntroPrefix}
              <strong className="font-medium text-stone-800">
                {t.homeIntroEmphasis}
              </strong>
              {t.homeIntroSuffix}
            </>
          )}
        </p>
      </div>
      {products.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-300 bg-white px-4 py-8 text-center text-stone-600">
          {homeEmptyText.length > 0 ? homeEmptyText : t.homeEmpty}
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const listing = resolveProductListingCopy(locale, p);
            return (
              <li key={p.id}>
                <ProductCard
                  locale={locale}
                  vatIncludedLabel={t.vatIncluded}
                  product={{
                    id: p.id,
                    name: listing.name,
                    description: listing.description,
                    priceCents: p.priceCents,
                    imagePath: p.imagePath,
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
