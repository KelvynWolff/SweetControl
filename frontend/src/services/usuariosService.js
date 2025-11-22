import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios'; 

export const updateUsuarioRole = async (id, role) => {
  const token = localStorage.getItem('token');
  
  const response = await axios.patch(
    `${API_URL}/${id}/role`, 
    { role }, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const createUsuarioVinculado = async (dados) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, dados, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUnlinkedUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/unlinked`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const linkUsuarioToFuncionario = async (userId, funcionarioId, role) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(
    `${API_URL}/${userId}/link`,
    { idFuncionario: funcionarioId, role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};