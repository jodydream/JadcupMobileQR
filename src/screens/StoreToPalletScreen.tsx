import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
  Keyboard
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/StoreToPalletScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型
import {identifyCode} from '../utils/globalHelpers'; // 根据文件路径导入
import * as StoreToPalletHelpers from '../utils/StoreToPalletHelpers';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<RootStackParamList, 'StoreToPalletScreen'>;

const StoreToPalletScreen = ({navigation, route}: Props) => {
  const [items, setItems] = useState<QRType[]>([]);
  const [scanValue, setScanValue] = useState<string>(''); // 用于显示的扫码结果
  const inputRefScan = useRef<TextInput>(null); // TextInput 的引用

  //========================part1:点击事件处理=================================
  // 重置所有项
  const resetAll = () => {
    setItems([]);
    //Alert.alert('Clear All', 'All items have been reset.', [{ text: 'OK', onPress: getfoucs }]);
    Toast.show({type: 'success', text1: 'Clear Success', text2: 'All items have been cleared!', visibilityTime: 1000,});
  };

  // 保存操作
  const savePallet = () => {
    //Alert.alert('Save', 'Pallet has been saved.', [{ text: 'OK', onPress: getfoucs }]);
    Toast.show({type: 'success', text1: 'Save Success', text2: 'Pallet has been saved!', visibilityTime: 1000,});
  };

  // 返回上一页
  const goBack = () => {
    navigation.goBack();
  };

  // 添加一行到列表
  const addItem = (current: string) => {
    if (!current) return;

    let newType;
    const newtypecode = identifyCode(current);
    if (newtypecode == 2) {
      newType = 'Pallet';
    } else if (newtypecode == 1) {
      newType = 'Product';
    } else {
      //Alert.alert('Please enter the correct QR code', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({type: 'error', text1: 'Fail to add', text2: 'Please enter the correct QR code!', visibilityTime: 1000,});
      setScanValue('');
      return;
    }

    const newItem: QRType = {
      type: newType,
      No: current,
    };
    const currentItems: QRType[] = [...items, newItem];
    const validateQRArraycode =StoreToPalletHelpers.validateQRArray(currentItems);
    if (validateQRArraycode == 1) {
      setItems(currentItems);
    } else if (validateQRArraycode == 2) {
      //Alert.alert('Please sweep into the Pallet', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({type: 'error', text1: 'Fail to add', text2: 'Please sweep into the Pallet!', visibilityTime: 1000,});
    } else if (validateQRArraycode == 3) {
      //Alert.alert('Please sweep into the product', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({type: 'error', text1: 'Fail to add', text2: 'Please sweep into the product!', visibilityTime: 1000,});
    } else if (validateQRArraycode == 4) {
      //Alert.alert('No repeat sweeps', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({type: 'error', text1: 'Fail to add', text2: 'No repeat sweeps!', visibilityTime: 1000,});
    } else {
      //Alert.alert('Please enter the correct QR code', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({type: 'error', text1: 'Fail to add', text2: 'Please enter the correct QR code!', visibilityTime: 1000,});
    }
    setScanValue('');
  
  };

  const getfoucs = ()=> {
    inputRefScan.current?.focus();
    setTimeout(() => {
      Keyboard.dismiss(); // 延迟隐藏键盘
    }, 100); // 延迟100毫秒（这个值可以根据实际效果调整）
  }

  // 删除单个 item
  const deleteItem = (index: number) => {
    const currentItem = items[index];
    if(currentItem.type == 'Pallet') {
      setItems([]);
    } else {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      //Alert.alert('Clear', `${currentItem.type}: ${currentItem.No} has been cleared.`, [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({type: 'success', text1: 'Clear success ', text2: `${currentItem.type}: ${currentItem.No} has been cleared.`, visibilityTime: 1000,});
    }
  };

  // 渲染每个 item 的行
  const renderItem = ({item, index}: {item: QRType; index: number}) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.itemType}>{item.type}</Text>
      <Text style={styles.itemNumber}>{item.No}</Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => deleteItem(index)}
        activeOpacity={0.3}>
        <Text style={styles.resetButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );


  //========================part3:框架函数====================================
  useEffect(() => {
    getfoucs();
  }, []);

  //setScanValue后:
  useEffect(() => {
    console.log('-------------scanValue:', scanValue);
    if(scanValue) {
      addItem(scanValue); // 将扫码值添加到列表
    }
    //获取焦点
    getfoucs();
  }, [scanValue]);

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
            <Text style={styles.scanButtonText}>扫码输入</Text>
          </TouchableOpacity>
          <TextInput
            ref={inputRefScan}
            style={[styles.inputBox, {flex: 1}]}
            placeholder="等待扫码输入"
            value={scanValue}
            onChangeText={setScanValue}
            editable={true} //可编辑--接受输入的数据
          />
        </View>

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
      <Text style={styles.total_text}>Total Number: {items.length}</Text>
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
