import { View, Text } from 'react-native';

// Child component receiving props
export default function Greeting({ name, age, nationality = 'unknown' }) {
    return (
        <View>
            <Text>Hello, {name}!</Text>
            <Text>You are {age} years old.</Text>
            <Text>Your nationality is {nationality}.</Text>
        </View>
    );
}

