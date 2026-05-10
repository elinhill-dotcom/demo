import { prisma } from "@/lib/prisma";
import { CheckoutClient } from "./CheckoutClient";

export default async function CheckoutPage() {
  const settings = await prisma.appSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      checkoutNotice: "",
      homeHeadingNl: "",
      homeHeadingEn: "",
    },
    update: {},
  });

  return <CheckoutClient checkoutNotice={settings.checkoutNotice} />;
}
