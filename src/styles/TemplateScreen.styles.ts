// src/screens/MainScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING } from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题

const styles = StyleSheet.create({
  wholeContaine: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    marginTop: LAYOUT.statusBarHeight,
    marginHorizontal: LAYOUT.margingHorizontal,
    marginBottom: LAYOUT.marginBottom,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  logoContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});

export default styles;
