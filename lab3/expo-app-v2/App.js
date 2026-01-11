import 'react-native-gesture-handler';
import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Create User Context to share email across screens
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Import screens
import LoginForm from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfileScreen from './Screens/EditProfileScreen';
import SettingsListScreen from './Screens/SettingsListScreen';
import SettingsDetailScreen from './Screens/SettingsDetailScreen';

// Placeholder screens
function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
    </View>
  );
}

function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Post</Text>
    </View>
  );
}

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

// Profile Stack Navigator (Profile → Edit Profile → Settings List → Setting Detail)
function ProfileStackNavigator() {
  const { email } = useUser();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen}
        initialParams={{ username: email || 'User' }}
        options={({ navigation }) => ({
          title: 'Profile',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('SettingsList')}
            >
              <Ionicons name="settings-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <ProfileStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <ProfileStack.Screen 
        name="SettingsList" 
        component={SettingsListScreen}
        options={{ title: 'Settings' }}
      />
      <ProfileStack.Screen 
        name="SettingDetail" 
        component={SettingsDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.itemTitle || 'Settings Detail',
        })}
      />
    </ProfileStack.Navigator>
  );
}

// Bottom Tab Navigator (Instagram style)
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen 
        name="Profile" 
        options={{ headerShown: false }}
        component={ProfileStackNavigator}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ email: userEmail, setEmail: setUserEmail }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              options={{ headerShown: false }}
            >
              {(props) => <LoginForm {...props} setUserEmail={setUserEmail} />}
            </Stack.Screen>
            <Stack.Screen 
              name="MainApp" 
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
