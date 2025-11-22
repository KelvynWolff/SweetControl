import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificacoesPage.css';

const NotificacoesPage = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/notificacoes', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNotificacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificacoes();
  }, []);

  if (loading) {
    return <div className="list-container"><p>Carregando notificações...</p></div>;
  }

  return (
    <div className="list-container">
      <h2>Histórico de Notificações</h2>

      {notificacoes.length === 0 ? (
        <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '8px',
            border: '1px dashed #ccc',
            marginTop: '20px'
        }}>
            <h3>Nenhuma notificação encontrada</h3>
            <p>Você não possui registros no histórico de notificações no momento.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Mensagem</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {notificacoes.map((notificacao) => (
              <tr key={notificacao.id}>
                <td>{new Date(notificacao.data).toLocaleDateString()}</td>
                <td>{notificacao.mensagem}</td>
                <td>{notificacao.lida ? 'Lida' : 'Não lida'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NotificacoesPage;