import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING, FONT_SIZE } from '../styles/theme/dimensions'; // 尺寸常量
import theme from '../styles/theme/theme'; // 自定义主题

const styles = StyleSheet.create({
  // 1级别
  wholeContaine: {
    flex:1,
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
    // backgroundColor: 'blue',
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
  // 主要内容部分 核心布局
  scanPrompt: {
    // fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 'bold',
    marginBottom: SPACING.small,
    color: theme.colors.onBackground,
  },
  inputBox: {
    height: 40,
    borderColor: theme.colors.onSurface,
    borderWidth: 1,
    padding: SPACING.small,
    marginBottom: SPACING.medium,
  },

  // 列表头部样式
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.small,
  },
  headerType: {
    // fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  headerNumber: {
    // fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },

  // 列表项样式
  listItemContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  itemType: {
    // fontSize: FONT_SIZE.MEDIUM,
    color: theme.colors.onBackground,
  },
  itemNumber: {
    // fontSize: FONT_SIZE.MEDIUM,
    color: theme.colors.onBackground,
  },
  resetButton: {
    backgroundColor: '#b22222',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    // fontSize: FONT_SIZE.SMALL,
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
});

export default styles;
