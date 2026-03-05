# Task 2: Test Remote Push Notifications on Android Device

## Prerequisites

- Android physical device (not emulator)
- `unbc-app.apk` file
- Expo account (free)
- Internet connection

---

## Steps

### 1. Download APK from Module

- Download `unbc-app.apk` from the course module
- Save it to your Android device (Downloads folder)

### 2. Install APK

1. Enable **"Install Unknown Apps"** in Android Settings → Security
2. Open **Files** app → **Downloads**
3. Tap `unbc-app.apk` → **Install**
4. Grant notification permissions when prompted

### 3. Get Push Token

1. Open the `unbc-app` on your device
2. Go to **Settings** screen
3. Scroll to **"Push Notifications"** section
4. Copy the token (starts with `ExponentPushToken[...]`)

### 4. Test Push Notification

1. Open [https://expo.dev/notifications](https://expo.dev/notifications) in browser
2. Paste your token in **"Recipient"** field
3. Enter **Message title** and **Message body**
4. Click **"Send a Notification"**
5. Check your Android device - notification should appear

---

## Expected Results

✅ **Success**: Notification appears in notification tray  
❌ **No token**: Use physical device, grant permissions  
❌ **No notification**: Check token format, internet connection, permissions

---

## Troubleshooting

- **Token shows "Not available"**: Use physical device (not emulator), grant permissions
- **Notification not received**: Verify token copied correctly, check internet, try again
- **"Invalid token" error**: Copy entire token including `ExponentPushToken[` and `]`

---

**That's it!** 🚀
