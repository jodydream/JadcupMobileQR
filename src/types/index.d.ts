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
