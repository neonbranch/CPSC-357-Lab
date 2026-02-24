import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LanguageSelector from '../components/LanguageSelector';
import {
    registerForPushNotificationsAsync,
    sendTestNotification,
} from '../utils/pushNotifications';

export default function SettingsScreen() {
    const [language, setLanguage] = useState('en');
    const [pushToken, setPushToken] = useState(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setPushToken(token);
        });
    }, []);

    const handleTestNotification = async () => {
        try {
            await sendTestNotification();
            Alert.alert('Sent!', 'A test notification will appear in ~2 seconds.');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to send test notification.';
            Alert.alert('Error', message);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Settings</Text>

                        <LanguageSelector
                            currentLanguage={language}
                            onLanguageChange={setLanguage}
                            label="Language"
                        />

                        {/* Push Notifications Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Push Notifications</Text>

                            <View style={styles.tokenContainer}>
                                <Text style={styles.tokenLabel}>Your Push Token:</Text>
                                <Text style={styles.tokenValue} selectable>
                                    {pushToken || 'Not available (use a physical device)'}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.testButton}
                                onPress={handleTestNotification}
                            >
                                <Text style={styles.testButtonText}>Send Test Notification</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
    },
    tokenContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
    tokenLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 6,
    },
    tokenValue: {
        fontSize: 13,
        color: '#333',
        fontFamily: 'monospace',
    },
    testButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    testButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
