# Charcha mobile documentation

Everything here is versioned with the code, so a document that contradicts the
code is a bug in the document.

| Document | Answers |
| --- | --- |
| [architecture.md](architecture.md) | Stack, routes, state, conventions, SDK 57 gotchas |
| [design-system.md](design-system.md) | Tokens, per-room theming, type, touch targets, accessibility |
| [pipeline.md](pipeline.md) | Branches, the checks on `main`, releasing, pushing from this machine |
| [decisions/](decisions/) | Why things are the way they are, one file per decision |

Product rules — the three rooms, language rules, what is not built — are owned
by the web repo: `charcha-web/docs/product.md`. This repo documents only where
mobile differs, in [ADR 0006](decisions/0006-where-mobile-goes-beyond-the-web.md).

Setup and running instructions live in the root [README](../README.md).

## Keeping this current

1. **Changing behaviour a document describes?** Update it in the same commit.
2. **Making a choice someone could undo by accident?** Add an ADR.
3. **Adding a route or a `src/lib/` module?** Update the tables in
   [architecture.md](architecture.md).
