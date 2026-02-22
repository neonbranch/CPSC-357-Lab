import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { EmailProvider } from './contexts/EmailContext';
import RootStackNavigator from './navigator/RootStackNavigator';
import { registerForPushNotificationsAsync } from './utils/pushNotifications';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Register for push notifications and store the token
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    // Listener: fires when a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification);
      });

    // Listener: fires when the user taps on a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification tapped:', response);
      });

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

  return (
    <EmailProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </EmailProvider>
  );
}
