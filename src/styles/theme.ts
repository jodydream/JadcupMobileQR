import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';

// 定制主题对象
const customTheme: MD3Theme = {
  ...DefaultTheme,  // 基于默认主题进行定制
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',            // 蓝色：主要颜色，应用于按钮、AppBar等
    secondary: '#ff9800',          // 橙色：次要颜色，应用于次级操作
    background: '#f5f5f5',         // 浅灰色背景，用于整个应用背景
    surface: '#ffffff',            // 白色表面，卡片等表面使用
    error: '#d32f2f',              // 红色错误提示颜色
    onBackground: '#212121',       // 背景上的文本颜色（深色文本）
    onSurface: '#000000',          // 表面上的文本颜色（黑色文本）
    primaryContainer: '#bbdefb',   // 淡蓝色，用于主要容器
    secondaryContainer: '#ffe0b2', // 浅橙色，用于次要容器
  },
  fonts: {
    ...DefaultTheme.fonts,
    bodyMedium: {
      fontFamily: 'Open Sans',     // 自定义字体 "Open Sans"
      fontSize: 16,                // 正文的字体大小
      fontWeight: '400',           // 字体权重
      lineHeight: 24,              // 行高
      letterSpacing: 0.5,          // 字间距
    },
    headlineLarge: {
      fontFamily: 'Open Sans',     // 标题使用 "Open Sans"
      fontSize: 32,                // 大标题字体大小
      fontWeight: '700',           // 加粗标题
      lineHeight: 40,              // 标题行高
      letterSpacing: 0,            // 标题无字间距
    },
  },
  roundness: 12,  // 设置全局圆角为 12，影响按钮、卡片等组件
  animation: {
    scale: 1.2,   // 设置动画速度稍快，放大动画速度为1.2倍
  },
};

export default customTheme;
