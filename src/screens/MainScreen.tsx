
// src/screens/MainScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, TextInput, Alert, StyleSheet } from 'react-native';
import { postData } from '../services/api'; // 引入 API 服务
import styles from '../styles/MainScreen.styles';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // 导入导航类型
type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen = ({ navigation }:Props) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Employee Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      {loginInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Login Info:</Text>
          <Text>{JSON.stringify(loginInfo, null, 2)}</Text> {/* 展示登录信息 */}
        </View>
      )}

      <Button
        title="Go to Second Screen"
        onPress={() => navigation.navigate('SecondScreen')}
      />
    </View>
  );
};

export default MainScreen;
