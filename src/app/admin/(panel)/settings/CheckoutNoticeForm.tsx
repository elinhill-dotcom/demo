"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminT } from "@/context/admin-locale-context";

type Feedback = "idle" | "saved" | "saveError";

export function CheckoutNoticeForm({
  initialCheckoutNotice,
}: {
  initialCheckoutNotice: string;
}) {
  const router = useRouter();
  const t = useAdminT();
  const [text, setText] = useState(initialCheckoutNotice);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>("idle");

  useEffect(() => {
    queueMicrotask(() => setText(initialCheckoutNotice));
  }, [initialCheckoutNotice]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setFeedback("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutNotice: text }),
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
      <label className="block">
        <span className="mb-2 block text-sm text-stone-300">
          {t.checkoutNoticeLabel}
        </span>
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-amber-100 disabled:opacity-40"
        >
          {busy ? t.checkoutNoticeSaveSaving : t.checkoutNoticeSave}
        </button>
        {feedback === "saved" ? (
          <span className="text-xs text-green-400">{t.checkoutNoticeSaved}</span>
        ) : null}
        {feedback === "saveError" ? (
          <span className="text-xs text-red-400">{t.checkoutNoticeSaveError}</span>
        ) : null}
      </div>
    </form>
  );
}
