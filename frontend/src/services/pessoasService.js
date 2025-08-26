import axios from 'axios';

const API_URL = 'http://localhost:3000/pessoas';

export const getPessoas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPessoaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPessoa = async (pessoaData) => {
  const response = await axios.post(API_URL, pessoaData);
  return response.data;
};

export const updatePessoa = async (id, pessoaData) => {
  const response = await axios.patch(`${API_URL}/${id}`, pessoaData);
  return response.data;
};

export const deletePessoa = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};