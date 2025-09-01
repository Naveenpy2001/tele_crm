import axios from 'axios';


export const API_BASE_URL = 'http://127.0.0.1:8000';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      
      localStorage.removeItem('adminToken');
      window.location.href = '/user/login';
    }
    return Promise.reject(error);
  }
);


export const authEndpoints = {
  login: '/token/',
  refresh: '/token/refresh/',
};


export default api; 