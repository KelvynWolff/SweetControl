import axios from 'axios';

const API_URL = 'http://localhost:3000/insumos';

export const getInsumos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getInsumoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createInsumo = async (insumoData) => {
  const response = await axios.post(API_URL, insumoData);
  return response.data;
};

export const updateInsumo = async (id, insumoData) => {
  const response = await axios.patch(`${API_URL}/${id}`, insumoData);
  return response.data;
};

export const deleteInsumo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};