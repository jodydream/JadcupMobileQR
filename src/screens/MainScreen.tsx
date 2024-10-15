// src/screens/LoginScreen.tsx
import React from 'react';
import { View, StatusBar, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper'; // 不再导入 PaperProvider
import styles from '../styles/MainScreen.styles';
import theme from '../styles/theme/theme'; // 自定义主题
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* 标题和 Logo 区域 */}
      <View style={styles.titleContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/jadcup_logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Staff Login</Text>
      </View>

      {/* 用户名输入框，使用 AntDesign 的 user 图标 */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        mode="outlined"
        left={<TextInput.Icon icon={() => <AntDesign name="user" size={24} color={theme.colors.primary} />} />}
      />

      {/* 密码输入框，使用锁图标 */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon icon={() => <AntDesign name="lock" size={24} color={theme.colors.primary} />} />}
        right={<TextInput.Icon icon={() => <AntDesign name="eyeo" size={24} color={theme.colors.primary} />} />}
      />

      {/* 登录按钮 */}
      <Button
        mode="contained"
        onPress={() => console.log('Login pressed')}
        style={styles.loginButton}
      >
        <Text style={styles.buttonText}>Agree and Sign In</Text>
      </Button>
    </View>
  );
};


export default LoginScreen;
