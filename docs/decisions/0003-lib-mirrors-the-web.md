# 0003 — `src/lib/` mirrors the web's `lib/`

**Status:** Accepted
**Date:** 2026-09-13

## Context

The web's `lib/` types (`Discussion`, `Vivaad`, `Argument`, `GuptPost`,
`Perspective`) are the contract a backend will implement (web ADR 0005). The
web docs planned the mobile app for *after* the backend, in a monorepo sharing
those types, precisely to avoid building the same UI twice against mock data.
The mobile app was started before either exists.

## Decision

Copy `lib/` into `src/lib/` and change as little as possible: the icon import,
navigation targets (`pending` keys instead of 404 routes) and one lookup helper.
Every difference is listed in `docs/architecture.md#shared-data-layer`.

No monorepo yet. Two repos with a documented mirror is cheaper to run today
than a workspace, and becomes one when the backend forces the types to be
shared.

## Consequences

- Content and types drift unless both repos change together. `CLAUDE.md` makes
  that a rule for every `src/lib/` change.
- When the backend arrives, the shared package is the web's `lib/` plus this
  file's list of differences — a mechanical merge, not a redesign.
- The mock-data duplication the web docs warned about is real, and accepted in
  exchange for having the app on phones now.
