// src/screens/MainScreen.tsx

import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from '../styles/MainScreen.styles'; // 导入样式
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型

type Props = StackScreenProps<RootStackParamList, 'MainTestScreen'>;

const MainTestScreen = ({navigation}: Props) => {
  return (
    <View >
      <Text style={styles.title}>Welcome to the Main Test Screen</Text>

      <Button
        title="Go to Test Screen"
        onPress={() => navigation.navigate('TestScreen')} // 添加导航到测试页面的按钮
      />
    </View>
  );
};

export default MainTestScreen;
