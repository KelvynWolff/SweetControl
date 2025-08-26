import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TelefonesList from '../../components/telefones/TelefonesList';
import TelefonesForm from '../../components/telefones/TelefonesForm';

function TelefonesPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/telefones">Ver Telefones</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/telefones/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TelefonesList />} />
        <Route path="novo" element={<TelefonesForm />} />
        <Route path="editar/:id" element={<TelefonesForm />} />
      </Routes>
    </div>
  );
}

export default TelefonesPage;