import axios from 'axios';

const API_URL = 'http://localhost:3000/cidades';

export const getCidades = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCidadeByCodigo = async (codigobge) => {
  const response = await axios.get(`${API_URL}/${codigobge}`);
  return response.data;
};

export const createCidade = async (cidadeData) => {
  const response = await axios.post(API_URL, cidadeData);
  return response.data;
};

export const updateCidade = async (codigobge, cidadeData) => {
  const response = await axios.patch(`${API_URL}/${codigobge}`, cidadeData);
  return response.data;
};

export const deleteCidade = async (codigobge) => {
  const response = await axios.delete(`${API_URL}/${codigobge}`);
  return response.data;
};

export const getCidadesByEstado = async (estadoSigla) => {
  const response = await axios.get(API_URL);
  return response.data.filter(cidade => cidade.estado === estadoSigla);
};