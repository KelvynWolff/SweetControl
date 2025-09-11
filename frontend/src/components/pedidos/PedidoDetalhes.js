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
                        {pedido.itens.map(item => (
                            <tr key={item.id}>
                                <td>{item.produto.nome}</td>
                                <td>{item.quantidade}</td>
                                <td>R$ {Number(item.preco).toFixed(2)}</td>
                                <td>R$ {Number(item.desconto || 0).toFixed(2)}</td>
                                <td>R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                <button className='btn' onClick={handleEnviarEmail} style={{display: "flex", padding: "8px 15px", alignItems: 'center'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>
                    <span style={{marginLeft: "10px"}}>
                        Enviar Confirmação por Email
                    </span>
                </button>
            </div>

            <Link to="/pedidos">Voltar para a Lista</Link>
        </div>
    );
};

export default PedidoDetalhes;