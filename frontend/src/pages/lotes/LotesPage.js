import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LotesList from '../../components/lotes/LotesList';
import LotesForm from '../../components/lotes/LotesForm';

function LotesPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LotesList />} />
        <Route path="novo" element={<LotesForm />} />
        <Route path="editar/:id" element={<LotesForm />} />
      </Routes>
    </div>
  );
}

export default LotesPage;