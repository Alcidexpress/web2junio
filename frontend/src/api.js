// src/api.js
import axios from 'axios';

const URL_BASE = 'http://54.173.243.176/api'; // Usa tu IP pública o dominio

const api = axios.create({
  baseURL: URL_BASE,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
