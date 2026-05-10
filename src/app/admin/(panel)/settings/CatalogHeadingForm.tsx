"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminT } from "@/context/admin-locale-context";

type Feedback = "idle" | "saved" | "saveError";

export function CatalogHeadingForm({
  initialHomeHeadingNl,
  initialHomeHeadingEn,
}: {
  initialHomeHeadingNl: string;
  initialHomeHeadingEn: string;
}) {
  const router = useRouter();
  const t = useAdminT();
  const [nl, setNl] = useState(initialHomeHeadingNl);
  const [en, setEn] = useState(initialHomeHeadingEn);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>("idle");

  useEffect(() => {
    queueMicrotask(() => {
      setNl(initialHomeHeadingNl);
      setEn(initialHomeHeadingEn);
    });
  }, [initialHomeHeadingNl, initialHomeHeadingEn]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setFeedback("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeHeadingNl: nl, homeHeadingEn: en }),
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
      <p className="text-xs text-stone-500">{t.catalogHeadingHint}</p>
      <label className="block">
        <span className="mb-1 block text-sm text-stone-300">
          {t.labelCatalogHeadingNl}
        </span>
        <input
          className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          value={nl}
          onChange={(e) => setNl(e.target.value)}
          maxLength={240}
          placeholder=""
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-stone-300">
          {t.labelCatalogHeadingEn}
        </span>
        <input
          className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          value={en}
          onChange={(e) => setEn(e.target.value)}
          maxLength={240}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-black hover:bg-amber-100 disabled:opacity-40"
        >
          {busy ? t.catalogHeadingSaving : t.catalogHeadingSave}
        </button>
        {feedback === "saved" ? (
          <span className="text-xs text-green-400">{t.catalogHeadingSaved}</span>
        ) : null}
        {feedback === "saveError" ? (
          <span className="text-xs text-red-400">{t.catalogHeadingSaveError}</span>
        ) : null}
      </div>
    </form>
  );
}
