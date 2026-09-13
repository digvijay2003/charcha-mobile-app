# Charcha — mobile app

The Android and iOS app for Charcha, a discussion platform built on one idea:
different kinds of conversation need different rules. Same three rooms as
[charcha-web](https://github.com/digvijay2003/charcha-web):

| Room | Tab | Contract |
| --- | --- | --- |
| **Charcha** | `/` | Open discussion. No sides, no winner. |
| **Vaad-Vivaad** | `/vaad-vivaad` | Two sides, timed rounds, scored on minds changed. |
| **Gupt-Charcha** | `/gupt-charcha` | A new handle every thread. No profiles, and threads expire. |

Like the web, this runs on **sample data** — no backend, no accounts. Saved
items, followed topics and your theme are remembered on the phone.

## Built with

| | |
| --- | --- |
| **Expo SDK 57** + **React Native 0.86** | One codebase for Android and iOS. Runs in the Expo Go app — no Android Studio, Xcode or Mac needed. |
| **TypeScript** | Same language as the web app. |
| **Expo Router** | Files in `src/app/` are screens, the same idea as Next.js routes on the web. |

Why these and not Flutter or native: [docs/decisions/0001](docs/decisions/0001-expo-react-native-with-expo-router.md).

---

## Run it on your phone

You need Node 22 (already installed in this WSL setup) and a phone.

**1. Install Expo Go on the phone.**
[Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) ·
[App Store](https://apps.apple.com/app/expo-go/id982107779). If it is already
installed, update it — this project needs the version that supports SDK 57.

**2. Start the app from the WSL terminal.**

```bash
cd ~/projects/CHARCHA/charcha-mobile-app
npm install        # first time only, and after pulling new dependencies
npm run tunnel
```

The first time, Expo asks:

```
The package @expo/ngrok is required to use tunnels, would you like to install it globally?
```

Press **Y**. It is only asked once.

**3. Scan the QR code** that appears in the terminal.

- **Android:** open Expo Go → *Scan QR code*.
- **iPhone:** open the normal Camera app, point it at the code, tap the banner.

The first load takes up to a minute while the app is bundled. After that, save
any file in `src/` and the phone updates within a couple of seconds.

**Why `tunnel`?** WSL runs Linux behind its own virtual network, so your phone
cannot see the laptop directly. The tunnel relays the connection over the
internet instead — which also means the phone does not need to be on the same
Wi-Fi.

### While it is running

| Key | Does |
| --- | --- |
| `r` | Reload the app on the phone |
| `m` | Open the developer menu (or shake the phone) |
| `j` | Open the debugger |
| `w` | Also open it in your browser |
| `Ctrl+C` | Stop |

## Or preview in a browser

No phone needed:

```bash
npm run web
```

Open http://localhost:8081, press `F12`, then `Ctrl+Shift+M` and choose a phone
size. Good for layout and colours. Not the real thing: sheets, haptics, the back
gesture and tap-to-call only behave properly on a phone.

## Faster reloads on the same Wi-Fi (optional)

Tunnels add a little delay. On Windows 11 you can make WSL share the laptop's
network so the phone connects directly:

1. In Windows, create `C:\Users\<your-user>\.wslconfig` containing:

   ```ini
   [wsl2]
   networkingMode=mirrored
   ```

2. In PowerShell run `wsl --shutdown`, then reopen your WSL terminal.
3. Put the phone on the same Wi-Fi as the laptop and run `npm start` instead of
   `npm run tunnel`. Allow Node through the Windows firewall if asked.

If the phone still cannot connect, go back to `npm run tunnel` — it always works.

## Troubleshooting

| You see | Do |
| --- | --- |
| *Project is incompatible with this version of Expo Go* | Update Expo Go from the store. |
| QR scan opens but hangs on *Downloading* | `Ctrl+C`, then `npx expo start --tunnel --clear`. |
| *Tunnel connection has been closed* | Free tunnels drop now and then. Run `npm run tunnel` again. |
| A red screen on the phone | A JavaScript error. It names the file and line; fix it and save. |
| Text in the system font instead of Geist | Press `r` to reload once fonts have downloaded. |

## Checking a change

```bash
npm run lint
npm run typecheck                    # run `npm start` once first, to generate route types
npx expo export --platform web       # proves the whole app bundles
```

Before calling a visual change done, look at it in **both themes** (You tab →
Appearance) and in **all three rooms** — each room has its own colours.

## Project layout

```
src/app/          screens — (tabs)/ are the four tabs, [id].tsx are detail screens
src/components/   UI, grouped like the web: layout, ui, home, vivaad, gupt, widgets
src/lib/          sample data and helpers, mirrored from charcha-web/lib
src/theme/        colour tokens per theme and per room
src/state/        saved items, followed topics, theme — stored on the phone
assets/images/    app icon, splash screen, brand mark
```

## Documentation

| | |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | Routes, state, conventions, SDK 57 gotchas |
| [docs/design-system.md](docs/design-system.md) | Colours, per-room theming, type, touch, accessibility |
| [docs/decisions/](docs/decisions/) | Why things are the way they are |

Product rules — the rooms, language rules, what is not built — live in
`charcha-web/docs/product.md`.

## Share the app as an APK (Android)

Expo Go only works while your laptop runs the server. An **APK** is a normal
Android install file: someone taps it, Charcha installs with its own icon, and it
works without your laptop — still on sample data, like everything in this build.

APKs are built on Expo's servers ([EAS Build](https://docs.expo.dev/build/introduction/)),
so you do not need Android Studio.

**Before the very first build:** the app's permanent ID is `app.charcha.mobile`
(`android.package` in `app.json`). Once someone has installed it, changing the
ID makes it a different app that cannot update the old one. If you want a
different ID — usually a domain you own, reversed — change it now.

### One-time setup

1. Create a free account at https://expo.dev/signup.
2. Log in from WSL:

   ```bash
   npx eas-cli@latest login
   ```

### Build

```bash
npm run build:apk
```

The first time it asks to **create an EAS project** and to **generate a new
Android keystore** (the key that signs your app). Answer **Y** to both. Expo
stores the key for you — never delete it, or future versions will not install
over the old one.

The build waits in the free queue and then takes roughly 10–20 minutes. When it
finishes, the terminal prints a link to the build page on expo.dev.

### Send it

Send that link on WhatsApp or email, or download the `.apk` from the build page
and send the file. The person does **not** need an Expo account. Anyone who has
the link can download the app, so share it only with people you mean to.

### On their phone

1. Open the link and download the APK.
2. Android warns about installing apps from outside the Play Store. Allow
   **Install unknown apps** for the browser or chat app they opened it from.
3. Tap **Install**. If Play Protect says the developer is unrecognised, tap
   **More details → Install anyway** — expected for any app not from the Play Store.

### Updating it

Change the code, run `npm run build:apk` again, and send the new link. Installing
it replaces the old version and keeps their saved items and theme.

### Limits

| | |
| --- | --- |
| Free plan | 15 Android builds a month, low-priority queue |
| iPhone | Cannot install APKs. Sharing with iPhones needs a paid Apple Developer account and TestFlight. |
| Many testers | Google Play's internal testing track (one-time developer fee). `eas build --platform android --profile production` makes the file Play expects. |
