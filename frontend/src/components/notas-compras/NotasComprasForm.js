import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNotaCompra } from '../../services/notasComprasService';
import { getFornecedores } from '../../services/fornecedoresService';
import { getProducts } from '../../services/productService';
import { getInsumos } from '../../services/insumosService';
import '../forms.css';

const NotasComprasForm = () => {
    const navigate = useNavigate();
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [insumos, setInsumos] = useState([]);
    
    const [formData, setFormData] = useState({ chaveAcesso: '', idFornecedor: '', data: '', valorTotal: '' });
    const [itens, setItens] = useState([{ tipo: 'insumo', itemId: '', quantidade: '', codigoLote: '', dataValidade: '' }]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getFornecedores().then(setFornecedores);
        getProducts().then(setProdutos);
        getInsumos().then(setInsumos);
    }, []);

    const handleHeaderChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleItemChange = (index, event) => {
        const list = [...itens];
        list[index][event.target.name] = event.target.value;
        setItens(list);
    };

    const addItem = () => setItens([...itens, { tipo: 'insumo', itemId: '', quantidade: '', codigoLote: '', dataValidade: '' }]);
    const removeItem = (index) => {
        const list = [...itens];
        list.splice(index, 1);
        setItens(list);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const payload = {
            ...formData,
            idFornecedor: parseInt(formData.idFornecedor),
            valorTotal: parseFloat(formData.valorTotal),
            itens: itens.map(item => ({
                quantidade: parseFloat(item.quantidade),
                codigoLote: parseInt(item.codigoLote),
                dataValidade: item.dataValidade,
                idProduto: item.tipo === 'produto' ? parseInt(item.itemId) : null,
                idInsumo: item.tipo === 'insumo' ? parseInt(item.itemId) : null,
            })),
        };
        try {
            await createNotaCompra(payload);
            alert('Nota de compra registrada com sucesso!');
            navigate('/notas-compras');
        } catch (error) {
            alert('Erro ao registrar nota de compra.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h3>Registrar Nova Nota de Compra</h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Dados da Nota</legend>
                    <input name="chaveAcesso" value={formData.chaveAcesso} onChange={handleHeaderChange} placeholder="Chave de Acesso da NFe" required />
                    <select name="idFornecedor" value={formData.idFornecedor} onChange={handleHeaderChange} required>
                        <option value="">Selecione um Fornecedor</option>
                        {fornecedores.map(f => <option key={f.id} value={f.id}>{f.pessoa.nome}</option>)}
                    </select>
                    <input name="data" type="date" value={formData.data} onChange={handleHeaderChange} required />
                    <input name="valorTotal" type="number" step="0.01" value={formData.valorTotal} onChange={handleHeaderChange} placeholder="Valor Total da Nota" required />
                </fieldset>

                <fieldset>
                    <legend>Itens da Nota</legend>
                    {itens.map((item, index) => (
                        <div key={index} className="dynamic-field-row">
                            <select name="tipo" value={item.tipo} onChange={e => handleItemChange(index, e)}>
                                <option value="insumo">Insumo</option>
                                <option value="produto">Produto</option>
                            </select>
                            <select name="itemId" value={item.itemId} onChange={e => handleItemChange(index, e)} required>
                                <option value="">Selecione o Item</option>
                                {(item.tipo === 'insumo' ? insumos : produtos).map(i => <option key={i.id} value={i.id}>{i.nome}</option>)}
                            </select>
                            <input name="quantidade" type="number" step="0.01" value={item.quantidade} onChange={e => handleItemChange(index, e)} placeholder="Quantidade" required />
                            <input name="codigoLote" type="number" value={item.codigoLote} onChange={e => handleItemChange(index, e)} placeholder="Cód. Lote" required />
                            <input name="dataValidade" type="date" value={item.dataValidade} onChange={e => handleItemChange(index, e)} required />
                            {itens.length > 1 && <button type="button" onClick={() => removeItem(index)}>-</button>}
                        </div>
                    ))}
                    <button type="button" onClick={addItem}>+ Adicionar Item</button>
                </fieldset>
                
                <div className="form-actions">
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrar Compra'}</button>
                    <button type="button" onClick={() => navigate('/notas-compras')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default NotasComprasForm;