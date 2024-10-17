// src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../styles/TestScreen.styles';
import globalStyles from '../styles/globalStyles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';  // 导入导航类型
type Props = StackScreenProps<RootStackParamList, 'TestScreen'>;

const TestScreen =  ({ navigation,route }: Props) => {
  const goBack = ()=>{
    navigation.goBack();

  }
  return (
    <View style={styles.wholeContaine}>
      {/* part1 */}
      <View style={styles.navContainer}>
        {/* 1 状态栏 */}
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {/* 2 导航栏 */}
        <View style={styles.nav_container}>
          <View style={styles.logoContainer}>
            <TouchableOpacity  onPress={goBack}>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ---------分割线------- */}
      <View style={globalStyles.line_view_tiny}></View>

      {/* part 2 */}
      <View style={styles.mainContainer}></View>
    </View>
  );
};

export default TestScreen;
