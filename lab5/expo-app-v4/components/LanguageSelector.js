import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LanguageSelector({ currentLanguage, onLanguageChange, label = 'Language' }) {
    return (
        <View style={styles.languageContainer}>
            <View style={styles.radioGroup}>
                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => onLanguageChange('en')}
                >
                    <View style={styles.radioCircle}>
                        {currentLanguage === 'en' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => onLanguageChange('es')}
                >
                    <View style={styles.radioCircle}>
                        {currentLanguage === 'es' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>Spanish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    languageContainer: {
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
    },
    languageLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#006400',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#006400',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
});
