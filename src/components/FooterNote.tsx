"use client";

import { useShopT } from "@/context/shop-locale-context";

export function FooterNote() {
  const t = useShopT();

  return (
    <footer className="border-t border-stone-200 bg-white py-10 text-center text-sm text-stone-500 mt-auto">
      <p>{t.footerNote}</p>
    </footer>
  );
}
