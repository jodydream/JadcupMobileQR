
// Pallet区域--产品数组
export const getProducts = (productsOfPalletJson: any): BoxType[] => {
  // 检查传入的数据是否符合要求
  if (!productsOfPalletJson || !Array.isArray(productsOfPalletJson.data)) {
    return [];
  }

  // 遍历 data 数组并提取 barCode, productName 和 status
  const productsArray = productsOfPalletJson.data.map((item: any) => {
    // 检查 item 中是否包含 product，以及 product 是否有 productName
    const productCode =
      item.product && item.product.productCode
        ? item.product.productCode
        : 'Unknown';

    let tempStatus;
    if(item.status == 0) {
      tempStatus = '出库失效';
    } else if(item.status == 1) {
      tempStatus = '正常';
    } else if(item.status == 2) {
      tempStatus = '正在出库';
    } else {
      tempStatus = '未知情况'
    }

    return {
      barCode: item.barCode, // 从 data 对象中直接提取 barCode
      productCode: productCode, // 从 product 中提取 productName，若不存在则设为 "Unknown"
      status: tempStatus, // 从 data 对象中直接提取 status
    };
  });

  return productsArray;
};


//Barcode区域
export const getBarcodeViewInfo = (productsJson: any): BarType => {
  // 检查传入数据的结构是否符合要求
  if (!productsJson || !productsJson.data) {
    throw new Error("Invalid productsJson structure");
  }

  const data = productsJson.data;

  // 提取数据
  const barCode = data.barCode;
  const productCode = data.product ? data.product.productCode : null;
  const quantity = data.quantity;
  const palletNo = data.palletNo;
  const position = data.position ? data.position : 'Packaging';

  // 返回符合 BarType 类型的对象
  return {
    barCode,
    productCode,
    quantity,
    palletNo,
    position
  };
};
