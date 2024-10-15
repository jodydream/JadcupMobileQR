// App.tsx

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import theme from './src/styles/theme/theme'; // 引入自定义主题
// import {LogBox} from 'react-native';

const App = () => {
  // 禁用所有日志和错误提示
  // LogBox.ignoreAllLogs(true);

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
