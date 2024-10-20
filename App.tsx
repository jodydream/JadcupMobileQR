// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {LogBox} from 'react-native';

const App = () => {
  // 禁用所有日志和错误提示
  // LogBox.ignoreAllLogs(true);
  // const hideToastOnTouch = () => {
  //   // 当页面被触摸时隐藏Toast
  //   Toast.hide();
  //   // 也可以隐藏键盘
  //   Keyboard.dismiss();
  //   console.log('xxxxx');
  // };

  return (
    // <TouchableWithoutFeedback onPress={hideToastOnTouch} >
    //   <View style={{flex: 1,pointerEvents: 'box-none' }}>
    //     <AppNavigator />
    //     <Toast />
    //   </View>
    // </TouchableWithoutFeedback>
    <View style={{flex: 1}}>
      <AppNavigator />
      <Toast />
    </View>
  );
};

export default App;
