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
import styles from '../styles/TestScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型
import {getQRItemByCode, processScanValue} from '../utils/globalHelpers'; // 根据文件路径导入
import {showMessage} from 'react-native-flash-message';
import {getData} from '../services/api';

type Props = StackScreenProps<RootStackParamList, 'TestScreen'>;
const TestScreen = ({navigation, route}: Props) => {
  const [scanValue, setScanValue] = useState<string>(''); // 扫码信息---输入框
  const [currentQR, setcurrentQRe] = useState<QRType>(); // 扫码信息---展示lable
  const inputRefScan = useRef<TextInput>(null); // TextInput 的引用
  const [loading, setLoading] = useState(false); //加载状态：给用户加载数据的UI提示
  const [palletJson, setPalletJson] = useState<null | any>(null);
  //const [barArray, setbarArrayn] = useState<null | any>(null);
  const [barJson, setBarJson] = useState<null | any>(null);
  const [cellJson, setCellJson] = useState<null | any>(null);

  const barArray = [
    {
      barCode: '100000364814',
      productName: 'SW4-White',
      status: '出货中',
    },
    {
      barCode: '100000364815',
      productName: 'SW4-Black',
      status: '出货中',
    },
    {
      barCode: '100000364816',
      productName: 'SW4-Red',
      status: '出货中',
    },
    {
      barCode: '100000364817',
      productName: 'SW4-Blue',
      status: '出货中',
    },
    {
      barCode: '100000364818',
      productName: 'SW4-Green',
      status: '出货中',
    },
    {
      barCode: '100000364819',
      productName: 'SW4-Green',
      status: '出货中',
    },
    {
      barCode: '100000364820',
      productName: 'SW4-Green',
      status: '出货中',
    },
    {
      barCode: '100000364821',
      productName: 'SW4-Green',
      status: '出货中',
    },
    {
      barCode: '100000364822',
      productName: 'SW4-Green',
      status: '出货中',
    },
    {
      barCode: '100000364823',
      productName: 'SW4-Green',
      status: '出货中',
    },
    {
      barCode: '100000364824',
      productName: 'SW4-Green',
      status: '出货中',
    },
    {
      barCode: '100000364825',
      productName: 'SW4-Green',
      status: '出货中',
    },
  ];
  //========================part1:点击事件处理=================================
  // #region Utility Functions
  // 重置所有项
  const resetAll = () => {
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

  //【关键函数！】
  const inputChangeText = (code_number: string) => {
    //清空输入框内的老数据
    let new_code_number;
    if (currentQR && currentQR.No) {
      new_code_number = processScanValue(currentQR.No, code_number);
    } else {
      new_code_number = code_number;
    }
    const new_currentQR = getQRItemByCode(new_code_number);

    //用新数据，重置关联的值
    setScanValue(new_code_number);
    setcurrentQRe(new_currentQR);
  };
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

  useEffect(() => {
    //解决嵌套:
    //set非空值，就会自动触发清空------------打印两次
    //set空值，不会再触发清空(不会循环清空)
    // if (scanValue) {
    //   setScanValue('');
    //   console.log('----------useEffect--------in');
    // }

    console.log('----------useEffect--------out');
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
      showMessage({
        message: 'Failed',
        description: 'Get Data Failed!',
        type: 'warning',
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
      const responsejson = await getData('/api/Box/GetBoxByBarCode', data);
      // 返回-在其他地方处理数据
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
    console.log('================currentQR?.type:', currentQR?.type);
    if (currentQR?.type === 'Pallet') {
      return (
        <View style={styles.palletContainer}>
          <Text style={styles.pallet_main_title}>托盘信息</Text>
          <View style={globalStyles.line_view_tiny}></View>

          <View style={styles.pallet_subtitle_container}>
            <Text style={styles.pallet_subtitle}>托盘编号</Text>
            <Text style={styles.pallet_subtitle_value}>{currentQR.No}</Text>
          </View>

          <View style={globalStyles.line_view_tiny}></View>

          {/* 货物列表 */}
          <View style={styles.pallet_subtitle_container}>
            <Text style={styles.pallet_subtitle}>货物列表</Text>
            <Text style={styles.pallet_subtitle_value}>总计{barArray.length}件</Text>
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
                  {item.productName}
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
        <View>
          <Text>Barcode</Text>
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

export default TestScreen;
