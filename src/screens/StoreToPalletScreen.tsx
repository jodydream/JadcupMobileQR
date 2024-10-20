import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/StoreToPalletScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型

type Props = StackScreenProps<RootStackParamList, 'StoreToPalletScreen'>;

const StoreToPalletScreen = ({navigation, route}: Props) => {
  const [items, setItems] = useState<QRType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false); // 扫码状态
  const [isInputEnabled, setIsInputEnabled] = useState<boolean>(false); // 输入状态

  // 重置单个item
  const resetItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    Alert.alert('Clear', `Item at index ${index} has been clear.`);
  };

  // 重置所有项
  const resetAll = () => {
    setItems([]);
    Alert.alert('Clear All', 'All items have been reset.');
  };

  // 保存操作
  const savePallet = () => {
    Alert.alert('Save', 'Pallet has been saved.');
  };

  // 返回上一页
  const goBack = () => {
    navigation.goBack();
  };

  // 处理用户输入内容
  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  // 添加到列表
  const handleAddItem = () => {
    if (!inputValue) return;
    const newType = inputValue.length > 6 ? 'Product' : 'Pallet'; // 判断type
    const newItem: QRType = {
      type: newType,
      No: inputValue,
    };
    setItems([...items, newItem]);
    setInputValue('');
  };

  // 渲染每个item的行
  const renderItem = ({item, index}: {item: QRType; index: number}) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.itemType}>{item.type}</Text>
      <Text style={styles.itemNumber}>{item.No}</Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => resetItem(index)}
        activeOpacity={0.3}>
        <Text style={styles.resetButtonText}>Clear</Text>
      </TouchableOpacity>
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
        {/* 俩按钮 */}
        <View style={styles.inpu_btn_container}>
          {/* 按钮1：扫码状态按钮 */}
          <TouchableOpacity
            style={[
              styles.scanButton,
              {backgroundColor: isScanning ? theme.colors.primary : 'gray'},
            ]}
            onPress={() => setIsScanning(!isScanning)}>
            <Text style={styles.scanButtonText}>
              {isScanning ? '扫码中' : '开启扫码'}
            </Text>
          </TouchableOpacity>

          {/* 按钮2：输入状态控制按钮 */}
          <TouchableOpacity
            style={[
              styles.scanButton,
              {backgroundColor: isInputEnabled ? theme.colors.primary : 'gray'},
            ]}
            onPress={() => setIsInputEnabled(!isInputEnabled)}>
            <Text style={styles.scanButtonText}>
              {isInputEnabled ? '禁用输入' : '开启输入'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.inputBox}
          placeholder="输入内容"
          value={inputValue}
          onChangeText={handleInputChange}
          editable={isInputEnabled} // 根据按钮控制是否允许输入
        />

        {/* 列表部分 */}
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.listItemContainer}>
              <Text style={styles.itemType}>Type</Text>
              <Text style={styles.itemNumber}>No.</Text>
              <Text style={[styles.resetButton, {display: 'none'}]}> </Text>
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
          <Text style={styles.resetAllButtonText}>Clear All重置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreToPalletScreen;
