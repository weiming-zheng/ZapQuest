import api from './axios-config'

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
    const data = await api.post('/auth/child/login', {
      loginCode
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      return { 
        status: "success", 
        role: "child",
        name: data.name
      };
    }
    
    throw new Error('Login failed: No token received');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('childLoginCode');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getChildLoginCode: () => {
    return localStorage.getItem('childLoginCode');
  }
};