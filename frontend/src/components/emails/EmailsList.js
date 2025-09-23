import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getEmails, deleteEmail } from '../../services/emailsService';
import '../tables.css';

const EmailsList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getEmails()
      .then(setEmails)
      .catch(err => alert("Erro ao carregar emails."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja deletar o email #${id}?`)) {
      try {
        await deleteEmail(id);
        alert('Email deletado com sucesso!');
        setEmails(emails.filter(e => e.id !== id));
      } catch (error) {
        alert('Erro ao deletar email.');
        console.error(error);
      }
    }
  };

  const filteredEmails = emails.filter(email =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (email.pessoa && email.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <p>Carregando lista de emails...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/emails/novo">+</Link>
        Gerenciar Emails
      </h2>

      <input
        type="text"
        placeholder="Buscar por email ou nome da pessoa..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredEmails.length === 0 ? (
            <tr><td colSpan="5">Nenhum email encontrado.</td></tr>
          ) : (
            filteredEmails.map((email) => (
              <tr key={email.id}>
                <td>{email.id}</td>
                <td>{email.email}</td>
                <td>{email.observacao}</td>
                <td>{email.pessoa ? email.pessoa.nome : 'N/A'}</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/emails/editar/${email.id}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(email.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmailsList;