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

export const uploadNotaXml = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/upload-xml`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getNotaCompraById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const deleteNotaCompra = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};