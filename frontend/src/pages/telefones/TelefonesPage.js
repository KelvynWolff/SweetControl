import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TelefonesList from '../../components/telefones/TelefonesList';
import TelefonesForm from '../../components/telefones/TelefonesForm';

function TelefonesPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TelefonesList />} />
        <Route path="novo" element={<TelefonesForm />} />
        <Route path="editar/:id" element={<TelefonesForm />} />
      </Routes>
    </div>
  );
}

export default TelefonesPage;