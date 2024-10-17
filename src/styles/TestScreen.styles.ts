// src/screens/MainScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING } from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题 

const styles = StyleSheet.create({
  // 1级别
  wholeContaine: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  // 2级别
  navContainer: {
    marginTop: LAYOUT.statusBarHeight,
    marginHorizontal: LAYOUT.margingHorizontal,
    // backgroundColor:'red'
  },
  mainContainer: {
    flex: 1, //沾满剩下的区域
    marginHorizontal: LAYOUT.margingHorizontal,
    marginBottom: LAYOUT.marginBottom,
    // backgroundColor:'blue'
  },

  //=================
  // 3级
  nav_container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor:theme.colors.primary
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});

export default styles;
