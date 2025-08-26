import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmailsList from '../../components/emails/EmailsList';
import EmailsForm from '../../components/emails/EmailsForm';

function EmailsPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/emails">Ver Emails</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/emails/novo">Cadastrar Novo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<EmailsList />} />
        <Route path="novo" element={<EmailsForm />} />
        <Route path="editar/:id" element={<EmailsForm />} />
      </Routes>
    </div>
  );
}

export default EmailsPage;