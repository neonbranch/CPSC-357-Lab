# Expo: development & EAS build

Local development uses the Expo dev server; [EAS Build](https://docs.expo.dev/build/introduction/) produces Android (APK/AAB) and iOS (IPA) in the cloud.

## Prerequisites

- Node.js (LTS) and npm
- **EAS / store builds**: [Expo account](https://expo.dev); **iOS**: Apple Developer Program; **Android (Play)**: Google Play Console when publishing

## Local development

```bash
cd unbc-eas
npm install
```

Start the dev server:

```bash
npm start
```

Run on a specific platform (with emulator/simulator or device):

```bash
npm run android
npm run ios
npm run web
```

Use [Expo Go](https://expo.dev/go) or a **development build** (see EAS development client below) on a physical device.

---

## EAS: install CLI

```bash
npm install -g eas-cli
```

(Or use `npx eas-cli` instead of a global install.)

## EAS: first-time setup

```bash
eas login
eas init
eas build:configure
```

`eas build:configure` creates `eas.json` and expects valid `app.json` / `app.config.js` (`slug`, `android.package`, `ios.bundleIdentifier`, etc.).

On the first platform build, follow prompts for **Android keystore** and **iOS certificates / provisioning** (EAS can generate or you upload).

## EAS: run builds

```bash
# Android — AAB (typical for Play Store)
eas build --platform android --profile production

# Android — APK (use a preview/internal profile if defined in eas.json)
eas build --platform android --profile preview

# iOS
eas build --platform ios --profile production

# Both
eas build --platform all --profile production
```

Download artifacts from the CLI output or [expo.dev](https://expo.dev) → your project → **Builds**.

## EAS: submit to stores (optional)

```bash
eas submit --platform android
eas submit --platform ios
```

## EAS: development client (optional)

With a `development` profile in `eas.json` that sets `developmentClient: true`:

```bash
eas build --profile development --platform android
eas build --profile development --platform ios
```

Install the build on a device, then:

```bash
npx expo start --dev-client
```

## Quick reference

| Task | Commands |
|------|----------|
| Local dev | `cd unbc-eas` → `npm install` → `npm start` (or `npm run android` / `ios` / `web`) |
| EAS setup | `eas login` → `eas init` → `eas build:configure` |
| Android production | `eas build -p android --profile production` |
| iOS production | `eas build -p ios --profile production` |

Docs: [EAS Build](https://docs.expo.dev/build/introduction/), [eas.json](https://docs.expo.dev/build/eas-json/).
