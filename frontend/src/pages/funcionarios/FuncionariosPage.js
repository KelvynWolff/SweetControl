import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FuncionariosList from '../../components/funcionarios/FuncionariosList';
import FuncionariosForm from '../../components/funcionarios/FuncionariosForm';

function FuncionariosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f'}}>
        <Link to="/funcionarios">Ver Funcionários</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/funcionarios/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FuncionariosList />} />
        <Route path="novo" element={<FuncionariosForm />} />
        <Route path="editar/:id" element={<FuncionariosForm />} />
      </Routes>
    </div>
  );
}

export default FuncionariosPage;