
export const identifyCode = (text: string): number => {
    const palletPattern = /^(\d{3}|\d{6}|\d{2}-\d{2}-\d{4}T\d{6})$/;
    const cellPattern = /^[A-Z]\d{2}-[A-Z\d]{1,2}-[A-Z\d]{1,2}$/;
    const barcodePattern = /^\d{12,16}$/;
  
    if (palletPattern.test(text)) {
      return 2; //'Pallet Code';
    } else if (cellPattern.test(text)) {
      return 3; //'Cell Code';
    } else if (barcodePattern.test(text)) {
      return 1; //'Barcode';
    } else {
      return -1; //'Invalid Code';
    }
  };
  