import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ProducaoList from '../../components/producao/ProducaoList';
import ProducaoForm from '../../components/producao/ProducaoForm';

function ProducaoPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <nav className="tabs">
        <NavLink
          to="/producao"
          end
          className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
        >
          Histórico de Produção
        </NavLink>

        <NavLink
          to="/producao/novo"
          className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
        >
          Registrar Nova Produção
        </NavLink>
      </nav>
      /* Rotas aninhadas da página de Produção */
      <Routes>
        /* Rota padrão da seção */
        <Route index element={<ProducaoList />} />
        /* Formulário de criação */
        <Route path="novo" element={<ProducaoForm />} />
      </Routes>
    </div>
  );
}

export default ProducaoPage;
