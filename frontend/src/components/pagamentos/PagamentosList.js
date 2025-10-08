import React, { useState, useEffect } from 'react';
import { getPagamentos } from '../../services/pagamentosService';
import '../tables.css';

const PagamentosList = () => {
  const [pagamentos, setPagamentos] = useState([]);
  useEffect(() => {
    getPagamentos().then(setPagamentos).catch(err => alert("Erro ao carregar pagamentos."));
  }, []);

  return (
    <div className="list-container">
      <h2>Histórico de Pagamentos</h2>
      <table>
        <thead>
          <tr>
            <th>ID Pag.</th>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Valor Pago</th>
            <th>Forma Pag.</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map((pag) => (
            <tr key={pag.id}>
              <td>{pag.id}</td>
              <td>#{pag.idPedido}</td>
              <td>{pag.pedido.cliente.pessoa.nome}</td>
              <td>R$ {Number(pag.valor).toFixed(2)}</td>
              <td>{pag.formaPagamento}</td>
              <td>{new Date(pag.dataPagamento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PagamentosList;