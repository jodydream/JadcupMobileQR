// src/screens/MainScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING,FONT_SIZE } from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题 

const styles = StyleSheet.create({
  // 1级别
  wholeContaine: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  // 2级别
  top_container: {
    marginTop: LAYOUT.statusBarHeight,
    backgroundColor:theme.colors.primary
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
    marginHorizontal: LAYOUT.margingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.nav_height,
    justifyContent:'space-between'
    
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
  },
  nav_title_text: {
    fontSize: FONT_SIZE.BIG1,
    fontWeight: 'bold',
    color:'white',
  },
});

export default styles;
