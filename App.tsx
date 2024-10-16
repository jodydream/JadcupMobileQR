// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
// import {LogBox} from 'react-native';

const App = () => {
  // 禁用所有日志和错误提示
  // LogBox.ignoreAllLogs(true);

  return (
      <AppNavigator />
  );
};

export default App;
