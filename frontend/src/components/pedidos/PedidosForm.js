import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPedido, getPedidoById, updatePedido } from '../../services/pedidosService';
import { getClientes } from '../../services/clientesService';
import { getProducts } from '../../services/productService';
import { getPromocoesAtivas } from '../../services/promocoesService';
import '../forms.css';

const PedidosForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [promocoes, setPromocoes] = useState([]);

    const [selectedCliente, setSelectedCliente] = useState('');
    const [itens, setItens] = useState([{ idProduto: '', quantidade: 1, precoUnitario: 0, descontoPercentual: 0, precoFinal: 0, descontoMsg: '' }]);
    const [pagamento, setPagamento] = useState({ formaPagamento: 'PIX' });
    const [observacao, setObservacao] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [status, setStatus] = useState('Pendente');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getClientes(), getProducts(), getPromocoesAtivas()])
            .then(([clientesData, produtosData, promocoesData]) => {
                setClientes(clientesData);
                setProdutos(produtosData);
                setPromocoes(promocoesData);

                if (isEditing) {
                    getPedidoById(id).then(data => {
                        setSelectedCliente(data.idCliente);
                        setDataEntrega(new Date(data.dataEntrega).toISOString().split('T')[0]);
                        setObservacao(data.observacao || '');
                        setStatus(data.status);
                        setPagamento(data.pagamento || { formaPagamento: 'PIX' });
                        
                        if (data.itens && data.itens.length > 0) {
                            const itensDoPedido = data.itens.map(item => {
                                const produto = produtosData.find(p => p.id === item.idProduto);
                                const precoOriginal = produto ? produto.preco : item.preco;
                                const descontoEmValor = precoOriginal - item.preco;
                                const descontoPercentual = precoOriginal > 0 ? (descontoEmValor / precoOriginal) * 100 : 0;
                                
                                return {
                                    idProduto: item.idProduto,
                                    quantidade: item.quantidade,
                                    precoUnitario: precoOriginal,
                                    descontoPercentual: descontoPercentual,
                                    precoFinal: item.preco,
                                    descontoMsg: descontoPercentual > 0 ? 'Promoção/Desconto aplicado' : '',
                                };
                            });
                            setItens(itensDoPedido);
                        }
                    }).catch(() => {
                        alert("Pedido não encontrado.");
                        navigate('/pedidos');
                    });
                }
            })
            .catch(err => alert("Erro ao carregar dados necessários para o formulário."))
            .finally(() => setIsLoading(false));
    }, [id, isEditing, navigate]);

    const totalPedido = itens.reduce((acc, item) => acc + (Number(item.precoFinal) * Number(item.quantidade)), 0);

    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...itens];
        const item = list[index];
        item[name] = value;

        const produtoSelecionado = produtos.find(p => p.id === parseInt(item.idProduto));

        if (produtoSelecionado) {
            if (name === "idProduto") {
                item.precoUnitario = produtoSelecionado.preco;
                item.descontoPercentual = 0;
                
                const promocao = promocoes.find(p => p.idProduto === produtoSelecionado.id);
                if (promocao) {
                    if (promocao.tipoDeDesconto === 'Percentual') {
                        item.descontoPercentual = promocao.valor;
                    } else if (promocao.tipoDeDesconto === 'Valor Fixo') {
                        item.descontoPercentual = (promocao.valor / produtoSelecionado.preco) * 100;
                    }
                    item.descontoMsg = `Promoção: ${promocao.nome}`;
                } else {
                    item.descontoMsg = '';
                }
            }
            const desconto = item.precoUnitario * (item.descontoPercentual / 100);
            item.precoFinal = item.precoUnitario - desconto;
            if (item.precoFinal < 0) item.precoFinal = 0;
        }
        setItens(list);
    };

    const addItem = () => {
        setItens([...itens, { idProduto: '', quantidade: 1, precoUnitario: 0, descontoPercentual: 0, precoFinal: 0, descontoMsg: '' }]);
    };

    const removeItem = (index) => {
        if (itens.length <= 1) return;
        const list = [...itens];
        list.splice(index, 1);
        setItens(list);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const itensValidos = itens.filter(item => item.idProduto && Number(item.quantidade) > 0).map(item => ({
            idProduto: parseInt(item.idProduto),
            quantidade: parseFloat(item.quantidade),
            preco: parseFloat(item.precoFinal),
            desconto: parseFloat(item.precoUnitario) - parseFloat(item.precoFinal),
        }));

        if (itensValidos.length === 0) {
            alert("Adicione pelo menos um item válido ao pedido.");
            setIsLoading(false);
            return;
        }

        const payload = {
            idCliente: parseInt(selectedCliente),
            status,
            dataEntrega,
            observacao,
            itens: itensValidos,
            pagamento: { ...pagamento, valor: totalPedido },
        };

        try {
            if (isEditing) {
                await updatePedido(id, payload);
                alert('Pedido atualizado com sucesso!');
            } else {
                await createPedido(payload);
                alert('Pedido criado com sucesso!');
            }
            navigate('/pedidos');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao salvar o pedido.';
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoading && !isEditing) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="form-container">
            <h3>{isEditing ? `Editar Pedido #${id}` : 'Novo Pedido'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cliente">Cliente:</label>
                    <select id="cliente" value={selectedCliente} onChange={e => setSelectedCliente(e.target.value)} required disabled={isEditing}>
                        <option value="">Selecione um Cliente</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.pessoa.nome}</option>)}
                    </select>
                </div>
                
                {isEditing && (
                    <div className="form-group">
                        <label>Status do Pedido</label>
                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option>Pendente</option>
                            <option>Em Produção</option>
                            <option>Pronto</option>
                            <option>Entregue</option>
                            <option>Cancelado</option>
                        </select>
                    </div>
                )}

                <fieldset>
                    <legend>Itens do Pedido</legend>
                    {itens.map((item, index) => (
                        <div key={index} className="item-pedido-row">
                            <div className="form-group produto-field"><label>Produto:</label><select name="idProduto" value={item.idProduto} onChange={e => handleItemChange(index, e)} required><option value="">Selecione...</option>{produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}</select></div>
                            <div className="form-group qtd-field"><label>Qtd:</label><input name="quantidade" type="number" value={item.quantidade} onChange={e => handleItemChange(index, e)} min="1" /></div>
                            <div className="form-group preco-field"><label>Preço Unit.:</label><input name="precoUnitario" type="number" step="0.01" value={item.precoUnitario} onChange={e => handleItemChange(index, e)} /></div>
                            <div className="form-group desconto-field"><label>Desconto (%):</label><input name="descontoPercentual" type="number" step="0.01" value={item.descontoPercentual} onChange={e => handleItemChange(index, e)} /></div>
                            <div className="item-price-info"><span>Final: R$ {Number(item.precoFinal).toFixed(2)}</span>{item.descontoMsg && <small className="desconto-aplicado">{item.descontoMsg}</small>}</div>
                            <button type="button" onClick={() => removeItem(index)} className="btn-remove-item">-</button>
                        </div>
                    ))}
                    <button type="button" onClick={addItem}>+ Adicionar Item</button>
                </fieldset>
                
                <fieldset>
                    <legend>Entrega e Pagamento</legend>
                    <div className="form-group"><label htmlFor="dataEntrega">Data de Entrega:</label><input type="date" id="dataEntrega" value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} required /></div>
                    <div className="form-group"><label htmlFor="formaPagamento">Forma de Pagamento:</label><select id="formaPagamento" name="formaPagamento" value={pagamento.formaPagamento} onChange={e => setPagamento({...pagamento, formaPagamento: e.target.value})}><option value="PIX">PIX</option><option value="Cartão de Crédito">Cartão de Crédito</option><option value="Dinheiro">Dinheiro</option></select></div>
                </fieldset>
                
                <div className="form-group"><label htmlFor="observacao">Observações:</label><textarea id="observacao" name="observacao" value={observacao} onChange={e => setObservacao(e.target.value)} placeholder="Observações adicionais..."></textarea></div>
                
                <div className="total-pedido"><strong>Total do Pedido: R$ {totalPedido.toFixed(2)}</strong></div>

                <div className="form-actions"><button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar Pedido'}</button><button type="button" onClick={() => navigate('/pedidos')}>Cancelar</button></div>
            </form>
        </div>
    );
};

export default PedidosForm;