import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ClientesList from '../../components/clientes/ClientesList';
import ClientesForm from '../../components/clientes/ClientesForm';

function ClientesPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f'}}>
        <Link to="/clientes">Ver Clientes</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/clientes/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ClientesList />} />
        <Route path="novo" element={<ClientesForm />} />
        <Route path="editar/:id" element={<ClientesForm />} />
      </Routes>
    </div>
  );
}

export default ClientesPage;