import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnderecos, deleteEndereco } from '../../services/enderecosService';
import '../tables.css';

const EnderecosList = () => {
  const [enderecos, setEnderecos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEnderecos().then(setEnderecos).catch(err => alert("Erro ao carregar endereços."));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja deletar o endereço #${id}?`)) {
      await deleteEndereco(id);
      setEnderecos(enderecos.filter(e => e.id !== id));
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Endereços</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pessoa</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {enderecos.map((end) => (
            <tr key={end.id}>
              <td>{end.id}</td>
              <td>{end.pessoa.nome}</td>
              <td>{`${end.rua}, ${end.numero}`}</td>
              <td>{end.bairro.nome}</td>
              <td>{end.bairro.cidade.nome}</td>
              <td>
                <button onClick={() => navigate(`/enderecos/editar/${end.id}`)}>✏️</button>
                <button onClick={() => handleDelete(end.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnderecosList;