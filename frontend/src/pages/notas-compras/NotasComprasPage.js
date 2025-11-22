import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NotasComprasList from '../../components/notas-compras/NotasComprasList';
import NotasComprasForm from '../../components/notas-compras/NotasComprasForm';
import NotaCompraDetalhes from '../../components/notas-compras/NotaCompraDetalhes';

function NotasComprasPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NotasComprasList />} />
        <Route path="novo" element={<NotasComprasForm />} />
        <Route path="detalhes/:id" element={<NotaCompraDetalhes />} />
      </Routes>
    </div>
  );
}

export default NotasComprasPage;