import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import App from '../App';
import * as greetingService from '../src/services/greeting';

describe('App integration tests', () => {
  it('renders greeting, math result, and counter together', () => {
    const {getByTestId} = render(<App />);

    expect(getByTestId('app-title')).toBeTruthy();
    expect(getByTestId('greeting-text')).toHaveTextContent(
      'Hello, CPSC 357 Class! Welcome to React Native testing.',
    );
    expect(getByTestId('sum-text')).toHaveTextContent('2 + 3 = 5');
    expect(getByTestId('counter-value')).toHaveTextContent('0');
  });

  it('smoke test: renders app without crashing', () => {
    const {getByTestId} = render(<App />);
    expect(getByTestId('app-root')).toBeTruthy();
  });

  it('sanity test: increment works after UI change', () => {
    const {getByTestId} = render(<App />);

    fireEvent.press(getByTestId('increment-button'));
    expect(getByTestId('counter-value')).toHaveTextContent('1');
  });

  it('regression test: increment/decrement behavior remains correct', () => {
    const {getByTestId} = render(<App />);
    const incrementButton = getByTestId('increment-button');
    const decrementButton = getByTestId('decrement-button');
    const value = getByTestId('counter-value');

    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    expect(value).toHaveTextContent('2');

    fireEvent.press(decrementButton);
    expect(value).toHaveTextContent('1');
  });
});

describe('Mocking example (service mock with jest.fn)', () => {
  it('uses mocked greeting service in App', () => {
    const greetingMock = jest
      .spyOn(greetingService, 'getGreeting')
      .mockImplementation(jest.fn(() => 'Mocked greeting for tests'));

    const {getByTestId} = render(<App />);

    expect(greetingMock).toHaveBeenCalledWith('CPSC 357 Class');
    expect(getByTestId('greeting-text')).toHaveTextContent(
      'Mocked greeting for tests',
    );

    greetingMock.mockRestore();
  });
});
