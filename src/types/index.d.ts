// 定义 Section 类型
interface MainSection {
  title: string;
  items: string[];
}

// 用户登录
interface UserAccount {
  userName: string | null;
  passWord: string | null;
}

//扫码类型
interface QRType {
  type: string | null;
  No: string | null;
}


//====================数据库表结构对应=================
// 托盘json
// export interface PalletJson {
//   data: PlateData;
//   success: boolean;
//   errorCode: string | null;
//   errorMessage: string | null;
// }

// 【托盘】对象
interface PlateData {
  plateId: number;
  plateCode: string;
  plateTypeId: number;
  createdAt: string; // ISO 日期字符串
  package: number;
  position: string | null;
  plateCodeWithNote: string | null;
  plateType: PlateType;
  shelf: string | null;
  tmpZone: string | null;
  plateBox: PlateBox[]; // plateBox 是一个包含多个对象的数组
}

// 托盘类型---`plateType` 对象的类型
interface PlateType {
  plateTypeId: number;
  plateTypeName: string;
}

// 托盘的Box元素---`plateBox` 数组中每个元素的类型
interface PlateBox {
  plateId: number;
  boxId: string;
  plateBoxId: number;
  active: number;
  createdAt: string; // ISO 日期字符串
  updatedAt: string | null; // 可能为 null
  rawMaterialBoxId: string | null;
  box: Box; // 嵌套的 `box` 对象
  rawMaterialBox: RawMaterialBox | null; // 可能为 null
}

// 托盘的Box元素中的[box对象]-----`box` 对象的类型
interface Box {
  boxId: string;
  barCode: string;
  suborderId: string;
  createdAt: string; // ISO 日期字符串
  quantity: number;
  sequence: number;
  productId: number;
  isSemi: number;
  status: number;
  notes: string | null;
  exWarehouse: number;
  product: Product | null; // 可能为 null
}



//页面：扫码------------------------------------------
//Pallet页面--产品数组
interface BoxType {
  barCode: string;
  productCode: string | null;
  status: string | number;
}

