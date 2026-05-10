"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useAdminLocale, useAdminT } from "@/context/admin-locale-context";
import { formatEuro } from "@/lib/money";
import { parseEuroInputToCents } from "@/lib/price-input";
import { bundledExampleImages } from "@/lib/bundled-example-images";
import { resolveApiMessageForLocale } from "@/i18n/api-error-messages";
import { shouldUnoptimizeImageSrc } from "@/lib/image-delivery";

type ProductRow = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imagePath: string;
  active: boolean;
  updatedAt: string;
};

export function ProductsAdmin() {
  const t = useAdminT();
  const locale = useAdminLocale();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(resolveApiMessageForLocale(locale, data, t.productsLoadError));
        return;
      }
      setProducts(data as ProductRow[]);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.productsUnexpectedError);
    } finally {
      setLoading(false);
    }
  }, [locale, t]);

  useEffect(() => {
    queueMicrotask(() => void load());
  }, [load]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold text-white">{t.productsTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-400">{t.productsIntro}</p>
      </div>

      <details open className="group rounded-xl border border-amber-400/30 bg-stone-950/60 p-5">
        <summary className="cursor-pointer list-none text-lg font-semibold text-white outline-none [&::-webkit-details-marker]:hidden flex items-center gap-2">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl font-bold leading-none text-black"
            aria-hidden
          >
            +
          </span>
          {t.productsAddNewToggle}
        </summary>
        <p className="mt-2 text-xs text-stone-500">{t.productsAddNewHint}</p>
        <div className="mt-4">
          <CreateProductForm onCreated={load} />
        </div>
      </details>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {loading ? (
        <p className="text-sm text-stone-500">{t.productsLoading}</p>
      ) : (
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest text-stone-500">
            {t.productsAllHeading} ({products.length})
          </h2>
          <ul className="space-y-8 pt-4">
            {products.map((p) => (
              <li key={p.id}>
                <ProductEditor
                  key={`${p.id}-${p.updatedAt}`}
                  product={p}
                  onChanged={load}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CreateProductForm({ onCreated }: { onCreated: () => void }) {
  const t = useAdminT();
  const adminLocale = useAdminLocale();
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceEuro, setPriceEuro] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [bundledPath, setBundledPath] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    const priceCents = parseEuroInputToCents(priceEuro);
    if (!name.trim()) {
      setMsg(t.productsEnterName);
      return;
    }
    if (priceCents === null || priceCents < 50) {
      setMsg(t.productsPriceInvalid);
      return;
    }
    if (!file && !bundledPath) {
      setMsg(t.productsUploadOrExample);
      return;
    }

    setBusy(true);
    try {
      let imagePath: string;
      if (file) {
        const up = new FormData();
        up.append("file", file);
        const upRes = await fetch("/api/upload", { method: "POST", body: up });
        const upJson = await upRes.json().catch(() => ({}));
        if (!upRes.ok) {
          throw new Error(
            resolveApiMessageForLocale(adminLocale, upJson, t.productsUnexpectedError),
          );
        }
        imagePath = (upJson as { path: string }).path;
      } else {
        imagePath = bundledPath;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          priceCents,
          imagePath,
        }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          resolveApiMessageForLocale(adminLocale, resJson, t.productsUnexpectedError),
        );
      }
      setName("");
      setDescription("");
      setPriceEuro("");
      setFile(null);
      setBundledPath("");
      onCreated();
      setMsg(t.productsAdded);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t.productsUnexpectedError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-xl border border-white/10 bg-stone-900/40 p-5">
      <form onSubmit={onSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-stone-300">{t.labelName}</span>
          <input
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-stone-300">{t.labelDescription}</span>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.labelPriceEUR}</span>
          <input
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            placeholder={t.pricePlaceholder}
            value={priceEuro}
            onChange={(e) => setPriceEuro(e.target.value)}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-stone-300">
            {t.productsBundledExampleOrUpload}
          </span>
          <select
            className="mb-2 w-full max-w-md rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            value={bundledPath}
            onChange={(e) => {
              const v = e.target.value;
              setBundledPath(v);
              if (v) setFile(null);
            }}
          >
            <option value="">{t.productsBundledPlaceholder}</option>
            {bundledExampleImages.map((opt) => (
              <option key={opt.path} value={opt.path}>
                {t.productsExampleShort}:{" "}
                {adminLocale === "nl" ? opt.labelNl : opt.labelEn}
              </option>
            ))}
          </select>
          <FilePicker
            disabled={!!bundledPath || busy}
            accept="image/jpeg,image/png,image/webp"
            buttonLabel={t.productsChooseFile}
            emptyLabel={t.productsNoFileChosen}
            value={file}
            onChange={(f) => {
              setFile(f);
              if (f) setBundledPath("");
            }}
          />
        </label>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-amber-100 disabled:opacity-40"
          >
            {busy ? t.productsPublishSaving : t.productsPublish}
          </button>
          {msg ? (
            <span
              className={`text-xs ${
                msg === t.productsAdded ? "text-green-400" : "text-red-400"
              }`}
            >
              {msg}
            </span>
          ) : null}
        </div>
      </form>
    </section>
  );
}

function FilePicker({
  disabled,
  accept,
  buttonLabel,
  emptyLabel,
  value,
  onChange,
}: {
  disabled: boolean;
  accept: string;
  buttonLabel: string;
  emptyLabel: string;
  value: File | null;
  onChange: (f: File | null) => void;
}) {
  const [id] = useState(() => `file-${Math.random().toString(16).slice(2)}`);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        id={id}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <label
        htmlFor={id}
        className={`inline-flex cursor-pointer items-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-amber-100 transition-colors ${
          disabled ? "pointer-events-none opacity-40" : ""
        }`}
      >
        {buttonLabel}
      </label>
      <span className="text-xs text-stone-400">
        {value?.name ?? emptyLabel}
      </span>
      {value ? (
        <button
          type="button"
          disabled={disabled}
          className="text-xs text-stone-300 hover:text-white disabled:opacity-40"
          onClick={() => onChange(null)}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}

function ProductEditor({
  product,
  onChanged,
}: {
  product: ProductRow;
  onChanged: () => void;
}) {
  const t = useAdminT();
  const locale = useAdminLocale();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [priceEuro, setPriceEuro] = useState(
    () =>
      Intl.NumberFormat("en-IE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(product.priceCents / 100),
  );
  const [active, setActive] = useState(product.active);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);

  const preview = useMemo(() => product.imagePath, [product.imagePath]);

  const imgNeedsUnoptimized = shouldUnoptimizeImageSrc(preview);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const priceCents = parseEuroInputToCents(priceEuro);
      if (!name.trim()) {
        setMsg(t.productsNameRequired);
        return;
      }
      if (priceCents === null || priceCents < 50) {
        setMsg(t.productsPriceMinimum);
        return;
      }

      let imagePath: string | undefined;
      if (replaceFile) {
        const up = new FormData();
        up.append("file", replaceFile);
        const upRes = await fetch("/api/upload", { method: "POST", body: up });
        const upJson = await upRes.json().catch(() => ({}));
        if (!upRes.ok) {
          throw new Error(
            resolveApiMessageForLocale(locale, upJson, t.productsUnexpectedError),
          );
        }
        imagePath = (upJson as { path: string }).path;
      }

      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          priceCents,
          active,
          ...(imagePath ? { imagePath } : {}),
        }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(
          resolveApiMessageForLocale(locale, resJson, t.productsUpdateFailed),
        );
        return;
      }
      setReplaceFile(null);
      onChanged();
      setMsg(t.productsSaved);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t.productsUnexpectedError);
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (
      typeof window !== "undefined" &&
      !window.confirm(t.productsDeleteConfirm)
    )
      return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      const delJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(
          resolveApiMessageForLocale(locale, delJson, t.productsDeleteFailed),
        );
        return;
      }
      onChanged();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t.productsUnexpectedError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="gap-6 rounded-xl border border-white/10 bg-stone-900/40 p-4 sm:flex">
      <div className="relative mx-auto h-44 w-full max-w-[200px] shrink-0 overflow-hidden rounded-lg bg-black/40 sm:mx-0">
        <Image
          src={preview}
          alt=""
          fill
          className="object-cover"
          unoptimized={imgNeedsUnoptimized}
        />
      </div>
      <form onSubmit={onSave} className="min-w-0 flex-1 space-y-4 pt-4 sm:pt-0">
        <label className="flex items-center gap-2 text-sm text-stone-300">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          {t.productsVisibleInStore}
        </label>
        <p className="text-xs text-stone-600">
          {t.productsLivePriceWhenVisible}:{" "}
          {formatEuro(product.priceCents, locale)}
        </p>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.labelName}</span>
          <input
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-stone-300">{t.labelDescription}</span>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2 items-end">
          <label className="block text-sm">
            <span className="mb-1 block text-stone-300">{t.labelPriceEUR}</span>
            <input
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
              value={priceEuro}
              onChange={(e) => setPriceEuro(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-stone-300">{t.productsReplacePhoto}</span>
            <div className="mt-1">
              <FilePicker
                disabled={busy}
                accept="image/jpeg,image/png,image/webp"
                buttonLabel={t.productsChooseFile}
                emptyLabel={t.productsNoFileChosen}
                value={replaceFile}
                onChange={setReplaceFile}
              />
            </div>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-amber-200 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-100 disabled:opacity-40"
          >
            {busy ? t.productsUpdateSaving : t.productsUpdate}
          </button>
          <button
            type="button"
            onClick={() => void onDelete()}
            disabled={busy}
            className="text-xs text-red-400 hover:text-red-300 disabled:opacity-40"
          >
            {t.productsDeleteProduct}
          </button>
          {msg ? (
            <span
              className={`text-xs ${
                msg === t.productsSaved ? "text-green-400" : "text-red-400"
              }`}
            >
              {msg}
            </span>
          ) : null}
        </div>
      </form>
    </article>
  );
}
