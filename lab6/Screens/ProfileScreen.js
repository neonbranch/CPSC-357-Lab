import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../services/userService';
import { formatDate } from '../utils/dateUtils';

export default function ProfileScreen() {
  // Navigation and authentication
  const navigation = useNavigation();
  const { token } = useAuth();

  // State management
  const [profile, setProfile] = useState(null);      // User profile data from API
  const [loading, setLoading] = useState(true);      // Loading state
  const [error, setError] = useState(null);          // Error message if API call fails

  /**
   * Fetch user profile from the API
   * This function is called whenever the screen is focused
   */
  const loadProfile = useCallback(async () => {
    // Check if user is authenticated
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    // Start loading
    setLoading(true);
    setError(null);

    // Call API to get profile data
    const result = await getUserProfile(token);
    
    // Handle API response
    if (result.success) {
      setProfile(result.data);  // Save profile data
    } else {
      setError(result.message); // Show error message
    }
    
    setLoading(false);
  }, [token]);

  /**
   * Reload profile data whenever this screen is focused
   * This ensures fresh data when:
   * - Screen is first opened
   * - User navigates back from ProfileEditScreen
   * - User switches tabs to Profile
   */
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  /**
   * Render the UI based on current state
   */
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Show loading spinner while fetching data */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#006400" />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        )}

        {/* Show error message if API call failed */}
        {!loading && error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Show profile data when loaded successfully */}
        {!loading && !error && profile && (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={true}
          >
            {/* User Avatar */}
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: profile?.avatar || `https://picsum.photos/400/400?random=1` }}
                style={styles.avatar}
              />
            </View>

            {/* Profile Information */}
            <View style={styles.profileInfo}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{profile?.name || 'N/A'}</Text>
              
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{profile?.email || 'N/A'}</Text>
              
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{profile?.phone || 'N/A'}</Text>
              
              <Text style={styles.label}>Member Since:</Text>
              <Text style={styles.value}>{formatDate(profile?.createdAt)}</Text>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('ProfileEdit')}
            >
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              <Text style={styles.changePasswordButtonText}>Change Password</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  avatarContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#006400',
  },
  profileInfo: {
    width: '100%',
    marginBottom: 30,
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
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006400',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  changePasswordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
