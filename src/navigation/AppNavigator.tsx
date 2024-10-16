// src/navigation/AppNavigator.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

import MainScreen from '../screens/MainScreen'; // 导入主屏幕
import SecondScreen from '../screens/SecondScreen'; // 导入次屏幕
import TemplateScreen from '../screens/TemplateScreen';
import TestScreen from '../screens/TestScreen';


// 定义导航栈参数类型
export type RootStackParamList = {
  //Record<string, any> | undefined
  LoginScreen:Record<string, any> | undefined;
  TemplateScreen:undefined;
  MainScreen: undefined;
  SecondScreen: undefined;
  TestScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isTestModeEnabled = true;  // 控制是否显示 TestScreen

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}} // 隐藏系统导航栏
        />
      <Stack.Screen
          name="TemplateScreen"
          component={TemplateScreen}
          options={{headerShown: false}} // 隐藏系统导航栏
        />

        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}} // 隐藏系统导航栏
        />

        <Stack.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{headerShown: false}} // 隐藏系统导航栏
        />

        {isTestModeEnabled && (
          <Stack.Screen
            name="TestScreen"
            component={TestScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
