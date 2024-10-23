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
import {identifyCode, getQRItemByCode} from '../utils/globalHelpers'; // 根据文件路径导入
import Toast from 'react-native-toast-message';
import {getData} from '../services/api';

type Props = StackScreenProps<RootStackParamList, 'TestScreen'>;

const TestScreen = ({navigation, route}: Props) => {
  const [scanValue, setScanValue] = useState<string>(''); // 用于显示的扫码结果
  const [currentQR, setcurrentQRe] = useState<QRType>(); // 用于Text显示当前扫入的
  const inputRefScan = useRef<TextInput>(null); // TextInput 的引用
  const [loading, setLoading] = useState(false); //加载状态：给用户加载数据的UI提示
  const [palletJson, setPalletJson] = useState<null | any>(null);

  //========================part1:点击事件处理=================================
  // #region Utility Functions
  // 重置所有项
  const resetAll = () => {
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

  const inputChangeText = (code_nuber:string)=> {
    console.log("111111111value:", code_nuber);
    // 设置为新值（清空）
    setScanValue(code_nuber);
    const currentItem = getQRItemByCode(code_nuber)
    setcurrentQRe(currentItem);

  }
  // #endregion

  //========================part2:自定义函数(除了点击外)========================
  // #region Utility Functions
  // 添加一行数据到列表
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

  //setScanValue后:
  useEffect(() => {
    //解决嵌套：setScanValue('xxx')传入了值才会执行这一行 
    if (scanValue) {
      setScanValue(''); 
    } 

    console.log('----------useEffect--------');
    //获取焦点
    getfoucs();
  }, [scanValue]);
  // #endregion

  //========================part 4:拉取webapi数据-本地处理=======================
  // #region Utility Functions
  // 解释：调用了Hooks的函数，必须在页面(React组件)之内用，无法剥离出去。
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
          onChangeText={(text) => {inputChangeText(text);}} //每次输入改变，调用一次(默认传入scanValue值)
          editable={true} //可编辑--接受输入的数据
        />
      </View>
      <View style={globalStyles.lineview}></View>

      {/* part 3: 列表 */}
      <View style={styles.mainContainer}>
      </View>

      {/* 底部按钮 */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.resetAllButton} onPress={resetAll}>
          <Text style={styles.resetAllButtonText}>Clear All重置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestScreen;
