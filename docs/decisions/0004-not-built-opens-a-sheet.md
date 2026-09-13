# 0004 — Anything not built opens one honest sheet

**Status:** Accepted
**Date:** 2026-09-13

## Context

The web links composers, "Argue for / against", notifications, messages,
settings and search to routes that do not exist, and accepts the 404 as a known
prototype gap. On a phone that is worse: an Expo Router "unmatched route"
screen looks like a crash, and there is no address bar to recover with.

## Decision

Every such destination calls `openPending(key)`, which presents
`/coming-soon?what=key` as a form sheet. `src/lib/pending.ts` holds one line of
copy per key, saying in product voice what the feature will be and that it is
not in this build. The sheet takes the palette of the room it came from.

## Consequences

- No dead taps, and one place to see everything that is unbuilt.
- The copy makes promises ("the composer will run the privacy check on your own
  words"). When a feature ships, delete its key — TypeScript then finds every
  call site that still points at the sheet.
- On web preview the form sheet renders as an ordinary page; that is a preview
  limitation, not the app's behaviour.
