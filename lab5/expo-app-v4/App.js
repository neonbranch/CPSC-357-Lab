import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EmailProvider } from './contexts/EmailContext';
import RootStackNavigator from './navigator/RootStackNavigator';

export default function App() {
  return (
    <EmailProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </EmailProvider>
  );
}
