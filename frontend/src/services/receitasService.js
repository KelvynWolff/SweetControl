import axios from 'axios';

const API_URL = 'http://localhost:3000/receitas';

export const getReceitas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getReceitaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getReceitaByProdutoId = async (produtoId) => {
  const response = await axios.get(`${API_URL}?idProduto=${produtoId}`);
  return response.data;
};

export const createReceita = async (receitaData) => {
  const response = await axios.post(API_URL, receitaData);
  return response.data;
};

export const updateReceita = async (id, receitaData) => {
  const response = await axios.patch(`${API_URL}/${id}`, receitaData);
  return response.data;
};

export const deleteReceita = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};  