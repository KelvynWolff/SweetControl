import React, { useState, useEffect } from 'react';
import { getNotasCompras } from '../../services/notasComprasService';
import '../tables.css';

const NotasComprasList = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotasCompras()
      .then(setNotas)
      .catch(err => alert("Erro ao carregar notas de compra."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="list-container">
      <h2>Histórico de Compras</h2>
      <table>
        <thead>
          <tr>
            <th>ID da Nota</th>
            <th>Chave de Acesso</th>
            <th>Fornecedor</th>
            <th>Data</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.id}>
              <td>{nota.id}</td>
              <td>{nota.chaveAcesso}</td>
              <td>{nota.fornecedor.pessoa.nome}</td>
              <td>{new Date(nota.data).toLocaleDateString()}</td>
              <td>R$ {Number(nota.valorTotal).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotasComprasList;