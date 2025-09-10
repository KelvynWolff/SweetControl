import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPedido } from '../../services/pedidosService';
import { getClientes } from '../../services/clientesService';
import { getProducts } from '../../services/productService';
import '../forms.css';

const PedidosForm = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    
    const [selectedCliente, setSelectedCliente] = useState('');
    const [itens, setItens] = useState([{ idProduto: '', quantidade: 1, preco: 0 }]);
    const [pagamento, setPagamento] = useState({ valor: 0, formaPagamento: 'PIX' });
    const [observacao, setObservacao] = useState('');
    
    const [dataEntrega, setDataEntrega] = useState('');

    useEffect(() => {
        getClientes().then(setClientes);
        getProducts().then(setProdutos);
    }, []);

    const addItem = () => {
        setItens([...itens, { idProduto: '', quantidade: 1, preco: 0 }]);
    };
    
    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...itens];
        list[index][name] = value;
        
        if (name === "idProduto") {
            const produtoSelecionado = produtos.find(p => p.id === parseInt(value));
            list[index].preco = produtoSelecionado ? produtoSelecionado.preco : 0;
        }
        setItens(list);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalPedido = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        
        const payload = {
            idCliente: parseInt(selectedCliente),
            status: 'Pendente',
            dataEntrega: dataEntrega,
            observacao,
            itens,
            pagamento: { ...pagamento, valor: totalPedido },
        };

        try {
            await createPedido(payload);
            alert('Pedido criado com sucesso!');
            navigate('/pedidos');
        } catch (error) {
            console.error("Erro ao criar pedido:", error.response?.data || error);
            alert('Erro ao criar pedido. Verifique o console do navegador e do back-end.');
        }
    };

    return (
        <div className="form-container">
            <h3>Novo Pedido</h3>
            <form onSubmit={handleSubmit}>
                <select value={selectedCliente} onChange={e => setSelectedCliente(e.target.value)} style={{marginTop: "10px"}} required>
                    <option value="">Selecione um Cliente</option>
                    {clientes.map(c => <option key={c.id} value={c.id}>{c.pessoa.nome}</option>)}
                </select>

                <fieldset style={{marginTop: "20px"}}>
                    <legend>Itens do Pedido</legend>
                    {itens.map((item, index) => (
                        <div key={index} className="dynamic-field">
                            <select name="idProduto" value={item.idProduto} onChange={e => handleItemChange(index, e)} required>
                                <option value="">Selecione um Produto</option>
                                {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                            </select>
                            <input name="quantidade" type="number" value={item.quantidade} onChange={e => handleItemChange(index, e)} min="1" />
                        </div>
                    ))}
                    <button type="button" onClick={addItem}>+ Adicionar Item</button>
                </fieldset>
                
                <fieldset style={{marginTop: "20px"}}>
                    <legend>Entrega e Pagamento</legend>
                    <label htmlFor="dataEntrega">Data de Entrega:</label>
                    <input 
                        type="date" 
                        id="dataEntrega" 
                        value={dataEntrega} 
                        onChange={e => setDataEntrega(e.target.value)} 
                        required 
                    />
                    <select name="formaPagamento" value={pagamento.formaPagamento} onChange={e => setPagamento({...pagamento, formaPagamento: e.target.value})}>
                        <option value="PIX">PIX</option>
                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                        <option value="Dinheiro">Dinheiro</option>
                    </select>
                </fieldset>

                <textarea style={{marginTop: "20px", width: '50%'}} rows="5" name="observacao" value={observacao} onChange={e => setObservacao(e.target.value)} placeholder="Observações adicionais..."></textarea>
                
                <div className="form-actions" style={{marginTop: "20px"}}>
                    <button type="submit">Cadastrar Pedido</button>
                    <button type="button" style={{backgroundColor: "gray", marginTop: '5px'}} onClick={() => navigate('/pedidos')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default PedidosForm;