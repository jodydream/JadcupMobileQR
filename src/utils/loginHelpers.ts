// src/utils/loginHelpers.ts
// export const validateEmail = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// export const validatePassword = (password: string): boolean => {
//   // 例如，密码必须至少 8 个字符长
//   return password.length >= 8;
// };
// export const loginUser = async (
//   email: string,
//   password: string,
// ): Promise<boolean> => {
//   // 模拟一个异步登录请求
//   return new Promise(resolve => {
//     setTimeout(() => {
//       if (email === 'test@example.com' && password === 'password123') {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     }, 2000);
//   });
// };

import AsyncStorageService from '../services/AsyncStorageService'; 

//===========================1 处理拉取到的用户数据===========================
//从login拉取的数据，中提取出Mobile数据
export const getMobiledata = (responsejson: any) => {
  // 获取第一级键 "data"下，'pages'的值
  const datapages = responsejson['data']['pages'];
  // 选出'pages'数组中，特定项
  const mobilePages = datapages.filter(
    (page: {group: {groupName: string}}) => page.group?.groupName === 'Mobile',
  );

  // 提取需要的字段
  const titleArray = mobilePages.map((item: any) => item.pageName.trim());

  console.log(titleArray);
  return titleArray;
};
// 函数：根据输入的字符串数组生成 MainSection[]
export const convertToSections = (input: string[]): MainSection[] => {
    // 初始化固定的 5 个标题和空的 items 数组
    const sections: MainSection[] = [
      {
        title: '生产车间',
        items: [],
      },
      {
        title: '存储货物',
        items: [],
      },
      {
        title: '订单处理中',
        items: [],
      },
      {
        title: '其他',
        items: [],
      },
      {
        title: 'Customer',
        items: [],
      },
    ];
  
    // 遍历输入数组，将每个项根据规则添加到相应的 title 的 items 中
    input.forEach(item => {
      if (item.includes('Store to Pallet')) {
        sections[0].items.push(item); // 生产车间
      } else if (
        item.includes('Pallet Inbound') ||
        item.includes('Pallet Relocate') ||
        item.includes('Merging Pallets') ||
        item.includes('Item Relocate')
      ) {
        sections[1].items.push(item); // 存储货物
      } else if (item.includes('Picking List')) {
        sections[2].items.push(item); // 订单处理中
      } else if (item.includes('Item Scanner') || item.includes('Defect')) {
        sections[3].items.push(item); // 其他
      } else if (
        item.includes('Customers') ||
        item.includes('Create Customer') ||
        item.includes('Create Order') ||
        item.includes('My Products List') ||
        item.includes('All Products') ||
        item.includes('Search Slip')
      ) {
        sections[4].items.push(item); // Customer
      }
    });
  
    // 返回符合 MainSection[] 的数组
    return sections;
  };

//===========================2 管理用户登录信息===========================
const USER_ACCOUNT_KEY = '@userAccount';

// 初始化未登录状态
export const initialUserAccount: UserAccount = {
  userName: null,
  password: null,
};

// 登录逻辑：存储用户信息
export const loginUser = async (userName: string, password: string): Promise<void> => {
  const userAccount: UserAccount = {
    userName,
    password,
  };
  // 将 userAccount 存储到本地
  await AsyncStorageService.setData(USER_ACCOUNT_KEY, userAccount);
  console.log('用户已登录:', userAccount);
};

// 退出登录逻辑：清除用户信息，设置为未登录状态
export const logoutUser = async (): Promise<void> => {
  // 将 userAccount 设置为未登录状态（userName 和 password 置为 null）
  await AsyncStorageService.setData(USER_ACCOUNT_KEY, initialUserAccount);
  console.log('用户已退出登录');
};

// 获取登录状态
export const getLoginStatus = async (): Promise<UserAccount> => {
  const userAccount = await AsyncStorageService.getData<UserAccount>(USER_ACCOUNT_KEY);
  if (userAccount && userAccount.userName && userAccount.password) {
    console.log('loginHelpers用户已登录:', userAccount);
    return userAccount; // 已登录
  } else {
    console.log('loginHelpers用户未登录');
    return initialUserAccount; // 未登录
  }
};

