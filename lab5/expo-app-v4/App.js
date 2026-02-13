import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EmailProvider } from './contexts/EmailContext';
import { LanguageProvider } from './contexts/LanguageContext';
import RootStackNavigator from './navigator/RootStackNavigator';

export default function App() {
  return (
    <LanguageProvider>
      <EmailProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </EmailProvider>
    </LanguageProvider>
  );
}
