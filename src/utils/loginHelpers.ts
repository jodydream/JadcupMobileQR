// src/utils/loginHelpers.ts
// export const validateEmail = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// export const validatePassword = (password: string): boolean => {
//   // 例如，密码必须至少 8 个字符长
//   return password.length >= 8;
// };

export const loginUser = async (
  email: string,
  password: string,
): Promise<boolean> => {
  // 模拟一个异步登录请求
  return new Promise(resolve => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 2000);
  });
};

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

