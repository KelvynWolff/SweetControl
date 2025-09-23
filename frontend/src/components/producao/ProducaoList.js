import React, { useState, useEffect } from 'react';
import { getProducoes } from '../../services/producaoService';
import '../tables.css';

const ProducaoList = () => {
  const [producoes, setProducoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProducoes()
      .then(setProducoes)
      .catch(err => alert("Erro ao carregar histórico de produção."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducoes = producoes.filter(producao =>
    producao.produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando histórico...</p>;
  }

  return (
    <div className="list-container">
      <h2>Histórico de Produção</h2>

      <input
        type="text"
        placeholder="Buscar pelo nome do produto produzido..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Produto Produzido</th>
            <th>Quantidade</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducoes.length === 0 ? (
            <tr><td colSpan="5">Nenhum registro de produção encontrado.</td></tr>
          ) : (
            filteredProducoes.map((producao) => (
              <tr key={producao.id}>
                <td>{producao.id}</td>
                <td>{new Date(producao.data).toLocaleString()}</td>
                <td>{producao.produto.nome}</td>
                <td>{producao.quantidade}</td>
                <td>{producao.observacao}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProducaoList;