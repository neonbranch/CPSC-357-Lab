import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import AllFeeds from '../components/feeds';
import Stories from '../components/Stories';
import feedData from '../data/feed.json';

export default function HomeScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Header title="Insta App" />
                <Stories data={feedData} />
                <AllFeeds feedData={feedData} />
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
});