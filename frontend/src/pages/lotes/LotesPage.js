import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LotesList from '../../components/lotes/LotesList';
import LotesForm from '../../components/lotes/LotesForm';

function LotesPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/lotes">Histórico de Lotes</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/lotes/novo">Cadastrar Novo Lote</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LotesList />} />
        <Route path="novo" element={<LotesForm />} />
        <Route path="editar/:id" element={<LotesForm />} />
      </Routes>
    </div>
  );
}

export default LotesPage;