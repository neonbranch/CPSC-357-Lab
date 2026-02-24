# Expo Remote Push Notifications — Tutorial

## Overview

This project uses **Expo Notifications** to support remote push notifications on iOS and Android. The setup handles:

- Permission requests
- Expo Push Token registration
- Foreground & background notification handling
- A test notification button in Settings

---

## Prerequisites

1. **Physical device** — push tokens don't work on simulators/emulators
2. **Expo Go** app or a [development build](https://docs.expo.dev/develop/development-builds/introduction/)
3. Install dependencies:

```bash
npm install
npx expo install expo-notifications expo-device expo-constants
```

---

## File Structure

```
lab6/
├── utils/
│   └── pushNotifications.js   ← Registration & notification helpers
├── App.js                     ← Notification listeners (entry point)
├── Screens/
│   └── SettingsScreen.js      ← Push token display + test button
└── app.json                   ← Expo notifications plugin config
```

---

## How It Works

### 1. `utils/pushNotifications.js`

| Export | Purpose |
|--------|---------|
| `registerForPushNotificationsAsync()` | Requests permissions, creates Android notification channel, returns Expo push token |
| `sendTestNotification()` | Schedules a local notification after 2 seconds (for dev testing) |

Also sets the **notification handler** at module level so foreground notifications display as alerts with sound and badge.

### 2. `App.js`

On mount (`useEffect`):
- Calls `registerForPushNotificationsAsync()` and stores the token
- Registers a **foreground listener** — logs notifications received while app is open
- Registers a **response listener** — logs when user taps a notification
- Cleans up all listeners on unmount

### 3. `Screens/SettingsScreen.js`

- Displays the device's **Expo Push Token** (selectable for copy/paste)
- **"Send Test Notification"** button fires a local notification to verify the pipeline

### 4. `app.json`

- `plugins` — configures `expo-notifications` with a notification icon and color
- `ios.bundleIdentifier` — required for iOS push notifications
- `android.package` — required for Android push notifications

---

## Testing Push Notifications

### Local Test (Quick Verify)

1. Run `npx expo start`
2. Open on a physical device
3. Grant notification permissions
4. Go to **Settings** → tap **"Send Test Notification"**
5. A notification should appear in ~2 seconds ✅

### Remote Test (End-to-End)

1. Copy your push token from the **Settings** screen
   - Format: `ExponentPushToken[xxxxxxxxxxxxxx]`
2. Go to [expo.dev/notifications](https://expo.dev/notifications)
3. Paste your token, write a title/body, and send
4. The notification arrives on your device ✅

### Sending from a Backend

```bash
curl -X POST https://exp.host/--/api/v2/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "ExponentPushToken[your-token-here]",
    "title": "Hello!",
    "body": "This is a remote push notification."
  }'
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Must use physical device" | Push tokens only work on real devices, not simulators |
| No notification appears | Check that permissions are granted in device Settings |
| Token is `null` | Ensure `expo-device`, `expo-notifications`, `expo-constants` are installed |
| Android notifications silent | The default channel is set to MAX importance — check device Do Not Disturb mode |

---

## References

- [Expo Notifications Docs](https://docs.expo.dev/push-notifications/overview/)
- [Expo Push Tool](https://expo.dev/notifications)
- [Expo Push API](https://docs.expo.dev/push-notifications/sending-notifications/)
