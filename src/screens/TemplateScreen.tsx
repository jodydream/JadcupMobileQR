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
import styles from '../styles/TemplateScreen.styles';

const LoginScreen = () => {

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
