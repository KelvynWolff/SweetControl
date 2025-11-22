import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPagamento } from '../../services/pagamentosService';
import { getPedidos, getPedidoById } from '../../services/pedidosService';
import '../forms.css';

const PagamentosForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('PIX');
  const [dataPagamento, setDataPagamento] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    getPedidos()
      .then(data => {
        const pedidosPendentes = data.filter(p => 
            p.status !== 'Pago' && 
            p.status !== 'Entregue' && 
            p.status !== 'Cancelado'
        );
        setPedidos(pedidosPendentes);

        const urlPedidoId = searchParams.get('pedidoId');
        const urlValor = searchParams.get('valor');

        if (urlPedidoId) {
            setSelectedPedido(urlPedidoId);
        }
        if (urlValor) {
            setValorPago(urlValor);
        }
      })
      .catch(err => console.error("Erro ao carregar pedidos:", err));
  }, [searchParams]);

  const handlePedidoChange = async (e) => {
    const pedidoId = e.target.value;
    setSelectedPedido(pedidoId);
    
    if (pedidoId) {
      try {
        const pedidoCompleto = await getPedidoById(pedidoId);
        
        const total = pedidoCompleto.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        
        const totalPago = pedidoCompleto.pagamentos ? pedidoCompleto.pagamentos.reduce((acc, p) => acc + Number(p.valor), 0) : 0;
        const restante = total - totalPago;

        setValorPago(restante.toFixed(2));

      } catch (error) {
        console.error("Erro ao buscar detalhes do pedido:", error);
        alert("Não foi possível carregar os detalhes deste pedido.");
      }
    } else {
        setValorPago('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      idPedido: parseInt(selectedPedido),
      valor: parseFloat(valorPago),
      formaPagamento,
      dataPagamento,
    };
    try {
      await createPagamento(payload);
      alert('Pagamento registrado com sucesso!');
      navigate('/pagamentos');
    } catch (error) {
      alert('Erro ao registrar pagamento.');
    }
  };

  return (
    <div className="form-container">
      <h3>Registrar Pagamento</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pedido</label>
          <select value={selectedPedido} onChange={handlePedidoChange} required>
            <option value="">Selecione um Pedido</option>
            {pedidos.map(p => (
                <option key={p.id} value={p.id}>
                    #{p.id} - {p.cliente?.pessoa?.nome || 'Cliente Desconhecido'}
                </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Valor Pago (R$)</label>
          <input type="number" step="0.01" value={valorPago} onChange={e => setValorPago(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Forma de Pagamento</label>
          <select value={formaPagamento} onChange={e => setFormaPagamento(e.target.value)}>
            <option value="PIX">PIX</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
        <div className="form-group">
          <label>Data do Pagamento</label>
          <input type="date" value={dataPagamento} onChange={e => setDataPagamento(e.target.value)} required />
        </div>
        <div className="form-actions">
          <button type="submit" className='button-confirm'>Registrar Pagamento</button>
          <button type="button" className='button-cancel' onClick={() => navigate('/pagamentos')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default PagamentosForm;