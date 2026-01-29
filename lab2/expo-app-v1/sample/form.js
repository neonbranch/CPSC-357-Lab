import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function MyForm() {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name" />
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => { console.log('log') }}>
                    {/* <Image
                        source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                        style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
                    /> */}
                    <Ionicons name="log-in-outline" size={28} color="#333" />
                    <Text style={{ color: 'white', textAlign: 'center' }}> Submit</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    card: {
        margin: 20,
        width: 'auto',
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#e41c1c',
        padding: 5,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
    },
}); 