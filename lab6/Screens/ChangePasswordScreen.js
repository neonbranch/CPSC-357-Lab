import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

const alert = (title, message) => {
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}: ${message}`);
    }
};

export default function ChangePasswordScreen() {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const validateField = (fieldName, value) => {
        let error = '';
        
        switch (fieldName) {
            case 'oldPassword':
                if (!value) {
                    error = 'Current password is required';
                }
                break;
            case 'newPassword':
                if (!value) {
                    error = 'New password is required';
                } else if (value.length < 5 || value.length > 20) {
                    error = 'Password must be between 5 and 20 characters';
                } else if (value === oldPassword) {
                    error = 'New password must be different from current password';
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    error = 'Please confirm your new password';
                } else if (value !== newPassword) {
                    error = 'Passwords do not match';
                }
                break;
        }
        
        setErrors(prev => ({ ...prev, [fieldName]: error }));
        return !error;
    };

    const handleChangePassword = () => {
        // Clear previous errors
        setErrors({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });

        // Validate all fields
        const isOldPasswordValid = validateField('oldPassword', oldPassword);
        const isNewPasswordValid = validateField('newPassword', newPassword);
        const isConfirmPasswordValid = validateField('confirmPassword', confirmPassword);

        if (!isOldPasswordValid || !isNewPasswordValid || !isConfirmPasswordValid) {
            return;
        }

        // TODO: Call API to change password
        alert('Success', 'Password changed successfully!');
        navigation.goBack();
    };

    const handleOldPasswordChange = (value) => {
        setOldPassword(value);
        if (errors.oldPassword) {
            validateField('oldPassword', value);
        }
    };

    const handleNewPasswordChange = (value) => {
        setNewPassword(value);
        if (errors.newPassword) {
            validateField('newPassword', value);
        }
        // Re-validate confirm password if it has a value
        if (confirmPassword && errors.confirmPassword) {
            validateField('confirmPassword', confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        if (errors.confirmPassword) {
            validateField('confirmPassword', value);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                   
                    <Text style={styles.subtitle}>
                        Enter your current password and choose a new one
                    </Text>

                    <Text style={styles.label}>Current Password</Text>
                    <TextInput
                        style={[styles.input, errors.oldPassword && styles.inputError]}
                        placeholder="Enter your current password"
                        value={oldPassword}
                        onChangeText={handleOldPasswordChange}
                        onBlur={() => validateField('oldPassword', oldPassword)}
                        secureTextEntry={true}
                    />
                    {errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword}</Text>}

                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        style={[styles.input, errors.newPassword && styles.inputError]}
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChangeText={handleNewPasswordChange}
                        onBlur={() => validateField('newPassword', newPassword)}
                        secureTextEntry={true}
                    />
                    {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

                    <Text style={styles.label}>Confirm New Password</Text>
                    <TextInput
                        style={[styles.input, errors.confirmPassword && styles.inputError]}
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        onBlur={() => validateField('confirmPassword', confirmPassword)}
                        secureTextEntry={true}
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                    <View style={styles.passwordHint}>
                        <Text style={styles.hintText}>
                            Password must be between 5 and 20 characters
                        </Text>
                    </View>

                    <CustomButton 
                        onPress={handleChangePassword} 
                        title="Change Password" 
                    />

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
        color: '#333',
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
    inputError: {
        borderColor: '#ff4444',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
        marginBottom: 8,
    },
    passwordHint: {
        backgroundColor: '#e7f3ff',
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
        marginBottom: 20,
    },
    hintText: {
        fontSize: 12,
        color: '#004085',
        lineHeight: 18,
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
});
