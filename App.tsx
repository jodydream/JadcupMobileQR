// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';
import {LogBox} from 'react-native';

const App = () => {
  // 禁用所有日志和错误提示
  LogBox.ignoreAllLogs(true);

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />

      <Toast />
    </View>
  );
};

export default App;
