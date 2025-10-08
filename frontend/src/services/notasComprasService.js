import axios from 'axios';

const API_URL = 'http://localhost:3000/notas-compras';

export const getNotasCompras = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createNotaCompra = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};