import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/StoreToPalletScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型

type Props = StackScreenProps<RootStackParamList, 'StoreToPalletScreen'>;

const StoreToPalletScreen = ({navigation, route}: Props) => {
  const qrList: QRType[] = [
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Product', No: '123456789'},
    {type: 'Pallet', No: '987654321'},
    {type: null, No: null}, // 可以包含空值
  ];

  const [items, setItems] = useState<QRType[]>(qrList);

  // 重置单个item
  const resetItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    Alert.alert('Reset', `Item at index ${index} has been reset.`);
  };

  // 重置所有项
  const resetAll = () => {
    setItems([]);
    Alert.alert('Reset All', 'All items have been reset.');
  };

  // 保存操作
  const savePallet = () => {
    Alert.alert('Save', 'Pallet has been saved.');
  };

  // 返回上一页
  const goBack = () => {
    navigation.goBack();
  };

  // 渲染每个item的行
  const renderItem = ({item, index}: {item: QRType; index: number}) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.itemType}>{item.type}:</Text>
      <Text style={styles.itemNumber}>{item.No}</Text>
      <TouchableWithoutFeedback
        style={styles.resetButton}
        onPress={() => resetItem(index)}
        // activeOpacity={1}
        >
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableWithoutFeedback>

    </View>
  );

  return (
    <View style={styles.wholeContaine}>
      {/* part1: 顶部导航 */}
      <View style={styles.top_container}>
        {/* 状态栏 */}
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
          translucent={true}
        />

        {/* 导航栏 */}
        <View style={styles.nav_container}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={goBack}>
              <AntDesign name="left" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.nav_title_text}>{route.params.title}</Text>
          <View style={styles.logoContainer} />
        </View>
      </View>

      {/* 分割线 */}
      <View style={globalStyles.line_view_tiny}></View>

      {/* part 2: 输入框和列表 */}
      <View style={styles.mainContainer}>
        <Text style={styles.scanPrompt}>点击输入框扫码</Text>
        <TextInput style={styles.inputBox} placeholder="请输入" />

        {/* 列表部分 */}
        <FlatList
          scrollEnabled={true}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          onScroll={() => console.log('Scrolling...')}
          //每一个项目
          renderItem={renderItem}
          // 在列表的顶部添加一个自定义的组件或视图：可用来显示标题、过滤器等
          ListHeaderComponent={() => (
            <View style={styles.listHeader}>
              <Text style={styles.headerType}>Type</Text>
              <Text style={styles.headerNumber}>No.</Text>
            </View>
          )}
        />
      </View>

      {/* 底部按钮 */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={savePallet}>
          <Text style={styles.saveButtonText}>Save上托盘</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetAllButton} onPress={resetAll}>
          <Text style={styles.resetAllButtonText}>Reset All重置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreToPalletScreen;
