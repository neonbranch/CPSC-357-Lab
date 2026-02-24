# Expo Push Notifications Fix Guide (SDK 53+)

This guide covers everything you need to know about fixing Expo Push Notification issues, Firebase native configuration, and common errors when testing on physical Android devices.

---

## Part 1: Initializing Your Expo Project (UUID Error)

If you get:  
`Error encountered while fetching Expo token... "projectId": Invalid uuid`  

This happens because Expo's servers are checking if the UUID in your `app.json` is registered in their cloud database.

**To get a real Expo Project ID**, run:
```bash
npx eas-cli init
```

*(When you run this command, it will prompt you to log in to EAS using your email or username:)*
```text
? Log in to EAS with email or username (exit and run eas login --help to see other login options)
√ Email or username 
password
```
*(Once logged in, it will generate a valid project on Expo's servers and magically insert a real, working `projectId` into your `app.json`.)*

---

## Part 2: Working Around the SDK 53 Expo Go Limitation 

If you see this warning:
> *Android Push notifications (remote notifications) functionality provided by expo-notifications was removed from Expo Go with the release of SDK 53. Use a development build instead of Expo Go.*

Starting with SDK 53, **Expo disabled remote push notifications inside the standard "Expo Go" app** on Android. Testing remote notifications inside the normal Expo Go app will fail. 

You must compile a "Custom Development Build" of your app.

### Building an APK via Cloud Build (No Android Studio required)
To build an APK for your physical Android device, run:
```bash
npx eas-cli build --profile development --platform android
```
*(When you run this for the first time, it will ask to generate an `eas.json` file. Press Enter to say Yes. Next, it will prompt you if you want to generate a new Android Keystore for signing the app. Choose 'Yes' to this as well.)*

Once the build finishes, it gives you a QR code to download and install the custom `.apk` onto your physical phone.

**To run the installed APK on your phone, you must start your local server using:**
```bash
npx expo start --dev-client
```

---

## Part 3: Fixing Physical Device Native Firebase Errors

Because you are no longer using Expo Go, your standalone `.apk` does not have Google's secret Firebase configurations baked into it by default. 

### Error: "Default FirebaseApp is not initialized"
If you build the APK and the token fetch fails with this error, it means the EAS Cloud Build created your APK without a `google-services.json` file.

**How to Fix:**
1. Go to the **Firebase Console** (console.firebase.google.com).
2. Create a Project.
3. Click the **Android icon** to add an Android app.
4. Set the **Android package name** exactly as it is in your `app.json` (e.g., `com.unbc.app`) and click Register App.
5. Download the `google-services.json` file and place it in the root folder of your Expo project.
6. Open your `app.json` and tell Expo to use it:
```json
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.unbc.app",
      ...
    }
```
7. **Rebuild the APK** using the `eas build` command from Part 2. The Expo builder will natively embed the Firebase initialization for you.

---

## Part 4: Fixing Push Delivery Errors (FCM V1)

### Error: "Unable to retrieve the FCM server key for the recipient's app"
If you get this error when you try to actually send a notification, it means the phone successfully got the token, but Expo's servers don't have the legal permission to talk to your Firebase project to deliver the message.

**How to Fix:**
1. Go to your **Firebase Console**.
2. Click the **Gear Icon** (Project settings) in the top left -> **Service accounts** tab.
3. Click **Generate new private key**. This downloads a Service Account JSON file (e.g., `unbc-app-firebase-adminsdk...json`).
4. Go to the **Expo Dashboard** (expo.dev) on the web and log in.
5. Click your project -> **Credentials** (left sidebar) -> **Android**.
6. At the top right, select the build profile you used (e.g., `development`).
7. Scroll down to **Push Notifications (FCM V1)**. 
8. Click **Add FCM V1 Service Account** and upload/drag-and-drop the JSON file you downloaded from Firebase.

Once uploaded, Expo will immediately be able to push notifications through your Firebase instance.

---

## Quick Troubleshooting Checklist:
- **Project ID is missing from app.json:** Ensure `npx eas-cli init` ran successfully.
- **Physical device silently failing:** Ensure you rebuild the `.apk` *after* adding `google-services.json`. 
- **No Google Play Services:** Push notifications will always fail silently on pure Huawei devices or emulators without the Play Store, because Firebase requires Google Play Services to generate the token.
- **School WiFi Blocked:** Try turning off WiFi and using Cellular Data. Some public networks block Background Firebase Messaging ports.
