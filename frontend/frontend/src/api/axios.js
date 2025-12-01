import axios from 'axios';

const base = 'http://localhost:3000';

const api = axios.create({
  baseURL: base + '/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {}
  return config;
});

export default api;
