import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NotasComprasList from '../../components/notas-compras/NotasComprasList';
import NotasComprasForm from '../../components/notas-compras/NotasComprasForm';

function NotasComprasPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/notas-compras">Histórico de Compras</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/notas-compras/novo">Registrar Nova Compra</Link>
      </nav>
      <Routes>
        <Route path="/" element={<NotasComprasList />} />
        <Route path="novo" element={<NotasComprasForm />} />
      </Routes>
    </div>
  );
}

export default NotasComprasPage;