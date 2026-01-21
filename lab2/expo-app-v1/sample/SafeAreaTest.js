import { StyleSheet, TextInput } from "react-native";


export default function SafeAreaTest({ backgroundColor, padding = 100, testFunc }) {
    return (
        <>
            <TextInput placeholder='this is a textbox' style={[styles.input, { backgroundColor: backgroundColor, padding: padding }]}
                onFocus={testFunc} >
            </TextInput>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 120,
        height: 50,
        borderColor: 'gray',
        backgroundColor: 'red',
        borderRadius: 50,
        paddingLeft: 50,
    }
}); 