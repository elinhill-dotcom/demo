"use client";

import type { ShopLocale, ShopMessages } from "@/i18n/shop-locale";
import { createContext, useContext } from "react";

type ShopLocaleContextValue = {
  locale: ShopLocale;
  messages: ShopMessages;
};

const ShopLocaleContext = createContext<ShopLocaleContextValue | null>(null);

export function ShopLocaleProvider({
  locale,
  messages,
  children,
}: ShopLocaleContextValue & { children: React.ReactNode }) {
  return (
    <ShopLocaleContext.Provider value={{ locale, messages }}>
      {children}
    </ShopLocaleContext.Provider>
  );
}

export function useShopLocaleValue() {
  const ctx = useContext(ShopLocaleContext);
  if (!ctx) {
    throw new Error("ShopLocaleProvider is missing (shop layout).");
  }
  return ctx;
}

export function useShopT(): ShopMessages {
  return useShopLocaleValue().messages;
}

export function useShopLocale(): ShopLocale {
  return useShopLocaleValue().locale;
}
