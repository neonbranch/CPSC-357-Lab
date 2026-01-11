import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get username from route params (passed from tab navigator)
  const username = route.params?.username || 'User';

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{username}</Text>
        </View>

        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile', { username })}
        />
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
  },
  profileInfo: {
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
