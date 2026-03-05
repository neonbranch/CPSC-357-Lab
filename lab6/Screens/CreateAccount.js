import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { registerUser } from '../services/authService';

const alert = (title, message) => {
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}: ${message}`);
    }
};

export default function CreateAccount() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmailInput] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateAccount = async () => {
        // Validate all fields are filled
        if (!name || !email || !phone || !password || !confirmPassword) {
            alert('Error', 'Please fill in all fields');
            return;
        }

        // Validate name
        if (name.trim().length < 2) {
            alert('Error', 'Name must be at least 2 characters');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Error', 'Please enter a valid email address');
            return;
        }
        if (email.length < 5 || email.length > 50) {
            alert('Error', 'Email must be between 5 and 50 characters');
            return;
        }

        // Phone validation (basic - allows digits, spaces, dashes, parentheses)
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        const phoneDigits = phone.replace(/\D/g, '');
        if (!phoneRegex.test(phone) || phoneDigits.length < 10) {
            alert('Error', 'Please enter a valid phone number (at least 10 digits)');
            return;
        }

        // Password validation
        if (password.length < 5 || password.length > 20) {
            alert('Error', 'Password must be between 5 and 20 characters');
            return;
        }

        // Confirm password match
        if (password !== confirmPassword) {
            alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        const result = await registerUser(email, password, name, phone);
        
        if (result.success) {
            alert('Success', `Account created successfully for ${name}!`);
            // Navigate back to Login screen
            navigation.goBack();
            // Reset form
            setName('');
            setEmailInput('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
        } else {
            alert('Error', result.message);
        }
        setLoading(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleContainer}>
                        <Image source={require('../assets/UNBC.jpg')} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.title}>Create Account</Text>
                    </View>

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        keyboardType="default"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmailInput}
                    />

                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <CustomButton 
                        onPress={handleCreateAccount} 
                        title={loading ? 'Creating Account...' : 'Create Account'}
                        disabled={loading}
                    />
                    {loading && (
                        <ActivityIndicator size="small" color="#006400" style={{ marginTop: 10 }} />
                    )}

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Back to Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.copyright}>© {new Date().getFullYear()} UNBC. All rights reserved.</Text>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    label: {
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
        marginBottom: 5,
    },
    backButton: {
        marginTop: 15,
        padding: 15,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#006400',
        fontSize: 16,
        fontWeight: '600',
    },
    copyright: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
        marginTop: 30,
    },
});