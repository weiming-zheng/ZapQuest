// src/services/reward.service.js
import axios from 'axios';

const API_BASE_URL = '/api/v1'; 

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    if (response.data.code === 1) {
      return response.data.data;
    }
    return Promise.reject(new Error(response.data.msg || 'Request failed'));
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const rewardService = {
  getShopItems: async (userType) => {
    try {
      const response = await api.get(`/reward/${userType}/shop`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createShopItem: async (itemData) => {
    try {
      const response = await api.post('/reward/parent/shop', itemData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateShopItem: async (shopItemId, itemData) => {
    try {
      const response = await api.patch(`/reward/parent/shop/${shopItemId}`, itemData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteShopItem: async (shopItemId) => {
    try {
      const response = await api.delete(`/reward/parent/shop/${shopItemId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // 获取已购买物品列表
  getPurchasedItems: async (userType) => {
    try {
      const response = await api.get(`/reward/${userType}/redeem`);
      return response;
    } catch (error) {
      throw error;
    }

  },

  // 赎回物品
  redeemItem: async (userType, purchasedItemId) => {
      try {
        const response = await api.patch(`/reward/${userType}/redeem/${purchasedItemId}`);
        return response;
      } catch (error) {
        throw error;
      }
  }

};