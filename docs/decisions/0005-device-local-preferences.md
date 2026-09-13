# 0005 — Device-local preferences; anonymous activity never stored

**Status:** Accepted
**Date:** 2026-09-13

## Context

"Follow topics, save discussions, switch between light and dark" are Charcha
features, but there are no accounts. On the web, bookmarks reset on every
reload. A phone app that forgets your saved items every launch feels broken.

Gupt-Charcha's promise is that nothing links a person to what they said or read
(web ADR 0008). A phone is a personal object that others pick up; a stored list
of which anonymous threads someone marked "I have been here" on is exactly the
trail that promise rules out.

## Decision

- Theme, saved items and followed topics persist in AsyncStorage under
  `charcha-preferences`, and are listed in the You tab.
- Only Charcha discussions and Vaad-Vivaad debates can be saved. Gupt-Charcha
  threads have no save control.
- "I have been here", stances and "This moved me" live in component state and
  are gone when the screen unmounts.
- The theme defaults to **light**, not the OS setting, matching web ADR 0012;
  "System" is available as an explicit choice.
- The splash screen stays up until preferences are read, so there is no flash
  of the wrong theme.

## Consequences

- Saved state survives restarts but not a reinstall or a second device. When
  accounts exist this becomes a sync problem, and the local store is the cache.
- Adding any persisted Gupt-Charcha state — even a harmless-looking "recently
  viewed" — contradicts this ADR and web ADR 0008 and needs a new decision.
- The You tab says so in plain words at the bottom, because the privacy claim is
  a promise to the user, not an implementation detail.
