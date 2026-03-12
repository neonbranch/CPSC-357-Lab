import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ onPress, title = 'Button', disabled = false }) {
    const handlePress = () => {
        if (!disabled && onPress) {
            onPress();
        }
    };
    
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.buttonDisabled]}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={disabled}
        >
            <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: '#006400',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonTextDisabled: {
        color: '#666666',
    },
});
