import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../Screens/ProfileScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import LogoutScreen from '../Screens/LogoutScreen';

const Drawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: true,  
        drawerStyle: { width: 250 },
        drawerType: 'front',
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{
          drawerIcon: () => null,
          title: 'Profile',
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
