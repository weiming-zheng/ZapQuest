import api from './axios-config'
import { useNavigate } from 'react-router-dom'

export const authService = {
  register: async (email, password, childName) => {
    const data = await api.post('/auth/parent/register', {
      email,
      password,
      childName
    });

    // Store token and child login code
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('childLoginCode', data.childLoginCode);
      return {
        status: "success",
        message: "Registration successful",
        childLoginCode: data.childLoginCode
      };
    }
    
    throw new Error('Registration failed: No token received');
  },

  loginAsParent: async (email, password) => {
    const data = await api.post('/auth/parent/login', {
      email,
      password
    });
    
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('childLoginCode', data.childLoginCode);
      return { 
        status: "success", 
        role: "parent",
        childLoginCode: data.childLoginCode
      };
    }
    
    throw new Error('Login failed: No token received');
  },

  loginAsChild: async (loginCode) => {
    try {
      const response = await api.post('/auth/child/login', {
        loginCode
      });
      
      // 由于 axios-config 已经处理了基础的错误情况和数据提取
      // 我们只需要处理登录特定的逻辑
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('childName', response.name);
        return { status: "success", role: "child" };
      }
      
      throw new Error('Login failed');
    } catch (error) {
      throw error;
    }
  },

  logoutChild: () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('childLoginCode');
    localStorage.removeItem('childName');
  },

  logoutParent: () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('childLoginCode');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getChildLoginCode: () => {
    return localStorage.getItem('childLoginCode');
  },
};