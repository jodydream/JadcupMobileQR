// src/screens/LoginScreen.tsx
import React, {useEffect, useState} from 'react';
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
import * as loginHelpers from '../utils/loginHelpers'; // 导入--整个文件内容
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 密码可见性

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); //加载状态：只记录每一次动态加载前后的状态
  // const [loginInfo, setLoginInfo] = useState<UserAccount | null>(null); // 存储返回的登录信息

  // ====================系统Hooks====================
  useEffect(() => {
    loadUserAccount();
  }, []);

  // ====================自定义操作====================
  // 1 登录操作
  const handleLogin = async () => {
    setLoading(true); // 开启加载状态
    try {
      const data = {
        Username: username,
        Password: password,
      };
      // 1 拉取登录数据
      const responsejson: any = await postData(
        '/api/Employee/EmployeeLogin',
        data,
      );
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'Go to Home page!',
        visibilityTime: 1000,
      });

      // 2 获得Home页面所用的数据
      // 2-1 功能表数量
      const mobileresult = loginHelpers.getMobiledata(responsejson);
      let sections: MainSection[] =
        loginHelpers.convertToSections(mobileresult);

      // 2-2 用户展示信息
      let userInfo = {
        employeeId: responsejson['data']['employeeId'],
        name: responsejson['data']['name'],
      };

      //#存储---登录信息
      loginHelpers.loginUser(data.Username, data.Password);

      // 3 跳转到Home页面(传入2获得数据)
      navigation.navigate('MainScreen', {sections, userInfo});
    } catch (error) {
      //Alert.alert('Login Failed', 'Invalid credentials or server error'); // 失败提示
      Toast.show({
        type: 'Failed',
        text1: 'Login Failed',
        text2: 'Invalid credentials or server error!',
        visibilityTime: 1000,
      });
    } finally {
      setLoading(false); // 完成加载
    }
  };

  // 2 获取：存在本地的登录数据
  const loadUserAccount = async () => {
    try {
      // 使用 await 来等待异步结果
      let userAccount: UserAccount = await loginHelpers.getLoginStatus();
      console.log('LoginScreen用户信息:', userAccount);
      if (userAccount && userAccount.userName && userAccount.password) {
        //a 本地有登录信息--登录状态
        setUsername(userAccount.userName);
        setPassword(userAccount.password);
        //handleLogin();
      } else {
        //b 无登录信息--退登状态
        // do nothing，用自己输入信息登录
      }
      
    } catch (error) {
      console.error('LoginScreen获取用户登录状态出错:', error);
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
