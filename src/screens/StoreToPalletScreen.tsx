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
import {getData, putData} from '../services/api';

type Props = StackScreenProps<RootStackParamList, 'StoreToPalletScreen'>;

const StoreToPalletScreen = ({navigation, route}: Props) => {
  const [items, setItems] = useState<QRType[]>([]);
  const [scanValue, setScanValue] = useState<string>(''); // 用于显示的扫码结果
  const [currentQR, setcurrentQRe] = useState<QRType>(); // 用于Text显示当前扫入的
  const inputRefScan = useRef<TextInput>(null); // TextInput 的引用
  const [loading, setLoading] = useState(false); //加载状态：给用户加载数据的UI提示
  const [palletJson, setPalletJson] = useState<null | any>(null);

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

  // 返回上一页
  const goBack = () => {
    navigation.goBack();
  };
  // #endregion

  //========================part2:自定义函数(除了点击外)========================
  // #region Utility Functions
  // 添加一行数据到列表
  const addItem = async (currentCodeNo: string) => {
    if (!currentCodeNo) return;

    // 创建一个 newItem
    let newType;
    const newtypecode = identifyCode(currentCodeNo);
    if (newtypecode == 2) {
      newType = 'Pallet';
      // 获取托盘信息
      const esponse_package = await palletInfo(currentCodeNo);
      // 判断: 托盘是否可用----------
      //不在包装区(在=1)-->退出不之后后续
      if (esponse_package == 0) {
        Alert.alert('Pallet not in the packaging area!', '', [
          {text: 'OK', onPress: getfoucs},
        ]);
        //setScanValue('');
        return;
      }

    } else if (newtypecode == 1) {
      newType = 'Product';
      // 判断：货物
      // 1 货物是不是已经在托盘
      const isOn = storeToPalletHelpers.isBarcodeInPalletJson(
        palletJson,
        currentCodeNo,
      );
      if (isOn) {
        Toast.show({
          type: 'error',
          text1: 'Fail to add',
          text2: 'Barcode is aready on this Pallet!!',
          visibilityTime: 3000,
        });

        //setScanValue('');
        return;
      }
      // 获取货物信息
      const product = await productInfo(currentCodeNo);
      // 2 判断货物状态
      if(product.status === 1){
        Toast.show({
          type: 'error',
          text1: 'Fail to add',
          text2: '货物无效。This box is no longer valid.',
          visibilityTime: 3000,
        });
        //setScanValue('');
        return;
      }
      if(product.status === 1){
        Toast.show({
          type: 'error',
          text1: 'Fail to add',
          text2: '货物无效。This box is no longer valid.',
          visibilityTime: 3000,
        });
        //setScanValue('');
        return;
      }
      if(product.palletNo === null){
        Toast.show({
          type: 'error',
          text1: 'Fail to add',
          text2: '货物不在托盘上。This box is no  pallet.',
          visibilityTime: 3000,
        });
        //setScanValue('');
        return;
      }
      if(product.position !== null){
        Toast.show({
          type: 'error',
          text1: 'Fail to add',
          text2: '货物已经在仓库。This box is has been warehoused.',
          visibilityTime: 3000,
        });
        //setScanValue('');
        return;
      }


    } else {
      //Alert.alert('Please enter the correct QR code', '', [{ text: 'OK', onPress: getfoucs }]);
      Toast.show({
        type: 'error',
        text1: 'Fail to add',
        text2: 'Please enter the correct QR code!',
        visibilityTime: 1000,
      });
      //setScanValue('');
      return;
    }
    const newItem: QRType = {
      type: newType,
      No: currentCodeNo,
    };
    setcurrentQRe(newItem); //用于展示当前扫码内容--给用户看

    //把 newItem 加入数组
    // a:判断:是否可加入--------------
    const currentItems: QRType[] = [...items, newItem];
    const validateQRArraycode =
      storeToPalletHelpers.validateQRArray(currentItems);

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
    //setScanValue('');
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
    //可删除分支--if (currentItem.type == 'Pallet')  
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
  const renderItem = ({item, index}: {item: QRType; index: number}) => {
    if (item.type === 'Pallet') {
      // 单独处理第一个 item
      return (
        <View style={[styles.listItemContainer, styles.listItemContainerPallet]}>
          <Text style={[styles.itemTypeText,styles.itemTextPallet]}>{item.type}</Text>
          <Text style={[styles.itemNumberText,styles.itemTextPallet]}>{item.No}</Text>
          {/* <TouchableOpacity
            style={styles.resetButton}
            onPress={() => deleteItem(index)}
            activeOpacity={0.3}>
            <Text style={styles.resetButtonText}>Clear</Text>
          </TouchableOpacity> */}
          {/* 用resetButtonText保持一致的风格 */}
          <Text style={[styles.resetButtonText,styles.itemTextPallet]}>{`IsOn: ${palletJson?.data?.plateBox.length}`}</Text>
        </View>
      );
    }
    // 处理其他 items
    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.itemTypeText}>{item.type}</Text>
        <Text style={styles.itemNumberText}>{item.No}</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => deleteItem(index)}
          activeOpacity={0.3}>
          <Text style={styles.resetButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  };
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
      setScanValue('');
    }
    //获取焦点
    getfoucs();
  }, [scanValue]);
  // #endregion

  //========================part 4:拉取webapi数据-本地处理=======================
  // #region Utility Functions
  // 解释：这了函数调用了Hooks必须在页面(React 组件)之内用，无法剥离出去。
  // 1 判断托盘
  const palletInfo = async (palletCode: string) => {
    setLoading(true); // 开启加载状态
    try {
      // 参数--params
      const data = {params: {code: palletCode}};
      // 拉取数据
      const responsejson = await getData(
        '/api/Plate/GetPlateByPlateCode',
        data,
      );
      setPalletJson(responsejson);
      const esponse_package = responsejson['data']['package'];
      // 返回-在其他地方处理数据
      return esponse_package;
    } catch (error) {
      Toast.show({
        type: 'Failed',
        text1: 'Get Data Failed',
        text2: 'Invalid credentials or server error!',
        visibilityTime: 1000,
      });
    } finally {
      setLoading(false); // 完成加载
    }
  };

  // 2 判断货物
  const productInfo = async (code: string) => {
    setLoading(true); // 开启加载状态
    try {
      // 参数--params
      const data = {params: {barCode: code}};
      // 拉取数据
      const responsejson = await getData('/api/Box/GetBoxByBarCode',data,);
      // 返回-在其他地方处理数据
      return responsejson;
    } catch (error) {
      Toast.show({
        type: 'Failed',
        text1: 'Get Data Failed',
        text2: 'Invalid credentials or server error!',
        visibilityTime: 1000,
      });
    } finally {
      setLoading(false); // 完成加载
    }
  };


  // 3 上托盘
  const putBoxtoPlate = async () => {
    setLoading(true); // 开启加载状态
    try {
      //确保已经关联了托盘和货物
      if (items.length <= 1) {
        Alert.alert('Please scan for complete data!', '', [
          {text: 'OK', onPress: getfoucs},
        ]);
        return;
      }

      // 参数--body
      const data = storeToPalletHelpers.convertQRArray(items);
      // part1 拉取登录数据==================
      const responsejson: any = await putData(
        '/api/PlateBox/PackagingScanerPlateBox',
        data,
      );
      const ifsuccess = responsejson['success'];
      if (ifsuccess) {
        Alert.alert('Success!', '', [{text: 'OK', onPress: getfoucs}]);
      } else {
        Alert.alert('Fail!', '', [{text: 'OK', onPress: getfoucs}]);
      }
      // part2 处理数据====================
    } catch (error) {
      // Toast.show({
      //   type: 'Failed',
      //   text1: 'Login Failed',
      //   text2: 'Invalid credentials or server error!',
      //   visibilityTime: 1000,
      // });
      Alert.alert('Save Failed!', '', [{text: 'OK', onPress: getfoucs}]);
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
          {/* 1 返回按钮 */}
          <View>
            <TouchableOpacity
              style={styles.gobackbtonContainer}
              onPress={goBack}>
              <AntDesign name="left" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {/* 2 标题 */}
          <Text style={styles.nav_title_text}>{route.params.title}</Text>
          {/* 3 占位view */}
          <View style={styles.gobackbtonContainer} />
        </View>
      </View>
      <View style={globalStyles.line_view_tiny}></View>

      {/* part 2: 扫入 */}
      <View style={styles.scan_btn_container}>
        <View style={styles.showscanview}>
          <Text style={styles.showscanText}>当前扫入:</Text>
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
              <Text style={styles.itemTypeText}>Type</Text>
              <Text style={[styles.itemNumberText, {fontWeight: 'bold'}]}>No.</Text>
              <Text style={[styles.resetButton, {display: 'none'}]}> </Text>
            </View>
          )}
        />
      </View>

      {/* 底部按钮 */}
      <View style={styles.footerContainer}>
        <Text style={styles.total_text}>
          Pallet Count:{items.length ? 1 : 0} Product Count:{' '}
          {items.length > 1 ? items.length - 1 : 0}
        </Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={async () => {
            await putBoxtoPlate();
          }}>
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
