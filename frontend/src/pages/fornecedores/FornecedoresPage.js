import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FornecedoresList from '../../components/fornecedores/FornecedoresList';
import FornecedoresForm from '../../components/fornecedores/FornecedoresForm';

function FornecedoresPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FornecedoresList />} />
        <Route path="novo" element={<FornecedoresForm />} />
        <Route path="editar/:id" element={<FornecedoresForm />} />
      </Routes>
    </div>
  );
}

export default FornecedoresPage;