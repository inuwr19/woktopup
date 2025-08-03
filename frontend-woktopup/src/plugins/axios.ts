// src/plugins/axios.ts

import axiosLib from 'axios';
import Cookies from 'js-cookie';

const axiosTest = axiosLib.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Tambahkan token CSRF (hanya jika ada)
axiosTest.interceptors.request.use((config) => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }

  return config;
});

export default axiosTest;
