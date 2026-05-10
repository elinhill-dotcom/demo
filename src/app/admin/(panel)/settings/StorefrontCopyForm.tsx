"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminT } from "@/context/admin-locale-context";

type Feedback = "idle" | "saved" | "saveError";

export function StorefrontCopyForm({
  initialHeaderTaglineNl,
  initialHeaderTaglineEn,
  initialHeaderTitleNl,
  initialHeaderTitleEn,
  initialHomeIntroTextNl,
  initialHomeIntroTextEn,
  initialHomeEmptyTextNl,
  initialHomeEmptyTextEn,
  initialFooterNoteNl,
  initialFooterNoteEn,
}: {
  initialHeaderTaglineNl: string;
  initialHeaderTaglineEn: string;
  initialHeaderTitleNl: string;
  initialHeaderTitleEn: string;
  initialHomeIntroTextNl: string;
  initialHomeIntroTextEn: string;
  initialHomeEmptyTextNl: string;
  initialHomeEmptyTextEn: string;
  initialFooterNoteNl: string;
  initialFooterNoteEn: string;
}) {
  const router = useRouter();
  const t = useAdminT();

  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>("idle");

  const [headerTaglineNl, setHeaderTaglineNl] = useState(initialHeaderTaglineNl);
  const [headerTaglineEn, setHeaderTaglineEn] = useState(initialHeaderTaglineEn);
  const [headerTitleNl, setHeaderTitleNl] = useState(initialHeaderTitleNl);
  const [headerTitleEn, setHeaderTitleEn] = useState(initialHeaderTitleEn);
  const [homeIntroTextNl, setHomeIntroTextNl] = useState(initialHomeIntroTextNl);
  const [homeIntroTextEn, setHomeIntroTextEn] = useState(initialHomeIntroTextEn);
  const [homeEmptyTextNl, setHomeEmptyTextNl] = useState(initialHomeEmptyTextNl);
  const [homeEmptyTextEn, setHomeEmptyTextEn] = useState(initialHomeEmptyTextEn);
  const [footerNoteNl, setFooterNoteNl] = useState(initialFooterNoteNl);
  const [footerNoteEn, setFooterNoteEn] = useState(initialFooterNoteEn);

  useEffect(() => {
    queueMicrotask(() => {
      setHeaderTaglineNl(initialHeaderTaglineNl);
      setHeaderTaglineEn(initialHeaderTaglineEn);
      setHeaderTitleNl(initialHeaderTitleNl);
      setHeaderTitleEn(initialHeaderTitleEn);
      setHomeIntroTextNl(initialHomeIntroTextNl);
      setHomeIntroTextEn(initialHomeIntroTextEn);
      setHomeEmptyTextNl(initialHomeEmptyTextNl);
      setHomeEmptyTextEn(initialHomeEmptyTextEn);
      setFooterNoteNl(initialFooterNoteNl);
      setFooterNoteEn(initialFooterNoteEn);
    });
  }, [
    initialHeaderTaglineNl,
    initialHeaderTaglineEn,
    initialHeaderTitleNl,
    initialHeaderTitleEn,
    initialHomeIntroTextNl,
    initialHomeIntroTextEn,
    initialHomeEmptyTextNl,
    initialHomeEmptyTextEn,
    initialFooterNoteNl,
    initialFooterNoteEn,
  ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setFeedback("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headerTaglineNl,
          headerTaglineEn,
          headerTitleNl,
          headerTitleEn,
          homeIntroTextNl,
          homeIntroTextEn,
          homeEmptyTextNl,
          homeEmptyTextEn,
          footerNoteNl,
          footerNoteEn,
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
      <p className="text-xs text-stone-500">{t.storefrontCopySectionIntro}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.headerTaglineLabelNl}</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={headerTaglineNl}
            onChange={(e) => setHeaderTaglineNl(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.headerTaglineLabelEn}</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={headerTaglineEn}
            onChange={(e) => setHeaderTaglineEn(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.headerTitleLabelNl}</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={headerTitleNl}
            onChange={(e) => setHeaderTitleNl(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.headerTitleLabelEn}</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={headerTitleEn}
            onChange={(e) => setHeaderTitleEn(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.homeIntroLabelNl}</span>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={homeIntroTextNl}
            onChange={(e) => setHomeIntroTextNl(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.homeIntroLabelEn}</span>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={homeIntroTextEn}
            onChange={(e) => setHomeIntroTextEn(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.homeEmptyLabelNl}</span>
          <textarea
            rows={2}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={homeEmptyTextNl}
            onChange={(e) => setHomeEmptyTextNl(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.homeEmptyLabelEn}</span>
          <textarea
            rows={2}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={homeEmptyTextEn}
            onChange={(e) => setHomeEmptyTextEn(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.footerNoteLabelNl}</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={footerNoteNl}
            onChange={(e) => setFooterNoteNl(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.footerNoteLabelEn}</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            value={footerNoteEn}
            onChange={(e) => setFooterNoteEn(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-amber-100 disabled:opacity-40"
        >
          {busy ? t.storefrontCopySaveSaving : t.storefrontCopySave}
        </button>
        {feedback === "saved" ? (
          <span className="text-xs text-green-400">{t.storefrontCopySaved}</span>
        ) : null}
        {feedback === "saveError" ? (
          <span className="text-xs text-red-400">{t.storefrontCopySaveError}</span>
        ) : null}
      </div>
    </form>
  );
}

