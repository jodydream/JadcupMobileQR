// src/screens/MainScreen.styles.ts

import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING, SCREEN } from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: LAYOUT.statusBarHeight,
    paddingHorizontal: LAYOUT.paddingHorizontal,
    paddingBottom: LAYOUT.paddingBottom,
    backgroundColor: theme.colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: SPACING.medium,
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  input: {
    height: 50,
    marginBottom: SPACING.medium,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surface,
  },
  loginButton: {
    height: 50,
    width: SCREEN.width * 0.8,
    alignSelf: 'center',
    borderRadius: theme.roundness,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
