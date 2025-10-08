import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PagamentosList from '../../components/pagamentos/PagamentosList';
import PagamentosForm from '../../components/pagamentos/PagamentosForm';

function PagamentosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/pagamentos">Histórico de Pagamentos</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/pagamentos/novo">Registrar Pagamento</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PagamentosList />} />
        <Route path="novo" element={<PagamentosForm />} />
      </Routes>
    </div>
  );
}
export default PagamentosPage;