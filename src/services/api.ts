// src/services/api.ts
import axios from 'axios';

// 配置API基础URL
const API_BASE_URL = 'https://api.nzcups.co.nz/'; // 替换为你的API地址

// 创建一个 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 请求超时时间
});

// GET 请求封装
export const getData = async (endpoint: string, data: any) => {
  try {
    const response = await api.get(endpoint);
    return response.data; // 返回数据
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// POST 请求封装（可根据需要扩展）
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API post error:', error);
    throw error;
  }
};
