import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFuncionarios, deleteFuncionario } from '../../services/funcionariosService';
import '../tables.css';

const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFuncionarios().then(setFuncionarios).catch(err => alert("Erro ao carregar funcionários."));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o funcionário ${nome}?`)) {
      await deleteFuncionario(id);
      setFuncionarios(funcionarios.filter(f => f.id !== id));
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Funcionários</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Data Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.id}</td>
              <td>{funcionario.pessoa.nome}</td>
              <td>{funcionario.pessoa.cpfCnpj}</td>
              <td>{new Date(funcionario.dataAdmissao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => navigate(`/funcionarios/editar/${funcionario.id}`)}>✏️</button>
                <button onClick={() => handleDelete(funcionario.id, funcionario.pessoa.nome)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuncionariosList;