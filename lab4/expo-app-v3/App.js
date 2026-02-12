import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { EmailProvider } from './contexts/EmailContext';
import LoginForm from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SearchScreen from './Screens/SearchScreen';
import AddScreen from './Screens/AddScreen';
import ActivityScreen from './Screens/ActivityScreen';
import SettingsScreen from './Screens/SettingsScreen';
import LogoutScreen from './Screens/LogoutScreen';
import CreateAccount from './Screens/CreateAccount';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ProfileDrawerNavigator() {
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

function BottomTabNavigator() {
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

export default function App() {
  return (
    <EmailProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </EmailProvider>
  );
}
