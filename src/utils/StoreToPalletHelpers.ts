

//1 检查 输入数组合法性
export const validateQRArray = (qrArray: QRType[]): number => {
  if (qrArray.length === 0) {
    return 1; // 空数组可以直接认为满足条件。
  }
  // 第一条：检查第一个元素的 type 是否是 'Pallet'
  if (qrArray[0].type !== 'Pallet') {
    return 2;
  }
  // 第二条：检查其余元素的 type 是否都是 'Product'
  for (let i = 1; i < qrArray.length; i++) {
    if (qrArray[i].type !== 'Product') {
      return 3;
    }
  }
  // 第三条：检查是否有重复的数据
  const seen = new Set<string>();
  for (const item of qrArray) {
    const key = `${item.type}-${item.No}`;
    if (seen.has(key)) {
      return 4; // 有重复数据
    }
    seen.add(key);
  }

  // 所有条件都满足
  return 1;
};

//2 获取托盘信息
export const getPalletInfo = (qrArray: QRType[]): any => {
  if (qrArray.length != 0) {
    return qrArray[0];
  } else {
    return null;
  }
};


