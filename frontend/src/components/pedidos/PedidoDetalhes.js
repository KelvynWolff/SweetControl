import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPedidoById, enviarEmailPedido } from '../../services/pedidosService';
import './PedidoDetalhes.css';

const PedidoDetalhes = () => {
    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        getPedidoById(id)
            .then(data => {
                setPedido(data);
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
          alert(response.message);
        } catch (err) {
          const errorMessage = err.response?.data?.message || "Erro ao enviar email.";
          alert(errorMessage);
          console.error(err);
        }
    };

    if (loading) {
        return <p>Carregando detalhes...</p>;
    }

    if (!pedido) {
        return <p>Pedido não encontrado.</p>;
    }
    
    const totalPedido = pedido.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    return (
        <div className="pedido-detalhes-container">
            <h3>Detalhes do Pedido #{pedido.id}</h3>

            <div className="card">
                <h4>Informações do Pedido</h4>
                <p><strong>Cliente:</strong> {pedido.cliente.pessoa.nome}</p>
                <p><strong>Data:</strong> {new Date(pedido.data).toLocaleDateString()}</p>
                <p><strong>Observações:</strong> {pedido.observacao || 'Nenhuma'}</p>
                <hr/>
                <h5>Itens:</h5>
                <ul>
                    {pedido.itens.map(item => (
                        <li key={item.id}>
                            {item.produto.nome} ({item.quantidade}x) - R$ {Number(item.preco).toFixed(2)} cada
                        </li>
                    ))}
                </ul>
            </div>

            <div className="card">
                <h4>Pagamento</h4>
                <p><strong>Forma de Pagamento:</strong> {pedido.pagamento.formaPagamento}</p>
                <p><strong>Valor Total:</strong> R$ {Number(totalPedido).toFixed(2)}</p>
            </div>

            <div className="card">
                <h4>Status do Pedido</h4>
                <p><strong>Status Atual:</strong> {pedido.status}</p>
            </div>

            <div className="card">
                <h4>Ações</h4>
                <button onClick={handleEnviarEmail}>Enviar Confirmação por Email</button>
            </div>

            <Link to="/pedidos">Voltar para a Lista</Link>
        </div>
    );
};

export default PedidoDetalhes;