import axios from 'axios';

const API_URL = 'http://localhost:3000/telefones';

export const getTelefones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTelefoneById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTelefone = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateTelefone = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteTelefone = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};