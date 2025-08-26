import axios from 'axios';

const API_URL = 'http://localhost:3000/enderecos';

export const getEnderecos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEnderecoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEndereco = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateEndereco = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteEndereco = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};