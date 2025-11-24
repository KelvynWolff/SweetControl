import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getPedidoById,
  enviarEmailPedido,
  updatePedidoStatus,
} from '../../services/pedidosService';
import '../forms.css';

const PedidoDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pedido, setPedido] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPedidoById(id)
      .then((data) => {
        setPedido(data);
        setSelectedStatus(data.status);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao carregar detalhes do pedido.');
        setLoading(false);
      });
  }, [id]);

  const handleEnviarEmail = async () => {
    if (!id) return;

    setSendingEmail(true);

    try {
      const response = await enviarEmailPedido(id);
      alert(response.message || 'Email enviado com sucesso!');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao enviar email.');
      console.error(err);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!id || selectedStatus === pedido.status) {
      alert('Nenhuma alteração de status para salvar.');
      return;
    }
    try {
      const pedidoAtualizado = await updatePedidoStatus(id, selectedStatus);
      setPedido(pedidoAtualizado);
      alert('Status do pedido atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar o status do pedido.');
      console.error(error);
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (!pedido) return <p>Pedido não encontrado.</p>;

  const totalPedido = pedido.itens
    ? pedido.itens.reduce(
        (acc, item) => acc + Number(item.preco) * item.quantidade,
        0,
      )
    : 0;

  const totalPago = pedido.pagamentos
    ? pedido.pagamentos.reduce((acc, p) => acc + Number(p.valor), 0)
    : 0;

  const restante = totalPedido - totalPago;
  const isPago = restante <= 0.01;

  return (
    <div className="pedido-detalhes-container">
      <h3>Detalhes do Pedido #{pedido.id}</h3>

      <div className="pedido-card">
        <h4>Informações do Pedido</h4>

        <p>
          <strong>Cliente:</strong> {pedido.cliente?.pessoa?.nome}
        </p>
        <p>
          <strong>Data do Pedido:</strong>{' '}
          {new Date(pedido.data).toLocaleDateString()}
        </p>
        <p>
          <strong>Data de Entrega:</strong>{' '}
          {new Date(pedido.dataEntrega).toLocaleDateString()}
        </p>
        <p>
          <strong>Endereço de Entrega:</strong>{' '}
          {pedido.enderecoEntrega || 'Retirada no local'}
        </p>
        <p>
          <strong>Observações:</strong> {pedido.observacao || 'Nenhuma'}
        </p>

        <h5 style={{ marginTop: '20px', marginBottom: '10px' }}>Itens</h5>

        <table className="pedido-detalhes-table">
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
            {pedido.itens.map((item) => (
              <tr key={item.id}>
                <td>{item.produto?.nome}</td>
                <td>{item.quantidade}</td>
                <td>R$ {Number(item.preco).toFixed(2)}</td>
                <td>R$ {Number(item.desconto || 0).toFixed(2)}</td>
                <td>
                  <strong>
                    R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="pedido-card"
        style={{ borderLeft: isPago ? '5px solid green' : '5px solid orange' }}
      >
        <h4>Financeiro</h4>

        <p>
          <strong>Valor Total do Pedido:</strong> R$ {totalPedido.toFixed(2)}
        </p>
        <p>
          <strong>Total Pago:</strong> R$ {totalPago.toFixed(2)}
        </p>

        {isPago ? (
          <p style={{ color: 'green', fontWeight: 'bold', marginTop: '15px' }}>
            ✅ PEDIDO QUITADO
          </p>
        ) : (
          <div className="pedido-card" style={{ background: '#fff3cd' }}>
            <p style={{ color: '#856404', fontWeight: 'bold' }}>
              Restante a Pagar: R$ {restante.toFixed(2)}
            </p>

            <button
              className="btn-registrar-pagamento"
              onClick={() =>
                navigate(
                  `/pagamentos/novo?pedidoId=${
                    pedido.id
                  }&valor=${restante.toFixed(2)}`,
                )
              }
            >
              Registrar Pagamento
            </button>
          </div>
        )}

        {pedido.pagamentos?.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h5>Histórico de Pagamentos:</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pedido.pagamentos.map((p) => (
                <li
                  key={p.id}
                  style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}
                >
                  📅 {new Date(p.dataPagamento).toLocaleDateString()} — 💳{' '}
                  {p.formaPagamento}:
                  <strong> R$ {Number(p.valor).toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pedido-card">
        <h4>Status do Pedido</h4>

        <div className="status-update-section">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="AGUARDANDO PAGAMENTO">Aguardando Pagamento</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Produção">Em Produção</option>
            <option value="Pronto">Pronto para Entrega</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <button className="btn-pink" onClick={handleStatusUpdate}>
            Atualizar Status
          </button>
        </div>
      </div>

      <div className="pedido-card">
        <h4>Ações</h4>

        <button
          className="btn-pink"
          onClick={handleEnviarEmail}
          disabled={sendingEmail}
        >
          {sendingEmail ? 'Enviando...' : 'Enviar Confirmação por Email'}
        </button>
      </div>

      <Link to="/pedidos" className="btn-link-orange">
        Voltar para a Lista
      </Link>
    </div>
  );
};

export default PedidoDetalhes;
