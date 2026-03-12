import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import {
    registerForPushNotificationsAsync,
    sendTestNotification,
} from '../utils/pushNotifications';

export default function SettingsScreen() {
    const { language, setLanguage } = useLanguage();
    const [pushToken, setPushToken] = useState(null);
    const [isRemotePushSupported, setIsRemotePushSupported] = useState(false);

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setPushToken(token);
        });

        // Check Android-specific remote push support
        checkRemotePushSupport();
    }, []);

    const checkRemotePushSupport = () => {
        if (Platform.OS === 'android') {
            // Android: Remote push requires physical device and proper setup
            // In Expo Go (SDK 53+), remote push doesn't work
            // In development builds, remote push works
            const isPhysicalDevice = Device.isDevice;
            const isExpoGo = !Device.isDevice || __DEV__;
            
            // Remote push is supported on Android if:
            // 1. It's a physical device
            // 2. It's not running in Expo Go (development builds only)
            setIsRemotePushSupported(isPhysicalDevice && !isExpoGo);
        } else {
            // iOS: Remote push works on physical devices
            setIsRemotePushSupported(Device.isDevice);
        }
    };

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

                            {/* Device and Platform Info */}
                            <View style={styles.infoContainer}>
                                <Text style={styles.infoText}>
                                    Platform: {Platform.OS === 'ios' ? 'iOS' : 'Android'}
                                </Text>
                                <Text style={styles.infoText}>
                                    Device: {Device.isDevice ? 'Physical Device' : 'Simulator/Emulator'}
                                </Text>
                                {Platform.OS === 'android' && (
                                    <View style={styles.androidWarning}>
                                        <Text style={styles.warningText}>
                                            ⚠️ Android Remote Push: {isRemotePushSupported 
                                                ? 'Supported (Development Build)' 
                                                : 'Not Supported (Use Development Build, not Expo Go)'}
                                        </Text>
                                    </View>
                                )}
                            </View>

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
                                <Text style={styles.testButtonText}>Send Test Notification (Local)</Text>
                            </TouchableOpacity>

                            {Platform.OS === 'android' && !isRemotePushSupported && (
                                <View style={styles.androidInfo}>
                                    <Text style={styles.androidInfoText}>
                                        Note: Remote push notifications on Android require a development build. 
                                        Local notifications work in Expo Go.
                                    </Text>
                                </View>
                            )}
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
    infoContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    androidWarning: {
        backgroundColor: '#fff3cd',
        borderRadius: 6,
        padding: 10,
        marginTop: 8,
    },
    warningText: {
        fontSize: 13,
        color: '#856404',
        fontWeight: '500',
    },
    androidInfo: {
        marginTop: 15,
        padding: 12,
        backgroundColor: '#e7f3ff',
        borderRadius: 8,
    },
    androidInfoText: {
        fontSize: 12,
        color: '#004085',
        lineHeight: 18,
    },
});
