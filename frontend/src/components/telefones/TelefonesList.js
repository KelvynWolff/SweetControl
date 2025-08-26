import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTelefones, deleteTelefone } from '../../services/telefonesService';
import '../tables.css';

const TelefonesList = () => {
  const [telefones, setTelefones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTelefones().then(setTelefones).catch(err => alert("Erro ao carregar telefones."));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja deletar o telefone #${id}?`)) {
      await deleteTelefone(id);
      setTelefones(telefones.filter(t => t.id !== id));
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Telefones</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Observação</th>
            <th>Pessoa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {telefones.map((telefone) => (
            <tr key={telefone.id}>
              <td>{telefone.id}</td>
              <td>{telefone.numero}</td>
              <td>{telefone.observacao}</td>
              <td>{telefone.pessoa ? telefone.pessoa.nome : 'N/A'}</td>
              <td>
                <button onClick={() => navigate(`/telefones/editar/${telefone.id}`)}>✏️</button>
                <button onClick={() => handleDelete(telefone.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TelefonesList;