"use client";

import { useShopT } from "@/context/shop-locale-context";

export function FooterNote({ footerNote }: { footerNote?: string }) {
  const t = useShopT();

  return (
    <footer className="border-t border-stone-200 bg-white py-10 text-center text-sm text-stone-500 mt-auto">
      <p>{footerNote?.trim().length ? footerNote : t.footerNote}</p>
    </footer>
  );
}
