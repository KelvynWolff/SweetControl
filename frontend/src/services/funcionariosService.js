import axios from 'axios';

const API_URL = 'http://localhost:3000/funcionarios';

export const getFuncionarios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFuncionarioById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createFuncionario = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateFuncionario = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteFuncionario = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateUsuarioRole = async (id, role) => {
  const token = localStorage.getItem('token');
  
  const response = await axios.patch(
    `${API_URL}/${id}/role`, 
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};