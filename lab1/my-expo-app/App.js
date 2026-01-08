import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to my Expo app!</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Type your text here:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text here"
          value={inputText}
          onChangeText={setInputText}
        />
      </View>
      <Text style={styles.displayText}>
        You typed: {inputText || '(nothing yet)'}
      </Text>
      <Button
        title="Click me"
        onPress={() => alert('Button pressed!')}
        style={styles.button} 
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent:'flex-end',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    minWidth: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  displayText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  button: {
    width: '100%',
    marginTop: 1000,
  },
});
