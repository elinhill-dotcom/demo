"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  productId: string;
  name: string;
  priceCents: number;
  imagePath: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  totalCents: number;
  setQuantity: (
    productId: string,
    quantity: number,
    meta?: Omit<CartLine, "productId" | "quantity">,
  ) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "boergondisch_cart";

function loadInitial(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    const mapped = parsed.map((r) => {
      const row = r as unknown as {
        priceOre?: number;
        priceCents?: number;
        productId?: string;
        quantity?: number;
      };
      if (typeof row.priceOre === "number" && row.priceCents === undefined) {
        return {
          ...(r as object),
          priceCents: row.priceOre,
        } as CartLine;
      }
      return r as CartLine;
    });
    return mapped.filter(
      (r: CartLine) =>
        r &&
        typeof r.productId === "string" &&
        typeof r.quantity === "number" &&
        typeof r.priceCents === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setLines(loadInitial());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const setQuantity = useCallback(
    (
      productId: string,
      quantity: number,
      meta?: Omit<CartLine, "productId" | "quantity">,
    ) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.productId === productId);
        if (quantity <= 0) return prev.filter((l) => l.productId !== productId);
        if (existing && !meta) {
          return prev.map((l) =>
            l.productId === productId ? { ...l, quantity } : l,
          );
        }
        if (!meta) return prev;
        const rest = prev.filter((l) => l.productId !== productId);
        rest.push({
          productId,
          quantity,
          name: meta.name,
          priceCents: meta.priceCents,
          imagePath: meta.imagePath,
        });
        return rest;
      });
    },
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const itemCount = lines.reduce((a, l) => a + l.quantity, 0);
    const totalCents = lines.reduce((a, l) => a + l.quantity * l.priceCents, 0);
    return { lines, itemCount, totalCents, setQuantity, clear };
  }, [lines, setQuantity, clear]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider.");
  return ctx;
}
