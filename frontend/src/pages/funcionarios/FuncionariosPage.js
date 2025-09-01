import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FuncionariosList from '../../components/funcionarios/FuncionariosList';
import FuncionariosForm from '../../components/funcionarios/FuncionariosForm';

function FuncionariosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FuncionariosList />} />
        <Route path="novo" element={<FuncionariosForm />} />
        <Route path="editar/:id" element={<FuncionariosForm />} />
      </Routes>
    </div>
  );
}

export default FuncionariosPage;