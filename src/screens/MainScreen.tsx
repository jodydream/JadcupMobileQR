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
  ImageSourcePropType,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // 引入图标库
import Entypo from 'react-native-vector-icons/Entypo'; // 引入图标库
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 引入图标库
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
    if (item == 'Store to Pallet上托盘') {
      navigation.navigate('StoreToPalletScreen', {title: item});
    } else if (item == 'Item Scanner查条码') {
      navigation.navigate('ItemScannerScreen', {title: item});
    }
  };

  // 2 点击-退出登录
  const logout = () => {
    navigation.replace('LoginScreen', {isLogout: true});
  };
  //========================part2:自定义函数(除了点击外)========================
  const LogoSwitcher = (logoType: string): ImageSourcePropType => {
    let logoSource;
    switch (logoType) {
      case 'Confirm Delivery确定交货':
        logoSource = require('../../assets/images/Home_ConfirmDelivery.png');
        break;
      case 'Pallet Relocate移托盘':
        logoSource = require('../../assets/images/Home_PalletRelocate.png');
        break;
      case 'Item Scanner查条码':
        logoSource = require('../../assets/images/Home_ItemScanner.png');
        break;
      case 'Store to Pallet上托盘':
        logoSource = require('../../assets/images/Home_StoreToPallet.png');
        break;
      // case 'Item Relocate移货':
      //   logoSource = require('../../assets/images/jadcup_logo.png');
      //   break;
      case 'Pallet Inbound入仓库':
        logoSource = require('../../assets/images/Home_PalletInbound.png');
        break;
      case 'Picking List拣货':
        logoSource = require('../../assets/images/Home_PickingList.png');
        break;
        // case 'Merging Pallets合托盘':
        //   logoSource = require('../../assets/images/jadcup_logo.png');
        //   break;
        // case 'Defect缺陷管理':
        //   logoSource = require('../../assets/images/jadcup_logo.png');
        break;
      default:
        logoSource = require('../../assets/images/Home_ItemScanner.png');
        break;
    }

    return logoSource; // 添加这一行来返回 logoSource
  };

  //=========================part3:框架函数====================================
  //1 renderSection函数：每一项ListRenderItem的类型是Section
  const renderSection: ListRenderItem<MainSection> = ({item}) => (
    <View style={styles.section}>
      {/* 1 title */}
      <Text style={styles.sectionTitle}>{item.title}</Text>

      {/* 2 功能项目 */}
      {item.items.map((subItem, idx) => (
        <TouchableOpacity//原本的容器view改成TouchableOpacity
          key={idx}
          style={styles.item}
          onPress={() => handleItemPress(subItem)}
          activeOpacity={0.1}>
          <Image source={LogoSwitcher(subItem)} style={styles.itemImage} />
          <Text style={styles.itemText}>{subItem}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  //============================分割线===========================================
  return (
    <View style={styles.wholecontainer}>
      <View style={styles.mainContainer}>
        {/* 1 状态栏 */}
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
          //true:状态栏重叠--->marginTop: LAYOUT.statusBarHeight
          //false:不重叠
          // android可设置;ios只能为true
          translucent={true} // 如果不希望内容重叠在状态栏下，关闭透明??
        />

        {/* 2 标题栏 */}
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/jadcup_logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.headerText}>主页</Text>
          </View>
          {/* 占位 */}
          <View style={styles.logoContainer}></View>
        </View>
        {/* ================================================= */}

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
    </View>
  );

};

export default MainScreen;
