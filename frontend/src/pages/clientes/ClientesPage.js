import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import ClientesList from '../../components/clientes/ClientesList';
import ClientesForm from '../../components/clientes/ClientesForm';

function ClientesPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <Routes>
        <Route index element={<ClientesList />} />
        <Route path="novo" element={<ClientesForm />} />
        <Route path="editar/:id" element={<ClientesForm />} />
      </Routes>
    </div>
  );
}

export default ClientesPage;
