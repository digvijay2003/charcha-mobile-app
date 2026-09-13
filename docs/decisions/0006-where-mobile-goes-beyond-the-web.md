# 0006 — Where mobile goes beyond the web

**Status:** Accepted
**Date:** 2026-09-13

## Context

A straight port would carry the web's layout assumptions — a right rail,
mirrored two-column debates, a helpline note that scrolls away — onto a 390pt
screen held in one hand. Several of the product's key features also only exist
on the web as static display.

## Decision

Mobile differs from the web in these places, each in service of a stated room
feature:

| Mobile | Web | Why |
| --- | --- | --- |
| **Discussion screen** with an Agree / Disagree / Unsure picker; choosing reveals the counter-view | Cards link to a 404 | "See a perspective you haven't seen" lands hardest right after you commit to a stance |
| Counter-view card **inside the feed**, after the second discussion | In the right rail | Below the fold on a phone is where a nudge goes unread |
| **Follow / Following** on Popular Topics, listed in You | Topics link to a 404 | "Follow topics" is a room feature |
| Debate as **one exchange column**, For offset left and Against offset right, in posting order | Two mirrored columns | Keeps both sides on equal footing, and each rebuttal appears after the argument it answers |
| **"This moved me"** toggle on every argument | `moved` shown as a static count | Debates are scored on minds changed; this is the input for that signal |
| **Helpline bar pinned** to every Gupt-Charcha screen, with tap-to-call | A note in the page | "A helpline is always on screen" |
| Account popover and activity rail become a **You tab** | Popover + right column | Native pattern; saved items and follows are real lists here |

## Consequences

- None of these send data anywhere; they are local interactions over mock data.
- The web should adopt the ones that are product decisions rather than layout
  (the stance picker, follow, "This moved me") or the two clients will teach
  users different products.
- Copy on these follows web ADR 0007: "This moved me", "Share why you agree" —
  never win, beat or opponent.
