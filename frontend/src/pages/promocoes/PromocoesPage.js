import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PromocoesList from '../../components/promocoes/PromocoesList';
import PromocoesForm from '../../components/promocoes/PromocoesForm';

function PromocoesPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PromocoesList />} />
        <Route path="novo" element={<PromocoesForm />} />
        <Route path="editar/:id" element={<PromocoesForm />} />
      </Routes>
    </div>
  );
}

export default PromocoesPage;