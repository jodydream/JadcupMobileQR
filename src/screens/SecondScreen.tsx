// src/screens/SecondScreen.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/SecondScreen.styles';  // 导入样式
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';  // 导入导航类型
type Props = StackScreenProps<RootStackParamList, 'SecondScreen'>;

const SecondScreen = ({ navigation,route }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Second Screen</Text>
      <Button
        title="Go Back to Main Screen"
        onPress={() => navigation.goBack()}  // 返回 MainScreen
      />
    </View>
  );
};

export default SecondScreen;
