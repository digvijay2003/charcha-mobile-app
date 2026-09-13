# 0002 — Palette tokens and room context, no styling library

**Status:** Accepted
**Date:** 2026-09-13

## Context

The web restyles every component three ways — light, dark and per room — with
CSS variables re-pointed by ancestor classes (web ADR 0002). React Native has
no cascade and no CSS variables. The tempting ports were NativeWind (Tailwind
class names on native) or a theming library such as Tamagui or Unistyles.

NativeWind's stable line targets Tailwind 3 while the web is on Tailwind 4, it
adds a Babel and Metro transform to a beginner's toolchain, and per-room
re-pointing would still need custom plumbing. A theming library is a large
dependency for six palettes.

## Decision

- `src/theme/tokens.ts` builds every `scheme × room` palette once, as plain
  objects with the web's token names in camelCase.
- `<Room mode>` provides the room through context — the native `.mode-{room}`.
- `makeStyles(c => …)` turns a palette into a `StyleSheet`, cached per palette
  object.

## Consequences

- No build-time transform; styles are ordinary TypeScript and type-checked.
  A misspelled token is a compile error, which the web's CSS cannot offer.
- A component outside its `<Room>` falls back to the Charcha palette without
  any warning. Screens pass token *names* to configure components, and
  room-specific fragments are child components rendered inside the room.
- Class strings from the web cannot be pasted in. Porting a web component means
  translating its classes by hand, using `accents.ts` for the accent pairing.
