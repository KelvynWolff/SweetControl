import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CidadesList from '../../components/cidades/CidadesList';
import CidadesForm from '../../components/cidades/CidadesForm';

function CidadesPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CidadesList />} />
        <Route path="novo" element={<CidadesForm />} />
        <Route path="editar/:codigobge" element={<CidadesForm />} />
      </Routes>
    </div>
  );
}

export default CidadesPage;