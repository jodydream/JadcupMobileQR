

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

//3 把qrArray 改造成【上托盘】接口的参数类型
export const convertQRArray = (qrArray: QRType[]) => {
  // 获取 plateCode，应该是第一个元素的 No 值，且类型是 'Pallet'
  const plateCode = qrArray[0].type === 'Pallet' ? qrArray[0].No : null;
  if (!plateCode) {
    throw new Error('Invalid QR array: The first element must be a Pallet');
  }

  // 构造新的数组，只保留 type 为 'Product' 的元素，plateCode 相同，boxBarcode 对应每个 'Product' 的 No
  const result = qrArray
    .filter((item) => item.type === 'Product') // 只保留 type 为 'Product' 的元素
    .map((item) => ({
      boxBarcode: item.No,
      plateCode: plateCode,
    }));

  return result;
};

// 判断：货物是否本身就在托盘上
export const isBarcodeInPalletJson = (palletJson:any, barCode:string) => {
  // 检查 palletJson 是否为空或结构不正确
  if (!palletJson || !palletJson.data || !Array.isArray(palletJson.data.plateBox)) {
    return false;
  }

  // 遍历 plateBox 数组，检查每个 box 中的 barCode 是否与传入的 barCode 相同
  for (const plateBox of palletJson.data.plateBox) {
    if (plateBox.box && plateBox.box.barCode === barCode) {
      return true; // 找到匹配的 barCode，返回 true
    }
  }

  return false; // 未找到匹配的 barCode，返回 false
};

