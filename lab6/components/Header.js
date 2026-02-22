import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEmailStore } from '../contexts/EmailContext';

export default function Header({ title = 'Insta App' }) {
    const navigation = useNavigation();
    const { email } = useEmailStore();

    return (
        <View style={styles.header}>
            <Image source={require('../assets/UNBC.jpg')} style={styles.unbcIcon} resizeMode="contain" />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    unbcIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
    },
});

