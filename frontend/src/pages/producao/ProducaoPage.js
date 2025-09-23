import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProducaoList from '../../components/producao/ProducaoList';
import ProducaoForm from '../../components/producao/ProducaoForm';

function ProducaoPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/producao">Histórico de Produção</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/producao/novo">Registrar Nova Produção</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProducaoList />} />
        <Route path="novo" element={<ProducaoForm />} />
      </Routes>
    </div>
  );
}

export default ProducaoPage;