

// 根据二维码，返回：码【类型】
export const identifyCode = (currentCodeNo: string): number => {
    const palletPattern = /^(\d{3}|\d{6}|\d{2}-\d{2}-\d{4}T\d{6})$/;
    const cellPattern = /^[A-Z]\d{2}-[A-Z\d]{1,2}-[A-Z\d]{1,2}$/;
    const barcodePattern = /^\d{12,16}$/;
  
    if (palletPattern.test(currentCodeNo)) {
      return 2; //'Pallet Code';
    } else if (cellPattern.test(currentCodeNo)) {
      return 3; //'Cell Code';
    } else if (barcodePattern.test(currentCodeNo)) {
      return 1; //'Barcode';
    } else {
      return -1; //'Invalid Code';
    }
  };

// 根据二维码,返回：码对象
export const getQRItemByCode = (currentCodeNo: string) => { 
  const typecode = identifyCode(currentCodeNo);
  let currentcodeType;
  if(typecode === 2) {
    currentcodeType = 'Pallet';
  } else if(typecode === 3) {
    currentcodeType = 'Cell';
  } else if(typecode === 1) {
    currentcodeType = 'Barcode';
  } else {
    currentcodeType = '';
  }

  const currentItem: QRType = {
    type: currentcodeType,
    No: currentCodeNo,
  };

  return currentItem;
}