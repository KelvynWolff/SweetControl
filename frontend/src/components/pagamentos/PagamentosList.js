import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPagamentos, deletePagamento } from '../../services/pagamentosService';
import '../tables.css';

const PagamentosList = () => {
  const [pagamentos, setPagamentos] = useState([]);
  useEffect(() => {
    getPagamentos().then(setPagamentos).catch(err => alert("Erro ao carregar pagamentos."));
  }, []);

  const loadPagamentos = () => {
    getPagamentos().then(setPagamentos).catch(err => alert("Erro ao carregar pagamentos."));
  };

  useEffect(() => {
    loadPagamentos();
  }, []);

  const handleDelete = async (id) => {
      if (window.confirm('Tem certeza que deseja excluir este pagamento? O status do pedido será recalculado.')) {
          try {
              await deletePagamento(id);
              alert('Pagamento excluído com sucesso!');
              loadPagamentos();
          } catch (error) {
              alert("Erro ao excluir pagamento.");
          }
      }
  };

  return (
   <div className="list-container">
      <h2>
        <Link className="btn" to="/pagamentos/novo">
            +
        </Link>
        Histórico de Pagamentos
      </h2>
      <table>
        <thead>
          <tr>
            <th>ID Pag.</th>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Valor Pago</th>
            <th>Forma Pag.</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map((pag) => (
            <tr key={pag.id}>
              <td>{pag.id}</td>
              <td>#{pag.idPedido}</td>
              <td>{pag.pedido?.cliente?.pessoa?.nome || 'Cliente não encontrado'}</td>
              <td>R$ {Number(pag.valor).toFixed(2)}</td>
              <td>{pag.formaPagamento}</td>
              <td>{new Date(pag.dataPagamento).toLocaleDateString()}</td>
              <td>
                  <button onClick={() => handleDelete(pag.id)} className="icon-btn-delete" title="Excluir Pagamento">
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
export default PagamentosList;