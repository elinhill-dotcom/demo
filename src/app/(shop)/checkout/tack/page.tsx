import { permanentRedirect } from "next/navigation";

/** Old Swedish slug / legacy bookmark → current thank-you page */
export default function LegacyTackRedirect() {
  permanentRedirect("/checkout/thank-you");
}
