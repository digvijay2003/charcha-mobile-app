/**
 * The three rooms. These are not filters on one feed — each has its own social
 * contract, so each retints the chrome and carries its own header.
 *
 * Mirrors charcha-web/lib/modes.ts. `href` is the mobile route, which matches
 * the web path so a shared link means the same thing on both.
 */
export type Mode = "charcha" | "vivaad" | "gupt";

export type ModeDef = {
  key: Mode;
  href: "/" | "/vaad-vivaad" | "/gupt-charcha";
  latin: string;
  /** The room's promise, in the user's words. */
  tagline: string;
  contract: string;
  ctaLabel: string;
};

export const modes: Record<Mode, ModeDef> = {
  charcha: {
    key: "charcha",
    href: "/",
    latin: "Charcha",
    tagline: "Share a thought.",
    contract: "Open discussion. No sides, no winner — understand why people think what they think.",
    ctaLabel: "Start a Charcha",
  },
  vivaad: {
    key: "vivaad",
    href: "/vaad-vivaad",
    latin: "Vaad-Vivaad",
    tagline: "Test an idea.",
    contract: "Two sides, timed rounds, a closing bell. Scored on minds changed, not upvotes.",
    ctaLabel: "Open a debate",
  },
  gupt: {
    key: "gupt",
    href: "/gupt-charcha",
    latin: "Gupt-Charcha",
    tagline: "Say what you can't say.",
    contract: "A new handle every thread. No profiles, no followers, and threads expire.",
    ctaLabel: "Post anonymously",
  },
};

export const modeOrder: Mode[] = ["charcha", "vivaad", "gupt"];
