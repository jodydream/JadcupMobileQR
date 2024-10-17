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
    marginTop:10,
    padding: SPACING.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
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
