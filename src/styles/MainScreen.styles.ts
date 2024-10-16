// src/styles/TestScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING } from '../styles/theme/dimensions';
import theme from '../styles/theme/theme';

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    backgroundColor: theme.colors.background,
  },

  // 标题区
  headerBar: {
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
    // backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  gobackbtn: {
  },
  settingbtn: {
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
    borderRadius: 40,
    marginRight: SPACING.medium,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  userRole: {
    fontSize: 16,
    // color: theme.colors.onBackgroundSecondary,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING.small,
    color: theme.colors.primary,
  },
  item: {
    backgroundColor: theme.colors.surface,
    padding: SPACING.medium,
    borderRadius: 5,
    marginBottom: SPACING.small,
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.textfontcolorgreydark2,
  },
});

export default styles;
