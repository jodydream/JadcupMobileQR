// src/screens/MainScreen.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/MainScreen.styles';  // 导入样式
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';  // 导入导航类型

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Main Screen</Text>
      <Button
        title="Go to Second Screen"
        onPress={() => navigation.navigate('SecondScreen')}  // 导航到 SecondScreen
      />
    </View>
  );
};

export default MainScreen;
