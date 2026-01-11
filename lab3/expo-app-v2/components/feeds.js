import { useState } from "react";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import Feed from "./feed";

export default function AllFeeds({ feedData }) {
    const [isScrolling, setIsScrolling] = useState(false);

    return (
        <View style={styles.container}>
            {isScrolling && (
                <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#007AFF" />
                </View>
            )}
            <FlatList
                data={feedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Feed item={item} />}
                showsVerticalScrollIndicator={true}
                onScrollBeginDrag={() => setIsScrolling(true)}
                onScrollEndDrag={() => setIsScrolling(false)}
                onMomentumScrollEnd={() => setIsScrolling(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        position: 'absolute',
        top: 10,
        alignSelf: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 8,
        borderRadius: 20,
    },
});

