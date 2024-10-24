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
import styles from '../styles/ItemScannerStyle';
import theme from '../styles/theme/theme'; // 自定义主题
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型
import {getQRItemByCode, processScanValue} from '../utils/globalHelpers'; // 根据文件路径导入
import {showMessage} from 'react-native-flash-message';
import {getData} from '../services/api';
import * as itemScannerHlpers from '../utils/itemScannerHlpers';
import * as globalHelpers from '../utils/globalHelpers';

type Props = StackScreenProps<RootStackParamList, 'ItemScannerScreen'>;

const ItemScannerScreen = ({navigation, route}: Props) => {
  const [scanValue, setScanValue] = useState<string>(''); // 扫码信息---输入框
  const [currentQR, setCurrentQR] = useState<QRType>(); // 扫码信息---展示Detial区域
  const inputRefScan = useRef<TextInput>(null); // TextInput 的引用
  const [loading, setLoading] = useState(false); //加载状态：给用户加载数据的UI提示
  const [barArray, setbarArray] = useState<BoxType[]>([]); // 托盘view-数据
  const [barcodeInfo, setBarcodeInfo] = useState<BarType>(); // 托盘view-数据

  //========================part1:点击事件处理=================================
  // #region Utility Functions
  // 重置所有项
  const resetAll = () => {
    showAll('');

    //本地清除，一定会成功。
    showMessage({
      message: 'Clear Success',
      description: 'All items have been cleared!',
      type: 'success',
    });
  };
  // 返回上一页
  const goBack = () => {
    navigation.goBack();
  };

  //【关键函数！】--- 整体触发逻辑
  const inputChangeText = (code_number: string) => {
    showAll(code_number);
  };
  // #endregion

  //========================part2:自定义函数(除了点击外)========================
  // #region Utility Functions
  /***********解释整个流程************
  1 扫码数据传入showAll：
    1-1 出路得到可用code: new_code_number
    1-2 setScanValue(new_code_number)：new_code_number传递给Effect()[]函数
  2 Effect内：
    2-1:显示外部主数据---------------直接显示,用scanValue
    2-2:显示各个不同type的view-------拉取数据,用
        a.托盘：barArray
        b.货物：
        c.货架：
  */
  // 1 展示view：整个页面
  const showAll = (code_number: string) => {
    //1 清空输入框内的老数据后的，可用扫入数据
    let new_code_number;
    if (currentQR && currentQR.No) {
      new_code_number = processScanValue(currentQR.No, code_number);
    } else {
      new_code_number = code_number;
    }
    //2 刷新--整个页面数据
    setScanValue(new_code_number); //后续连续操作effect内-->ShowPalletView()
  };

  // 2-1 展示view：Pallet view
  const ShowPalletView = async (platteNo: string) => {
    if (!platteNo) return;
    const palletJson = await getPalletJson(platteNo);
    if (!palletJson) return;
    const plateId = palletJson['data']['plateId'];
    if (!plateId) return;

    const productsOfPalletJson = await getProductsOnPlate(plateId); //数组
    const productsArray = itemScannerHlpers.getProducts(productsOfPalletJson);

    setbarArray(productsArray);
  };

  // 2-2 展示view：货物view
  const ShowBarCodeView = async (barcode: string) => {
    if (!barcode) return;
    const barcodeJson = await getBarcodeJson(barcode);
    const newbarcode = itemScannerHlpers.getBarcodeViewInfo(barcodeJson);
    setBarcodeInfo(newbarcode);
  };

  // 2-3 展示view: 货架view

  //功能：设置保持焦点但隐藏键盘
  const getfoucs = () => {
    inputRefScan.current?.focus();
    setTimeout(() => {
      Keyboard.dismiss(); // 延迟隐藏键盘
    }, 100); // 延迟100毫秒（这个值可以根据实际效果调整）
  };
  // #endregion

  //========================part3:框架函数====================================
  // #region Utility Functions
  useEffect(() => {
    getfoucs();
  }, []);

  // 刷新整个页面
  useEffect(() => {
    getfoucs();
    // 1展示--外部主要数据
    const new_currentQR = getQRItemByCode(scanValue);
    setCurrentQR(new_currentQR);

    // 2展示--内部Detial区域
    const codeType = globalHelpers.identifyCode(scanValue);
    if (codeType == 1) {
      //'Barcode'
      ShowBarCodeView(scanValue);
    } else if (codeType == 2) {
      //'Pallet Code'
      ShowPalletView(scanValue);
    } else if (codeType == 3) {
      //'Cell Code'
    } else {
    }
  }, [scanValue]);
  // #endregion

  //========================part 4:拉取webapi数据-本地处理======================
  // #region Utility Functions
  // 解释：调用了Hooks的函数，必须在页面(React组件)之内用，无法剥离出去。
  // 1 get：托盘
  const getPalletJson = async (palletCode: string) => {
    setLoading(true); // 开启加载状态
    try {
      // 参数--params
      const data = {params: {code: palletCode}};
      // 拉取数据
      const responsejson = await getData(
        '/api/Plate/GetPlateByPlateCode',
        data,
      );
      return responsejson;
    } catch (error) {
      showMessage({
        message: 'Failed',
        description: 'Get Data Failed!',
        type: 'warning',
      });
    } finally {
      setLoading(false); // 完成加载
    }
  };

  // 2 get: 货物--1个
  const getBarcodeJson = async (code: string) => {
    setLoading(true); // 开启加载状态
    try {
      const data = {params: {barCode: code}};
      const responsejson = await getData('/api/Box/GetBoxByBarCode', data);
      return responsejson;
    } catch (error) {
      showMessage({
        message: 'Failed',
        description: 'Get Data Failed',
        type: 'warning',
      });
    } finally {
      setLoading(false); // 完成加载
    }
  };

  // 3 get: 货物--一组(某托盘上的)
  const getProductsOnPlate = async (code: string) => {
    setLoading(true); // 开启加载状态
    try {
      // 参数--params
      const data = {params: {plateId: code}};
      // 拉取数据
      const responsejson = await getData('/api/Plate/GetBoxByPlateId', data);
      // 返回
      return responsejson;
    } catch (error) {
      showMessage({
        message: 'Failed',
        description: 'Get Data Failed',
        type: 'warning',
      });
    } finally {
      setLoading(false); // 完成加载
    }
  };

  // #endregion

  //========================part 5:动态UI=======================
  // #region Utility Functions
  const renderDisplayView = () => {
    const barcodeInfoFields = [
      {label: '货物编号', value: barcodeInfo?.barCode},
      {label: '产品名称', value: barcodeInfo?.productCode},
      {label: '产品数量', value: barcodeInfo?.quantity},
      {label: '托盘编号', value: barcodeInfo?.palletNo},
      {label: '产品位置', value: barcodeInfo?.position},
    ];

    if (currentQR?.type === 'Pallet') {
      return (
        <View style={styles.detialInerViewContainer}>
          <Text style={styles.detial_main_title}>托盘信息</Text>
          <View style={globalStyles.line_view_tiny}></View>

          <View style={styles.pallet_subtitle_container}>
            <Text style={styles.pallet_subtitle}>托盘编号</Text>
            <Text style={styles.pallet_subtitle_value}>{currentQR.No}</Text>
          </View>

          <View style={globalStyles.line_view_tiny}></View>

          {/* 货物列表 */}
          <View style={styles.pallet_subtitle_container}>
            <Text style={styles.pallet_subtitle}>货物列表</Text>
            <Text style={styles.pallet_subtitle_value}>
              总计{barArray.length}件
            </Text>
          </View>

          <View style={styles.listHeader}>
            <Text style={[styles.listHeaderItem, {flex: 3}]}>货物编号</Text>
            <Text style={[styles.listHeaderItem, {flex: 3}]}>货物名称</Text>
            <Text style={[styles.listHeaderItem, {flex: 2}]}>货物状态</Text>
          </View>

          <FlatList
            data={barArray}
            //keyExtractor={item => item.barCode} //barCode 可能不唯一todo...
            renderItem={({item}) => (
              <View style={styles.listRow}>
                <Text style={[styles.listItem, {flex: 3}]}>{item.barCode}</Text>
                <Text style={[styles.listItem, {flex: 3}]}>
                  {item.productCode}
                </Text>
                <Text style={[styles.listItem, {flex: 2}]}>{item.status}</Text>
              </View>
            )}
          />
        </View>
      );
    } else if (currentQR?.type === 'Cell') {
      return (
        <View>
          <Text>Cell</Text>
        </View>
      );
    } else if (currentQR?.type === 'Barcode') {
      return (
        <View style={styles.detialInerViewContainer}>
          <Text style={styles.detial_main_title}>货物信息</Text>
          <View style={globalStyles.line_view_tiny}></View>
          {barcodeInfoFields.map((field, index) => (
            <React.Fragment key={index}>
              <View style={styles.pallet_subtitle_container}>
                <Text style={styles.pallet_subtitle}>{field.label}</Text>
                <Text style={styles.pallet_subtitle_value}>{field.value}</Text>
              </View>
              <View style={globalStyles.line_view_tiny}></View>
            </React.Fragment>
          ))}
        </View>
      );
    } else {
      return (
        <View>
          <Text></Text>
        </View>
      );
    }
  };
  // #endregion

  //=============================================================================
  return (
    <View style={styles.wholeContaine}>
      <View style={styles.mainContainer}>
        {/* ----------part1: 顶部导航 ----------*/}
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

        {/* ----------part 2: 扫码区---------- */}
        <View style={styles.scan_container}>
          <Text style={styles.show_scan_lable}>当前扫入:</Text>

          {/* 用于显示扫码值的 Text */}
          {/* <Text style={styles.show_text_value_lable}>
            {currentQR
              ? `${currentQR.type}  ${currentQR.No}`
              : 'Please scan ...'}
          </Text> */}

          <TextInput
            ref={inputRefScan}
            style={[styles.inputBox]}
            placeholder="等待扫码输入"
            value={scanValue} //展示在输入框里的值
            onChangeText={text => {
              inputChangeText(text);
            }} //每次输入改变调用(默认传入scanValue值)
            editable={true} //可编辑--接受输入的数据
          />
        </View>
        <View style={globalStyles.lineview}></View>

        {/* ----------part 3: 信息展示 ----------*/}
        <View style={styles.detialContainer}>{renderDisplayView()}</View>

        {/* ----------part 4: 底部按钮 ----------*/}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.resetAllButton} onPress={resetAll}>
            <Text style={styles.resetAllButtonText}>Clear All重置</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemScannerScreen;
