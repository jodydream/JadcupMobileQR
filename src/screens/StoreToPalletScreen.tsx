import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/StoreToPalletScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // 导入导航类型
import { identifyCode } from '../utils/globalHelpers'; // 根据文件路径导入
import * as StoreToPalletHelpers from '../utils/StoreToPalletHelpers';

type Props = StackScreenProps<RootStackParamList, 'StoreToPalletScreen'>;

const StoreToPalletScreen = ({ navigation, route }: Props) => {
  const [items, setItems] = useState<QRType[]>([]);
  const [inputValue, setInputValue] = useState<string>(''); // 键盘输入值
  const [scanValue, setScanValue] = useState<string>(''); // 用于显示的扫码结果
  const inputRefScan = useRef<TextInput>(null); // TextInput 的引用

  //========================part1:点击事件处理=================================
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

  // 模拟扫码输入
  const handleScanInput = (scannedCode: string) => {
    setScanValue(scannedCode); // 设置扫码值
    handleAddItem(scannedCode); // 将扫码值添加到列表
  };

  // 重置单个 item
  const resetItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    Alert.alert('Clear', `Item at index ${index} has been cleared.`);
  };

  // 添加一行到列表
  const handleAddItem = (current: string) => {
    if (!current) return;

    let newType;
    const newtypecode = identifyCode(current);
    if (newtypecode == 2) {
      newType = 'Pallet';
    } else if (newtypecode == 1) {
      newType = 'Product';
    } else {
      Alert.alert('Please enter the correct QR code', '');
      setInputValue('');
      return;
    }
    const newItem: QRType = {
      type: newType,
      No: current,
    };
    const currentItems: QRType[] = [...items, newItem];
    const validateQRArraycode = StoreToPalletHelpers.validateQRArray(currentItems);
    if (validateQRArraycode == 1) {
      setItems([...items, newItem]);
      setInputValue('');
    } else if (validateQRArraycode == 2) {
      Alert.alert('Please sweep into the Pallet', '');
    } else if (validateQRArraycode == 3) {
      Alert.alert('Please sweep in the product', '');
    } else if (validateQRArraycode == 4) {
      Alert.alert('No repeat sweeps', '');
    } else {
      Alert.alert('Please enter the correct QR code', '');
    }
    setInputValue('');
  };

  // 渲染每个 item 的行
  const renderItem = ({ item, index }: { item: QRType; index: number }) => (
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
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
          translucent={true}
        />
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
      <View style={globalStyles.line_view_tiny}></View>

      {/* part 2: 输入框和列表 */}
      <View style={styles.mainContainer}>
        {/* 1 扫码按钮 */}
        <View style={styles.scan_btn_container}>
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonText}>
            扫码输入
            </Text>
          </TouchableOpacity>

          <TextInput
            ref={inputRefScan}
            style={[styles.inputBox, { flex: 1 }]}
            placeholder="等待扫码输入"
            value={inputValue}
            onChangeText={handleScanInput}
            editable={true}
            // onFocus={() => { Keyboard.dismiss();}}
          />
        </View>

        {/* 列表部分 */}
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.listItemContainer}>
              <Text style={styles.itemType}>Type</Text>
              <Text style={styles.itemNumber}>No.</Text>
              <Text style={[styles.resetButton, { display: 'none' }]}> </Text>
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
