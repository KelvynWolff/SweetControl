import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BairrosList from '../../components/bairros/BairrosList';
import BairrosForm from '../../components/bairros/BairrosForm';

function BairrosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/bairros">Ver Bairros</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/bairros/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BairrosList />} />
        <Route path="novo" element={<BairrosForm />} />
        <Route path="editar/:id" element={<BairrosForm />} />
      </Routes>
    </div>
  );
}

export default BairrosPage;