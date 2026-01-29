import { View, FlatList, StyleSheet } from "react-native";
import StoryItem from "./StoryItem";

export default function Stories({ data }) {


    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <StoryItem
                        avatar={item.avatar}
                        username={item.username}
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    listContent: {
        paddingHorizontal: 10,
    },
});


