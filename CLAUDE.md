@AGENTS.md

# Project documentation

`docs/` is the source of truth for architecture, design and decisions. Read
[docs/README.md](docs/README.md) first.

This app is the native sibling of `charcha-web`. The product rules are the web's
and are not repeated here — read `charcha-web/docs/product.md` for the three
rooms, the language rules (no Devanagari, no combative vocabulary) and what is
deliberately not built.

Three rules when making changes here:

1. **Changing behaviour a document describes? Update that document in the same
   commit.**
2. **Made a choice a future maintainer could undo by accident? Add an ADR** in
   `docs/decisions/`, numbered, following the existing format.
3. **Changed `src/lib/`?** Those files mirror `charcha-web/lib/`. Make the same
   change on the web, or record why the two now differ in
   `docs/architecture.md#shared-data-layer`.

Before calling a visual change done, check it in both themes and in all three
rooms — the palette changes per room, so a colour that works in Charcha can fail
in Gupt-Charcha.
