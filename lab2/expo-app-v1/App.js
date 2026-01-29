import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, TextInput, Image } from 'react-native';
import { useState } from 'react';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>This content is safe from device notches!</Text>
        <Image source={require('./assets/icon.png')} style={{ width: 200, height: 200 }} />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: '80%',
            marginTop: 20,
            paddingLeft: 10,
          }}
          placeholder="Enter your name"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});