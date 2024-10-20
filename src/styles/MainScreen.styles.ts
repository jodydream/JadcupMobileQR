// src/styles/TestScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING, WH, FONT_SIZE} from '../styles/theme/dimensions';
import theme from '../styles/theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1, //如果不设置会导致FlatList 最后几项不能滑动到屏幕上。
    backgroundColor: theme.colors.background,
  },

  // 标题区
  headerBar: {
    // backgroundColor:'red',
    marginHorizontal: SPACING.medium,
    flexDirection: 'row', //水平排列
    alignItems: 'center', //子节点：垂直居中
    justifyContent: 'space-between',
    height:LAYOUT.mainTitleHeight
  },

  headerTitleContainer: {
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

  settingbtn: {
    alignSelf:'flex-end'
  },

  //临时添加
  titleContainer: {
    // backgroundColor:'blue',
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.mainTitleHeight,
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

  // 用户区
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
    //color: theme.colors.primary,
    color:theme.colors.onBackground


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
  itemText: {
    fontSize: FONT_SIZE.MEDI2,
    color: theme.colors.textfontcolorgreydark1,
  },
});

export default styles;
