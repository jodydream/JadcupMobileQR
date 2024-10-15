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
import styles from '../styles/MainScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import {postData} from '../services/api'; // 引入 API 服务

const LoginScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 密码可见性

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
      //setLoginInfo(response); // 设置登录信息
      Alert.alert('Login Success', JSON.stringify(response)); // 成功提示
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


      </View>
    </View>
  );
};

export default LoginScreen;
