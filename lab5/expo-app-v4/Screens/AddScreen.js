import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Camera from '../components/camera';

export default function AddScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Header title="Add Post" />
                <View style={styles.content}>
                    <Camera />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
});
