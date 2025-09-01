import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmailsList from '../../components/emails/EmailsList';
import EmailsForm from '../../components/emails/EmailsForm';

function EmailsPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EmailsList />} />
        <Route path="novo" element={<EmailsForm />} />
        <Route path="editar/:id" element={<EmailsForm />} />
      </Routes>
    </div>
  );
}

export default EmailsPage;