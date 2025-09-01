import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EstadosList from '../../components/estados/EstadosList';
import EstadosForm from '../../components/estados/EstadosForm';

function EstadosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EstadosList />} />
        <Route path="novo" element={<EstadosForm />} />
        <Route path="editar/:sigla" element={<EstadosForm />} />
      </Routes>
    </div>
  );
}

export default EstadosPage;