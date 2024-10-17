// src/styles/TestScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING } from '../styles/theme/dimensions';
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
    height:LAYOUT.mainTitleHeight
  },

  headerTitleContainer: {
    // backgroundColor:'blue',
    alignItems: 'center',
    textAlign:'center',
    alignSelf:'auto'
  },
  headerText: {
    fontSize: 18,
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
    height: 44,
  },
  logoContainer: {
    backgroundColor:'blue',
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

  // 用户区
  userInfoSection: {
    padding: SPACING.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 80,
    height: 80,
    // borderRadius: 40,
    marginRight: SPACING.medium,
  },
  userTextContainer:{
    flex:1
  },

  userNametext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  userRoletext: {
    fontSize: 16,
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
    fontSize: 18,
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
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.textfontcolorgreydark1,
  },
});

export default styles;
