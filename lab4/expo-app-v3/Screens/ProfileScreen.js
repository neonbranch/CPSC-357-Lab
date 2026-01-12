import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import TouchableButton from '../components/TouchableButton';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get all values from AuthContext
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  const username = user?.name || 'User';

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Display all user data from context */}
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{user?.name || username}</Text>
          </View>

          {user?.email && (
            <View style={styles.profileInfo}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          )}

          {user?.id && (
            <View style={styles.profileInfo}>
              <Text style={styles.label}>User ID:</Text>
              <Text style={styles.value}>{user.id}</Text>
            </View>
          )}

          {/* Display authentication status from context */}
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>
              {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableButton
              text="Edit Profile"
              color="#007AFF"
              onPress={() => navigation.navigate('EditProfile', {
                username: user?.name || username,
                email: user?.email || ''
              })}
            />
          </View>

          {isAuthenticated && (
            <View style={styles.buttonContainer}>
              <TouchableButton
                text="Logout"
                color="#ff3b30"
                onPress={handleLogout}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
