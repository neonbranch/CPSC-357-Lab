import { View, Text, StyleSheet } from "react-native";

export default function Flex() {
    return (
        <View style={styles.container}>
            <View style={[styles.box1, { backgroundColor: "lightblue" }]}>
                <Text>1</Text>
            </View>
            <View style={[styles.box2, { backgroundColor: "red" }]}>
                <Text>2</Text>
            </View>
            <View style={[styles.box3, { backgroundColor: "yellow" }]}>
                <Text>3</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",          // row | column
        justifyContent: "flex-end",   // flex-start | center | flex-end | space-around | space-between
        alignItems: "flex-end",
        borderColor: "red",
        borderWidth: 2,
        margin: 10,
    },
    box1: {
        width: 30,
        height: 30,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    box2: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    box3: {
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
    },
});
