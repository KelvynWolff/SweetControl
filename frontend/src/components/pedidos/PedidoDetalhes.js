import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPedidoById, enviarEmailPedido, updatePedidoStatus } from '../../services/pedidosService';
import './PedidoDetalhes.css';

const PedidoDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [pedido, setPedido] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPedidoById(id)
      .then(data => {
        setPedido(data);
        setSelectedStatus(data.status);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao carregar detalhes do pedido.");
        setLoading(false);
      });
  }, [id]);

  const handleEnviarEmail = async () => {
    if (!id) return;
    try {
      const response = await enviarEmailPedido(id);
      alert(response.message || "Email enviado com sucesso!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Erro ao enviar email.";
      alert(errorMessage);
      console.error(err);
    }
  };

  const handleStatusUpdate = async () => {
    if (!id || selectedStatus === pedido.status) {
      alert("Nenhuma alteração de status para salvar.");
      return;
    }
    try {
      const pedidoAtualizado = await updatePedidoStatus(id, selectedStatus);
      setPedido(pedidoAtualizado);
      alert("Status do pedido atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar o status do pedido.");
      console.error(error);
    }
  };

  if (loading) {
    return <p>Carregando detalhes...</p>;
  }

  if (!pedido) {
    return <p>Pedido não encontrado.</p>;
  }
  
  const totalPedido = pedido.itens ? pedido.itens.reduce((acc, item) => acc + (Number(item.preco) * item.quantidade), 0) : 0;
  
  const totalPago = pedido.pagamentos ? pedido.pagamentos.reduce((acc, p) => acc + Number(p.valor), 0) : 0;
  
  const restante = totalPedido - totalPago;
  const isPago = restante <= 0.01;

  return (
    <div className="pedido-detalhes-container">
      <h3>Detalhes do Pedido #{pedido.id}</h3>

      <div className="card">
        <h4>Informações do Pedido</h4>
        <p><strong>Cliente:</strong> {pedido.cliente?.pessoa?.nome ?? 'Nome não disponível'}</p>
        <p><strong>Data do Pedido:</strong> {new Date(pedido.data).toLocaleDateString()}</p>
        <p><strong>Data de Entrega:</strong> {new Date(pedido.dataEntrega).toLocaleDateString()}</p>
        <p><strong>Endereço de Entrega:</strong> {pedido.enderecoEntrega || 'Retirada no local'}</p>
        <p><strong>Observações:</strong> {pedido.observacao || 'Nenhuma'}</p>
        <hr/>
        <h5>Itens:</h5>
        
        <table className="itens-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Preço Unit.</th>
              <th>Desconto</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {(pedido.itens ?? []).map(item => (
            <tr key={item.id}>
              <td>{item.produto?.nome || 'Produto não encontrado'}</td>
              <td>{item.quantidade}</td>
              <td>R$ {Number(item.preco).toFixed(2)}</td>
              <td>R$ {Number(item.desconto || 0).toFixed(2)}</td>
              <td>R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeft: isPago ? '5px solid green' : '5px solid orange' }}>
        <h4>Financeiro</h4>
        <p><strong>Valor Total do Pedido:</strong> R$ {totalPedido.toFixed(2)}</p>
        <p><strong>Total Pago:</strong> R$ {totalPago.toFixed(2)}</p>
        
        {!isPago && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
                <p style={{ color: '#856404', fontWeight: 'bold', marginBottom: '10px' }}>
                    Restante a Pagar: R$ {restante.toFixed(2)}
                </p>
                <button 
                    className="btn" 
                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => navigate(`/pagamentos/novo?pedidoId=${pedido.id}&valor=${restante.toFixed(2)}`)}
                >
                    💰 Registrar Pagamento
                </button>
            </div>
        )}
        
        {isPago && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>✅ PEDIDO QUITADO</p>}

        {pedido.pagamentos && pedido.pagamentos.length > 0 && (
            <div style={{ marginTop: '20px' }}>
                <h5>Histórico de Pagamentos:</h5>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9em', color: '#555' }}>
                    {pedido.pagamentos.map(p => (
                        <li key={p.id} style={{ borderBottom: '1px solid #eee', padding: '5px 0' }}>
                            📅 {new Date(p.dataPagamento).toLocaleDateString()} - 
                            💳 {p.formaPagamento}: 
                            <strong> R$ {Number(p.valor).toFixed(2)}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>

      <div className="card">
        <h4>Status do Pedido</h4>
        <div className="status-update-section">
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
            <option value="AGUARDANDO PAGAMENTO">Aguardando Pagamento</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Produção">Em Produção</option>
            <option value="Pronto">Pronto para Entrega</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button onClick={handleStatusUpdate}>Atualizar Status</button>
        </div>
      </div>

      <div className="card">
        <h4>Ações</h4>
        <button className='btn' onClick={handleEnviarEmail} style={{display: "flex", padding: "8px 15px", alignItems: 'center', gap: '10px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
          </svg>
          <span>Enviar Confirmação por Email</span>
        </button>
      </div>

      <Link to="/pedidos">Voltar para a Lista</Link>
    </div>
  );
};

export default PedidoDetalhes;