import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWithMenu}>
          <Header title="Profile" />
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu" size={28} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
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
  headerWithMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  menuButton: {
    padding: 5,
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
