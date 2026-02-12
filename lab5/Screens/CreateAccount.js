import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LanguageSelector from '../components/LanguageSelector';
import { useEmailStore } from '../contexts/EmailContext';
import { getTranslation } from '../utils/translations';

const alert = (title, message) => {
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}: ${message}`);
    }
};

export default function CreateAccount() {
    const navigation = useNavigation();
    const { setEmail } = useEmailStore();
    const language = useSelector((state) => state.language.language);
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const t = (key, params = {}) => getTranslation(key, language, params);

    const handleCreateAccount = () => {
        if (!emailInput || !password || !confirmPassword || !mobileNumber) {
            alert('Error', 'Please fill in all fields');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alert('Error', 'Please enter a valid email address');
            return;
        }
        if (emailInput.length < 5 || emailInput.length > 20) {
            alert('Error', 'Email must be between 5 and 20 characters');
            return;
        }
        if (password.length < 5 || password.length > 20) {
            alert('Error', 'Password must be between 5 and 20 characters');
            return;
        }
        if (password !== confirmPassword) {
            alert('Error', 'Passwords do not match');
            return;
        }
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobileNumber.replace(/[\s-]/g, ''))) {
            alert('Error', 'Please enter a valid 10-digit mobile number');
            return;
        }
        // Account created successfully - auto-login user
        alert('Success', t('welcome', { email: emailInput }));
        setEmail(emailInput);
        navigation.navigate('MainTabs');
        // Reset form
        setEmailInput('');
        setPassword('');
        setConfirmPassword('');
        setMobileNumber('');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.languageContainer}>
                    <LanguageSelector />
                </View>

                <View style={styles.titleContainer}>
                    <Image source={require('../assets/UNBC.jpg')} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>{t('registration')}</Text>
                </View>

                <Text style={styles.label}>{t('email')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailInput}
                    onChangeText={setEmailInput}
                />

                <Text style={styles.label}>{t('password')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={styles.label}>{t('confirmPassword')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <Text style={styles.label}>{t('mobileNumber')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your mobile number"
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                />

                <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={handleCreateAccount}
                    activeOpacity={0.7}
                >
                    <Text style={styles.registerButtonText}>{t('registration')}</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>OR</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>{t('login')}</Text>
                </TouchableOpacity>

                <Text style={styles.copyright}>© {new Date().getFullYear()} UNBC. All rights reserved.</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    languageContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 1000,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 50,
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
        marginBottom: 15,
    },
    registerButton: {
        marginTop: 20,
        backgroundColor: '#006400',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#666',
    },
    linkText: {
        textAlign: 'center',
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    copyright: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
        marginTop: 'auto',
        paddingTop: 20,
    },
});