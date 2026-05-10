"use client";

import type { ShopLocale } from "@/i18n/shop-locale";
import type { AdminMessages } from "@/i18n/admin-locale";
import { createContext, useContext } from "react";

type AdminLocaleContextValue = {
  locale: ShopLocale;
  messages: AdminMessages;
};

const AdminLocaleContext = createContext<AdminLocaleContextValue | null>(null);

export function AdminLocaleProvider({
  locale,
  messages,
  children,
}: AdminLocaleContextValue & { children: React.ReactNode }) {
  return (
    <AdminLocaleContext.Provider value={{ locale, messages }}>
      {children}
    </AdminLocaleContext.Provider>
  );
}

export function useAdminLocaleValue() {
  const ctx = useContext(AdminLocaleContext);
  if (!ctx) {
    throw new Error("AdminLocaleProvider is missing (admin layout).");
  }
  return ctx;
}

export function useAdminT(): AdminMessages {
  return useAdminLocaleValue().messages;
}

export function useAdminLocale(): ShopLocale {
  return useAdminLocaleValue().locale;
}
