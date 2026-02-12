import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function CreateAccount() {
    const navigation = useNavigation();
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = () => {
        if (!emailInput || !password) {
            alert('Error', 'Please fill in all fields');
            return;
        }
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alert('Error', 'Please enter a valid email address');
            return;
        }
        // Length validation: min 5, max 20 characters
        if (emailInput.length < 5 || emailInput.length > 20) {
            alert('Error', 'Email must be between 5 and 20 characters');
            return;
        }
        if (password.length < 5 || password.length > 20) {
            alert('Error', 'Password must be between 5 and 20 characters');
            return;
        }
    };

    return (        //Assume: Account creation is successful
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.label}>Create Account</Text>
                <TextInput style={styles.input}
                    placeholder="Username"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={emailInput}
                    onChangeText={setEmailInput}
                />
                <TextInput style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        verticalAlign: 'center',
    },
    label: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
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
        marginBottom: 15,
    },
    copyright: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
        marginTop: 'auto',
        paddingTop: 20,
    },
});