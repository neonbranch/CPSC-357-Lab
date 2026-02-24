# Expo Push Notifications Fix Guide (SDK 53+)

This guide is for **Android physical device testing** with `expo-notifications` in Expo SDK 53+ (this project is on SDK 54). It focuses on the most common failure points when moving from **Expo Go** → **development builds (EAS)**.

## Quick glossary (so errors make sense)

- **Local notification**: Scheduled on-device (works in Expo Go). Example: the “Send Test Notification” button.
- **Remote push notification**: Sent from a server → delivered via FCM/APNs (Android remote push does **not** work in Expo Go on SDK 53+).
- **Expo Push Token**: What your app gets from Expo (`ExponentPushToken[...]`). You use it to send a push via Expo’s push service.
- **FCM (Firebase Cloud Messaging)**: Android’s push transport (Google Play Services required).

---

## Step 0 — Confirm what you’re testing

1. In the app, use the **Settings** screen:
   - If the local test notification shows up in ~2 seconds, your notification UI + permissions are OK.
   - If fetching the Expo push token fails, follow the steps below.
2. Use a **physical Android device** (emulators/simulators won’t generate real push tokens).

---

## Step 1 — Fix: `"projectId": Invalid uuid` (or missing projectId)

Error example:
`Error encountered while fetching Expo token... "projectId": Invalid uuid`

Cause: Expo checks that your `expo.extra.eas.projectId` in `app.json` is a **real EAS project**.

Fix (creates/links a real EAS project and updates `app.json`):

```bash
npx eas-cli init
```

Notes:
- You will be prompted to log in to EAS.
- After init, confirm `app.json` contains:
  - `expo.extra.eas.projectId` (a UUID)
  - correct `expo.owner` (your Expo username)

---

## Step 2 — Fix: Remote push does not work in Expo Go (SDK 53+)

Warning you might see:
> Android Push notifications (remote notifications) functionality provided by expo-notifications was removed from Expo Go with the release of SDK 53. Use a development build instead of Expo Go.

Cause: On Android SDK 53+, **Expo Go can’t receive remote pushes**.

Fix: Build and install a **development build** APK and run the app with the dev client.

Build (cloud):

```bash
npx eas-cli build --profile development --platform android
```

Run the metro server for the dev build:

```bash
npx expo start --dev-client
```

---

## Step 3 — Fix: `Default FirebaseApp is not initialized` (Android dev build)

If token fetch fails with something like “Default FirebaseApp is not initialized”, the APK was built without Firebase’s Android config.

Cause: The EAS build did not embed `google-services.json`.

Fix:

1. In Firebase Console:
   - Create (or open) a Firebase project.
   - Add an **Android app** with **package name** exactly matching `app.json`:
     - This project’s package is `com.unbc.app`.
   - Download `google-services.json`.
2. Put `google-services.json` in the project root (same folder as `app.json`).
3. Update `app.json` to point Expo to the file:

```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.unbc.app"
    }
  }
}
```

4. Rebuild the APK (Step 2). Native configs are baked in at build time.

Security note: `google-services.json` isn’t as sensitive as a service account key, but you still generally don’t want it in public repos.

---

## Step 4 — Fix: Expo can’t deliver pushes (FCM V1 credentials)

Error example (when sending a push):
“Unable to retrieve the FCM server key for the recipient’s app”

Meaning: Your phone got an Expo push token, but Expo’s servers aren’t authorized to talk to your Firebase project to deliver Android pushes.

Fix (FCM V1):

1. Firebase Console → Project settings → **Service accounts**.
2. Generate a **new private key** (downloads a service account JSON file).
3. Expo dashboard (expo.dev) → your project → **Credentials** → **Android**.
4. Under **Push Notifications (FCM V1)**, upload the service account JSON.

Security note: Treat the service account JSON as a secret. Don’t commit it to git.

---

## Quick troubleshooting checklist

- Token is `null` on Settings screen: verify you’re on a physical device and granted notification permission.
- Remote push never arrives: you must be using a dev build (not Expo Go) and have FCM V1 configured in Expo.
- Huawei / no Play Store device: FCM may not work without Google Play Services.
- Network issues (school/public Wi‑Fi): try cellular data or a different network.

---

## Part 5: Testing Push Notifications using Expo Push Tool

Once you have successfully uploaded your FCM V1 Service Account Key, you can finally test delivering a remote push notification!

1. Open your physical phone, launch your app, and go to the **Settings page** (or wherever you placed the push token request button).
2. Press the button to generate the token. 
3. Copy that exact token (it should look something like `ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]`).
4. On your computer, open your web browser and go to the official Expo Push Tool: **[https://expo.dev/notifications](https://expo.dev/notifications)**
5. In the **To (Expo push token)** field, paste your `ExponentPushToken`.
6. Fill out the **Message Title** and **Message Body** with anything you want.
7. Scroll down and click **Send Notification**.
8. You should immediately see the notification pop up on your phone! *(Note: Depending on how your code handles foreground notifications, you may need to minimize your app to the Android home screen to see the system visual pop-up.)*

---

## Part 6: Understanding `eas.json` Configuration

When we ran the build command, Expo generated an `eas.json` file. By default, EAS creates Android "AAB" (Android App Bundle) files which are meant for the Google Play Store, but cannot be easily installed directly to a physical phone for testing.

We explicitly opened `eas.json` and added `"buildType": "apk"` to force Expo to give us an installable APK instead:

```json
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
```
This is a critical detail to remember: if you ever delete `eas.json` or reset it, you must add `buildType: apk` back, otherwise Expo will give you an AAB file that you cannot scan and download via QR code!

---

## Quick Troubleshooting Checklist:
- **Project ID is missing from app.json:** Ensure `npx eas-cli init` ran successfully.
- **Physical device silently failing:** Ensure you rebuild the `.apk` *after* adding `google-services.json`. 
- **No Google Play Services:** Push notifications will always fail silently on pure Huawei devices or emulators without the Play Store, because Firebase requires Google Play Services to generate the token.
- **School WiFi Blocked:** Try turning off WiFi and using Cellular Data. Some public networks block Background Firebase Messaging ports.
