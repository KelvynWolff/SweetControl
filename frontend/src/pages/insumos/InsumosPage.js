import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import InsumosList from '../../components/insumos/InsumosList';
import InsumosForm from '../../components/insumos/InsumosForm';

function InsumosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InsumosList />} />
        <Route path="novo" element={<InsumosForm />} />
        <Route path="editar/:id" element={<InsumosForm />} />
      </Routes>
    </div>
  );
}

export default InsumosPage;