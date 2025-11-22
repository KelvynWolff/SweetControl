import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProducaoList from '../../components/producao/ProducaoList';
import ProducaoForm from '../../components/producao/ProducaoForm';

function ProducaoPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProducaoList />} />
        
        <Route path="novo" element={<ProducaoForm />} />
        
      </Routes>
    </div>
  );
}

export default ProducaoPage;