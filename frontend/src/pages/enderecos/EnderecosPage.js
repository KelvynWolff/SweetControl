import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EnderecosList from '../../components/enderecos/EnderecosList';
import EnderecosForm from '../../components/enderecos/EnderecosForm';

function EnderecosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EnderecosList />} />
        <Route path="novo" element={<EnderecosForm />} />
        <Route path="editar/:id" element={<EnderecosForm />} />
      </Routes>
    </div>
  );
}

export default EnderecosPage;