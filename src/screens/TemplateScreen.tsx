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
import styles from '../styles/TemplateScreen.styles';
import globalStyles from '../styles/globalStyles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型
import theme from '../styles/theme/theme'; // 自定义主题
type Props = StackScreenProps<RootStackParamList, 'TemplateScreen'>;

const TemplateScreen = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.wholeContaine}>
      {/* part1 */}
      <View style={styles.top_container}>
        {/* 1 状态栏 */}
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
          translucent={true} // 如果不希望内容重叠在状态栏下，关闭透明??
        />

        {/* 2 导航栏 */}
        <View style={styles.nav_container}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={goBack}>
              <AntDesign name="left" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.nav_title_text}>入仓库</Text>

          <TouchableOpacity onPress={goBack}>
            <AntDesign name="setting" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------分割线------- */}
      <View style={globalStyles.line_view_tiny}></View>

      {/* part 2 */}
      <View style={styles.mainContainer}></View>
    </View>
  );
};

export default TemplateScreen;
