import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEmailStore } from '../contexts/EmailContext';
import Header from '../components/Header';

const alert = (title, message) => {
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}: ${message}`);
    }
};

export default function LogoutScreen() {
    const navigation = useNavigation();
    const { setEmail, email } = useEmailStore();

    const handleLogout = () => {
        setEmail('');
        alert('Success', 'Logged out successfully');
        navigation.navigate('Login');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>Are you sure you want to logout?</Text>
                    <Text style={styles.email}>Logged in as: {email}</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
