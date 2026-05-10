/**
 * Storefront copy for products lives in the DB. Legacy rows may still be in Swedish.
 * Seed calls this after syncing /examples/* demos so custom-upload images also get EN text.
 */

const EN_WELL_AGED_BOERGONDISCH = {
  name: "Traditional well-aged Boergondisch hard cheese",
  description:
    "Full-bodied with a nutty finish.\nAged at least 12 months. Pairs beautifully with wine and dark bread.",
};

function rowLooksSwedish(row) {
  const text = `${row.name}\n${row.description}`;
  return (
    /\bvällagrad\b/i.test(text) ||
    /\bhårdost\b/i.test(text) ||
    /\bboergondisk\b/i.test(text) ||
    /\bnötigt\b/i.test(text) ||
    /\bfyllig\s+och\b/i.test(text) ||
    /\blagrad\s+i\s+minst\b/i.test(text) ||
    /\bmörkt\s+bröd\b/i.test(text) ||
    /\bpassar\s+vin\b/i.test(text)
  );
}

/** @param {import("@prisma/client").PrismaClient} prisma */
exports.rewriteSwedishProductCopy = async function rewriteSwedishProductCopy(
  prisma,
) {
  const rows = await prisma.product.findMany();
  for (const row of rows) {
    if (!rowLooksSwedish(row)) continue;
    await prisma.product.update({
      where: { id: row.id },
      data: {
        name: EN_WELL_AGED_BOERGONDISCH.name,
        description: EN_WELL_AGED_BOERGONDISCH.description,
      },
    });
  }
};
