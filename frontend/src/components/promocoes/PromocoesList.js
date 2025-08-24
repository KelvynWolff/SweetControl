import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPromocoes, deletePromocao } from '../../services/promocoesService';
import '../tables.css';

const PromocoesList = () => {
  const [promocoes, setPromocoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPromocoes = async () => {
    try {
      const data = await getPromocoes();
      setPromocoes(data);
    } catch (error) {
      alert("Erro ao carregar promoções.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromocoes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta promoção?')) {
      try {
        await deletePromocao(id);
        alert('Promoção deletada com sucesso!');
        fetchPromocoes();
      } catch (error) {
        alert('Erro ao deletar promoção.');
        console.error(error);
      }
    }
  };

  const handleEdit = (promocao) => {
    navigate(`/promocoes/editar/${promocao.id}`);
  };

  const isAtiva = (dataInicio, dataFim) => {
    const today = new Date();
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    return today >= inicio && today <= fim;
  };

  if (loading) {
    return <p>Carregando lista...</p>;
  }

  return (
    <div className="list-container">
      <h2>Gerenciar Promoções</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo de Desconto</th>
            <th>Valor</th>
            <th>Produto Aplicável</th>
            <th>Validade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {promocoes.length === 0 ? (
            <tr><td colSpan="7">Nenhuma promoção cadastrada.</td></tr>
          ) : (
            promocoes.map((promocao) => (
              <tr key={promocao.id}>
                <td>{promocao.nome}</td>
                <td>{promocao.tipoDeDesconto}</td>
                <td>{promocao.valor}</td>
                <td>{promocao.produto ? promocao.produto.nome : 'Todos'}</td>
                <td>
                  {new Date(promocao.dataInicio).toLocaleDateString()} a {new Date(promocao.dataFim).toLocaleDateString()}
                </td>
                <td style={{ color: isAtiva(promocao.dataInicio, promocao.dataFim) ? 'green' : 'red' }}>
                  {isAtiva(promocao.dataInicio, promocao.dataFim) ? 'Ativa' : 'Inativa'}
                </td>
                <td>
                  <button onClick={() => handleEdit(promocao)}>✏️</button>
                  <button onClick={() => handleDelete(promocao.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PromocoesList;