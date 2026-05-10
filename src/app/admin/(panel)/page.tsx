import type { Metadata } from "next";
import Link from "next/link";
import { adminMessages, adminPageTitle } from "@/i18n/admin-locale";
import { formatEuro } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import { getShopLocale } from "@/lib/shop-locale-server";
import { deleteOrder } from "./order-actions";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getShopLocale();
  return { title: adminPageTitle(locale, "metaOrders") };
}

export default async function AdminOrdersPage() {
  const locale = await getShopLocale();
  const t = adminMessages[locale];
  const dateLocale = locale === "nl" ? "nl-NL" : "en-GB";

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">{t.ordersTitle}</h1>
          <p className="mt-1 text-sm text-stone-400">{t.ordersSubtitle}</p>
        </div>
      </div>
      {orders.length === 0 ? (
        <p className="mt-10 rounded-lg border border-white/10 p-6 text-sm text-stone-500">
          {t.ordersEmpty}
        </p>
      ) : (
        <ul className="mt-8 space-y-6">
          {orders.map((order) => {
            const total = order.items.reduce(
              (a, i) => a + i.quantity * i.priceCents,
              0,
            );
            return (
              <li
                key={order.id}
                className="rounded-xl border border-white/10 bg-stone-900/80 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <div className="space-y-2 text-sm">
                    <p className="text-stone-300">
                      <span className="text-stone-500">{t.labelDate}</span>{" "}
                      {order.createdAt.toLocaleString(dateLocale)}
                    </p>
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p className="whitespace-pre-wrap text-stone-300">
                      {order.address}
                    </p>
                    <p className="text-xs text-stone-500">{t.ordersPhone}</p>
                    <p className="text-stone-300">
                      {order.phone?.trim() ? (
                        <Link
                          href={`tel:${order.phone.replace(/[\s()./]/g, "")}`}
                          className="text-amber-200/90 hover:text-amber-100"
                        >
                          {order.phone}
                        </Link>
                      ) : (
                        <span className="text-stone-600">—</span>
                      )}
                    </p>
                    <p className="text-stone-300">
                      <Link
                        href={`mailto:${order.email}`}
                        className="text-amber-200/90 hover:text-amber-100"
                      >
                        {order.email}
                      </Link>
                    </p>
                    <p className="text-xs text-stone-400">
                      {t.ordersMarketingOptIn}:{" "}
                      <span className="text-white">
                        {order.marketingOptIn ? t.yes : t.no}
                      </span>
                    </p>
                  </div>
                  <div className="flex min-w-[220px] flex-col gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-500">
                        {t.ordersLines}
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-stone-200">
                        {order.items.map((i) => (
                          <li key={i.id}>
                            {i.productName}{" "}
                            <span className="text-stone-400">
                              × {i.quantity}
                            </span>{" "}
                            — {formatEuro(i.quantity * i.priceCents, locale)}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 border-t border-white/10 pt-3 text-base font-semibold text-white">
                        {t.ordersTotal} {formatEuro(total, locale)}
                      </p>
                    </div>
                    <form action={deleteOrder}>
                      <input type="hidden" name="id" value={order.id} />
                      <button
                        type="submit"
                        className="text-xs text-red-400 underline-offset-2 hover:text-red-300 hover:underline"
                      >
                        {t.ordersDeleteOrder}
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
