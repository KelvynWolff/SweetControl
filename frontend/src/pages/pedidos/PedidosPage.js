import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import PedidosList from '../../components/pedidos/PedidosList';
import PedidosForm from '../../components/pedidos/PedidosForm';
import PedidoDetalhes from '../../components/pedidos/PedidoDetalhes';

function PedidosPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <nav className="tabs">
        <NavLink
          to="/pedidos"
          end
          className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
        >
          Lista de Pedidos
        </NavLink>
        <NavLink
          to="/pedidos/novo"
          className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
        >
          Novo Pedido
        </NavLink>
      </nav>

      <Routes>
        <Route index element={<PedidosList />} />
        <Route path="novo" element={<PedidosForm />} />
        <Route path="detalhes/:id" element={<PedidoDetalhes />} />
      </Routes>
    </div>
  );
}

export default PedidosPage;
