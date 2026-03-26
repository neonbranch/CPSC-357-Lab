import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Counter from './src/components/Counter';
import {add} from './src/utils/math';
import {getGreeting} from './src/services/greeting';

const App = (): React.JSX.Element => {
  const sumExample = add(2, 3);
  const greeting = getGreeting('CPSC 357 Class');

  return (
    <View style={styles.container} testID="app-root">
      <Text style={styles.title} testID="app-title">
        React Native Testing Demo
      </Text>

      <View style={styles.section}>
        <Text testID="greeting-text">{greeting}</Text>
      </View>

      <View style={styles.section}>
        <Text testID="sum-text">2 + 3 = {sumExample}</Text>
      </View>

      <View style={styles.section}>
        <Counter />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
});

export default App;
