import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FornecedoresList from '../../components/fornecedores/FornecedoresList';
import FornecedoresForm from '../../components/fornecedores/FornecedoresForm';

function FornecedoresPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f'}}>
        <Link to="/fornecedores">Ver Fornecedores</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/fornecedores/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FornecedoresList />} />
        <Route path="novo" element={<FornecedoresForm />} />
        <Route path="editar/:id" element={<FornecedoresForm />} />
      </Routes>
    </div>
  );
}

export default FornecedoresPage;