import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LoginButton from '../components/LoginButton';
import LanguageSelector from '../components/LanguageSelector';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEmailStore } from '../contexts/EmailContext';
import { getTranslation } from '../utils/translations';

const alert = (title, message) => {
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}: ${message}`);
    }
};

export default function LoginForm() {
    const navigation = useNavigation();
    const { setEmail } = useEmailStore();
    const language = useSelector((state) => state.language.language);
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');

    const t = (key, params = {}) => getTranslation(key, language, params);

    const handleSubmit = () => {
        if (!emailInput || !password) {
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
        alert('Success', t('welcome', { email: emailInput }));
        setEmail(emailInput);
        navigation.navigate('MainTabs');
        setEmailInput('');
        setPassword('');
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.languageContainer}>
                    <LanguageSelector />
                </View>

                <View style={styles.titleContainer}>
                    <Image source={require('../assets/UNBC.jpg')} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>{t('login')}</Text>
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

                <LoginButton onPress={handleSubmit} />

                <Text style={styles.orText}>OR</Text>

                <TouchableOpacity 
                    style={styles.createAccountButton}
                    onPress={() => navigation.navigate('CreateAccount')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.createAccountButtonText}>{t('registration')}</Text>
                </TouchableOpacity>

                <Text style={styles.copyright}>© {new Date().getFullYear()} UNBC. All rights reserved.</Text>
            </SafeAreaView >
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
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#666',
    },
    createAccountButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    createAccountButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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
    copyright: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
        marginTop: 'auto',
        paddingTop: 20,
    },
});