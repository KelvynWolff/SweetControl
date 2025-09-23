import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getEnderecos, deleteEndereco } from '../../services/enderecosService';
import '../tables.css';

const EnderecosList = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getEnderecos()
      .then(setEnderecos)
      .catch(err => alert("Erro ao carregar endereços."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja deletar o endereço #${id}?`)) {
      try {
        await deleteEndereco(id);
        alert('Endereço deletado com sucesso!');
        setEnderecos(enderecos.filter(e => e.id !== id));
      } catch (error) {
        alert('Erro ao deletar endereço.');
        console.error(error);
      }
    }
  };

  const filteredEnderecos = enderecos.filter(end =>
    end.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista de endereços...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/enderecos/novo">+</Link>
        Gerenciar Endereços
      </h2>

      <input
        type="text"
        placeholder="Buscar endereços pelo nome da pessoa..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredEnderecos.length === 0 ? (
            <tr><td colSpan="6">Nenhum endereço encontrado.</td></tr>
          ) : (
            filteredEnderecos.map((end) => (
              <tr key={end.id}>
                <td>{end.id}</td>
                <td>{end.pessoa.nome}</td>
                <td>{`${end.rua}, ${end.numero}`}</td>
                <td>{end.bairro.nome}</td>
                <td>{end.bairro.cidade.nome}</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/enderecos/editar/${end.id}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(end.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnderecosList;