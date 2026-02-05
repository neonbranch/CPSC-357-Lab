import { View, Image, Text, StyleSheet } from "react-native";
import Avatar from "./avatar";

export default function Feed({ item }) {
    return (
        <View style={styles.feedContainer}>
            <Avatar
                avatar={item.avatar} 
                username={item.username}
                name={item.name}
            />
            <Text>{item.avatar}</Text>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <View style={styles.textContainer}>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    postImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 10,
    },
    caption: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
});