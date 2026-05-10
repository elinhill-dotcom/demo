"use client";

import { useEffect, useMemo, useState } from "react";
import type { ShopLocale } from "@/i18n/shop-locale";
import { shopMessages } from "@/i18n/shop-locale";

function splitRemaining(ms: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function Unit({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-w-[3.75rem] flex-col items-center gap-1 rounded-lg bg-amber-50 px-3 py-2">
      <span className="text-xl font-semibold tabular-nums tracking-tight text-amber-950 sm:text-2xl">
        {value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wider text-amber-800/90">
        {label}
      </span>
    </div>
  );
}

export function OrderCountdown({
  locale,
  targetIso,
  text,
}: {
  locale: ShopLocale;
  targetIso: string;
  text: string;
}) {
  const t = shopMessages[locale];
  const target = useMemo(() => new Date(targetIso), [targetIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const ts = target.getTime();
    if (Number.isNaN(ts)) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [target]);

  const ts = target.getTime();
  if (Number.isNaN(ts)) return null;
  const remainingMs = ts - now;
  if (remainingMs <= 0) return null;

  const { days, hours, minutes, seconds } = splitRemaining(remainingMs);

  const customPitch = text.trim().length > 0;

  return (
    <aside className="mb-8 rounded-xl border border-amber-200/60 bg-white px-4 py-4 shadow-sm">
      <p className="text-sm leading-relaxed text-stone-700">
        {customPitch ? text : t.countdownDefaultReminder}
      </p>
      <div
        className="mt-4 flex flex-wrap items-stretch justify-center gap-3 sm:justify-start"
        aria-label={locale === "nl" ? "Resterende tijd" : "Time remaining"}
      >
        <Unit value={String(days)} label={t.countdownUnitDays} />
        <Unit value={pad2(hours)} label={t.countdownUnitHours} />
        <Unit value={pad2(minutes)} label={t.countdownUnitMinutes} />
        <Unit value={pad2(seconds)} label={t.countdownUnitSeconds} />
      </div>
    </aside>
  );
}
