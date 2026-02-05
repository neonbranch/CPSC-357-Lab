import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function SettingsScreen() {
    const navigation = useNavigation();
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerWithMenu}>
                    <Header title="Settings" />
                    <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Ionicons name="menu" size={28} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>Settings Screen</Text>
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
    headerWithMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
    },
    menuButton: {
        padding: 5,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: '#666',
    },
});
