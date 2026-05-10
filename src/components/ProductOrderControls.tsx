"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useCart } from "@/context/cart-context";
import type { CatalogProduct } from "./ProductCard";
import { useShopT } from "@/context/shop-locale-context";

const emptySubscribe = () => () => {};

export function ProductOrderControls({ product }: { product: CatalogProduct }) {
  const { lines, setQuantity } = useCart();
  const inCart = lines.find((l) => l.productId === product.id);
  /** Avoid SSR/client markup mismatch for hydration (no synchronous setState in effects). */
  const isBrowser = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    queueMicrotask(() => {
      if (inCart) setQty(inCart.quantity);
    });
  }, [inCart]);

  const t = useShopT();

  if (!isBrowser) {
    return (
      <div className="h-10 rounded-lg bg-stone-100 animate-pulse" aria-hidden />
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <label className="text-sm text-stone-700 flex items-center gap-2">
        {t.qty}
        <select
          className="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-sm"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        >
          {Array.from({ length: 99 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
        onClick={() =>
          setQuantity(product.id, qty, {
            name: product.name,
            priceCents: product.priceCents,
            imagePath: product.imagePath || "/placeholder-cheese.svg",
          })
        }
      >
        {t.addToCart}
      </button>
      {inCart ? (
        <span className="text-xs text-stone-500">
          {t.inCart}: {inCart.quantity}
        </span>
      ) : null}
      {inCart ? (
        <Link
          href="/checkout"
          className="w-full basis-full rounded-lg border border-amber-200/90 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-stone-900 hover:bg-amber-100 transition-colors sm:w-auto sm:basis-auto"
        >
          {t.continueToCart}
        </Link>
      ) : null}
    </div>
  );
}
