import {StyleSheet} from 'react-native';
import {
  LAYOUT,
  SPACING,
  FONT_SIZE,
  BUTTON_SIZE,
} from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题

const styles = StyleSheet.create({
  // 1级别========================================================
  wholeContaine: {
    flex:1,
    backgroundColor:theme.colors.primary,
  },

  mainContainer: {
    marginTop: LAYOUT.statusBarHeight,
    flex: 1,
    // marginBottom: LAYOUT.marginBottom,
    backgroundColor: theme.colors.background,
  },

  // 2级别========================================================
  top_container: {
    backgroundColor: theme.colors.primary,
  },

  detialContainer: {
    flex: 1, // 沾满剩下的区域
    marginHorizontal:LAYOUT.margingHorizontal
    // paddingHorizontal: LAYOUT.margingHorizontal,
    //backgroundColor:'blue',
  },
  footerContainer: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.large,
  },

  // 3级别========================================================
  // ----------part1: 顶部导航 ----------
  nav_container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.mainTitleHeight,
    justifyContent: 'space-between',
  },
  gobackbtonContainer: {
    width: 60,
    height: 40,
    justifyContent: 'center', //上下居中
    paddingHorizontal: LAYOUT.margingHorizontal,
  },
  nav_title_text: {
    fontSize: FONT_SIZE.BIG1,
    fontWeight: 'bold',
    color: 'white',
  },

  // ----------part 2: 扫码区----------
  // 按钮--扫码输入
  // 输入状态按钮样式
  scan_btn_container: {
    marginHorizontal: LAYOUT.margingHorizontal,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // 按钮--扫码状态
  showscanview: {
    width: 100,
    marginRight: 10,
    paddingVertical: SPACING.small,
    alignItems: 'flex-start',
  },
  showscanText: {
    paddingVertical: 5,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.BIG1,
  },
  // 输入框view
  inputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  //隐藏UI
  inputBox: {
    height: 1,
    width: 1,
    borderColor: theme.colors.onSurface,
    borderWidth: 1,
    opacity: 0,
  },
  textvalue: {
    paddingVertical: 5,
    color: theme.colors.textfontcolorblack,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.BIG1,
    borderColor: theme.colors.onSurface,
    borderBottomWidth: 1,
  },

  //----------part 3: 信息展示 -------------
  // 托盘信息Container
  palletContainer: {
    flex:1,
    marginTop:15
  },
  palletTitle: {
    textAlign: 'center',
    fontSize: FONT_SIZE.BIG1,
    fontWeight: 'bold',
    marginBottom: SPACING.small,
    color:theme.colors.primary,
    // backgroundColor:'red',
    //paddingVertical:10,
  },
  palletInfo: {
    fontSize: FONT_SIZE.MEDI2,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: SPACING.small,
    paddingTop:10,
  },
  palletSubtitle: {
    fontSize: FONT_SIZE.MEDI2,
    color: 'black',
    marginTop: SPACING.small,
    marginBottom: SPACING.small,
    fontWeight: 'bold',
    paddingTop:10,
  },
  listHeader: {
    backgroundColor: theme.colors.textfontcolorgreylight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
    borderRadius: 5,
  },
  listHeaderItem: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE.SMALL1,
    color: theme.colors.textfontcolorgreydark2,
    textAlign:'center',
    
  },
  listRow: {
    //backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  listItem: {
    textAlign:'center',
    // backgroundColor:'red',
    fontSize: FONT_SIZE.MEDI2,
    color: theme.colors.textfontcolorgreydark2,

  },
  //  ----------part 4: 底部按钮 ----------
  resetAllButton: {
    backgroundColor: '#b22222',
    paddingVertical: SPACING.medium,
    alignItems: 'center',
    borderRadius: 5,
  },
  resetAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
