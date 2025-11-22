import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProducoes, deleteProducao } from '../../services/producaoService';
import '../tables.css';

const ProducaoList = () => {
  const [producoes, setProducoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const loadData = () => {
    getProducoes()
      .then(setProducoes)
      .catch(err => console.error("Erro ao carregar histórico de produção", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('ATENÇÃO: Excluir esta ordem de produção irá reverter o estoque (adicionar insumos de volta e remover o produto final). Deseja continuar?')) {
      try {
        await deleteProducao(id); 
        alert('Ordem de produção excluída e estoque revertido com sucesso!');
        loadData();
      } catch (error) {
        alert('Erro ao excluir a ordem de produção.');
        console.error(error);
      }
    }
  };

  if (loading) return <p>Carregando lista...</p>;

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/producao/novo">+</Link>
        Histórico de Produções
      </h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto Fabricado</th>
            <th>Qtd.</th>
            <th>Data de Criação</th>
            <th>Validade Lote</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {producoes.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.produto?.nome || 'Produto Indefinido'}</td>
              <td>{prod.quantidade}</td>
              <td>{new Date(prod.data).toLocaleDateString()}</td>
              <td>{new Date(prod.dataValidade).toLocaleDateString()}</td> 
              <td>
                <button 
                  className="icon-btn-delete" 
                  onClick={() => handleDelete(prod.id)} 
                  title="Excluir Ordem e Reverter Estoque"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProducaoList;