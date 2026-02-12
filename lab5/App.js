import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { EmailProvider } from './contexts/EmailContext';
import { store } from './store/store';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <EmailProvider>
        <RootNavigator />
      </EmailProvider>
    </Provider>
  );
}
