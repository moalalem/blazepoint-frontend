// src/services/api.js

import axios from 'axios';

// ============================================
// الإعدادات الأساسية
// ============================================
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// Request Interceptor — إضافة التوكن تلقائياً
// ============================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================
// Response Interceptor — معالجة 401
// ============================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');

      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// APIs
// ============================================

// Authentication
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// Partners
export const partnersAPI = {
  getAll: () => api.get('/partners'),
  getOne: (id) => api.get(`/partners/${id}`),
  create: (data) => api.post('/partners', data),
  update: (id, data) => api.put(`/partners/${id}`, data),
  delete: (id) => api.delete(`/partners/${id}`),
};

// Portfolio
export const portfolioAPI = {
  getAll: () => api.get('/portfolio'),
  getOne: (id) => api.get(`/portfolio/${id}`),
  create: (data) => api.post('/portfolio', data),
  update: (id, data) => api.put(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`),
};

// Blog
export const blogAPI = {
  getAll: () => api.get('/blog'),
  getBySlug: (slug) => api.get(`/blog/slug/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
};

// FAQ
export const faqAPI = {
  getAll: () => api.get('/faq'),
  getOne: (id) => api.get(`/faq/${id}`),
  create: (data) => api.post('/faq', data),
  update: (id, data) => api.put(`/faq/${id}`, data),
  delete: (id) => api.delete(`/faq/${id}`),
};

// Contact Messages
export const contactAPI = {
  getAll: () => api.get('/contact'),
  getOne: (id) => api.get(`/contact/${id}`),
  update: (id, data) => api.put(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`),
};

export default api;