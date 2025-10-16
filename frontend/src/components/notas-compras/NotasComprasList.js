import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getNotasCompras, deleteNotaCompra } from '../../services/notasComprasService';
import '../tables.css';

const NotasComprasList = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    getNotasCompras()
      .then(setNotas)
      .catch(err => alert("Erro ao carregar notas de compra."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir a nota de compra #${id}? Esta ação irá reverter a entrada de estoque.`)) {
        try {
            await deleteNotaCompra(id);
            setNotas(notas.filter(n => n.id !== id));
        } catch (error) {
            alert("Erro ao excluir a nota de compra.");
        }
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="list-container">
      <h2>Histórico de Compras</h2>
      <table>
        <thead>
          <tr>
            <th>ID da Nota</th>
            <th>Chave de Acesso</th>
            <th>Fornecedor</th>
            <th>Data</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.id}>
              <td>{nota.id}</td>
              <td>{nota.chaveAcesso}</td>
              <td>{nota.fornecedor.pessoa.nome}</td>
              <td>{new Date(nota.data).toLocaleDateString()}</td>
              <td>R$ {Number(nota.valorTotal).toFixed(2)}</td>
              <td>
                <button className="icon-btn" onClick={() => navigate(`/entradas/detalhes/${nota.id}`)}>👁️</button>
                <button className="icon-btn-delete" onClick={() => handleDelete(nota.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotasComprasList;