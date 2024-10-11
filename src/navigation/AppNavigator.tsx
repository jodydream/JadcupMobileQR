// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';  // 导入主屏幕
import SecondScreen from '../screens/SecondScreen';  // 导入次屏幕

// 定义导航栈参数类型
export type RootStackParamList = {
  MainScreen: undefined;
  SecondScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}  // 隐藏系统导航栏
        />
        <Stack.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{ headerShown: false }}  // 隐藏系统导航栏
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
