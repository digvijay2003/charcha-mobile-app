# 0001 — Expo + React Native + Expo Router

**Status:** Accepted
**Date:** 2026-09-13

## Context

Charcha needed a mobile app for Android and iOS. The web app is Next.js,
TypeScript and React, maintained by one developer with no mobile experience.
`charcha-web/docs/product.md` already named "Expo/React Native, sharing `lib/`
types" as the intended direction. The options were:

| Option | Against it |
| --- | --- |
| Native Swift + Kotlin | Two codebases in two new languages for one developer |
| Flutter | A new language (Dart); nothing from the web carries over |
| Capacitor / PWA wrapper | Web UI in a webview — no native navigation, gestures or sheets; the web layout is not built for one-handed use |
| Bare React Native | Requires Android Studio and Xcode before anything runs |
| **Expo (managed)** | — |

## Decision

Expo SDK 57, React Native 0.86 on the New Architecture, TypeScript `strict`,
and Expo Router for file-based navigation.

- Same language, same React mental model, and the same `lucide` icon names as
  the web.
- Expo Router's `src/app/` routes behave like the web's App Router, and the
  paths match (`/vaad-vivaad/[id]`).
- The app runs inside **Expo Go** on a real phone by scanning a QR code — no
  Android Studio, Xcode, Mac or developer account needed to start.
- Store builds, when needed, come from EAS Build in the cloud.

## Consequences

- Only libraries that ship inside Expo Go can be used without a custom
  development build. Everything chosen so far (svg, gradient, haptics,
  AsyncStorage, fonts) qualifies. Adding a library with custom native code
  means moving to a development build — a bigger step, and worth an ADR.
- Expo moves fast and publishes breaking changes per SDK. Tutorials for older
  SDKs are frequently wrong; `AGENTS.md` points at the versioned docs.
- Expo Go from the stores only runs the latest SDK. Upgrading the phone app
  without upgrading the project (or the reverse) shows "incompatible SDK".
