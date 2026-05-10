"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminT } from "@/context/admin-locale-context";

type Feedback = "idle" | "saved" | "saveError";

function toDatetimeLocalValue(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export function NextOrderCountdownForm({
  initialNextOrderAt,
  initialCountdownEnabled,
  initialCountdownTextNl,
  initialCountdownTextEn,
}: {
  initialNextOrderAt: string | null;
  initialCountdownEnabled: boolean;
  initialCountdownTextNl: string;
  initialCountdownTextEn: string;
}) {
  const router = useRouter();
  const t = useAdminT();

  const [enabled, setEnabled] = useState(initialCountdownEnabled);
  const [nextOrderAtLocal, setNextOrderAtLocal] = useState(
    initialNextOrderAt ? toDatetimeLocalValue(initialNextOrderAt) : "",
  );
  const [nl, setNl] = useState(initialCountdownTextNl);
  const [en, setEn] = useState(initialCountdownTextEn);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>("idle");

  useEffect(() => {
    queueMicrotask(() => {
      setEnabled(initialCountdownEnabled);
      setNextOrderAtLocal(
        initialNextOrderAt ? toDatetimeLocalValue(initialNextOrderAt) : "",
      );
      setNl(initialCountdownTextNl);
      setEn(initialCountdownTextEn);
    });
  }, [
    initialNextOrderAt,
    initialCountdownEnabled,
    initialCountdownTextNl,
    initialCountdownTextEn,
  ]);

  const nextOrderAtIso = useMemo(() => {
    if (!nextOrderAtLocal.trim()) return "";
    const d = new Date(nextOrderAtLocal);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString();
  }, [nextOrderAtLocal]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setFeedback("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nextOrderAt: nextOrderAtIso,
          countdownEnabled: enabled,
          countdownTextNl: nl,
          countdownTextEn: en,
        }),
      });
      if (!res.ok) {
        setFeedback("saveError");
        return;
      }
      setFeedback("saved");
      router.refresh();
    } catch {
      setFeedback("saveError");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-4">
      <p className="text-xs text-stone-500">{t.nextOrderSectionIntro}</p>
      <label className="flex items-center gap-2 text-sm text-stone-300">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        {t.nextOrderEnableCountdown}
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-stone-300">{t.nextOrderAtLabel}</span>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="datetime-local"
            className="w-full max-w-sm rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={nextOrderAtLocal}
            onChange={(e) => setNextOrderAtLocal(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setNextOrderAtLocal("")}
            disabled={busy}
            className="text-xs text-stone-300 hover:text-white disabled:opacity-40"
          >
            {t.nextOrderClear}
          </button>
        </div>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-stone-300">
          {t.countdownTextLabelNl}
        </span>
        <textarea
          rows={3}
          value={nl}
          onChange={(e) => setNl(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-stone-300">
          {t.countdownTextLabelEn}
        </span>
        <textarea
          rows={3}
          value={en}
          onChange={(e) => setEn(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-black hover:bg-amber-100 disabled:opacity-40"
        >
          {busy ? t.nextOrderSaveSaving : t.nextOrderSave}
        </button>
        {feedback === "saved" ? (
          <span className="text-xs text-green-400">{t.nextOrderSaved}</span>
        ) : null}
        {feedback === "saveError" ? (
          <span className="text-xs text-red-400">{t.nextOrderSaveError}</span>
        ) : null}
      </div>
    </form>
  );
}

