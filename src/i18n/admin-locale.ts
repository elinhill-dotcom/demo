import type { ShopLocale } from "@/i18n/shop-locale";

export type AdminMessages = {
  language: string;
  navAdminLabel: string;
  navOrders: string;
  navProducts: string;
  navCheckoutNotice: string;
  navMailList: string;
  navStorefront: string;
  navLogOut: string;
  loginTitle: string;
  loginPasswordLabel: string;
  loginSignIn: string;
  loginSigningIn: string;
  loginCouldNotSignIn: string;
  ordersTitle: string;
  ordersSubtitle: string;
  ordersEmpty: string;
  labelDate: string;
  ordersMarketingOptIn: string;
  yes: string;
  no: string;
  ordersPhone: string;
  ordersLines: string;
  ordersTotal: string;
  ordersDeleteOrder: string;
  productsTitle: string;
  productsIntro: string;
  productsAddNewToggle: string;
  productsAddNewHint: string;
  productsLoading: string;
  productsAllHeading: string;
  productsBundledExampleOrUpload: string;
  productsBundledPlaceholder: string;
  productsExampleShort: string;
  labelName: string;
  labelDescription: string;
  labelPriceEUR: string;
  pricePlaceholder: string;
  productsPublishSaving: string;
  productsPublish: string;
  productsUpdateSaving: string;
  productsUpdate: string;
  productsVisibleInStore: string;
  productsLivePriceWhenVisible: string;
  productsReplacePhoto: string;
  productsDeleteProduct: string;
  productsDeleteConfirm: string;
  productsLoadError: string;
  productsUnexpectedError: string;
  productsEnterName: string;
  productsPriceInvalid: string;
  productsUploadOrExample: string;
  productsAdded: string;
  productsNameRequired: string;
  productsPriceMinimum: string;
  productsSaved: string;
  productsUpdateFailed: string;
  productsDeleteFailed: string;
  checkoutNoticePageTitle: string;
  checkoutNoticePageIntro: string;
  checkoutNoticeLabel: string;
  checkoutNoticeSaveSaving: string;
  checkoutNoticeSave: string;
  checkoutNoticeSaveError: string;
  checkoutNoticeSaved: string;
  catalogHeadingSectionTitle: string;
  catalogHeadingSectionIntro: string;
  labelCatalogHeadingNl: string;
  labelCatalogHeadingEn: string;
  catalogHeadingHint: string;
  catalogHeadingSaving: string;
  catalogHeadingSave: string;
  catalogHeadingSaved: string;
  catalogHeadingSaveError: string;
  subscribersTitle: string;
  subscribersIntro: string;
  subscribersEmpty: string;
  subscribersColEmail: string;
  subscribersColName: string;
  subscribersColLatestOrder: string;
  metaOrders: string;
  metaProducts: string;
  metaCheckoutNotice: string;
  metaMailList: string;
  metaLogin: string;
};

export const adminMessages: Record<ShopLocale, AdminMessages> = {
  nl: {
    language: "Taal",
    navAdminLabel: "Beheer",
    navOrders: "Bestellingen",
    navProducts: "Producten",
    navCheckoutNotice: "Afrekentekst",
    navMailList: "Mailinglijst",
    navStorefront: "Winkel",
    navLogOut: "Afmelden",
    loginTitle: "Administrator",
    loginPasswordLabel: "Wachtwoord",
    loginSignIn: "Inloggen",
    loginSigningIn: "Bezig met inloggen…",
    loginCouldNotSignIn: "Inloggen mislukt.",
    ordersTitle: "Bestellingen",
    ordersSubtitle:
      "Bindende klantbestellingen. Verwijder een bestelling wanneer deze is afgehandeld.",
    ordersEmpty: "Nog geen bestellingen.",
    labelDate: "Datum",
    ordersMarketingOptIn: "Marketing (e-mail)",
    yes: "Ja",
    no: "Nee",
    ordersPhone: "Telefoon",
    ordersLines: "Regels",
    ordersTotal: "Totaal",
    ordersDeleteOrder: "Bestelling verwijderen",
    productsTitle: "Producten",
    productsIntro:
      "Publiceer zoveel producten als je wilt — er is geen maximum in de catalogus. Gebruik ‘+ Nieuw product’ om een regel toe te voegen, of bewerk bestaande rijen hieronder. Prijzen zijn in euro’s. Bij een nieuw product kun je een voorbeeldfoto uit public/examples/ kiezen in plaats van te uploaden. Met npm run db:seed worden voor die voorbeeldafbeeldingen de Engelse demotitels en -beschrijvingen gesynchroniseerd.",
    productsAddNewToggle: "Nieuw product",
    productsAddNewHint:
      "Upload JPG/PNG/WebP en vul naam, beschrijving en prijs in — daarna zo vaak opslaan als je nieuwe SKU’s nodig hebt.",
    productsLoading: "Laden…",
    productsAllHeading: "Alle producten",
    productsBundledExampleOrUpload: "Afbeelding — voorbeeld of upload",
    productsBundledPlaceholder: "Geen voorbeeld (gebruik upload hieronder)",
    productsExampleShort: "Voorbeeld",
    labelName: "Naam",
    labelDescription: "Beschrijving",
    labelPriceEUR: "Prijs (€)",
    pricePlaceholder: "bijv. 18,99",
    productsPublishSaving: "Opslaan…",
    productsPublish: "Product publiceren",
    productsUpdateSaving: "Opslaan…",
    productsUpdate: "Bijwerken",
    productsVisibleInStore: "Zichtbaar in de winkel",
    productsLivePriceWhenVisible: "Huidige prijs wanneer zichtbaar",
    productsReplacePhoto: "Foto vervangen",
    productsDeleteProduct: "Product verwijderen",
    productsDeleteConfirm:
      "Dit product en de geüploade afbeelding op de server verwijderen?",
    productsLoadError: "Producten konden niet worden geladen.",
    productsUnexpectedError: "Onverwachte fout.",
    productsEnterName: "Voer een productnaam in.",
    productsPriceInvalid:
      "Voer een geldige EUR-prijs in (bijv. 12 of 12,99 of 12.99). Minimum €0,50.",
    productsUploadOrExample: "Upload een foto of kies een voorbeeldafbeelding.",
    productsAdded: "Product toegevoegd.",
    productsNameRequired: "Naam is verplicht.",
    productsPriceMinimum: "Voer een geldige EUR-prijs in (minimum €0,50).",
    productsSaved: "Opgeslagen.",
    productsUpdateFailed: "Bijwerken mislukt.",
    productsDeleteFailed: "Verwijderen mislukt.",
    checkoutNoticePageTitle: "Afrekentekst",
    checkoutNoticePageIntro:
      "Deze tekst verschijnt in een opvallend kader wanneer klanten de checkout openen.",
    checkoutNoticeLabel:
      "Tekst boven het afrekenformulier in de winkel (levermomenten, minimumbedrag, contact voor vragen, …). Platte tekst, regeleindes blijven behouden.",
    checkoutNoticeSaveSaving: "Opslaan…",
    checkoutNoticeSave: "Opslaan",
    checkoutNoticeSaveError: "Opslaan mislukt.",
    checkoutNoticeSaved: "Opgeslagen.",
    catalogHeadingSectionTitle: "Rubriek ‘Onze kazen’ (startpagina)",
    catalogHeadingSectionIntro:
      "Leeg laten gebruikt de standaardtekst uit de taalbestanden voor NL en EN. Vul hier in voor een eigen titel — het introblok daaronder wordt niet gewijzigd.",
    labelCatalogHeadingNl: "Titel — Nederlands",
    labelCatalogHeadingEn: "Titel — Engels",
    catalogHeadingHint:
      "Staat ingesteld als standaardtaal Nederlands — zorg dat de NL-variant klopt voor de meeste klanten.",
    catalogHeadingSaving: "Opslaan…",
    catalogHeadingSave: "Rubriek opslaan",
    catalogHeadingSaved: "Rubriek opgeslagen.",
    catalogHeadingSaveError: "Rubriek opslaan mislukt.",
    subscribersTitle: "Marketing (e-mail)",
    subscribersIntro:
      "Klanten die akkoord gingen met aanbiedingen per e-mail. Eén rij per adres (nieuwste eerst): handig om te exporteren naar je mailtool.",
    subscribersEmpty:
      "Nog geen inschrijvingen — ze verschijnen nadat iemand het vakje tijdens afrekenen aanvinkt.",
    subscribersColEmail: "E-mail",
    subscribersColName: "Naam",
    subscribersColLatestOrder: "Laatste bestelling",
    metaOrders: "Bestellingen",
    metaProducts: "Producten",
    metaCheckoutNotice: "Afrekentekst",
    metaMailList: "Mailinglijst",
    metaLogin: "Inloggen",
  },
  en: {
    language: "Language",
    navAdminLabel: "Administrator",
    navOrders: "Orders",
    navProducts: "Products",
    navCheckoutNotice: "Checkout notice",
    navMailList: "Mail list",
    navStorefront: "Storefront",
    navLogOut: "Log out",
    loginTitle: "Administrator",
    loginPasswordLabel: "Password",
    loginSignIn: "Sign in",
    loginSigningIn: "Signing in…",
    loginCouldNotSignIn: "Could not log in.",
    ordersTitle: "Orders",
    ordersSubtitle:
      "Customer binding orders. Remove an order when it is fulfilled.",
    ordersEmpty: "No orders yet.",
    labelDate: "Date",
    ordersMarketingOptIn: "Marketing opt-in",
    yes: "Yes",
    no: "No",
    ordersPhone: "Phone",
    ordersLines: "Lines",
    ordersTotal: "Total",
    ordersDeleteOrder: "Delete order",
    productsTitle: "Products",
    productsIntro:
      "Publish as many products as you like — there is no catalogue cap. Use “+ Add new product” to create another line, or edit existing rows below. Prices are in euros. When adding a product you can pick a bundled example photo from public/examples/ instead of uploading. Running npm run db:seed also syncs English demo titles and descriptions for those example images.",
    productsAddNewToggle: "Add new product",
    productsAddNewHint:
      "Upload a JPG/PNG/WebP and set name, description, and price — then save as many times as needed for additional SKUs.",
    productsLoading: "Loading…",
    productsAllHeading: "All products",
    productsBundledExampleOrUpload: "Image — bundled example or upload",
    productsBundledPlaceholder: "No bundled image (use file upload below)",
    productsExampleShort: "Example",
    labelName: "Name",
    labelDescription: "Description",
    labelPriceEUR: "Price (€)",
    pricePlaceholder: "e.g. 18.99",
    productsPublishSaving: "Saving…",
    productsPublish: "Publish product",
    productsUpdateSaving: "Saving…",
    productsUpdate: "Update",
    productsVisibleInStore: "Visible in storefront",
    productsLivePriceWhenVisible: "Current live price when visible",
    productsReplacePhoto: "Replace photo",
    productsDeleteProduct: "Delete product",
    productsDeleteConfirm:
      "Delete this product and its uploaded image from the server?",
    productsLoadError: "Could not load products.",
    productsUnexpectedError: "Unexpected error.",
    productsEnterName: "Enter a product name.",
    productsPriceInvalid:
      "Enter a valid EUR price with cents (e.g. 12 or 12,99 or 12.99). Minimum €0.50.",
    productsUploadOrExample: "Upload a photo or pick a bundled example image.",
    productsAdded: "Product added.",
    productsNameRequired: "Name is required.",
    productsPriceMinimum: "Enter a valid EUR price (minimum €0.50).",
    productsSaved: "Saved.",
    productsUpdateFailed: "Update failed.",
    productsDeleteFailed: "Delete failed.",
    checkoutNoticePageTitle: "Checkout notice",
    checkoutNoticePageIntro:
      "This message appears in a highlighted box when customers reach checkout.",
    checkoutNoticeLabel:
      "Text shown above the checkout form on the storefront (delivery windows, minimum order, contact for questions, …). Plain text, line breaks preserved.",
    checkoutNoticeSaveSaving: "Saving…",
    checkoutNoticeSave: "Save",
    checkoutNoticeSaveError: "Could not save.",
    checkoutNoticeSaved: "Saved.",
    catalogHeadingSectionTitle: "‘Our cheeses’ heading (homepage)",
    catalogHeadingSectionIntro:
      "Leave empty to use the default line from locale files for Dutch and English. Enter your own headline here — the intro paragraph below stays from translations.",
    labelCatalogHeadingNl: "Heading — Dutch",
    labelCatalogHeadingEn: "Heading — English",
    catalogHeadingHint:
      "Primary language is NL for this shop — keep Dutch in sync for most visitors.",
    catalogHeadingSaving: "Saving…",
    catalogHeadingSave: "Save headline",
    catalogHeadingSaved: "Headline saved.",
    catalogHeadingSaveError: "Could not save headline.",
    subscribersTitle: "Marketing opt-ins",
    subscribersIntro:
      "Customers who opted in to receive offers by email. One row per address (newest placement first): useful for exporting to your mail tool.",
    subscribersEmpty:
      "No subscribers yet — they appear after someone checks the box during checkout.",
    subscribersColEmail: "Email",
    subscribersColName: "Name",
    subscribersColLatestOrder: "Latest order",
    metaOrders: "Orders",
    metaProducts: "Products",
    metaCheckoutNotice: "Checkout notice",
    metaMailList: "Mail list",
    metaLogin: "Sign in",
  },
};

export function adminPageTitle(locale: ShopLocale, page: keyof Pick<AdminMessages, "metaOrders" | "metaProducts" | "metaCheckoutNotice" | "metaMailList" | "metaLogin">): string {
  const t = adminMessages[locale];
  const map = {
    metaOrders: t.metaOrders,
    metaProducts: t.metaProducts,
    metaCheckoutNotice: t.metaCheckoutNotice,
    metaMailList: t.metaMailList,
    metaLogin: t.metaLogin,
  } as const;
  return `${map[page]} · Boergondisch`;
}
