// src/screens/MainScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // 引入图标库
import styles from '../styles/MainScreen.styles'; // 样式文件
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';  // 导入导航类型

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

// 定义 Section 类型
interface Section {
  title: string;
  items: string[];
}

// 示例数据
const sections: Section[] = [
  {
    title: '生产车间',
    items: ['Storeto Pallet上托盘'],
  },
  {
    title: '存储货物',
    items: [
      'Pallet Inbound入仓库',
      'Pallet Relocate移托盘',
      'Merging Pallets合托盘',
      'Item Relocate移货',
    ],
  },
  {
    title: '订单处理中',
    items: ['PickingList拣货'],
  },
  {
    title: '其他1',
    items: ['Item Scanner查条码', 'Defect缺陷管理'],
  },
  {
    title: '其他2',
    items: ['Item Scanner查条码', 'Defect缺陷管理'],
  },
  {
    title: '其他3',
    items: ['Item Scanner查条码', 'Defect缺陷管理'],
  },
  {
    title: '',
    items: ['', ''],
  },
];

const MainScreen = ({navigation}: Props) => {
  // 使用 ListRenderItem<Section> 注解 renderSection 函数
  const renderSection: ListRenderItem<Section> = ({item}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      {item.items.map((subItem, idx) => (
        <View key={idx} style={styles.item}>
          <Text style={styles.itemText}>{subItem}</Text>
        </View>
      ))}
    </View>
  );

  const goBack = () => { 
    console.log("xxxxxxxxxxx");
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      {/* 标题栏 */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.gobackbtn}
          onPress={goBack}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>主页</Text>
        </View>

        <TouchableOpacity style={styles.settingbtn}>
          <AntDesign name="setting" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* 用户信息 */}
      <View style={styles.userInfoSection}>
        <Image
          source={require('../../assets/images/head.png')}
          style={styles.userAvatar}
        />
        <View>
          <Text style={styles.userName}>Jody Jia</Text>
          <Text style={styles.userRole}>IT Programmer</Text>
        </View>
      </View >

      <View style={styles.lineview}>
      </View>

      {/* 使用 FlatList 渲染内容 */}
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
};

export default MainScreen;
