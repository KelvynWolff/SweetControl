import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import InsumosList from '../../components/insumos/InsumosList';
import InsumosForm from '../../components/insumos/InsumosForm';

function InsumosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/insumos">Ver Insumos</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/insumos/novo">Cadastrar Novo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<InsumosList />} />
        <Route path="novo" element={<InsumosForm />} />
        <Route path="editar/:id" element={<InsumosForm />} />
      </Routes>
    </div>
  );
}

export default InsumosPage;