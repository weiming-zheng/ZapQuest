import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication and redirection
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const path = config.url || '';

    // Case 1: If request has token, add it to headers and proceed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    // Case 2: If URL contains "auth", proceed without token
    if (path.includes('auth')) {
      return config;
    }

    // Case 3: Otherwise, redirect based on URL
    // We need to handle redirection in a way that doesn't break the request cycle
    if (path.includes('parent')) {
      window.location.href = '/parent-login';
    } else if (path.includes('child')) {
      window.location.href = '/child-login';
    } else {
      // Default to parent login if no specific pattern is matched
      window.location.href = '/parent-login';
    }

    // Reject the request with a clear error
    return Promise.reject(new Error('Authentication required'));
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    if (!response.data) {
      return Promise.reject(new Error('Invalid response format'));
    }

    const { code, msg, data } = response.data;
    if (code === 1) {
      return data;
    }
    return Promise.reject(new Error(msg || 'Request failed'));
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token
      localStorage.removeItem('token');

      // Get the current URL path
      const currentPath = window.location.pathname;

      // Determine redirect based on current path
      if (currentPath.includes('parent')) {
        window.location.href = '/parent-login';
      } else if (currentPath.includes('child')) {
        window.location.href = '/child-login';
      } else {
        window.location.href = '/parent-login';
      }
    }
    return Promise.reject(error);
  }
);

// export default api;
export default api;
