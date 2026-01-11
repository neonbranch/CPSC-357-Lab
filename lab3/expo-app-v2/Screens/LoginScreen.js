import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginButton from '../components/LoginButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function LoginForm({ setUserEmail }) {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleSubmit = () => {
        if (!formData.email || !formData.password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (!formData.email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }
        Alert.alert('Success', `Welcome, ${formData.email}!`);
        // Set email in context
        if (setUserEmail) {
            setUserEmail(formData.email);
        }
        navigation.navigate('MainApp');
        // Reset form
        setFormData({ email: '', password: '' });
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                />

                <LoginButton onPress={handleSubmit} />
            </SafeAreaView >
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    }, label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
});