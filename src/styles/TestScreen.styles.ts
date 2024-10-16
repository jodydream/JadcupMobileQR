// src/styles/TestScreen.styles.ts
import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING } from '../styles/theme/dimensions';
import theme from '../styles/theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },


  // 1 标题栏
  headerBar: {
    height: 80,
    paddingHorizontal: SPACING.medium,
    backgroundColor: theme.colors.surface,

    flexDirection: 'row', // 水平排列
    justifyContent: 'space-between',// 左中右对齐
    alignItems: 'center',// 垂直居中
  },
  gobackbtn:{
    backgroundColor:'red',
  },
  headerText: {
    backgroundColor:'red',
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  settingbtn:{
    backgroundColor:'red',
  },

  // 2 滑动区域
  scrollContent: {
    padding: SPACING.medium,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.large,
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
    borderRadius: theme.roundness,
    marginBottom: SPACING.small,
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.onSurface,
  },
});

export default styles;
