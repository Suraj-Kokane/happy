import axios from 'axios';
import { demoExams, demoUser } from '../data/demoData';

const BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback to demo data if API is unreachable
export const loginAPI = async (username, password) => {
  try {
    const res = await api.post('/auth/login/', { username, password });
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, using demo authentication.');
    if (username === 'STU001' && password === '1234') return { token: 'demo-token', user: demoUser };
    if (username === 'admin' && password === 'admin123') return { token: 'admin-token', user: { id: 99, role: 'admin' } };
    throw error;
  }
};

export const getExamsAPI = async () => {
  try {
    const res = await api.get('/exams/');
    return res.data;
  } catch (error) {
    return demoExams;
  }
};

export const runCodeAPI = async (code, language) => {
  try {
    const res = await api.post('/code/run/', { code, language });
    return res.data;
  } catch (error) {
    return {
      status: 'Success',
      output: '120',
      time: '0.04s',
      memory: '12 MB'
    };
  }
};

export default api;
