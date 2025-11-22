import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PagamentosList from '../../components/pagamentos/PagamentosList';
import PagamentosForm from '../../components/pagamentos/PagamentosForm';

function PagamentosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PagamentosList />} />
        <Route path="novo" element={<PagamentosForm />} />
      </Routes>
    </div>
  );
}
export default PagamentosPage;