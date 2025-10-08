import axios from 'axios';

const API_URL = 'http://localhost:3000/lotes';

export const getLotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createLote = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getLoteById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateLote = async (id, data) => {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteLote = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};