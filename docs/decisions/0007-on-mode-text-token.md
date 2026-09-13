# 0007 — An `onMode` text token for filled buttons

**Status:** Accepted
**Date:** 2026-09-13

## Context

The web renders room CTAs as `bg-mode text-white`. In light mode that is white
on `#6D3DF5`, which passes. In dark mode `mode` becomes the lavender `#B39AFF`,
and white on it measures about 2.3:1 — under the 4.5:1 minimum the web's own
design system requires. Gupt-Charcha dark (`#A8B2D8`) is worse.

## Decision

Add `onMode` to the palette: `#FFFFFF` in light schemes, navy `#11152F` in dark.
Every fill of `mode` — CTAs, badges, the helpline call button — uses it for its
text and icon.

## Consequences

- Dark-mode buttons read as light lavender with dark text rather than the web's
  white-on-lavender. A deliberate visual difference between the two clients.
- The web has the contrast bug this fixes; it should adopt the same token.
- Anything new drawn on a `mode` fill must use `onMode`, never a literal white.
