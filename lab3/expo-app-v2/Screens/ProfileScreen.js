import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../components/avatar';

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
            <Avatar
              avatar="https://picsum.photos/400/400?random=1"
              username="nature_lover"
              name={email}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
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
    color: '#666',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
});
