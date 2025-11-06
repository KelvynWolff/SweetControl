import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import ClientesList from '../../components/clientes/ClientesList';
import ClientesForm from '../../components/clientes/ClientesForm';

function ClientesPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <nav className="tabs">
        <NavLink
          to="/clientes"
          end
          className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
        >
          Lista de Clientes
        </NavLink>
        <NavLink
          to="/clientes/novo"
          className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
        >
          Cadastrar Cliente
        </NavLink>
      </nav>

      <Routes>
        <Route index element={<ClientesList />} />
        <Route path="novo" element={<ClientesForm />} />
        <Route path="editar/:id" element={<ClientesForm />} />
      </Routes>
    </div>
  );
}

export default ClientesPage;
