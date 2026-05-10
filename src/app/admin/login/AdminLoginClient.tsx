"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LocaleToggle } from "@/components/LocaleToggle";
import { useAdminLocale, useAdminT } from "@/context/admin-locale-context";
import { resolveApiMessageForLocale } from "@/i18n/api-error-messages";

export function AdminLoginClient() {
  const router = useRouter();
  const t = useAdminT();
  const locale = useAdminLocale();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(resolveApiMessageForLocale(locale, data, t.loginCouldNotSignIn));
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto flex w-full max-w-sm justify-end pb-4">
        <LocaleToggle locale={locale} ariaLabel={t.language} />
      </div>
      <div className="flex flex-1 items-start justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-8 shadow-xl">
          <div className="mb-8 flex flex-col items-center gap-3">
            <Image
              src="/boergondisch-logo.png"
              alt="Boergondisch"
              width={72}
              height={72}
              className="rounded-md border border-white/10"
            />
            <h1 className="text-lg font-semibold">{t.loginTitle}</h1>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wide text-stone-400">
                {t.loginPasswordLabel}
              </label>
              <input
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-white/15 bg-stone-900 px-3 py-2 text-sm text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={busy || !password}
              className="w-full rounded-full bg-white py-2.5 text-sm font-semibold text-black hover:bg-amber-100 disabled:opacity-40"
            >
              {busy ? t.loginSigningIn : t.loginSignIn}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
