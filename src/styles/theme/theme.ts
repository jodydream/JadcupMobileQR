import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// 定制主题对象
const customTheme = {
  ...DefaultTheme,  // 基于默认主题进行定制
  colors: {
    ...DefaultTheme.colors,
    primary:'#5A9E5E',
    //primary: '#7AC391',            // 绿色：主要颜色，应用于按钮、AppBar等
    secondary: '#7AC391',          // 绿色：次要颜色，应用于次级操作
    background: '#ffffff',         // 白色：背景，用于整个应用背景
    onBackground: 'black',       // 白色：背景上的,文本颜色（深色文本）
    surface: '#EFEFEF',            // 浅灰1：表面背景，卡片等表面使用--输入框边框
    onSurface: '#CECECE',          // 深灰1：表面，上的文本，颜色（黑色文本--输入框文字
    // primaryContainer: '#bbdefb',   // 淡蓝色：用于主要容器
    // secondaryContainer: '#ffe0b2', // 浅橙色：用于次要容器
    // error: '#d32f2f',              // 红色：错误提示颜色
     
    //从深到浅色
    textfontcolorblack:'#000000', 
    textfontcolorgreydark1:'#4F4F4F',
    textfontcolorgreydark2:'#6C6C6C', //
    textfontcolorgreydark3:'#CECECE', //onSurface: '#CECECE', 深
    textfontcolorgreylight:'#EFEFEF', //surface: '#EFEFEF',浅
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
