// src/styles/TestScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING, WH, FONT_SIZE} from '../styles/theme/dimensions';
import theme from '../styles/theme/theme';

const styles = StyleSheet.create({
  wholecontainer: {
    backgroundColor:theme.colors.primary,
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    marginTop: LAYOUT.statusBarHeight,
    flex: 1,
    // marginBottom: LAYOUT.marginBottom,
    backgroundColor: theme.colors.background,
  },

  //=======================================
  // 标题区
  titleContainer: {
    paddingHorizontal: SPACING.medium,
    justifyContent:'space-between',
    flexDirection: 'row', //水平排列
    alignItems: 'center', //子节点：垂直居中
    height:LAYOUT.mainTitleHeight
  },

  titleTextContainer: {
    // backgroundColor:'blue',
    alignItems: 'center',
    textAlign:'center',
    alignSelf:'auto'
  },
  headerText: {
    fontSize: FONT_SIZE.BIG1,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  gobackbtn: {
  },

  logoContainer: {
    // backgroundColor:'blue',
    width: WH.logoW,
    height: WH.logoH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  // 用户区================
  userInfoSection: {
    padding: SPACING.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: WH.userAvatarW,
    height: WH.userAvatarH,
    // borderRadius: 40,
    marginRight: SPACING.medium,
  },
  userTextContainer:{
    flex:1
  },

  userNameText: {
    fontSize: FONT_SIZE.BIG2,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  userDetialText: {
    fontSize: FONT_SIZE.MEDI2,
  },
  settingbtn: {
    alignSelf:'flex-end',
    alignItems:'flex-end',
    paddingLeft:40,
    paddingTop:40,
    //backgroundColor:'red',
  },

  // 分割线
  lineview:{
    width:'100%',
    height:5,
    backgroundColor:theme.colors.surface,
  },

  // 功能区
  scrollContent: {
    padding: SPACING.medium,
  },
  section: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.BIG1,
    fontWeight: 'bold',
    marginBottom: SPACING.small,
    color:theme.colors.onBackground,
  },
  item: {
    backgroundColor: theme.colors.surface,
    padding: SPACING.medium,
    borderRadius: 5,
    marginBottom: SPACING.small,
    flexDirection:'row',
  },
  itemIcon: {
    marginRight: 15, // 图标和文字之间的间距
  },
  itemImage: {
    width:25,
    height:25,
    marginRight: 15, // 图标和文字之间的间距
    backgroundColor:'red',
  },
  itemText: {
    fontSize: FONT_SIZE.MEDI2,
    color: theme.colors.textfontcolorgreydark1,
    alignSelf:'center'
  },
});

export default styles;
