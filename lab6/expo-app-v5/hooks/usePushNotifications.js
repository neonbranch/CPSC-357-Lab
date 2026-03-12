import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { registerForPushNotificationsAsync } from '../utils/pushNotifications';

/**
 * Custom hook for managing push notifications with device-specific behavior
 * Handles both remote and local notifications for iOS and Android
 * @returns {object} { expoPushToken, notificationReceived, notificationTapped }
 */
export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    // Configure notification handler with device-specific behavior
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        const isRemote = notification.request.trigger?.type === 'push';
        
        // Device-specific behavior
        if (Platform.OS === 'ios') {
          // iOS: Show alert, play sound, and set badge for both remote and local
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          };
        } else {
          // Android: Different behavior for remote vs local
          if (isRemote) {
            // Remote notifications: Show alert and play sound
            return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false, // Android doesn't use badges the same way
            };
          } else {
            // Local notifications: Show alert, play sound, and vibrate
            return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            };
          }
        }
      },
    });

    // Register for push notifications and get token
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          setExpoPushToken(token);
          console.log('Push notification token registered:', token);
        }
      })
      .catch((error) => {
        console.error('Failed to register for push notifications:', error);
      });

    // Listener: fires when a notification is received while app is in foreground
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        const isRemote = notification.request.trigger?.type === 'push';
        const notificationType = isRemote ? 'Remote' : 'Local';
        
        console.log(`${notificationType} notification received:`, {
          title: notification.request.content.title,
          body: notification.request.content.body,
          data: notification.request.content.data,
          platform: Platform.OS,
        });

        // Device-specific handling
        if (Platform.OS === 'android' && isRemote) {
          // Android: Additional handling for remote notifications
          console.log('Android remote notification received');
        } else if (Platform.OS === 'ios') {
          // iOS: Additional handling if needed
          console.log('iOS notification received');
        }
      }
    );

    // Listener: fires when user taps on a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const isRemote = response.notification.request.trigger?.type === 'push';
        const notificationType = isRemote ? 'Remote' : 'Local';
        
        console.log(`User tapped ${notificationType} notification:`, {
          title: response.notification.request.content.title,
          body: response.notification.request.content.body,
          data: response.notification.request.content.data,
          platform: Platform.OS,
        });

        // Device-specific navigation or handling can be added here
        if (response.notification.request.content.data?.screen) {
          console.log('Navigate to:', response.notification.request.content.data.screen);
          // Navigation logic can be added here if needed
        }
      }
    );

    // Clean up listeners on unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
  };
}
