import {StyleSheet} from 'react-native';
import {
  LAYOUT,
  SPACING,
  FONT_SIZE,
  BUTTON_SIZE,
} from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题

const styles = StyleSheet.create({
  // 1级别
  wholeContaine: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },

  // 2级别
  top_container: {
    marginTop: LAYOUT.statusBarHeight,
    backgroundColor: theme.colors.primary,
  },

  mainContainer: {
    flex: 1, // 沾满剩下的区域
    marginHorizontal: LAYOUT.margingHorizontal,
    marginBottom: LAYOUT.marginBottom,
  },

  // =================
  // 3级别 导航栏
  nav_container: {
    marginHorizontal: LAYOUT.margingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.nav_height,
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav_title_text: {
    fontSize: FONT_SIZE.BIG1,
    fontWeight: 'bold',
    color: 'white',
  },

  // ====================
  // 按钮--扫码输入
  // 输入状态按钮样式
  scan_btn_container: {
    // backgroundColor:'red',
    marginHorizontal: LAYOUT.margingHorizontal,
    marginVertical:5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // 按钮--扫码状态
  showscanview: {
    //backgroundColor:'blue',
    width:100,
    marginRight:10,
    paddingVertical: SPACING.small,
    alignItems: 'flex-start',
  },
  showscanText: {
    paddingVertical:5,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.BIG1,
  },
  scanLable: {
    flex:1,
    paddingLeft:10,
    fontWeight: 'bold',
    color:'black',
    fontSize: FONT_SIZE.MEDI2,
    borderColor: theme.colors.onSurface,
    borderWidth: 1,
    paddingVertical: SPACING.small,
  },
  //====================
  // 输入框view
  inputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  //隐藏UI
  inputBox: {
    height: 1,
    width:1,
    borderColor: theme.colors.onSurface,
    borderWidth: 1,
    opacity: 0
  },
  textvalue: {
    paddingVertical:5,
    color: theme.colors.textfontcolorblack,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.BIG1,

    borderColor: theme.colors.onSurface,
    borderBottomWidth:1
  },
  inputButton: {
    backgroundColor: theme.colors.primary,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10, // 留出一点间距
  },


  // 主要内容部分 核心布局
  scanPrompt: {
    // fontSize: FONT_SIZE.MEDIUM,
    marginTop: SPACING.medium,
    fontWeight: 'bold',
    marginBottom: SPACING.small,
    color: theme.colors.onBackground,
  },

  // 列表项样式
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  itemType: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.MEDI2,
    color: theme.colors.onBackground,
  },
  itemNumber: {
    flex: 2,
    fontSize: FONT_SIZE.MEDI2,
    color: theme.colors.onBackground,
  },
  resetButton: {
    width: BUTTON_SIZE.SMALL_W,
    backgroundColor: '#b22222',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: FONT_SIZE.MEDI2,
    textAlign: 'center',
  },

  total_text: {
    paddingVertical:10,
    fontSize: FONT_SIZE.BIG1,
    // fontWeight: 'bold',
    color: 'black',
    alignSelf:'flex-end'
  },
  // 底部按钮样式
  footerContainer: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.large,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: SPACING.medium,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: SPACING.medium,
  },
  saveButtonText: {
    color: 'white',
    // fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 'bold',
  },
  resetAllButton: {
    backgroundColor: '#b22222',
    paddingVertical: SPACING.medium,
    alignItems: 'center',
    borderRadius: 5,
  },
  resetAllButtonText: {
    color: 'white',
    // fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 'bold',
  },

  // ====================

  // // 按钮：手动输入状态
  // inputButton: {
  //   flex:1,
  //   paddingVertical: SPACING.small,
  //   alignItems: 'center',
  //   borderRadius: 5,

  // },
  // inputButtonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   fontSize: FONT_SIZE.MEDI2,
  // },
});

export default styles;
