import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EnderecosList from '../../components/enderecos/EnderecosList';
import EnderecosForm from '../../components/enderecos/EnderecosForm';

function EnderecosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/enderecos">Ver Endereços</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/enderecos/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<EnderecosList />} />
        <Route path="novo" element={<EnderecosForm />} />
        <Route path="editar/:id" element={<EnderecosForm />} />
      </Routes>
    </div>
  );
}

export default EnderecosPage;