import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import AllFeeds from '../components/feeds';
import Stories from '../components/Stories';
import feedData from '../data/feed.json';

export default function HomeScreen() {
    const route = useRoute();
    const email = route.params?.email || '';

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Header title="Insta App" email={email} />
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