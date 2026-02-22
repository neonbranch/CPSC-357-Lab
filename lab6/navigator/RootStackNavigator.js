import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../Screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CreateAccount from '../Screens/CreateAccount';

const Stack = createNativeStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
