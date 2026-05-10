export type ShopLocale = "nl" | "en";

export const LOCALE_COOKIE = "boergondisch_lang";

export const shopMeta: Record<
  ShopLocale,
  { title: string; description: string; titleTemplate: string }
> = {
  nl: {
    title: "Boergondisch · Kazen aan huis",
    titleTemplate: "%s · Boergondisch",
    description:
      "Artisanaal kaasassortiment met thuislevering. Bindende bestelling — betalen bij levering.",
  },
  en: {
    title: "Boergondisch · Cheese home delivery",
    titleTemplate: "%s · Boergondisch",
    description:
      "Browse artisan cheeses with home delivery. Binding orders — pay on delivery.",
  },
};

export type ShopMessages = {
  tagline: string;
  shopTitle: string;
  navProducts: string;
  /** Header link to /checkout (cart + order form). */
  navCart: string;
  navCheckout: string;
  navAdmin: string;
  language: string;
  homeHeading: string;
  homeIntroPrefix: string;
  homeIntroEmphasis: string;
  homeIntroSuffix: string;
  homeEmpty: string;
  vatIncluded: string;
  qty: string;
  addToCart: string;
  inCart: string;
  /** Shown on product card after an item is in the cart. */
  continueToCart: string;
  footerNote: string;
  checkoutTitle: string;
  checkoutEmpty: string;
  browseProducts: string;
  checkoutIntro: string;
  labelFullName: string;
  labelPhone: string;
  labelAddress: string;
  labelEmail: string;
  marketingOptIn: string;
  bindingConfirm: string;
  submitOrder: string;
  submitting: string;
  cartTitle: string;
  total: string;
  thankYouTitle: string;
  thankYouBody: string;
  backToShop: string;
  errorSubmit: string;
  errorProductUnavailable: string;
  errorValidate: string;
  notFoundTitle: string;
  notFoundLine1: string;
  notFoundLine2Start: string;
  notFoundLine2End: string;
  countdownUnitDays: string;
  countdownUnitHours: string;
  countdownUnitMinutes: string;
  countdownUnitSeconds: string;
  /** Shown under the countdown when admin left the message empty */
  countdownDefaultReminder: string;
};

export const shopMessages: Record<ShopLocale, ShopMessages> = {
  nl: {
    tagline: "Thuislevering",
    shopTitle: "Winkel",
    navProducts: "Producten",
    navCart: "Winkelwagen",
    navCheckout: "Afrekenen",
    navAdmin: "Admin",
    language: "Taal",
    homeHeading: "Onze kazen",
    homeIntroPrefix:
      "Kies hoeveelheden en producten — scroll door de volledige catalogus. Er is geen maximum aantal producten. Ga naar afrekenen voor een ",
    homeIntroEmphasis: "bindende",
    homeIntroSuffix:
      " bestelling; je betaalt wanneer de levering arriveert (geen online betaling in deze winkel).",
    homeEmpty:
      "Nog geen producten. Log in bij admin en vul je assortiment.",
    vatIncluded: "incl. btw",
    qty: "Aantal",
    addToCart: "In winkelwagen",
    inCart: "In winkelwagen",
    continueToCart: "Naar winkelwagen — gegevens en bestellen",
    footerNote: "Betaling gebeurt bij levering. Lokale levering.",
    checkoutTitle: "Afrekenen",
    checkoutEmpty: "Je winkelwagen is leeg.",
    browseProducts: "Naar de producten",
    checkoutIntro:
      "Bevestig je gegevens. Verzenden bevestigt een bindende bestelling. Betaling gebeurt bij levering — er is geen online betaling in deze checkout.",
    labelFullName: "Volledige naam",
    labelPhone: "Telefoonnummer",
    labelAddress: "Leveringsadres",
    labelEmail: "E-mail",
    marketingOptIn:
      "Ik wil af en toe e-mails met aanbiedingen en nieuws van Boergondisch ontvangen.",
    bindingConfirm:
      "Ik begrijp dat deze bestelling bindend is en dat ik betaal bij levering.",
    submitOrder: "Bindende bestelling plaatsen",
    submitting: "Verzenden…",
    cartTitle: "Je winkelwagen",
    total: "Totaal",
    thankYouTitle: "Bedankt voor je bestelling!",
    thankYouBody:
      "We hebben je bindende bestelling ontvangen en nemen contact op over de levering. Betaling is verschuldigd wanneer je kaas arriveert.",
    backToShop: "Terug naar de winkel",
    errorSubmit: "De bestelling kon niet worden verstuurd. Probeer opnieuw.",
    errorProductUnavailable: "Product niet beschikbaar.",
    errorValidate: "Controleer alle verplichte velden.",
    notFoundTitle: "Deze pagina bestaat niet",
    notFoundLine1: "Misschien is de link verouderd.",
    notFoundLine2Start: "De bedankpagina staat nu op ",
    notFoundLine2End: " (niet meer /checkout/tack).",
    countdownUnitDays: "dagen",
    countdownUnitHours: "uren",
    countdownUnitMinutes: "minuten",
    countdownUnitSeconds: "seconden",
    countdownDefaultReminder:
      "Bestel snel je favoriete kaas — de volgende ronde sluit over",
  },
  en: {
    tagline: "Home delivery",
    shopTitle: "Shop",
    navProducts: "Products",
    navCart: "Cart",
    navCheckout: "Checkout",
    navAdmin: "Admin",
    language: "Language",
    homeHeading: "Our cheeses",
    homeIntroPrefix:
      "Choose quantities and items — scroll to browse the full catalogue. There is no cap on how many products are listed. Go to checkout to place a ",
    homeIntroEmphasis: "binding",
    homeIntroSuffix:
      " order; you pay when your delivery arrives (no online payment in this shop).",
    homeEmpty: "No products yet. Sign in to admin and add your range.",
    vatIncluded: "VAT included",
    qty: "Qty",
    addToCart: "Add to cart",
    inCart: "In cart",
    continueToCart: "Go to cart — details and order",
    footerNote: "Payment is made on delivery. Local delivery.",
    checkoutTitle: "Checkout",
    checkoutEmpty: "Your cart is empty.",
    browseProducts: "Browse products",
    checkoutIntro:
      "Confirm your details. Submitting confirms a binding order. Payment is collected on delivery — there is no online payment in this checkout.",
    labelFullName: "Full name",
    labelPhone: "Phone number",
    labelAddress: "Delivery address",
    labelEmail: "Email",
    marketingOptIn:
      "I would like occasional emails with offers and news from Boergondisch.",
    bindingConfirm:
      "I understand this order is binding and that I will pay on delivery.",
    submitOrder: "Submit binding order",
    submitting: "Submitting…",
    cartTitle: "Your cart",
    total: "Total",
    thankYouTitle: "Thanks for your order!",
    thankYouBody:
      "We have received your binding order and will contact you about delivery. Payment is due when your cheese arrives.",
    backToShop: "Back to the shop",
    errorSubmit: "Could not submit the order. Please try again.",
    errorProductUnavailable: "Product unavailable.",
    errorValidate: "Please check all required fields.",
    notFoundTitle: "This page does not exist",
    notFoundLine1: "This link may be out of date.",
    notFoundLine2Start: "The thank-you page is now at ",
    notFoundLine2End: " (no longer /checkout/tack).",
    countdownUnitDays: "days",
    countdownUnitHours: "hours",
    countdownUnitMinutes: "minutes",
    countdownUnitSeconds: "seconds",
    countdownDefaultReminder:
      "Hurry and put in an order for your favourite cheese — this round closes in",
  },
};
