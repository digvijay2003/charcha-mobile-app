import type { Accent } from "@/lib/mock-data";
import { brand, type ColorToken } from "@/theme/tokens";

type AccentStyle = {
  /** Theme-aware, contrast-checked accent for text, icons and ring arcs. */
  text: ColorToken;
  /** Soft tint behind an icon tile or chip. */
  soft: ColorToken;
  /** Vivid palette colour, for decorative dots and bars only. */
  dot: string;
};

/**
 * Accent → palette token names. The web maps to Tailwind class strings; here
 * it maps to keys of the active palette, which keeps the same pairing rule:
 * `text` is always checked against its own `soft`.
 */
export const accentStyles: Record<Accent, AccentStyle> = {
  purple: { text: "accentPurple", soft: "softPurple", dot: brand.brand },
  mint: { text: "accentMint", soft: "softMint", dot: brand.mint },
  orange: { text: "accentOrange", soft: "softOrange", dot: brand.orange },
  pink: { text: "accentPink", soft: "softPink", dot: brand.pink },
};
