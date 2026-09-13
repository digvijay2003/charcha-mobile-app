import type { Mode } from "@/lib/modes";

/**
 * The mobile port of charcha-web/app/globals.css. Same two ideas:
 *
 * 1. A base palette per scheme, re-pointed per room — the room shifts the
 *    chrome's temperature, not just its accent.
 * 2. Two accent families with separate jobs: `brand` colours for graphics
 *    only, `accent*` colours for text and icons (web ADR 0003).
 *
 * Every palette is built once at module load, so a palette object is a stable
 * identity that styles can be cached against.
 */
export type Scheme = "light" | "dark";

export type Palette = {
  canvas: string;
  surface: string;
  surface2: string;
  ink: string;
  muted: string;
  line: string;
  lineStrong: string;

  softPurple: string;
  softPink: string;
  softOrange: string;
  softMint: string;

  accentPurple: string;
  accentPink: string;
  accentOrange: string;
  accentMint: string;

  gupt: string;
  softGupt: string;

  /** The active room's colour, and its tint. */
  mode: string;
  softMode: string;
  /**
   * Text on a `mode` fill. Not on the web, where CTAs are always white text —
   * which measures 2.3:1 on the lavender dark-mode `mode`. Dark schemes put
   * navy ink on the light fill instead.
   */
  onMode: string;

  shadowCard: string;
  shadowLift: string;
};

export type ColorToken = {
  [K in keyof Palette]: Palette[K] extends string ? K : never;
}[keyof Palette];

/** Fixed in both themes. Gradients, dots and bars only — never text. */
export const brand = {
  brand: "#6d3df5",
  brand2: "#9b5de5",
  pink: "#e85aad",
  orange: "#ff9b54",
  mint: "#35c99a",
} as const;

/** The one brand gradient, at the same stops as `.charcha-gradient`. */
export const brandGradient = {
  colors: [brand.brand, brand.brand2, brand.pink, brand.orange] as const,
  locations: [0, 0.32, 0.68, 1] as const,
};

const base: Record<Scheme, Omit<Palette, "canvas" | "mode" | "softMode">> = {
  light: {
    surface: "#ffffff",
    surface2: "#fbfaff",
    ink: "#11152f",
    // Web uses #68708a, which measures 4.48:1 on the Gupt-Charcha canvas.
    muted: "#636b85",
    line: "#eceaf5",
    lineStrong: "#e0dcef",

    softPurple: "#f0eaff",
    softPink: "#fff0f7",
    softOrange: "#fff4e8",
    softMint: "#eafbf5",

    accentPurple: "#6d3df5",
    accentPink: "#c6317f",
    accentOrange: "#a0500f",
    accentMint: "#0b7a5b",

    gupt: "#4c5578",
    softGupt: "#eef0f6",

    onMode: "#ffffff",

    shadowCard: "0px 1px 2px rgba(17, 21, 47, 0.04), 0px 8px 24px -12px rgba(17, 21, 47, 0.12)",
    shadowLift: "0px 2px 4px rgba(17, 21, 47, 0.05), 0px 18px 40px -16px rgba(17, 21, 47, 0.22)",
  },
  dark: {
    surface: "#14172b",
    surface2: "#191d34",
    ink: "#eef0f8",
    muted: "#99a1bd",
    line: "#242844",
    lineStrong: "#2f3454",

    softPurple: "#201b3d",
    softPink: "#341c30",
    softOrange: "#33251a",
    softMint: "#122f2a",

    accentPurple: "#b39aff",
    accentPink: "#f78ac6",
    accentOrange: "#ffb47c",
    accentMint: "#55ddb0",

    gupt: "#a8b2d8",
    softGupt: "#1c2036",

    onMode: "#11152f",

    shadowCard: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 8px 24px -12px rgba(0, 0, 0, 0.6)",
    shadowLift: "0px 2px 4px rgba(0, 0, 0, 0.3), 0px 18px 40px -16px rgba(0, 0, 0, 0.7)",
  },
};

/**
 * Charcha is warm lavender, Vaad-Vivaad cooler and more structured,
 * Gupt-Charcha dim and low-chroma with no brand colour at all.
 */
const rooms: Record<Scheme, Record<Mode, Pick<Palette, "canvas" | "mode" | "softMode">>> = {
  light: {
    charcha: { canvas: "#f8f7fc", mode: "#6d3df5", softMode: "#f0eaff" },
    vivaad: { canvas: "#f5f6fb", mode: "#6d3df5", softMode: "#ecebfb" },
    gupt: { canvas: "#f4f4f8", mode: "#4c5578", softMode: "#eceef4" },
  },
  dark: {
    charcha: { canvas: "#0c0e1c", mode: "#b39aff", softMode: "#201b3d" },
    vivaad: { canvas: "#0b0d19", mode: "#b39aff", softMode: "#1e1c38" },
    gupt: { canvas: "#0a0b14", mode: "#a8b2d8", softMode: "#1c2036" },
  },
};

const palettes = {
  light: build("light"),
  dark: build("dark"),
};

function build(scheme: Scheme): Record<Mode, Palette> {
  return {
    charcha: { ...base[scheme], ...rooms[scheme].charcha },
    vivaad: { ...base[scheme], ...rooms[scheme].vivaad },
    gupt: { ...base[scheme], ...rooms[scheme].gupt },
  };
}

export function paletteFor(scheme: Scheme, mode: Mode): Palette {
  return palettes[scheme][mode];
}

/** Radii and spacing from the web's rounded-lg/xl/2xl and gap scale. */
export const radius = { lg: 8, xl: 12, xxl: 16, full: 999 } as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
