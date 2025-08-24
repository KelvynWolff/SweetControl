import axios from 'axios';

const API_URL = 'http://localhost:3000/promocoes';

export const getPromocoes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPromocaoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPromocao = async (promocaoData) => {
  const response = await axios.post(API_URL, promocaoData);
  return response.data;
};

export const updatePromocao = async (id, promocaoData) => {
  const response = await axios.patch(`${API_URL}/${id}`, promocaoData);
  return response.data;
};

export const deletePromocao = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};