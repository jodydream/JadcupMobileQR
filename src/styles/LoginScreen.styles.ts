// src/screens/MainScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING,WH } from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题

const styles = StyleSheet.create({
  wholeContaine: {
    flex:1,
    backgroundColor:theme.colors.primary,
  },
  mainContainer: {
    marginTop: LAYOUT.statusBarHeight,
    flex: 1,
    paddingHorizontal: LAYOUT.margingHorizontal,
    backgroundColor: theme.colors.background,
  },

  //=======================================
  titleContainer: {
    // backgroundColor:'blue',
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.mainTitleHeight,
    
  },

  logoContainer: {
    width:WH.logoW,
    height:WH.logoH,
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
    // fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.onBackground,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: '#CECECE',
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
    height: 60,
    width: '100%',
    alignSelf: 'center',
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  icon: {
    marginRight: 10,
  },
});

export default styles;
