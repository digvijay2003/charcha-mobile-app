/**
 * Indian grouping: thousands stay K, then lakh (1,00,000) and crore
 * (1,00,00,000) rather than M/B, which is how counts are actually read here.
 */
export function formatCount(value: number): string {
  if (value >= 10_000_000) return `${trim(value / 10_000_000)}Cr`;
  if (value >= 100_000) return `${trim(value / 100_000)}L`;
  if (value >= 1_000) return `${trim(value / 1_000)}K`;
  return String(value);
}

function trim(n: number): string {
  // 1.0K reads worse than 1K; keep one decimal only when it carries meaning.
  return n.toFixed(1).replace(/\.0$/, "");
}
