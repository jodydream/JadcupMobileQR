// src/constants/dimensions.ts
import { Dimensions, StatusBar } from 'react-native';

// 获取设备屏幕尺寸
const { width, height } = Dimensions.get('window');

// 行距---暂时没用
export const SPACING = {
  small: 8,
  small2: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 40,
  xxxLarge: 56, //底部按钮
};

// 布局常量
export const LAYOUT = {
  margingHorizontal: 20, // 水平边距
  marginBottom: 10, // 底部边距

  statusBarHeight: StatusBar.currentHeight ||44, // 状态栏高度
  mainTitleHeight : 64,// 就是导航栏
};

// 图标尺寸(宽高)
export const WH = {
  //logo
  logoW:44,
  logoH:44,
  
  //头像
  userAvatarW:80,
  userAvatarH:80,
};

// 字体大小:从小到大
export const FONT_SIZE = { 
  //1 small:
  SMALL1: 14,

  //2 meidium:按钮、内容
  MEDI2:16,

  //3 big:标题类
  BIG1: 18, //小标题：
  BIG2: 24, //大标题：主页-用户名;
}

//按钮大小：
export const BUTTON_SIZE = { 
//1 SMALL
// SMALL_H: 
SMALL_W: 65
}

// 圆角
export const BORDERADIOUS = { 

}


export const SCREEN = {
  width,
  height,
};
