/**
 * Canonical demo products + `/public/examples/*.png` paths.
 * Replace the PNG files in `public/examples/` anytime; paths stay stable.
 * Any DB row whose `imagePath` matches is rewritten on `prisma db seed` sync.
 */

exports.demoExampleProducts = [
  {
    name: "Artisan hard cheese (blocks)",
    description:
      "Nutty semi-hard wedges with thin natural rind — perfect with crackers.",
    priceCents: 1899,
    imagePath: "/examples/artisan-hard-blocks.png",
    active: true,
  },
  {
    name: "Cave-aged blue cheese",
    description:
      "Creamy white paste with vivid blue veins; crumble on salads or pairing boards.",
    priceCents: 1649,
    imagePath: "/examples/blue-cheese-wedge.png",
    active: true,
  },
  {
    name: "Mixed cheese tasting board selection",
    description:
      "Swiss holes, bloomies, wedges and orange cheddar — grazing inspiration.",
    priceCents: 4590,
    imagePath: "/examples/cheese-selection-board.png",
    active: true,
  },
  {
    name: "Morbier-style ash line cheese",
    description:
      "Silky ivory paste with charcoal seam and gentle barnyard aromas.",
    priceCents: 2175,
    imagePath: "/examples/morbier-style-wedge.png",
    active: true,
  },
];
