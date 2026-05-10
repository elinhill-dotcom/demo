import type { ShopLocale } from "@/i18n/shop-locale";

type Localized = { nl: ListingCopy; en: ListingCopy };
type ListingCopy = { name: string; description: string };

/** Bundled demo images + fixed EN strings from seed — storefront shows NL or EN by locale. */
const BY_IMAGE_PATH: Record<string, Localized> = {
  "/examples/artisan-hard-blocks.png": {
    en: {
      name: "Artisan hard cheese (blocks)",
      description:
        "Nutty semi-hard wedges with thin natural rind — perfect with crackers.",
    },
    nl: {
      name: "Ambachtelijke harde kaas (blokken)",
      description:
        "Semi-harde partjes met een nootachtige smaak en dunne natuurlijke korst — perfect bij crackers.",
    },
  },
  "/examples/blue-cheese-wedge.png": {
    en: {
      name: "Cave-aged blue cheese",
      description:
        "Creamy white paste with vivid blue veins; crumble on salads or pairing boards.",
    },
    nl: {
      name: "Grotgerijpte blauwschimmelkaas",
      description:
        "Romige witte kaas met levendige blauwe aders; verkruimel over salades of op een kaasplank.",
    },
  },
  "/examples/cheese-selection-board.png": {
    en: {
      name: "Mixed cheese tasting board selection",
      description:
        "Swiss holes, bloomies, wedges and orange cheddar — grazing inspiration.",
    },
    nl: {
      name: "Gemengd kaasproefplank-assortiment",
      description:
        "Zwitserse ‘holes’, bloemkorsten, partjes en oranje cheddar — inspiratie voor een borrelplank.",
    },
  },
  "/examples/morbier-style-wedge.png": {
    en: {
      name: "Morbier-style ash line cheese",
      description:
        "Silky ivory paste with charcoal seam and gentle barnyard aromas.",
    },
    nl: {
      name: "Morbier-achtige kaas met aslijn",
      description:
        "Zacht ivoorwit met houtskoolstreepje en subtiele staltonen.",
    },
  },
};

/** Rows normalized from Swedish to this EN title (any image path). */
const NL_FOR_ENGLISH_NAME: Record<string, ListingCopy> = {
  "Traditional well-aged Boergondisch hard cheese": {
    name: "Traditionele goed gerijpte Boergondische harde kaas",
    description:
      "Vol van smaak met een nootachtige afdronk.\nMinimaal 12 maanden gerijpt. Prachtig bij wijn en donker brood.",
  },
};

export function resolveProductListingCopy(
  locale: ShopLocale,
  product: { name: string; description: string; imagePath: string },
): ListingCopy {
  const byPath = BY_IMAGE_PATH[product.imagePath];
  if (byPath) return byPath[locale];

  const nl = NL_FOR_ENGLISH_NAME[product.name.trim()];
  if (nl && locale === "nl") return nl;

  return { name: product.name, description: product.description };
}
