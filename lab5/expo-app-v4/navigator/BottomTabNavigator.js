import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import AddScreen from '../Screens/AddScreen';
import ActivityScreen from '../Screens/ActivityScreen';
import ProfileDrawerNavigator from './ProfileDrawerNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const iconMap = {
    Home: ['home', 'home-outline'],
    Search: ['search', 'search-outline'],
    Add: ['add-circle', 'add-circle-outline'],
    Activity: ['notifications', 'notifications-outline'],
    Profile: ['person', 'person-outline'],
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons name={iconMap[route.name]?.[focused ? 0 : 1] || 'help-outline'} size={size} color={color} />
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileDrawerNavigator} />
    </Tab.Navigator>
  );
}
