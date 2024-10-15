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
  },
  headline: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.onBackground,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CECECE',
    borderRadius: theme.roundness,
    marginTop: 30,
    marginBottom: SPACING.medium,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: theme.colors.onSurface,
  },
  loginButton: {
    marginTop: 60,
    height: 50,
    width: '100%',
    alignSelf: 'center',
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});

export default styles;
