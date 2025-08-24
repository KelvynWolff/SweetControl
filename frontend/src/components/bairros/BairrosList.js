import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBairros, deleteBairro } from '../../services/bairrosService';
import '../tables.css';

const BairrosList = () => {
  const [bairros, setBairros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBairros().then(setBairros).catch(err => alert("Erro ao carregar bairros."));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o bairro ${nome}?`)) {
      await deleteBairro(id);
      setBairros(bairros.filter(b => b.id !== id));
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Bairros</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {bairros.map((bairro) => (
            <tr key={bairro.id}>
              <td>{bairro.id}</td>
              <td>{bairro.nome}</td>
              <td>{bairro.cidade.nome}</td>
              <td>
                <button onClick={() => navigate(`/bairros/editar/${bairro.id}`)}>✏️</button>
                <button onClick={() => handleDelete(bairro.id, bairro.nome)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BairrosList;