/** Parse euros from input like `12,99`, `€12.99`, or `12` into integer cents. */
export function parseEuroInputToCents(value: string): number | null {
  const trimmed = value
    .trim()
    .replace(/\s/g, "")
    .replace(/€/g, "")
    .replace(",", ".")
    .trim();
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
}
