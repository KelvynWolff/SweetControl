import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BairrosList from '../../components/bairros/BairrosList';
import BairrosForm from '../../components/bairros/BairrosForm';

function BairrosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BairrosList />} />
        <Route path="novo" element={<BairrosForm />} />
        <Route path="editar/:id" element={<BairrosForm />} />
      </Routes>
    </div>
  );
}

export default BairrosPage;