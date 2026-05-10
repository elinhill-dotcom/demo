import Image from "next/image";
import type { ShopLocale } from "@/i18n/shop-locale";
import { shouldUnoptimizeImageSrc } from "@/lib/image-delivery";
import { formatEuro } from "@/lib/money";
import { ProductOrderControls } from "./ProductOrderControls";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imagePath: string;
};

export function ProductCard({
  product,
  vatIncludedLabel,
  locale,
}: {
  product: CatalogProduct;
  vatIncludedLabel: string;
  locale: ShopLocale;
}) {
  const img = product.imagePath || "/placeholder-cheese.svg";
  const unoptimized = shouldUnoptimizeImageSrc(img);

  return (
    <article className="flex flex-col rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
      <div className="relative aspect-[4/3] bg-stone-100">
        <Image
          src={img}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={unoptimized}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold text-stone-900">{product.name}</h2>
        <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">
          {product.description}
        </p>
        <p className="text-base font-semibold text-stone-900 mt-auto pt-2">
          {formatEuro(product.priceCents, locale)}{" "}
          <span className="font-normal text-stone-500 text-sm">
            {vatIncludedLabel}
          </span>
        </p>
        <ProductOrderControls product={product} />
      </div>
    </article>
  );
}
