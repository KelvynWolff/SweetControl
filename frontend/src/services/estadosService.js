import axios from 'axios';

const API_URL = 'http://localhost:3000/estados';

export const getEstados = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEstadoBySigla = async (sigla) => {
  const response = await axios.get(`${API_URL}/${sigla}`);
  return response.data;
};

export const createEstado = async (estadoData) => {
  const payload = { ...estadoData, sigla: estadoData.sigla.toUpperCase() };
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const updateEstado = async (sigla, estadoData) => {
  const response = await axios.patch(`${API_URL}/${sigla}`, estadoData);
  return response.data;
};

export const deleteEstado = async (sigla) => {
  const response = await axios.delete(`${API_URL}/${sigla}`);
  return response.data;
};