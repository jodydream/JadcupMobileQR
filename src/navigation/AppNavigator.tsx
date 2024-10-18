// src/navigation/AppNavigator.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen'; // 导入主屏幕


import TemplateScreen from '../screens/TemplateScreen';
import TestScreen from '../screens/TestScreen';

// 定义导航栈参数类型
export type RootStackParamList = {
  LoginScreen:{isLogout:boolean};
  MainScreen:  { sections: MainSection[], userInfo:any }; //传递的参数名，必须是sections
  TemplateScreen: undefined;
  TestScreen: {title:string|null};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isTestModeEnabled = true; // 控制是否显示 TestScreen

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
