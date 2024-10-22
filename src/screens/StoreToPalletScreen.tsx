import React, {useState, useRef, useEffect} from 'react';
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
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型
import {identifyCode} from '../utils/globalHelpers'; // 根据文件路径导入
import * as storeToPalletHelpers from '../utils/storeToPalletHelpers';
import Toast from 'react-native-toast-message';
import { getData, getDataWithParams } from '../services/api';

type Props = StackScreenProps<RootStackParamList, 'StoreToPalletScreen'>;

const StoreToPalletScreen = ({navigation, route}: Props) => {
  const [items, setItems] = useState<QRType[]>([]);
  const [scanValue, setScanValue] = useState<string>(''); // 用于显示的扫码结果
  const [currentQR, setcurrentQRe] = useState<QRType>(); // 用于Text显示当前扫入的
  const inputRefScan = useRef<TextInput>(null); // TextInput 的引用
  const [loading, setLoading] = useState(false); //加载状态：给用户加载数据的UI提示
  

  //========================part1:点击事件处理=================================
  // #region Utility Functions
  // 重置所有项
  const resetAll = () => {
    setItems([]);
    //Alert.alert('Clear All', 'All items have been reset.', [{ text: 'OK', onPress: getfoucs }]);
    Toast.show({
      type: 'success',
      text1: 'Clear Success',
      text2: 'All items have been cleared!',
      visibilityTime: 1000,
    });
  };

  // 保存操作
  const savePallet = () => {
    //Alert.alert('Save', 'Pallet has been saved.', [{ text: 'OK', onPress: getfoucs }]);
    Toast.show({
      type: 'success',
      text1: 'Save Success',
      text2: 'Pallet has been saved!',
      visibilityTime: 1000,
    });
  };

  // 返回上一页
  const goBack = () => {
    navigation.goBack();
  };
  // #endregion


  //========================part2:自定义函数(除了点击外)========================
  // #region Utility Functions
  // 添加一行数据到列表
  const addItem = (currentCodeNumber: string) => {
    if (!currentCodeNumber) return;

    // 创建一个 newItem
    let newType;
    const newtypecode = identifyCode(currentCodeNumber);
    if (newtypecode == 2) {
      newType = 'Pallet';
    } else if (newtypecode == 1) {
      newType = 'Product';
    } else {
      //Alert.alert('Please enter the correct QR code', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({
        type: 'error',
        text1: 'Fail to add',
        text2: 'Please enter the correct QR code!',
        visibilityTime: 1000,
      });
      setScanValue('');
      return;
    }
    const newItem: QRType = {
      type: newType,
      No: currentCodeNumber,
    };
    setcurrentQRe(newItem); //用于展示当前扫码内容--给用户看

    //把 newItem 加入数组
    // a:判断是否可加入
    // 判断1--托盘是否可用
    if(newtypecode == 2){
      // if(esponse_package == 0) {
      //   console.log("00000000000");
  
      // } else  {
      //   console.log("11111111");
      // }
      const responsejson: any = palletValidInfo(currentCodeNumber);;
      
    }

    // 判断2--数组内部规则
    const currentItems: QRType[] = [...items, newItem];
    const validateQRArraycode = storeToPalletHelpers.validateQRArray(currentItems);
   
    

    // b:加入数组
    if (validateQRArraycode == 1) {
      setItems(currentItems);
    } else if (validateQRArraycode == 2) {
      //Alert.alert('Please sweep into the Pallet', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({
        type: 'error',
        text1: 'Fail to add',
        text2: 'Please sweep into the Pallet!',
        visibilityTime: 1000,
      });
    } else if (validateQRArraycode == 3) {
      //Alert.alert('Please sweep into the product', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({
        type: 'error',
        text1: 'Fail to add',
        text2: 'Please sweep into the product!',
        visibilityTime: 1000,
      });
    } else if (validateQRArraycode == 4) {
      //Alert.alert('No repeat sweeps', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({
        type: 'error',
        text1: 'Fail to add',
        text2: 'No repeat sweeps!',
        visibilityTime: 1000,
      });
    } else {
      //Alert.alert('Please enter the correct QR code', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({
        type: 'error',
        text1: 'Fail to add',
        text2: 'Please enter the correct QR code!',
        visibilityTime: 1000,
      });
    }
    setScanValue('');
  };

  const getfoucs = () => {
    inputRefScan.current?.focus();
    setTimeout(() => {
      Keyboard.dismiss(); // 延迟隐藏键盘
    }, 100); // 延迟100毫秒（这个值可以根据实际效果调整）
  };

  // 删除单个 item
  const deleteItem = (index: number) => {
    const currentItem = items[index];
    if (currentItem.type == 'Pallet') {
      setItems([]);
    } else {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      //Alert.alert('Clear', `${currentItem.type}: ${currentItem.No} has been cleared.`, [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({
        type: 'success',
        text1: 'Clear success ',
        text2: `${currentItem.type}: ${currentItem.No} has been cleared.`,
        visibilityTime: 1000,
      });
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
  // #endregion

  // 判断
  //========================part3:框架函数====================================
  // #region Utility Functions
  useEffect(() => {
    getfoucs();
  }, []);

  //setScanValue后:
  useEffect(() => {
    console.log('-------------scanValue:', scanValue);
    if (scanValue) {
      addItem(scanValue); // 将扫码值添加到列表
    }
    //获取焦点
    getfoucs();
  }, [scanValue]);
  // #endregion

//========================part 4:拉取webapi数据-本地处理=======================
// #region Utility Functions
// 解释：这了函数调用了Hooks必须在页面(React 组件)之内用，无法剥离出去。
// 1 判断托盘是否可用
const palletValidInfo = async (palletCode:string) => {
  setLoading(true); // 开启加载状态
  try {
    const dataParams: {} = {
      code:palletCode,
    };
    // part1 拉取数据
    const responsejson: any = await getDataWithParams('/api/Plate/GetPlateByPlateCode',dataParams);
    const esponse_package = responsejson['data']['package'];
    return esponse_package;
  } catch (error) {
    // Toast.show({
    //   type: 'Failed',
    //   text1: 'Login Failed',
    //   text2: 'Invalid credentials or server error!',
    //   visibilityTime: 1000,
    // });
  } finally {
    setLoading(false); // 完成加载
  }
};
// #endregion

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

      {/* part 2: 扫入 */}
      <View style={styles.scan_btn_container}>
        <View style={styles.showscanview}>
          <Text style={styles.showscanText}>
            当前扫入:
          </Text>
        </View>
        
        {/* 用于显示扫码值的 Text */}
        <Text style={styles.textvalue}>
          {currentQR ? `${currentQR.type}  ${currentQR.No}` : 'Please scan ...'}
        </Text>

        <TextInput
          ref={inputRefScan}
          style={[styles.inputBox]}
          placeholder="等待扫码输入"
          value={scanValue}
          onChangeText={setScanValue}
          editable={true} //可编辑--接受输入的数据
        />
      </View>
      <View style={globalStyles.lineview}></View>

      {/* part 3: 列表 */}
      <View style={styles.mainContainer}>
        {/* 2 列表部分 */}
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.listItemContainer}>
              <Text style={styles.itemType}>Type</Text>
              <Text style={[styles.itemNumber, {fontWeight: 'bold'}]}>No.</Text>
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
