/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const { demoExampleProducts } = require("./demo-example-products");
const { rewriteSwedishProductCopy } = require("./normalize-swedish-copy");

const prisma = new PrismaClient();

/** Rewrite any row using a bundled /examples/* photo to the canonical EN demo copy. */
async function syncExampleImageProducts() {
  for (const demo of demoExampleProducts) {
    const rows = await prisma.product.findMany({
      where: { imagePath: demo.imagePath },
    });
    for (const row of rows) {
      await prisma.product.update({
        where: { id: row.id },
        data: {
          name: demo.name,
          description: demo.description,
          priceCents: demo.priceCents,
          active: demo.active,
        },
      });
    }
  }
}

async function main() {
  await prisma.appSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      checkoutNotice: "",
      homeHeadingNl: "",
      homeHeadingEn: "",
    },
    update: {},
  });

  await syncExampleImageProducts();
  await rewriteSwedishProductCopy(prisma);

  const count = await prisma.product.count();
  if (count > 0) return;

  await prisma.product.createMany({
    data: demoExampleProducts.map((p) => ({
      name: p.name,
      description: p.description,
      priceCents: p.priceCents,
      imagePath: p.imagePath,
      active: p.active,
    })),
  });
}

main()
  .finally(() => prisma.$disconnect());
