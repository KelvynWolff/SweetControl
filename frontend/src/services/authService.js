import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';
const USERS_API_URL = 'http://localhost:3000/usuarios';

export const login = async (login, senha) => {
  const response = await axios.post(`${API_URL}/login`, { login, senha });
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const register = async (userData) => {
  const response = await axios.post(USERS_API_URL, userData);
  return response.data;
};