// src/services/reward.service.js
import api from "./axios-config";

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
  },

  // get the amount of coin
  getCoinBalance: async () => {
    try {
      const response = await api.get(`/task/child/balance`);
      return response;
    } catch (error) {
      throw error;
    }
  }



};