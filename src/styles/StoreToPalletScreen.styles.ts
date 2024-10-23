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
    flex:1,
    backgroundColor:theme.colors.primary,
  },
  mainContainer: {
    marginTop: LAYOUT.statusBarHeight,
    flex: 1,
    // marginBottom: LAYOUT.marginBottom,
    backgroundColor: theme.colors.background,
  },

  // 2级别
  top_container: {
    //backgroundColor: theme.colors.primary,
    backgroundColor:'red',
  },

  listContainer: {
    flex: 1, // 沾满剩下的区域
    marginBottom: LAYOUT.marginBottom,
  },

  // =================
  // 3级别 标题栏
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.mainTitleHeight,
    justifyContent: 'space-between',
    backgroundColor:theme.colors.primary,
  },
  gobackbtonContainer: {
    width: 60,
    height: 40,
    justifyContent: 'center', //上下居中
    paddingHorizontal: LAYOUT.margingHorizontal,
  },
  title_text: {
    fontSize: FONT_SIZE.BIG1,
    fontWeight: 'bold',
    color: theme.colors.background,
  },

  // ====================
  // 按钮--扫码输入
  // 输入状态按钮样式
  scan_btn_container: {
    marginVertical:5,
    paddingHorizontal: LAYOUT.margingHorizontal,
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

  // 列表项样式2--product
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
    marginHorizontal: LAYOUT.margingHorizontal
  },
  itemTypeText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.MEDI2,
    color: theme.colors.onBackground,
  },
  itemNumberText: {
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
  // 列表项样式2--pallet
  listItemContainerPallet:{
    //backgroundColor:'red',

  },
  itemTextPallet:{
    color:theme.colors.primary,
    fontWeight: 'bold',
  },
 
  // 底部按钮样式=================================
  footerContainer: {
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.xxxLarge,
  },

  total_text: {
    paddingVertical:10,
    fontSize: FONT_SIZE.BIG1,
    color: 'black',
    alignSelf:'flex-end'
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
});

export default styles;
