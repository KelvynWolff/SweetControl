import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPedidos, deletePedido } from '../../services/pedidosService';
import '../tables.css';

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPedidos()
        .then(setPedidos)
        .catch(err => alert("Erro ao carregar pedidos."))
        .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, clienteNome) => {
    if (window.confirm(`Tem certeza que deseja excluir o pedido #${id} do cliente ${clienteNome}?`)) {
      try {
        await deletePedido(id);
        alert('Pedido excluído com sucesso!');
        setPedidos(pedidos.filter(p => p.id !== id));
      } catch (error) {
        alert('Erro ao excluir pedido.');
        console.error(error);
      }
    }
  };

  const filteredPedidos = pedidos.filter(pedido =>
    pedido.cliente.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista de pedidos...</p>
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/pedidos/novo">+</Link>
        Lista de Pedidos
      </h2>

      <input
        type="text"
        placeholder="Buscar pedidos pelo nome do cliente..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Nº Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.length === 0 ? (
            <tr><td colSpan="5">Nenhum pedido encontrado.</td></tr>
          ) : (
            filteredPedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente.pessoa.nome}</td>
                <td>{new Date(pedido.data).toLocaleDateString()}</td>
                <td>{pedido.status}</td>
                <td>
                  <button className="btn" onClick={() => navigate(`/pedidos/detalhes/${pedido.id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                    </svg>
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(pedido.id, pedido.cliente.pessoa.nome)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosList;