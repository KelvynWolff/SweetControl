import React, { useState, useEffect } from 'react';
import { getProducoes } from '../../services/producaoService';
import '../tables.css';

const ProducaoList = () => {
  const [producoes, setProducoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducoes()
      .then(setProducoes)
      .catch(err => alert("Erro ao carregar histórico de produção."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Carregando histórico...</p>;
  }

  return (
    <div className="list-container">
      <h2>Histórico de Produção</h2>
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
          {producoes.map((producao) => (
            <tr key={producao.id}>
              <td>{producao.id}</td>
              <td>{new Date(producao.data).toLocaleString()}</td>
              <td>{producao.produto.nome}</td>
              <td>{producao.quantidade}</td>
              <td>{producao.observacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProducaoList;