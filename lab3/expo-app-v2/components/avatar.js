import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Avatar({ avatar, username, name }) {
    return (
        <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
                <Text style={styles.username}>{username}</Text>
                {name && <Text style={styles.name}>{name}</Text>}
            </View>
            <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="#000"
                    onPress={() => {
                        alert('Menu pressed');
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 14,
        color: '#666',
    },
    menuButton: {
        padding: 5,
    },
});

