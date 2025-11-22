import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPedido, getPedidoById, updatePedido } from '../../services/pedidosService';
import { getClientes } from '../../services/clientesService';
import { getProducts } from '../../services/productService';
import '../forms.css';

const PedidosForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  
  const [formData, setFormData] = useState({
    idCliente: '',
    dataEntrega: '',
    observacao: ''
  });

  const [itensPedido, setItensPedido] = useState([]);

  const [currentItem, setCurrentItem] = useState({
    idProduto: '',
    nomeProduto: '',
    quantidade: 1,
    precoUnitario: 0,
    desconto: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([getClientes(), getProducts()])
      .then(([clientesData, produtosData]) => {
        setClientes(clientesData);
        setProdutos(produtosData);
      })
      .catch(err => alert("Erro ao carregar dados cadastrais."));

    if (isEditing) {
        getPedidoById(id).then(data => {
            setFormData({
                idCliente: data.cliente.id,
                dataEntrega: data.dataEntrega ? data.dataEntrega.split('T')[0] : '',
                observacao: data.observacao || ''
            });
            
            const itensFormatados = data.itens.map(item => ({
                idProduto: item.produto.id,
                nomeProduto: item.produto.nome,
                precoUnitario: Number(item.preco),
                desconto: Number(item.desconto || 0),
                quantidade: Number(item.quantidade),
                subtotal: (Number(item.preco) - Number(item.desconto || 0)) * Number(item.quantidade)
            }));
            setItensPedido(itensFormatados);
        });
    }
  }, [id, isEditing]);

  const handleHeaderChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductSelect = (e) => {
      const prodId = parseInt(e.target.value);
      if (!prodId) {
          setCurrentItem({ ...currentItem, idProduto: '', nomeProduto: '', precoUnitario: 0 });
          return;
      }

      const produtoInfo = produtos.find(p => p.id === prodId);
      
      setCurrentItem({
          ...currentItem,
          idProduto: prodId,
          nomeProduto: produtoInfo.nome,
          precoUnitario: Number(produtoInfo.preco), 
          desconto: 0
      });
  };

  const handleAddItem = () => {
      if (!currentItem.idProduto || currentItem.quantidade <= 0) {
          alert("Selecione um produto e uma quantidade válida.");
          return;
      }
      if (currentItem.precoUnitario < 0) return alert("O preço não pode ser negativo.");

      const jaExiste = itensPedido.find(i => i.idProduto === parseInt(currentItem.idProduto));
      if (jaExiste) {
          alert("Este produto já está na lista. Remova-o se quiser adicionar novamente com outros valores.");
          return;
      }

      const precoFinal = Math.max(0, Number(currentItem.precoUnitario) - Number(currentItem.desconto));
      const subtotal = precoFinal * Number(currentItem.quantidade);

      const novoItem = {
          idProduto: currentItem.idProduto,
          nomeProduto: currentItem.nomeProduto,
          precoUnitario: Number(currentItem.precoUnitario),
          desconto: Number(currentItem.desconto),
          quantidade: Number(currentItem.quantidade),
          subtotal: subtotal
      };

      setItensPedido([...itensPedido, novoItem]);
      
      setCurrentItem({ 
          idProduto: '', 
          nomeProduto: '', 
          quantidade: 1, 
          precoUnitario: 0, 
          desconto: 0 
      });
  };

  const handleRemoveItem = (index) => {
      const novaLista = [...itensPedido];
      novaLista.splice(index, 1);
      setItensPedido(novaLista);
  };

  const valorTotalPedido = itensPedido.reduce((acc, item) => acc + item.subtotal, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itensPedido.length === 0) return alert("Adicione pelo menos um item ao pedido.");
    if (!formData.dataEntrega) return alert("Informe a data de entrega.");

    setIsLoading(true);
    
    const payload = {
        idCliente: parseInt(formData.idCliente),
        dataEntrega: formData.dataEntrega,
        observacao: formData.observacao,
        itens: itensPedido.map(i => ({
            idProduto: i.idProduto,
            quantidade: i.quantidade,
            preco: i.precoUnitario - i.desconto 
        })),
    };

    try {
        if (isEditing) {
            await updatePedido(id, payload);
            alert("Pedido atualizado com sucesso!");
        } else {
            await createPedido(payload);
            alert("Pedido criado com sucesso! Status: Aguardando Pagamento.");
        }
        navigate('/pedidos');
    } catch (error) {
        alert("Erro ao salvar pedido: " + (error.response?.data?.message || error.message));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Pedido #${id}` : 'Novo Pedido de Venda'}</h3>
      
      <form onSubmit={handleSubmit}>
        
        <fieldset>
            <legend>Dados Gerais</legend>
            <div className="form-grid">
                <div className="form-group">
                    <label>Cliente *</label>
                    <select name="idCliente" value={formData.idCliente} onChange={handleHeaderChange} required disabled={isEditing}>
                        <option value="">Selecione...</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.pessoa.nome}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Data de Entrega *</label>
                    <input type="date" name="dataEntrega" value={formData.dataEntrega} onChange={handleHeaderChange} required />
                </div>
                <div className="form-group form-full">
                    <label>Observações</label>
                    <input type="text" name="observacao" value={formData.observacao} onChange={handleHeaderChange} placeholder="Ex: Entregar no portão dos fundos..." />
                </div>
            </div>
        </fieldset>

        <fieldset>
            <legend>Itens do Pedido</legend>
            
            <div className="add-item-box" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                
                <div className="form-group">
                    <label>Produto</label>
                    <select value={currentItem.idProduto} onChange={handleProductSelect}>
                        <option value="">Selecione...</option>
                        {produtos.map(p => (
                            <option key={p.id} value={p.id}>{p.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Preço (R$)</label>
                    <input 
                        type="number" step="0.01" 
                        value={currentItem.precoUnitario} 
                        onChange={e => setCurrentItem({...currentItem, precoUnitario: e.target.value})}
                    />
                </div>
                
                <div className="form-group">
                    <label>Desconto (R$)</label>
                    <input 
                        type="number" step="0.01" min="0"
                        value={currentItem.desconto} 
                        onChange={e => setCurrentItem({...currentItem, desconto: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Qtd</label>
                    <input 
                        type="number" min="0.1" step="0.1"
                        value={currentItem.quantidade} 
                        onChange={e => setCurrentItem({...currentItem, quantidade: e.target.value})}
                    />
                </div>

                <button type="button" onClick={handleAddItem} style={{marginBottom: '2px'}}>
                    + Incluir
                </button>
            </div>

            {itensPedido.length > 0 ? (
                <table className="items-table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Preço Unit.</th>
                            <th>Desc.</th>
                            <th>Qtd.</th>
                            <th>Subtotal</th>
                            <th style={{width: '50px'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {itensPedido.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nomeProduto}</td>
                                <td>R$ {Number(item.precoUnitario).toFixed(2)}</td>
                                <td style={{color: 'red'}}>{item.desconto > 0 ? `- R$ ${Number(item.desconto).toFixed(2)}` : '-'}</td>
                                <td>{item.quantidade}</td>
                                <td><strong>R$ {item.subtotal.toFixed(2)}</strong></td>
                                <td>
                                    <button type="button" className="icon-btn-delete" onClick={() => handleRemoveItem(index)} title="Remover">X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{textAlign: 'center', color: '#999', padding: '20px'}}>Nenhum item adicionado.</p>
            )}
        </fieldset>

        <div className="total-display">
            Total do Pedido: R$ {valorTotalPedido.toFixed(2)}
        </div>

        <div className="form-actions">
            <button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Confirmar Pedido'}</button>
            <button type="button" className="form-button-secondary" onClick={() => navigate('/pedidos')}>Cancelar</button>
        </div>

      </form>
    </div>
  );
};

export default PedidosForm;