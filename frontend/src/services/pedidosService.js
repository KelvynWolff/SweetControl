import axios from 'axios';

const API_URL = 'http://localhost:3000/pedidos';

export const getPedidos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPedidoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPedido = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updatePedido = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deletePedido = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updatePedidoStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/${id}`, { status });
  return response.data;
};


export const enviarEmailPedido = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/enviar-email`);
  return response.data;
};