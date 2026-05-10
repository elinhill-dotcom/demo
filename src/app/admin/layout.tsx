import { AdminLocaleProvider } from "@/context/admin-locale-context";
import { adminMessages } from "@/i18n/admin-locale";
import { getShopLocale } from "@/lib/shop-locale-server";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getShopLocale();
  const messages = adminMessages[locale];

  return (
    <AdminLocaleProvider locale={locale} messages={messages}>
      <div className="min-h-full bg-stone-950 text-stone-100 flex flex-col">
        {children}
      </div>
    </AdminLocaleProvider>
  );
}
