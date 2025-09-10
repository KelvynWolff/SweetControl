import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPedidos } from '../../services/pedidosService';
import '../tables.css';

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPedidos().then(setPedidos).catch(err => alert("Erro ao carregar pedidos."));
  }, []);

  return (
    <div className="list-container">
      <h2>
        <a class="btn" href="/pedidos/novo">+</a>
        Lista de Pedidos
      </h2>
      <table>
        <thead>
          <tr>
            <th>Nº Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente.pessoa.nome}</td>
              <td>{new Date(pedido.data).toLocaleDateString()}</td>
              <td>{pedido.status}</td>
              <td>
                <button onClick={() => navigate(`/pedidos/detalhes/${pedido.id}`)}>Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosList;