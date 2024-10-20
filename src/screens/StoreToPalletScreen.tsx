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
  const qrList: QRType[] = [];
  const [items, setItems] = useState<QRType[]>(qrList);
  const [inputValue, setInputValue] = useState<string>('');

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

    // 处理用户输入内容
    const handleInputChange = (text: string) => {
      setInputValue(text);  // 更新输入框中的值
    };
  
    // 将输入框中的内容添加到列表中
    const handleAddItem = () => {
      if (!inputValue) return; // 如果输入框为空，则不进行操作
  
      const newType = inputValue.length > 6 ? 'Pallet' : 'Product'; // 判断type
      const newItem: QRType = {
        type: newType,
        No: inputValue,  // No 是输入框的值
      };
  
      // 更新 items 列表
      setItems([...items, newItem]);
  
      // 清空输入框
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
        <Text style={styles.resetButtonText}>Reset</Text>
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
        <Text style={styles.scanPrompt}>点击框扫码</Text>
        <TextInput 
          style={styles.inputBox} 
          placeholder="扫码" 
          value={inputValue} 
          onChangeText={(text) => {
            console.log('Input Changed:', text);  // 调试用，确保每次输入时捕获变化
            handleInputChange(text);
          }} 
          onSubmitEditing={() => {
            console.log('Submit Editing');  // 调试用，确保按下回车键时事件被触发
            handleAddItem();
          }} 
          // keyboardType="numeric" // 数字键盘
        />

        {/* 列表部分 */}
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          //scrollEnabled={true}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          // onScroll={() => console.log('Scrolling...')}
          //每一个项目
          renderItem={renderItem}
          // 在列表的顶部添加一个自定义的组件或视图：可用来显示标题、过滤器等
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
          <Text style={styles.resetAllButtonText}>Reset All重置</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreToPalletScreen;
