import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmails, deleteEmail } from '../../services/emailsService';
import '../tables.css';

const EmailsList = () => {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmails().then(setEmails).catch(err => alert("Erro ao carregar emails."));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja deletar o email #${id}?`)) {
      await deleteEmail(id);
      setEmails(emails.filter(e => e.id !== id));
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Emails</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Observação</th>
            <th>Pessoa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.id}</td>
              <td>{email.email}</td>
              <td>{email.observacao}</td>
              <td>{email.pessoa ? email.pessoa.nome : 'N/A'}</td>
              <td>
                <button onClick={() => navigate(`/emails/editar/${email.id}`)}>✏️</button>
                <button onClick={() => handleDelete(email.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailsList;