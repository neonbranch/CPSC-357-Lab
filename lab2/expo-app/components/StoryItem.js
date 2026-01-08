import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function StoryItem({ avatar, username, onPress }) {
    return (
        <TouchableOpacity style={styles.storyItem} onPress={onPress}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
            <Text style={styles.username} numberOfLines={1}>
                {username}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    storyItem: {
        alignItems: 'center',
        marginRight: 15,
        width: 80,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#ff6b6b',
        padding: 2,
        marginBottom: 5,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 32,
    },
    username: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
});

