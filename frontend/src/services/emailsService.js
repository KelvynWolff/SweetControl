import axios from 'axios';

const API_URL = 'http://localhost:3000/emails';

export const getEmails = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEmailById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEmail = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateEmail = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteEmail = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};