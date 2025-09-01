import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ClientesList from '../../components/clientes/ClientesList';
import ClientesForm from '../../components/clientes/ClientesForm';

function ClientesPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ClientesList />} />
        <Route path="novo" element={<ClientesForm />} />
        <Route path="editar/:id" element={<ClientesForm />} />
      </Routes>
    </div>
  );
}

export default ClientesPage;