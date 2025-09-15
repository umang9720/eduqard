import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || ""; 
// "" → dev uses proxy
// live URL in production

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
