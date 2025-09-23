import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getFornecedores, deleteFornecedor } from '../../services/fornecedoresService';
import '../tables.css';

const FornecedoresList = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getFornecedores()
      .then(setFornecedores)
      .catch(err => alert("Erro ao carregar fornecedores."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o fornecedor ${nome}?`)) {
      try {
        await deleteFornecedor(id);
        alert('Fornecedor deletado com sucesso!');
        setFornecedores(fornecedores.filter(f => f.id !== id));
      } catch (error) {
        alert('Erro ao deletar fornecedor.');
        console.error(error);
      }
    }
  };

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista de fornecedores...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/fornecedores/novo">+</Link>
        Gerenciar Fornecedores
      </h2>

      <input
        type="text"
        placeholder="Buscar fornecedores pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredFornecedores.length === 0 ? (
            <tr><td colSpan="5">Nenhum fornecedor encontrado.</td></tr>
          ) : (
            filteredFornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.id}</td>
                <td>{fornecedor.pessoa.nome}</td>
                <td>{fornecedor.pessoa.cpfCnpj}</td>
                <td>{fornecedor.pessoa.cidade ? fornecedor.pessoa.cidade.nome : 'N/A'}</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/fornecedores/editar/${fornecedor.id}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(fornecedor.id, fornecedor.pessoa.nome)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FornecedoresList;