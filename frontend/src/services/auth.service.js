// src/services/auth.service.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  loginAsParent: async (email, password) => {
    try {
      const response = await api.post('/auth/parent/login', {
        email,
        password
      });
      
      if (response.data.code === 1 && response.data.data.token) {
        // 存储token
        localStorage.setItem('token', response.data.data.token);
        return { status: "success", role: "parent" };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  },

  loginAsChild: async (loginCode) => {
    try {
      const response = await api.post('/auth/child/login', {
        loginCode
      });
      
      if (response.data.code === 1 && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        return { status: "success", role: "child" };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  },

  register: async (email, password, childName) => {
    try {
      const response = await api.post('/auth/parent/register', {
        email,
        password,
        childName
      });
      
      if (response.data.code === 1) {
        return { status: "success", message: "Registration successful" };
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw error;
    }
  }
};