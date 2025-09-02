"use client"

import axios from 'axios';

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    try {
      return window.sessionStorage?.getItem('accessToken');
    } catch (error) {
      console.warn('Failed to access sessionStorage:', error);
      return null;
    }
  }
  return null;
};

// Create an Axios instance
const api = axios.create({
  baseURL:  'https://backendlloyd.ryzer.app/api',
  // baseURL:  'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 minutes timeout
});

// Request Interceptor: Attach token from sessionStorage
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Basic Response Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Network error: No response received.');
      return Promise.reject({ message: 'Network Error' });
    }

    return Promise.reject(error);
  }
);

export default api;
