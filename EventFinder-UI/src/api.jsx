
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const register = (userData) => {
  return api.post('/register', userData);
};

export const login = (userData) => {
  return api.post('/login', userData);
};

export const logout = () => {
  return api.get('/logout');
};

export default api;
