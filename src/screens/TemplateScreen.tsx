// src/screens/LoginScreen.tsx
import React, {useEffect, useState} from 'react';
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
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型
import theme from '../styles/theme/theme'; // 自定义主题
import {getData} from '../services/api'; // 引入 API 服务

type Props = StackScreenProps<RootStackParamList, 'TemplateScreen'>;

const TemplateScreen = ({navigation, route}: Props) => {
  // ====================系统Hooks====================
  // 首次进入页面，调用一次
  useEffect(() => {
    //读本地的登录信息
    getAllProductionOptions();
    
  }, []);

  // 1 拉取Product信息--->本地操作
  const getAllProductionOptions = async () => {
    try {
      console.log("----------------------");
      //const data: any = {};
      // const responsejson: any = await getData(
      //   '/api/ProductOption/GetAllProductOption',
      //   data,
      // );
      // console.log(responsejson);
    } catch (error) {}
  };



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

          <Text style={styles.nav_title_text}>xxxxx</Text>


          <View style={styles.logoContainer}>
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

export default TemplateScreen;
