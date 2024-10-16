// src/screens/MainScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {LAYOUT, SPACING} from '../styles/theme/dimensions';
import theme from '../styles/theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign'; // 图标库
import styles from '../styles/TestScreen.styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型

type Props = StackScreenProps<RootStackParamList, 'SecondScreen'>;

// 功能区的示例数据
const sections = [
  {
    title: '生产车间',
    items: ['Storeto Pallet上托盘'],
  },
  {
    title: '存储货物',
    items: [
      'Storeto Pallet上托盘',
      'PalletRelocate移托盘',
      'MergingPallets合托盘',
      'ItemRelocate移货',
    ],
  },
  {
    title: '订单处理中',
    items: ['PickingList拣货'],
  },
  {
    title: '司机交货',
    items: ['Confirm Delivery确定交货'],
  },
  {
    title: '其他',
    items: ['Item Scanner查条码', 'Defect缺陷管理'],
  },
];

const MainScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      {/* 状态栏 */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
        translucent
      />

      {/* 标题栏 */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.gobackbtn} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color={theme.colors.onBackground} />
        </TouchableOpacity>
        <Text style={styles.headerText}>主页</Text>
        <TouchableOpacity style={styles.settingbtn}>
          <AntDesign name="setting" size={24} color={theme.colors.onBackground}/>
        </TouchableOpacity>
      </View>

      {/* 滚动内容 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 用户信息 */}
        <View style={styles.userInfoSection}>
          <Image
            source={require('../../assets/images/head.png')} // 头像路径
            style={styles.userAvatar}
          />
          <View>
            <Text style={styles.userName}>Jody Jia</Text>
            <Text style={styles.userRole}>IT Programmer</Text>
          </View>
        </View>

        {/* 渲染功能区 */}
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <FlatList
              data={section.items}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              )}
              keyExtractor={(item, idx) => `${item}-${idx}`}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
