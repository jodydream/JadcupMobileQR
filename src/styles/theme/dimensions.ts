// src/constants/dimensions.ts
import { Dimensions, StatusBar } from 'react-native';

// 获取设备屏幕尺寸
const { width, height } = Dimensions.get('window');

// 全局尺寸常量
export const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
  xLarge: 32,
};

export const LAYOUT = {
  paddingHorizontal: 82, // 水平边距
  paddingBottom: 82, // 底部边距
  statusBarHeight: StatusBar.currentHeight || 20, // 状态栏高度
};

export const SCREEN = {
  width,
  height,
};
