// src/screens/MainScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // 引入图标库
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 引入图标库
import Entypo from 'react-native-vector-icons/Entypo'; // 引入图标库
import styles from '../styles/MainScreen.styles'; // 样式文件
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator'; 

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen: React.FC<Props> = ({navigation,route}) => {
  const { sections,userInfo } = route.params; // 获取传递过来的 JSON 数据

  // 使用 ListRenderItem<Section> 注解 renderSection 函数
  const renderSection: ListRenderItem<MainSection> = ({item}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      {item.items.map((subItem, idx) => (
        <View key={idx} style={styles.item}>
          <Text style={styles.itemText}>{subItem}</Text>
        </View>
      ))}
    </View>
  );

  const logout = () => { 
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={styles.container}>
      {/* 1 标题栏 */}
      <View style={styles.headerBar}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>主页</Text>
        </View>

      </View>

      {/* 2 用户信息 */}
      <View style={styles.userInfoSection}>
        <Image
          source={require('../../assets/images/head.png')}
          style={styles.userAvatar}
        />

        <View style={styles.userTextContainer}>
          <Text style={styles.userNametext}>{userInfo.name}</Text>
          <Text style={styles.userRoletext}>employeeId: {userInfo.employeeId}</Text>
        </View>
        <TouchableOpacity style={styles.settingbtn} onPress={logout}>
          <MaterialIcons name="logout" size={20} color="black" />
        </TouchableOpacity>
      </View >
      <View style={styles.lineview}>
      </View>

      {/* 3 FlatList功能列表 */}
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 10 }]} // 确保有足够的底部填充
        ListFooterComponent={<View style={{ height: 10 }} />} // 添加额外的底部空白区域
      />
    </View>
  );
};

export default MainScreen;
