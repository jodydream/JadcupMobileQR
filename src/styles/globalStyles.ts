import {StyleSheet} from 'react-native';
import {LAYOUT, SPACING, FONT_SIZE} from './theme/dimensions'; // 你项目中的常量
import theme from './theme/theme'; // 自定义主题

const globalStyles = StyleSheet.create({
  // 通用的容器样式
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: SPACING.medium,
  },

  // 通用的标题样式
  title: {
    // fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: SPACING.small,
  },

  // 通用的按钮样式
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    // borderRadius: LAYOUT.borderRadius,
    alignItems: 'center',
  },
  buttonText: {
    // fontSize: FONT_SIZE.medium,
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
  },

  // 输入框样式
  input: {
    height: 50,
    borderColor: theme.colors.onSurface,
    borderWidth: 1,
    paddingHorizontal: SPACING.small,
    marginBottom: SPACING.medium,
    // borderRadius: LAYOUT.borderRadius,
    // fontSize: FONT_SIZE.medium,
    color: theme.colors.textfontcolorgreydark1,
  },

  // 居中的内容样式：垂直？水平？
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 通用的分隔线
  separator: {
    height: 1,
    // backgroundColor: theme.colors.border,
    marginVertical: SPACING.medium,
  },

  // 行布局
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // 通用的文本样式
  text: {
    // fontSize: FONT_SIZE.medium,
    // color: theme.colors.text,
  },

  // 通用的错误消息样式
  errorText: {
    color: theme.colors.error,
    // fontSize: FONT_SIZE.small,
    marginTop: SPACING.small,
  },

  //====自定义的======
  line_view_tiny: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.surface,
  },

  // 分割线
  lineview: {
    width: '100%',
    height: 5,
    backgroundColor: theme.colors.surface,
  },
});

export default globalStyles;
