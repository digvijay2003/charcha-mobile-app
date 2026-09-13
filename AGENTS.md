# Expo HAS CHANGED

This repo pins **Expo SDK 57** (React Native 0.86, React 19.2, TypeScript 6).
Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before
writing any code — APIs from older tutorials are often wrong here. Two that bite:

- Since SDK 56, app code must not import `@react-navigation/*` directly. Use the
  `expo-router` entry points (`expo-router`, `expo-router/tabs`, …).
- Typed routes live in `.expo/types/router.d.ts`, which only exists after
  `npx expo start` has run once. `tsc` on a clean checkout accepts any route
  string until then.
