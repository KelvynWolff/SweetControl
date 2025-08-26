import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientes, deleteCliente } from '../../services/clientesService';
import '../tables.css';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getClientes().then(setClientes).catch(err => alert("Erro ao carregar clientes."));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o cliente ${nome}?`)) {
      await deleteCliente(id);
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.pessoa.nome}</td>
              <td>{cliente.pessoa.cpfCnpj}</td>
              <td>{cliente.pessoa.cidade.nome}</td>
              <td>
                <button onClick={() => navigate(`/clientes/editar/${cliente.id}`)}>✏️</button>
                <button onClick={() => handleDelete(cliente.id, cliente.pessoa.nome)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;