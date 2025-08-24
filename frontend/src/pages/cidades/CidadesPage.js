import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CidadesList from '../../components/cidades/CidadesList';
import CidadesForm from '../../components/cidades/CidadesForm';

function CidadesPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/cidades">Ver Cidades</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/cidades/novo">Cadastrar Nova</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CidadesList />} />
        <Route path="novo" element={<CidadesForm />} />
        <Route path="editar/:codigobge" element={<CidadesForm />} />
      </Routes>
    </div>
  );
}

export default CidadesPage;