import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Counter from '../src/components/Counter';

describe('Counter component (unit tests)', () => {
  it('increments and decrements correctly', () => {
    const {getByTestId} = render(<Counter />);

    const value = getByTestId('counter-value');
    const incrementButton = getByTestId('increment-button');
    const decrementButton = getByTestId('decrement-button');

    expect(value).toHaveTextContent('0');

    fireEvent.press(incrementButton);
    expect(value).toHaveTextContent('1');

    fireEvent.press(decrementButton);
    expect(value).toHaveTextContent('0');
  });
});
