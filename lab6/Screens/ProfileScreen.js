import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEmailStore } from '../contexts/EmailContext';
import Header from '../components/Header';
import { useCallback } from 'react';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { email } = useEmailStore();

  useFocusEffect(
    useCallback(() => {
      // Ensure drawer is closed when screen is focused
      navigation.closeDrawer();
    }, [navigation])
  );

  // Generate random avatar based on email for consistency
  const avatarUrl = `https://picsum.photos/400/400?random=1`;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    alignItems: 'center',
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
});
