import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getBairros, deleteBairro } from '../../services/bairrosService';
import '../tables.css';

const BairrosList = () => {
  const [bairros, setBairros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getBairros()
      .then(setBairros)
      .catch(err => alert("Erro ao carregar bairros."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o bairro ${nome}?`)) {
      try {
        await deleteBairro(id);
        alert('Bairro deletado com sucesso!');
        setBairros(bairros.filter(b => b.id !== id));
      } catch (error) {
        alert('Erro ao deletar bairro.');
        console.error(error);
      }
    }
  };

  const filteredBairros = bairros.filter(bairro =>
    bairro.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista de bairros...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/bairros/novo">+</Link>
        Gerenciar Bairros
      </h2>

      <input
        type="text"
        placeholder="Buscar bairros pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredBairros.length === 0 ? (
            <tr><td colSpan="4">Nenhum bairro encontrado.</td></tr>
          ) : (
            filteredBairros.map((bairro) => (
              <tr key={bairro.id}>
                <td>{bairro.id}</td>
                <td>{bairro.nome}</td>
                <td>{bairro.cidade ? bairro.cidade.nome : 'N/A'}</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/bairros/editar/${bairro.id}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(bairro.id, bairro.nome)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BairrosList;