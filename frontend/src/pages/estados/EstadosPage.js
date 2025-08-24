import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EstadosList from '../../components/estados/EstadosList';
import EstadosForm from '../../components/estados/EstadosForm';

function EstadosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/estados">Ver Estados</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/estados/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<EstadosList />} />
        <Route path="novo" element={<EstadosForm />} />
        <Route path="editar/:sigla" element={<EstadosForm />} />
      </Routes>
    </div>
  );
}

export default EstadosPage;