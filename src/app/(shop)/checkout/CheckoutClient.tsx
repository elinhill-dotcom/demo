"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import {
  useShopLocale,
  useShopT,
} from "@/context/shop-locale-context";
import { resolveApiMessageForLocale } from "@/i18n/api-error-messages";
import { shouldUnoptimizeImageSrc } from "@/lib/image-delivery";
import { formatEuro } from "@/lib/money";

export function CheckoutClient({
  checkoutNotice,
}: {
  checkoutNotice: string;
}) {
  const router = useRouter();
  const locale = useShopLocale();
  const t = useShopT();
  const { lines, totalCents, itemCount, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [acceptedBinding, setAcceptedBinding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const em = email.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    const ph = phone.trim();
    const phoneOk =
      ph.length <= 32 &&
      ph.length >= 8 &&
      /^[\d+\s()./\-]+$/.test(ph) &&
      ph.replace(/\D/g, "").length >= 8;
    return (
      lines.length > 0 &&
      name.trim().length >= 2 &&
      phoneOk &&
      address.trim().length >= 4 &&
      emailOk &&
      acceptedBinding &&
      !busy
    );
  }, [lines.length, name, phone, address, email, acceptedBinding, busy]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!canSubmit) return;
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          email: email.trim(),
          marketingOptIn,
          items: lines.map((l) => ({
            productId: l.productId,
            quantity: l.quantity,
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(resolveApiMessageForLocale(locale, data, t.errorSubmit));
        return;
      }
      clear();
      router.push("/checkout/thank-you");
    } finally {
      setBusy(false);
    }
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-14 text-center w-full">
        <h1 className="text-2xl font-semibold text-stone-900">
          {t.checkoutTitle}
        </h1>
        <p className="mt-3 text-stone-600">{t.checkoutEmpty}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
        >
          {t.browseProducts}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 pb-24 w-full">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <section>
          <h1 className="text-2xl font-semibold text-stone-900">
            {t.checkoutTitle}
          </h1>
          <p className="mt-2 text-stone-600 text-sm">{t.checkoutIntro}</p>
          {checkoutNotice.trim() ? (
            <div className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-stone-800 whitespace-pre-wrap">
              {checkoutNotice.trim()}
            </div>
          ) : null}
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-800 mb-1">
                {t.labelFullName}
              </label>
              <input
                required
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-800 mb-1">
                {t.labelPhone}
              </label>
              <input
                required
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-800 mb-1">
                {t.labelEmail}
              </label>
              <input
                required
                type="email"
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-800 mb-1">
                {t.labelAddress}
              </label>
              <textarea
                required
                rows={3}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="rounded-lg border border-stone-200 bg-white px-4 py-3 flex gap-3 items-start">
              <input
                id="marketing"
                type="checkbox"
                className="mt-1"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
              />
              <label htmlFor="marketing" className="text-sm text-stone-700">
                {t.marketingOptIn}
              </label>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex gap-3 items-start">
              <input
                id="binding"
                type="checkbox"
                required
                className="mt-1"
                checked={acceptedBinding}
                onChange={(e) => setAcceptedBinding(e.target.checked)}
              />
              <label htmlFor="binding" className="text-sm text-stone-800">
                {t.bindingConfirm}
              </label>
            </div>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none"
            >
              {busy ? t.submitting : t.submitOrder}
            </button>
          </form>
        </section>
        <aside className="lg:sticky lg:top-6 h-fit">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              {t.cartTitle} ({itemCount})
            </h2>
            <ul className="mt-4 space-y-4">
              {lines.map((l) => (
                <li key={l.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-stone-100">
                    <Image
                      src={l.imagePath}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized={shouldUnoptimizeImageSrc(l.imagePath)}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-stone-900 truncate">
                      {l.name}
                    </p>
                    <p className="text-xs text-stone-500">× {l.quantity}</p>
                    <p className="text-sm text-stone-800">
                      {formatEuro(l.quantity * l.priceCents, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-stone-200 pt-4 flex justify-between text-base font-semibold">
              <span>{t.total}</span>
              <span>{formatEuro(totalCents, locale)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
