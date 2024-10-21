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

type Props = StackScreenProps<RootStackParamList, 'StoreToPalletScreen'>;

const StoreToPalletScreen = ({navigation, route}: Props) => {
  const [items, setItems] = useState<QRType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputMode, setIsInputMode] = useState<boolean>(true); // 互斥状态标记
  const inputRef = useRef<TextInput>(null); // Ref to manage TextInput focus

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

  // 切换模式（扫码与键盘输入）
  const toggleInputMode = () => {
    //之前输入的清空
    setInputValue('');

    const newInputMode = !isInputMode;
    setIsInputMode(newInputMode);
    if (newInputMode) {
      // 1 扫码输入---收回键盘
      Keyboard.dismiss();
    } else {
      // 2 键盘输入
      inputRef.current?.focus();
    }
  };

  // 处理用户输入内容
  const handleInputChange = (text: string) => {
    console.log('xxxxxxxx输入状态:', isInputMode);
    setInputValue(text);

    if (isInputMode) {
      //扫码输入
    } else {
      //键盘输入
    }
  };

  // 重置单个item
  const resetItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    Alert.alert('Clear', `Item at index ${index} has been cleared.`);
  };

  // 键盘键入:添加一条
  const keyInputAddItem = ()=> {
    Alert.alert('按钮点击', '你点击了输入框旁边的按钮');
  }

  //========================part2:自定义函数(除了点击外)========================
  // 把一行，添加到列表
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

  //========================part3:框架函数====================================
  useEffect(() => {
    if (inputValue === '') return;
    if (isInputMode) {
      console.log('Processing scanned input:', inputValue);
      handleAddItem();
    } else {
      console.log('Processing manual input:', inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    //默认状态：扫码输入--true
    console.log('-------初始化页面');
    setIsInputMode(true);
    inputRef.current?.focus(); //点亮焦点 且 弹出键盘
    //Keyboard.dismiss();//隐藏键盘
    console.log('------输入状态:', isInputMode);
  }, []);

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
        {/* 状态切换按钮 */}
        <View style={styles.inpu_btn_container}>
          <TouchableOpacity
            style={[
              styles.scanButton,
              {
                backgroundColor: isInputMode
                  ? theme.colors.primary
                  : theme.colors.textfontcolorgreydark3,
              },
            ]}
            onPress={toggleInputMode}>
            <Text style={styles.scanButtonText}>
              {isInputMode ? '扫码输入' : '开启扫码'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.scanButton,
              {
                backgroundColor: isInputMode
                  ? theme.colors.textfontcolorgreydark3
                  : theme.colors.primary,
              },
            ]}
            onPress={toggleInputMode}>
            <Text style={styles.scanButtonText}>
              {isInputMode ? '开启键盘' : '键盘输入'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 输入框view */}
        <View
          style={[
            styles.inputContainer,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <TextInput
            ref={inputRef} // Reference to control focus
            style={[styles.inputBox, {flex: 1}]} // 让 TextInput 占据容器的剩余空间
            placeholder="输入内容"
            value={inputValue}
            onChangeText={handleInputChange}
            editable={true} // 输入框始终是可编辑状态
            onFocus={() => {
              if (isInputMode) {
                // 如果是扫码模式，防止弹出键盘
                inputRef.current?.blur(); // 失去焦点
              }
            }}
          />
          <TouchableOpacity
            style={[styles.inputButton,             {
              backgroundColor: isInputMode
                ? theme.colors.textfontcolorgreydark3
                : theme.colors.primary,
            },]} // 定义按钮的样式
            onPress={keyInputAddItem}>
            <AntDesign name="plus" size={20} color="white" />
          </TouchableOpacity>
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
