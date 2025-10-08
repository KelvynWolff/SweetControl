import api from './api';

export const createEntrada = (payload) => {
  return api.post('/nota-entrada', payload);
};

export const getEntradas = () => {
  return api.get('/nota-entrada');
};

export const getEntradaById = (id) => {
  return api.get(`/nota-entrada/${id}`);
};