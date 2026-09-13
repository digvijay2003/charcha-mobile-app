# Design system

The web's design system, translated rather than reinvented. The source of truth
for colour values is `src/theme/tokens.ts`; if it disagrees with
`charcha-web/app/globals.css`, one of them has a bug.

## The one idea worth understanding

The web declares colours as CSS variables and lets an ancestor class
(`.dark`, `.mode-gupt`) re-point them. React Native has no cascade, so the same
idea is expressed with data and context:

```ts
paletteFor(scheme, mode)       // 2 schemes × 3 rooms = 6 palettes, built once
<Room mode="gupt">…</Room>     // the native `.mode-gupt`
const s = useStyles();          // makeStyles(c => ({ card: { backgroundColor: c.surface } }))
```

`useTheme()` reads the scheme from preferences and the room from the nearest
`<Room>`. `makeStyles` caches one `StyleSheet` per palette object, so switching
theme or room costs a lookup, not a rebuild.

**The failure mode:** a component rendered *outside* the `<Room>` it belongs to
silently gets the Charcha palette. That is why screens pass token names
(`iconColor="accentOrange"`) instead of resolved colours, and why pages put
room-specific pieces in child components (see `Rules` in `gupt-charcha.tsx`).

## Palette

Same two families as the web, with the same jobs
(web ADR 0003):

- **`brand`** — `brand`, `brand2`, `pink`, `orange`, `mint`. Fixed in both
  themes. Gradients, split bars, rails and avatar fills only. Never text.
- **`accent*`** — `accentPurple`, `accentPink`, `accentOrange`, `accentMint`.
  Darker in light mode, lighter in dark mode. All text and icons.

Surfaces: `canvas`, `surface`, `surface2`, `ink`, `muted`, `line`, `lineStrong`.
Tints: `softPurple`, `softPink`, `softOrange`, `softMint`, `softGupt`.
Room: `mode`, `softMode`, `onMode`.

`onMode` does not exist on the web. It is the text colour on a `mode` fill —
white in light mode, navy in dark — because white on the dark-mode lavender
measures about 2.3:1 ([ADR 0007](decisions/0007-on-mode-text-token.md)).

Light `muted` is `#636B85`, a step darker than the web's `#68708A`. The web
value measures 4.48:1 on the Gupt-Charcha canvas and 4.31:1 on `softGupt`;
the mobile value clears 4.5:1 on every light surface and tint. Both are fixes
the web should take.

## Per-room theming

| Room | Canvas (light / dark) | `mode` (light / dark) | Feel |
| --- | --- | --- | --- |
| Charcha | `#F8F7FC` / `#0C0E1C` | `#6D3DF5` / `#B39AFF` | Warm lavender, open |
| Vaad-Vivaad | `#F5F6FB` / `#0B0D19` | `#6D3DF5` / `#B39AFF` | Cooler, structured |
| Gupt-Charcha | `#F4F4F8` / `#0A0B14` | `#4C5578` / `#A8B2D8` | Dim, no brand colour |

The **tab bar takes the active room's palette**, so entering Gupt-Charcha dims
the whole chrome, not only the page. The native header on pushed screens and
the not-built sheet do the same.

## Type

Geist in four weights, each a separate family (`AppText` maps `weight` to it):
`regular` body, `medium` meta, `semibold` card titles and buttons, `bold`
headings. Geist Mono only for anonymous handles.

| Use | Size / line height |
| --- | --- |
| Room title | 26 / 32, letter-spacing −0.4 |
| Detail title | 21–22 / 27–28 |
| Card title | 15–16 / 20–22 |
| Body | 14 / 20–21 |
| Meta, chips | 11–12 |

`AppText` caps Dynamic Type at 1.6× so cards survive the largest accessibility
sizes without every row wrapping into a column; the tab bar caps at 1.2×.

## Shape and depth

- Radii: 8 small tiles and choices, 10 buttons, 12 inner panes, 16 cards, 999
  pills and avatars.
- Two shadows, `shadowCard` and `shadowLift`, as `boxShadow` strings — heavier
  in dark mode, where a light shadow is invisible.
- One gradient. The web's `.charcha-gradient` stops live in
  `brandGradient`; the bottom banner uses the soft-tint version, because
  gradient *text* needs a masked view and a vivid gradient behind small text
  fails contrast.

## Layout

- One column, 16pt side padding, 24pt between sections, 16pt between cards.
- The column caps at 720pt and centres, for tablets and the web preview.
- Tab screens have a sticky top bar (logo, search, avatar). Pushed screens use
  the native header, so iOS swipe-back and Android back behave natively.
- Gupt-Charcha pins the helpline bar above the tab bar; it is never scrolled
  away.

## Touch

- **44pt minimum** for anything tappable. Where a control is visually smaller
  (the 34pt bookmark and toggle pills), `hitSlop` or `minHeight` makes up the
  difference.
- Toggles give a selection haptic (`tick()` in `src/lib/haptics.ts`); navigation
  does not.
- Pressed state: cards scale to 0.985 and deepen their border; buttons drop to
  85% opacity. No hover states — there is no hover on a phone.

## Accessibility

- Text meets 4.5:1 and UI edges 3:1 in both themes and all three rooms.
- Every tappable element has an `accessibilityRole`; toggles expose `checked`,
  tabs expose `selected`.
- Cards are a single `link` element with a spoken summary, and nested actions
  (save, "I have been here") are available through `accessibilityActions`
  instead of being unreachable.
- Charts speak their meaning: `ProgressRing` says "62% of participants agree",
  `SplitBar` says the split *and* the movement.
- Decorative avatars and identicons are hidden from assistive tech; the name
  they stand for is always printed beside them.
- Anonymous handles are read out character by character ("Gupt number A 8 1 F").

## Brand mark

`assets/images/charcha-mark.png`, generated from the web's
`public/brand/charcha-mark.png`. Plated on a light tile in dark mode, and on
white in every app icon (web ADR 0011). The adaptive Android icon keeps the
mark inside the 66% safe zone; the monochrome layer is its alpha silhouette.
The raster does not survive small sizes — the SVG redraw the web ADR calls for
is needed here too.
