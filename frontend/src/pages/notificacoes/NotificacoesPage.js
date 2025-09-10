import React, { useState, useEffect } from 'react';
import { getNotificacoes, deleteNotificacao } from '../../services/notificacoesService';
import './NotificacoesPage.css';

const NotificacoesPage = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotificacoes = () => {
    setIsLoading(true);
    getNotificacoes()
      .then(setNotificacoes)
      .catch(err => alert("Erro ao carregar notificações."))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchNotificacoes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar esta notificação?")) {
      try {
        await deleteNotificacao(id);
        setNotificacoes(notificacoes.filter(not => not.id !== id));
      } catch (error) {
        alert("Erro ao apagar notificação.");
      }
    }
  }

  return (
    <div className="notificacoes-container">
      <h2>Histórico de Notificações</h2>
      <div className="card">
        {isLoading ? <p>Carregando...</p> : (
          <ul className="notificacoes-list">
            {notificacoes.map(not => (
              <li key={not.id}>
                <div className="not-content">
                  <p>{not.mensagem}</p>
                  
                  {not.pedido && (
                    <div className="not-details">
                      <span>Pedido: #{not.pedido.id}</span>
                      <span>Cliente: {not.pedido.cliente.pessoa.nome}</span>
                      <span>Email enviado para: {not.pedido.cliente.pessoa.emails?.[0]?.email || 'N/A'}</span>
                    </div>
                  )}

                  <span className="not-date">{new Date(not.data).toLocaleString()}</span>
                </div>
                <button onClick={() => handleDelete(not.id)} className="delete-btn">×</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificacoesPage;