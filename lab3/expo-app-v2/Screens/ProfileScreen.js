import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get email from route params
  const email = route.params?.email || 'User';

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

       <Button title="Logout" onPress={() => navigation.navigate('Login')} />
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
