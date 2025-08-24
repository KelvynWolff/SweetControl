import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ReceitasList from '../../components/receitas/ReceitasList';
import ReceitasForm from '../../components/receitas/ReceitasForm';

function ReceitasPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/receitas">Ver Receitas</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/receitas/novo">Cadastrar Nova</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ReceitasList />} />
        <Route path="novo" element={<ReceitasForm />} />
        <Route path="editar/:id" element={<ReceitasForm />} />
      </Routes>
    </div>
  );
}

export default ReceitasPage;