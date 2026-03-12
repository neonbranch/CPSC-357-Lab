import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import RootStackNavigator from './navigator/RootStackNavigator';
import usePushNotifications from './hooks/usePushNotifications';

export default function App() {
  // Initialize push notifications with device-specific behavior
  usePushNotifications();

  return (
    <LanguageProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
  );
}
