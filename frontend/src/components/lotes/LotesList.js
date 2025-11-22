import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getLotes, deleteLote } from '../../services/lotesService';
import '../tables.css';

const LotesList = () => {
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getLotes()
      .then(setLotes)
      .catch(err => alert("Erro ao carregar lotes."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja deletar o lote #${id}?`)) {
      await deleteLote(id);
      setLotes(lotes.filter(l => l.id !== id));
    }
  };
  
  const filteredLotes = lotes.filter(lote =>
    lote.codigoLote.toString().includes(searchTerm) ||
    (lote.produto && lote.produto.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lote.insumo && lote.insumo.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/lotes/novo">+</Link>
        Gerenciar Lotes
      </h2>
      <input
        type="text"
        placeholder="Buscar por código do lote, produto ou insumo..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Cód. Lote</th>
            <th>Item (Produto/Insumo)</th>
            <th>Estoque Atual</th>
            <th>Data de Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredLotes.map((lote) => (
            <tr key={lote.id}>
              <td>{lote.codigoLote}</td>
              <td>{lote.produto?.nome || lote.insumo?.nome}</td>
              <td>{lote.estoqueAtual}</td>
              <td>{new Date(lote.dataValidade).toLocaleDateString()}</td>
              <td>
                <button className="icon-btn" onClick={() => navigate(`/lotes/editar/${lote.id}`)}>✏️</button>
                <button className="icon-btn-delete" onClick={() => handleDelete(lote.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LotesList;