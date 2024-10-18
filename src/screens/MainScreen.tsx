// src/screens/MainScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // 引入图标库
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 引入图标库
import Entypo from 'react-native-vector-icons/Entypo'; // 引入图标库
import styles from '../styles/MainScreen.styles'; // 样式文件
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import theme from '../styles/theme/theme'; // 自定义主题

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen: React.FC<Props> = ({navigation, route}) => {
  const {sections, userInfo} = route.params; // 获取传递过来的 JSON 数据

  //========================part1:点击事件处理=================================
  // 1 点击-功能行
  const handleItemPress = (item: string) => {
    console.log('Item clicked:', item);
    // 你可以在这里添加导航或其他逻辑
    if(item == "Store to Pallet上托盘") {
      navigation.navigate("StoreToPalletScreen", {title:item});
    }
    
  };

  // 2 点击-退出登录
  const logout = () => {
    navigation.replace('LoginScreen', {isLogout: true});
  };
  //========================part2:自定义函数(除了点击外)========================
  // To do ....
  
  //========================part3:框架函数====================================
  //1 renderSection函数：每一项ListRenderItem的类型是Section
  const renderSection: ListRenderItem<MainSection> = ({item}) => (
    <View style={styles.section}>
      {/* 1 title */}
      <Text style={styles.sectionTitle}>{item.title}</Text>

      {/* 2 功能项目 */}
      {item.items.map((subItem, idx) => (
        //原本的容器view改成TouchableOpacity
        <TouchableOpacity
          key={idx}
          style={styles.item}
          onPress={() => handleItemPress(subItem)}>
          <AntDesign
            style={styles.itemIcon}
            name="checkcircleo"
            size={20}
            color="black"
          />
          <Text style={styles.itemText}>{subItem}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  //========================分割线===========================================
  return (
    <View style={styles.container}>
        {/* 1 状态栏 */}
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
          translucent={false} // 如果不希望内容重叠在状态栏下，关闭透明??
        />

      {/* 2 标题栏 */}
      <View style={styles.headerBar}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/jadcup_logo.png')}
            style={styles.logo}
          />
        </View>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>主页</Text>
        </View>

        <View style={styles.logoContainer}></View>
      </View>

      {/* 2 用户信息 */}
      <View style={styles.userInfoSection}>
        <Image
          source={require('../../assets/images/head.png')}
          style={styles.userAvatar}
        />

        <View style={styles.userTextContainer}>
          <Text style={styles.userNameText}>{userInfo.name}</Text>
          <Text style={styles.userDetialText}>
            employeeId: {userInfo.employeeId}
          </Text>
        </View>
        <TouchableOpacity style={styles.settingbtn} onPress={logout}>
          <MaterialIcons name="logout" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.lineview}></View>

      {/* 3 FlatList功能列表 */}
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.scrollContent, {paddingBottom: 10}]} // 确保有足够的底部填充
        ListFooterComponent={<View style={{height: 10}} />} // 添加额外的底部空白区域
      />
    </View>
  );
};

export default MainScreen;
