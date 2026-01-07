# React Native (Expo) – Complete Environment Setup Guide

This guide provides a full step-by-step installation and setup for developing React Native applications using Expo.

Follow the steps in order.

---

## Step 1: Install Node.js (Required)

Node.js is required to run JavaScript, npm, Expo CLI, and React Native tools.

1. Go to the official Node.js website:
   https://nodejs.org/en
2. Download and install Node.js v24.12.0 (LTS) or the latest available LTS
3. Use default installation settings
4. Restart your terminal after installation

Verify installation:
```
node -v
npm -v
```

---

## Step 2: Update npm OR Install Yarn

### Option A (Recommended): Update npm
```
npm install -g npm@latest
```

Verify:
```
npm -v
```

### Option B (Optional): Install Yarn
```
npm install --global yarn
```

Verify:
```
yarn -v
```

Important: Use either npm or yarn, not both, in the same project.

---

## Step 3: Install Visual Studio Code (Required)

1. Download from:
   https://code.visualstudio.com/
2. Install using default options

Recommended Extensions:
- ESLint
- Prettier
- ES7+ React Snippets (optional)

---

## Step 4: Install Git (Required)

1. Download from:
   https://git-scm.com/install
2. Install using default settings

Verify:
```
git --version
```

---

## Step 5: Install Expo CLI (Required)

Expo CLI is used to create and run React Native apps.

Recommended method (no global install):
```
npx expo --version
```

---

## Step 6: Install Expo Go (Android or iOS)

Expo Go is a sandbox app for quick mobile prototyping. Install it on your device to test your Expo apps.

### For Android:
1. Visit: https://expo.dev/go
2. Click on "Android Install" or scan the QR code
3. Alternatively, search for "Expo Go" in the Google Play Store
4. Install the app on your Android device

### For iOS:
1. Visit: https://expo.dev/go
2. Click on "iOS Install" or scan the QR code
3. Alternatively, search for "Expo Go" in the App Store
4. Install the app on your iOS device

**Note:** Make sure your device and computer are on the same Wi-Fi network when running Expo apps.

---

## Step 7: Install Android Emulator (Optional)

**Note:** This step is optional. You can use Expo Go on a physical device instead. However, having an Android emulator is useful for testing without a physical device.

For detailed installation instructions, refer to: https://reactnative.dev/docs/set-up-your-environment

**Usage:** Once set up, you can use the Android emulator with Expo by pressing `a` when running `npx expo start`.

---

**Next Steps:** See `createing first app.md` for instructions on creating and running your first Expo app.

---

## Optional Accounts

- GitHub account: https://github.com
- Expo account (recommended): https://expo.dev

---

## Final Verification
```
node -v
npm -v
git --version
npx expo --version
```

---

You are ready to create your first Expo app! Proceed to `createing first app.md` for the next steps.
