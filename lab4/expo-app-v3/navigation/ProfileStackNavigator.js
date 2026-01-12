import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../Screens/ProfileScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';
import SettingsListScreen from '../Screens/SettingsListScreen';
import SettingsDetailScreen from '../Screens/SettingsDetailScreen';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ username: 'User' }}
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
