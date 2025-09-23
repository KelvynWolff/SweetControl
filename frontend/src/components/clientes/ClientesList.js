import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getClientes, deleteCliente } from '../../services/clientesService';
import '../tables.css';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getClientes()
      .then(setClientes)
      .catch(err => alert("Erro ao carregar clientes."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o cliente ${nome}?`)) {
      try {
        await deleteCliente(id);
        alert('Cliente deletado com sucesso!');
        setClientes(clientes.filter(c => c.id !== id));
      } catch (error) {
        alert('Erro ao deletar cliente.');
        console.error(error);
      }
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista de clientes...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/clientes/novo">+</Link>
        Gerenciar Clientes
      </h2>

      <input
        type="text"
        placeholder="Buscar clientes pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredClientes.length === 0 ? (
            <tr><td colSpan="5">Nenhum cliente encontrado.</td></tr>
          ) : (
            filteredClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.pessoa.nome}</td>
                <td>{cliente.pessoa.cpfCnpj}</td>
                <td>{cliente.pessoa.cidade ? cliente.pessoa.cidade.nome : 'N/A'}</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/clientes/editar/${cliente.id}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(cliente.id, cliente.pessoa.nome)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;