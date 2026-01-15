# Creating Your First Expo App

This guide provides a complete step-by-step setup and walkthrough for creating and running your first Expo React Native application.

Follow the steps in order.

---

# Part 1: Environment Setup

## Step 1: Install Visual Studio Code (Required)

Visual Studio Code is the recommended IDE for React Native development.

1. Download from:
   https://code.visualstudio.com/
2. Install using default options

### Recommended Extensions:
- ESLint
- Prettier
- ES7+ React Snippets (optional)

---

## Step 2: Install Node.js (Required)

Node.js is required to run JavaScript, npm, and React Native tools. It also enables you to use Expo commands via `npx`.

1. Go to the official Node.js website:
   https://nodejs.org/en
2. Download and install Node.js v24.12.0 (LTS) or the latest available LTS
3. Use default installation settings
4. Restart your terminal after installation

### Verify installation:
```
node -v
npm -v
```

---

## Step 3: Update npm OR Install Yarn

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

**Important:** Use either npm or yarn, not both, in the same project.

---

## Step 4: Verify Expo Tools (No Installation Required)

**Expo CLI is NOT mandatory!** Modern Expo uses `npx` commands that automatically download and use the latest Expo tools when needed.

You can use Expo commands directly with `npx`:
- `npx create-expo-app` - Create new apps
- `npx expo start` - Run your app
- `npx expo --version` - Check Expo version

### Verify Expo is accessible:
```
npx expo --version
```

This command will automatically download and run Expo CLI if needed. No global installation required!

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

## Final Verification

Run these commands to verify all installations:

```
node -v
npm -v
npx expo --version
```

If all commands return version numbers, you are ready to create your first Expo app!

---

# Part 2: Creating Your First Expo App

Now that your environment is set up, let's create and run your first Expo app.

---

## Step 1: Create a New Expo App

Open your terminal and run:

```
npx create-expo-app@latest my-expo-app --template blank
cd my-expo-app
```

This creates a new Expo app in a folder called `my-expo-app` with a blank template.

---

## Step 2: Run the Expo App

Navigate to your app directory (if not already there) and start the Expo development server:

```
cd my-expo-app
npx expo start
```

This will start the Metro bundler and display a QR code in your terminal.

---

## Step 3: Run App on Device

Choose one of the following options:

- **Phone (Physical Device):** Open Expo Go app and scan the QR code displayed in your terminal
- **Android Emulator:** Press `a` in the terminal
- **iOS Simulator (macOS only):** Press `i` in the terminal

Your app should now be running on your chosen device!

---

## Step 4: Test Hot Reload

1. Open `App.js` in Visual Studio Code
2. Make a change (e.g., modify the text)
3. Save the file
4. Watch your app update automatically on your device (hot reload)

This demonstrates Expo's live reloading feature, which updates your app instantly when you save changes.

---

## Step 5: Stop the App

To stop the development server, press `Ctrl + C` in your terminal.

---

## Congratulations! 🎉

You've successfully:
- Set up your development environment
- Created your first Expo app
- Run it on a device or emulator
- Tested hot reload

You're now ready to start building React Native applications with Expo!

---

## Next Steps

- Explore the `App.js` file and modify it
- Learn about React Native components
- Check out the Expo documentation: https://docs.expo.dev
- Review React Native documentation: https://reactnative.dev
