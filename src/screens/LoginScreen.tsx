// src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../styles/LoginScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import {postData} from '../services/api'; // 引入 API 服务
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; 
import * as loginHelpers from '../utils/loginHelpers'; // 导入处理函数
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 密码可见性

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);    //加载状态：是否加载完毕
  const [loginInfo, setLoginInfo] = useState(null); // 存储返回的登录信息

  // 登录请求函数
  const handleLogin = async () => {
    setLoading(true); // 开启加载状态
    try {
      const data = {
        Username: username,
        Password: password,
      };
      const response = await postData('/api/Employee/EmployeeLogin', data);
      //Alert.alert('Login Success', 'Go to Home page!'); // 成功提示
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'Go to Home page!',
        visibilityTime: 1000,  // 显示时间为1秒
      });
      const responsejson: any = response;
      const mobileresult = loginHelpers.getMobiledata(responsejson);
      let sections: MainSection[] = loginHelpers.convertToSections(mobileresult);
      //获取用户信息
      let userInfo = {
        "employeeId": responsejson["data"]["employeeId"],
        "name": responsejson["data"]["name"]
      };
      //console.log(userInfo);

      navigation.navigate('MainScreen', {sections,userInfo});
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials or server error'); // 失败提示
    } finally {
      setLoading(false); // 完成加载
    }
  };

  return (
    <View style={styles.wholeContaine}>
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        {/* 标题和 Logo 区域 */}
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/jadcup_logo.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <Text style={styles.headline}>Staff Login</Text>

        {/* 用户名输入框 */}
        <View style={styles.inputContainer}>
          <AntDesign
            name="user"
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#CECECE"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        {/* 密码输入框 */}
        <View style={styles.inputContainer}>
          <AntDesign
            name="lock"
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#CECECE"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <AntDesign
              name={isPasswordVisible ? 'eye' : 'eyeo'}
              size={20}
              color={theme.colors.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* 登录按钮 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
