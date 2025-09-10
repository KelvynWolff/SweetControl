import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PedidosList from '../../components/pedidos/PedidosList';
import PedidosForm from '../../components/pedidos/PedidosForm';
import PedidoDetalhes from '../../components/pedidos/PedidoDetalhes';

function PedidosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PedidosList />} />
        <Route path="novo" element={<PedidosForm />} />
        <Route path="detalhes/:id" element={<PedidoDetalhes />} />
      </Routes>
    </div>
  );
}

export default PedidosPage;