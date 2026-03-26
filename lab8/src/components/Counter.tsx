import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Counter = (): React.JSX.Element => {
  const [count, setCount] = useState(0);

  const increment = (): void => setCount(prev => prev + 1);
  const decrement = (): void => setCount(prev => prev - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Counter</Text>
      <Text style={styles.value} testID="counter-value">
        {count}
      </Text>
      <View style={styles.buttons}>
        <Button title="Increment" onPress={increment} testID="increment-button" />
        <View style={styles.spacer} />
        <Button title="Decrement" onPress={decrement} testID="decrement-button" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 10,
  },
});

export default Counter;
