// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, StatusBar, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../styles/MainScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 密码可见性

  return (
    <View style={styles.wholeContaine}>
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* 标题和 Logo 区域 */}
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/jadcup_logo.png')} style={styles.logo} />
          </View>
        </View>

        <Text style={styles.headline}>Staff Login</Text>

        {/* 用户名输入框 */}
        <View style={styles.inputContainer}>
          <AntDesign name="user" size={24} color={theme.colors.primary} style={styles.icon} />
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
          <AntDesign name="lock" size={24} color={theme.colors.primary} style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#CECECE"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <AntDesign
              name={isPasswordVisible ? 'eye' : 'eyeo'}
              size={24}
              color={theme.colors.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* 登录按钮 */}
        <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Login pressed')}>
          <Text style={styles.buttonText}>Agree and Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
