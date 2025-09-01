import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFornecedores, deleteFornecedor } from '../../services/fornecedoresService';
import '../tables.css';

const FornecedoresList = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFornecedores().then(setFornecedores).catch(err => alert("Erro ao carregar fornecedores."));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o fornecedor ${nome}?`)) {
      await deleteFornecedor(id);
      setFornecedores(fornecedores.filter(f => f.id !== id));
    }
  };

  return (
    <div className="list-container">
      <h2>
        <a class="btn" href="/fornecedores/novo">+</a>
        Gerenciar Fornecedores
      </h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.id}</td>
              <td>{fornecedor.pessoa.nome}</td>
              <td>{fornecedor.pessoa.cpfCnpj}</td>
              <td>{fornecedor.pessoa.cidade.nome}</td>
              <td>
                <button className="icon-btn" onClick={() => navigate(`/fornecedores/editar/${fornecedor.id}`)}>✏️</button>
                <button className="icon-btn-delete" onClick={() => handleDelete(fornecedor.id, fornecedor.pessoa.nome)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FornecedoresList;