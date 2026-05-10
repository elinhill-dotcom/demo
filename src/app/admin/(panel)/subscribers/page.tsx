import type { Metadata } from "next";
import { adminMessages, adminPageTitle } from "@/i18n/admin-locale";
import { prisma } from "@/lib/prisma";
import { getShopLocale } from "@/lib/shop-locale-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getShopLocale();
  return { title: adminPageTitle(locale, "metaMailList") };
}

export default async function MarketingSubscribersPage() {
  const locale = await getShopLocale();
  const t = adminMessages[locale];
  const dateLocale = locale === "nl" ? "nl-NL" : "en-GB";

  const rows = await prisma.order.findMany({
    where: { marketingOptIn: true },
    select: {
      email: true,
      customerName: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const seen = new Set<string>();
  const unique: typeof rows = [];
  for (const r of rows) {
    const key = r.email.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(r);
  }

  return (
    <main>
      <h1 className="text-xl font-semibold text-white">{t.subscribersTitle}</h1>
      <p className="mt-2 max-w-xl text-sm text-stone-400">{t.subscribersIntro}</p>
      {unique.length === 0 ? (
        <p className="mt-10 rounded-lg border border-white/10 p-6 text-sm text-stone-500">
          {t.subscribersEmpty}
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-white/10 bg-stone-900/60">
          <table className="min-w-[480px] w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-stone-400">
              <tr>
                <th className="px-4 py-3 font-medium">{t.subscribersColEmail}</th>
                <th className="px-4 py-3 font-medium">{t.subscribersColName}</th>
                <th className="px-4 py-3 font-medium">
                  {t.subscribersColLatestOrder}
                </th>
              </tr>
            </thead>
            <tbody>
              {unique.map((r, i) => (
                <tr
                  key={`${r.email}-${i}`}
                  className="border-b border-white/5 hover:bg-black/40"
                >
                  <td className="px-4 py-3 text-amber-200/90">{r.email}</td>
                  <td className="px-4 py-3 text-stone-200">{r.customerName}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-stone-400">
                    {r.createdAt.toLocaleString(dateLocale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
