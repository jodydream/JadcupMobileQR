// src/services/api.ts
import axios from 'axios';

// 配置API基础URL
const API_BASE_URL = 'https://api.nzcups.co.nz/'; // 替换为你的API地址

// 创建一个 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 请求超时时间
});

// GET 请求：获取数据
export const getData = async (endpoint: string, data: any) => {
  try {
    const response = await api.get(endpoint,data);
    return response.data; // 返回数据
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// POST 请求：创建新数据
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API post error:', error);
    throw error;
  }
};

// PUT 请求封装：更新数据
export const putData = async (endpoint: string, data: any) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data; // 返回更新后的数据
  } catch (error) {
    console.error('API put error:', error);
    throw error;
  }
};


// 其他页面调用
  // const [loading, setLoading] = useState(false); //加载状态：只记录每一次动态加载前后的状态
  // const handleDale = async () => {
  //   setLoading(true); // 开启加载状态
  //   try {
  //     // part1 拉取登录数据==================
  //     const responsejson: any = await postData( '/api/Employee/EmployeeLogin','', );
  //     // part2 处理数据====================
  //   } catch (error) {
  //     Toast.show({
  //       type: 'Failed',
  //       text1: 'Login Failed',
  //       text2: 'Invalid credentials or server error!',
  //       visibilityTime: 1000,
  //     });
  //   } finally {
  //     setLoading(false); // 完成加载
  //   }
  // }
