import axios from 'axios';

const API_URL = 'http://localhost:3000/fornecedores';

export const getFornecedores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFornecedorById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createFornecedor = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateFornecedor = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteFornecedor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};