import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ReceitasList from '../../components/receitas/ReceitasList';
import ReceitasForm from '../../components/receitas/ReceitasForm';

function ReceitasPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ReceitasList />} />
        <Route path="novo" element={<ReceitasForm />} />
        <Route path="editar/:id" element={<ReceitasForm />} />
      </Routes>
    </div>
  );
}

export default ReceitasPage;