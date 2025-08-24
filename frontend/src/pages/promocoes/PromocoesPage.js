import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PromocoesList from '../../components/promocoes/PromocoesList';
import PromocoesForm from '../../components/promocoes/PromocoesForm';

function PromocoesPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/promocoes">Ver Promoções</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/promocoes/novo">Cadastrar Nova</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PromocoesList />} />
        <Route path="novo" element={<PromocoesForm />} />
        <Route path="editar/:id" element={<PromocoesForm />} />
      </Routes>
    </div>
  );
}

export default PromocoesPage;