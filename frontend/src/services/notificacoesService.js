import axios from 'axios';

const API_URL = 'http://localhost:3000/notificacoes';

export const getNotificacoes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createNotificacao = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const deleteNotificacao = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};