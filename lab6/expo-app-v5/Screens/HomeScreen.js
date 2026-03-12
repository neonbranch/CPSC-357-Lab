import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import AllFeeds from '../components/feeds';
import Stories from '../components/Stories';
import { getFeeds } from '../services/feedService';

export default function HomeScreen() {
    const [feedData, setFeedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadFeeds();
    }, []);

    const loadFeeds = async () => {
        setLoading(true);
        setError(null);
        const result = await getFeeds();
        
        if (result.success) {
            setFeedData(result.data);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Header title="MyUNBC" />
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#006400" />
                        <Text style={styles.loadingText}>Loading feeds...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : (
                    <>
                        <Stories data={feedData} />
                        <AllFeeds feedData={feedData} />
                    </>
                )}
                <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#ff4444',
        fontSize: 16,
        textAlign: 'center',
    },
});