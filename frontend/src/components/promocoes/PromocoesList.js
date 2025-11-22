import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPromocoes, deletePromocao } from '../../services/promocoesService';
import '../tables.css';

const PromocoesList = () => {
  const [promocoes, setPromocoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchPromocoes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta promoção?')) {
      try {
        await deletePromocao(id);
        alert('Promoção deletada com sucesso!');
        setPromocoes(promocoes.filter(p => p.id !== id));
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

      today.setHours(0, 0, 0, 0);
      inicio.setHours(0, 0, 0, 0);
      fim.setHours(0, 0, 0, 0);

      return today >= inicio && today <= fim;
  };

  const filteredPromocoes = promocoes.filter(promocao =>
    promocao.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista...</p>;
  }

  const formatarData = (dataString) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/promocoes/novo">+</Link>
        Gerenciar Promoções
      </h2>

      <input
        type="text"
        placeholder="Buscar promoções pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredPromocoes.length === 0 ? (
            <tr><td colSpan="7">Nenhuma promoção encontrada.</td></tr>
          ) : (
            filteredPromocoes.map((promocao) => (
              <tr key={promocao.id}>
                <td>{promocao.nome}</td>
                <td>{promocao.tipoDeDesconto}</td>
                <td>{promocao.valor}</td>
                <td>{promocao.produto ? promocao.produto.nome : 'Todos'}</td>
                <td>{formatarData(promocao.dataInicio)} a {formatarData(promocao.dataFim)}</td>
                <td style={{ color: isAtiva(promocao.dataInicio, promocao.dataFim) ? 'green' : 'red' }}>
                  {isAtiva(promocao.dataInicio, promocao.dataFim) ? 'Ativa' : 'Inativa'}
                </td>
                <td>
                  <button className="icon-btn" onClick={() => handleEdit(promocao)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(promocao.id)}>🗑️</button>
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