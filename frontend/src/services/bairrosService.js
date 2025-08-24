import axios from 'axios';

const API_URL = 'http://localhost:3000/bairros';

export const getBairros = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBairroById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBairro = async (bairroData) => {
  const response = await axios.post(API_URL, bairroData);
  return response.data;
};

export const updateBairro = async (id, bairroData) => {
  const response = await axios.patch(`${API_URL}/${id}`, bairroData);
  return response.data;
};

export const deleteBairro = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};