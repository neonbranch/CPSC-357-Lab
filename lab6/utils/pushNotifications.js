import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

/**
 * Registers the device for push notifications and returns the Expo push token.
 * Must be called on a physical device — simulators/emulators are not supported.
 */
export async function registerForPushNotificationsAsync() {
    // Push notifications only work on physical devices
    if (!Device.isDevice) {
        console.warn('Push notifications require a physical device.');
        return null;
    }

    // Set up the Android notification channel (required for Android 8+)
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    // Check existing permission status
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Request permission if not already granted
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.warn('Permission for push notifications was denied.');
        return null;
    }

    // Get the Expo push token
    try {
        const projectId = Constants.expirationDate
            ? undefined
            : Constants.easConfig?.projectId ?? Constants.expoConfig?.extra?.eas?.projectId;

        const tokenData = await Notifications.getExpoPushTokenAsync({
            projectId,
        });

        console.log('Expo Push Token:', tokenData.data);
        return tokenData.data;
    } catch (error) {
        console.error('Error getting push token:', error);
        return null;
    }
}

/**
 * Schedule a local test notification (fires after 2 seconds).
 * Useful for verifying that the notification pipeline works.
 */
export async function sendTestNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'MyUNBC 📬',
            body: 'This is a test push notification!',
            data: { screen: 'Home' },
        },
        trigger: {
            type: 'timeInterval',
            seconds: 2,
        },
    });
}
