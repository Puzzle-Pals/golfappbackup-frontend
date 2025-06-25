import axios from 'axios';

// Use the correct base URL (fallback to production backend if not set)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://bp-golf-app-backend.vercel.app/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage (if present) to each request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export { api };