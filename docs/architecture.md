# Architecture

A native client over the same mock data as `charcha-web`. No backend, no
accounts, no network calls — the only persistence is on-device preferences.

## Stack

| Layer | Choice | Version |
| --- | --- | --- |
| Platform | Expo (managed), runs in Expo Go | SDK 57 |
| Runtime | React Native, New Architecture | 0.86 |
| UI | React, with the React Compiler on | 19.2 |
| Language | TypeScript, `strict` | 6.0 |
| Navigation | Expo Router — file-based, like the web's App Router | 57 |
| Styling | `StyleSheet` + typed palette tokens | — |
| Icons | `lucide-react-native` — same names as the web's `lucide-react` | 1.45 |
| Fonts | Geist + Geist Mono via `@expo-google-fonts` | — |
| Graphics | `react-native-svg` (rings), `expo-linear-gradient` (avatars, banner) | — |
| Storage | `@react-native-async-storage/async-storage` | 2.2 |

Why Expo and not Flutter, bare React Native or a PWA:
[ADR 0001](decisions/0001-expo-react-native-with-expo-router.md).

## Routes

Files under `src/app/` are routes. Paths match the web wherever a web route
exists, so one link means the same thing on both.

| Route | File | Kind |
| --- | --- | --- |
| `/` | `src/app/(tabs)/index.tsx` | Tab — Charcha |
| `/vaad-vivaad` | `src/app/(tabs)/vaad-vivaad.tsx` | Tab — Vaad-Vivaad |
| `/gupt-charcha` | `src/app/(tabs)/gupt-charcha.tsx` | Tab — Gupt-Charcha |
| `/you` | `src/app/(tabs)/you.tsx` | Tab — account, saved, following, appearance |
| `/discussion/[id]` | `src/app/discussion/[id].tsx` | Pushed — stance picker + counter-view |
| `/vaad-vivaad/[id]` | `src/app/vaad-vivaad/[id].tsx` | Pushed — the exchange |
| `/gupt-charcha/[id]` | `src/app/gupt-charcha/[id].tsx` | Pushed — anonymous thread |
| `/coming-soon?what=` | `src/app/coming-soon.tsx` | Sheet — anything not built |

`(tabs)` is a route group: it adds a navigator without adding a path segment.
The root `_layout.tsx` is a native stack holding the tabs, the pushed detail
screens and the sheet.

## Composition

```
src/app/_layout.tsx
  SafeAreaProvider
  PreferencesProvider         theme, saved, following — read before first frame
  ThemeProvider (navigation)  navigator surfaces painted from the palette
  Stack
    (tabs)/_layout.tsx        Tabs with the custom TabBar
      RoomScreen mode=…       ← <Room> + canvas + sticky TopBar + 720px column
        RoomHeader            name, tagline, contract, CTA
        …cards and widgets
    [id] screens → DetailScreen mode=…   native header in the room palette
```

`RoomScreen` is the mobile `AppShell`. It wraps its children in `<Room mode>`,
which is the native equivalent of the web's `.mode-{room}` class: every
component below it resolves colours against that room.

## State

| State | Where | Persisted |
| --- | --- | --- |
| Theme preference | `src/state/preferences.tsx` | Yes, AsyncStorage |
| Saved discussions and debates | same | Yes |
| Followed topics | same | Yes |
| Stance on a discussion | component state | No |
| "This moved me" | component state | No |
| "I have been here" | component state | **Never** — see [ADR 0005](decisions/0005-device-local-preferences.md) |

Everything persisted is one JSON value under `charcha-preferences`. The splash
screen stays up until it has been read, so the first frame is already in the
right theme.

## Shared data layer

`src/lib/` mirrors `charcha-web/lib/` so the two can later become one package
([ADR 0003](decisions/0003-lib-mirrors-the-web.md)).

| Module | Relationship to web |
| --- | --- |
| `vivaad-data.ts` | Identical copy |
| `gupt-data.ts` | Identical except the icon import (`lucide-react-native`) |
| `format.ts` | Identical |
| `modes.ts` | Same data; `href` is narrowed to a route type |
| `mock-data.ts` | Same content. `utilityNav` entries carry a `pending` key instead of an `href`, and drop Bookmarks/Following, which are real screens here. Adds `getDiscussion`. |
| `accents.ts` | Same pairing rule; maps to palette token names, not Tailwind classes |
| `haptics.ts` | Mobile only |
| `pending.ts` | Mobile only — the not-built destinations and their copy |

## Directory layout

```
src/
  app/                 routes (see table above)
  components/
    layout/            RoomScreen, DetailScreen, TopBar, TabBar, RoomHeader, SectionHeading
    home/              DiscussionCard, BottomBanner
    vivaad/            VivaadCard, ArgumentCard, SplitBar, StageIndicator
    gupt/              GuptCard, AnonHandle, BeenThereButton, PrivacyNotice,
                       SupportNote, HelplineBar
    widgets/           WidgetCard, UnseenPerspective, PopularTopics, ClosingSoon
    ui/                AppText, Card, Button, Avatar, ProgressRing, BookmarkButton, Logo
  lib/                 data and pure helpers, mirrors the web
  state/               preferences provider
  theme/               tokens.ts (palettes), theme.tsx (Room, useTheme, makeStyles)
assets/images/         app icon, adaptive icon layers, splash, brand mark
```

Same split as the web: `ui/` is room-agnostic, `home/`, `vivaad/`, `gupt/` are
room-specific, and anything that needs to know which room it is in to decide
*what* to render belongs in `layout/`.

## Conventions

- **Styles come from `makeStyles`.** It takes the palette and returns a
  `StyleSheet`, cached per palette. Never write a hex value in a component —
  the exceptions are the brand graphics colours imported from `tokens.ts` and
  the logo plate.
- **Text goes through `AppText`** with a `weight` prop. On Android a custom font
  ignores `fontWeight`, so each weight is its own font family; a raw `<Text>`
  with `fontWeight: "700"` renders regular Geist on Android and bold on iOS.
- **Cards are one tap target.** `Card` with `onPress` is the native form of the
  web's stretched link. Because an accessible parent hides its children from
  screen readers, nested buttons are re-exposed as `accessibilityActions`
  (see `DiscussionCard`, `GuptCard`).
- **Toggles use `accessibilityRole="togglebutton"`** with `checked` state; the
  stance picker and theme selector are `radiogroup`/`radio`.
- **Room colour comes from context, not props.** Pass token *names*
  (`iconColor="accentOrange"`) when a screen configures a component, so the
  component resolves it inside the correct room.
- **Nothing dead-ends.** A destination that does not exist calls
  `openPending(key)` ([ADR 0004](decisions/0004-not-built-opens-a-sheet.md)).
- Imports use `@/` (→ `src/`) and `@/assets/` (→ `assets/`).
- Comments explain *why*.

## Verification

```bash
npx expo install --check             # native libraries match SDK 57
npm run lint
npm run typecheck                    # stricter once `npx expo start` has generated typed routes
npx expo export --platform android   # proves every import resolves and bundles for a phone
```

CI runs exactly these on pushes to `staging` and pull requests into `main`
([pipeline.md](pipeline.md)).

Visual checks: both themes, all three rooms, at phone width (~390pt), on a real
device through Expo Go when touching gestures, sheets or the tab bar.

## SDK 57 gotchas

- **Web preview is not the app.** `npm run web` is fast for layout work, but the
  `coming-soon` form sheet renders as a plain page on web, haptics are silent,
  and `tel:` links do nothing useful on a desktop. Judge those on a phone.
- **`boxShadow` strings** are the cross-platform shadow API on the New
  Architecture. Do not add `elevation` or iOS `shadow*` props alongside them.
- **Typed routes are generated**, not written. If a route string stops
  type-checking, run `npx expo start` once to regenerate `.expo/types`.
- **`@react-navigation/*` imports are unsupported in app code** since SDK 56.
  Types such as `BottomTabBarProps` come from `expo-router/tabs`.
