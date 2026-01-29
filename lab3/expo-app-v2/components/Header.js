import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title = 'Insta App', email }) {
    const navigation = useNavigation();
    
    const handleProfilePress = () => {
        navigation.navigate('Profile', { email: email });
    };

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {email && (
                <TouchableOpacity 
                    style={styles.profileButton}
                    onPress={handleProfilePress}
                >
                    <Ionicons name="person-circle-outline" size={28} color="#000" />
                </TouchableOpacity>
            )}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileButton: {
        marginLeft: 'auto',
    },
});

