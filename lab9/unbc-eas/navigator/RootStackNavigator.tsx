import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import ProfileScreen from '../Screens/ProfileScreen';
import HomeScreen from '../Screens/HomeScreen';
import NoteDetailsScreen from '../Screens/NoteDetailsScreen';
import CreateNoteScreen from '../Screens/CreateNoteScreen';
import EditNoteScreen from '../Screens/EditNoteScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import { profileService } from '../service/profileService';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Profile');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const profile = await profileService.getProfile();
    setInitialRoute(profile ? 'Home' : 'Profile');
    setIsLoading(false);
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
      <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
