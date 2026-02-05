import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginButton from '../components/LoginButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function LoginForm() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = () => {
        if (!email || !password) {
            alert('Email or password cannot be empty');
            return;
        }
        // Length validation: min 5, max 20 characters
        if (email.length < 5 || email.length > 20) {
            alert('Email must be between 5 and 20 characters');
            return;
        }
        if (password.length < 5 || password.length > 20) {
            alert('Password must be between 5 and 20 characters');
            return;
        }
        //Assume: Loging is successfull
        alert('Success', `Welcome, ${email}!`);
        // Navigate to Home with email and loginStatus
        navigation.navigate('Home', { 
            email: email, 
            loginStatus: true 
        });
        // Reset form
        setEmail('');
        setPassword('');
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
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
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