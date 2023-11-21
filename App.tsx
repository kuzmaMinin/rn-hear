import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';

import MainStack from './src/navigation/MainStack';
import { store } from './src/store/store';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycle: node_modules/victory',
]);

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainStack />
      </NativeBaseProvider>
    </Provider>
  );
}
