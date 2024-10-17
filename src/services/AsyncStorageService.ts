import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  
  // 初始化键值并存储数据，如果数据不存在时
  static async initializeData<T>(key: string, initialValue: T): Promise<void> {
    try {
      const existingData = await AsyncStorage.getItem(key);
      if (!existingData) {
        await AsyncStorage.setItem(key, JSON.stringify(initialValue));
        console.log(`初始化 ${key} 为`, initialValue);
      }
    } catch (e) {
      console.error(`初始化 ${key} 时出错:`, e);
    }
  }

  // 获取存储在指定键中的数据
  static async getData<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`获取 ${key} 时出错:`, e);
      return null;
    }
  }

  // 设置/更新存储数据
  static async setData<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(`${key} 已设置为:`, value);
    } catch (e) {
      console.error(`设置 ${key} 时出错:`, e);
    }
  }

  // 更新某个键的特定数据（例如对象数组中的某个元素）
  static async updateData<T>(key: string, updateFn: (data: T) => T): Promise<void> {
    try {
      const data = await this.getData<T>(key);
      if (data) {
        const updatedData = updateFn(data);
        await this.setData(key, updatedData);
      }
    } catch (e) {
      console.error(`更新 ${key} 时出错:`, e);
    }
  }

  // 清除指定键的数据
  static async removeData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`${key} 已被移除`);
    } catch (e) {
      console.error(`移除 ${key} 时出错:`, e);
    }
  }

  // 批量添加（如访客记录），更新后存储
  static async addDataToList<T>(key: string, newItems: T[]): Promise<void> {
    try {
      const existingList = await this.getData<T[]>(key);
      const updatedList = existingList ? [...existingList, ...newItems] : newItems;
      await this.setData(key, updatedList);
      console.log(`数据已添加到 ${key}`);
    } catch (e) {
      console.error(`添加数据到 ${key} 时出错:`, e);
    }
  }
}

export default AsyncStorageService;
