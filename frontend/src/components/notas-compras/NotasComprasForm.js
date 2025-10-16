import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNotaCompra, uploadNotaXml } from '../../services/notasComprasService';
import { getFornecedores } from '../../services/fornecedoresService';
import { getProducts } from '../../services/productService';
import { getInsumos } from '../../services/insumosService';
import { getLotes } from '../../services/lotesService';
import '../forms.css';

const LoteModal = ({ onSave, onCancel, lotesExistentes }) => {
    const [codigoLote, setCodigoLote] = useState('');
    const [loteEncontrado, setLoteEncontrado] = useState(null);
    const [dataValidade, setDataValidade] = useState('');
    
    const handleSearch = () => {
        const encontrado = lotesExistentes.find(l => l.codigoLote.toString() === codigoLote);
        setLoteEncontrado(encontrado || false);
    };

    const handleSave = () => {
        if (!codigoLote) return alert("Por favor, informe um código para o lote.");
        if (loteEncontrado) {
            onSave({ codigoLote: codigoLote, dataValidade: undefined });
        } 
        else if (loteEncontrado === false && dataValidade) {
            onSave({ codigoLote: codigoLote, dataValidade });
        } 
        else {
            alert("Busque o lote. Se não existir, informe a data de validade para poder criá-lo.");
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h4>Buscar ou Cadastrar Lote</h4>
                <div className="form-group">
                    <label>Código do Lote</label>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <input type="text" value={codigoLote} onChange={e => setCodigoLote(e.target.value)} placeholder="Ex: L2025-A1" />
                        <button type="button" onClick={handleSearch}>Buscar</button>
                    </div>
                </div>

                {loteEncontrado && <p style={{color: 'green'}}>Lote encontrado! Validade: {new Date(loteEncontrado.dataValidade).toLocaleDateString()}</p>}
                
                {loteEncontrado === false && (
                    <div className="form-group">
                        <label>Lote não encontrado. Informe a data de validade para cadastrá-lo:</label>
                        <input type="date" value={dataValidade} onChange={e => setDataValidade(e.target.value)} required />
                    </div>
                )}

                <div className="form-actions">
                    <button type="button" onClick={onCancel}>Cancelar</button>
                    <button type="button" onClick={handleSave} disabled={loteEncontrado === null && !dataValidade}>Salvar Lote</button>
                </div>
            </div>
        </div>
    );
};


const NotasComprasForm = () => {
    const navigate = useNavigate();
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [insumos, setInsumos] = useState([]);
    const [lotes, setLotes] = useState([]);
    
    const [formData, setFormData] = useState({ chaveAcesso: '', idFornecedor: '', data: '', valorTotal: '' });
    const [itens, setItens] = useState([{ tipo: 'insumo', itemId: '', quantidade: '', precoCompra: '', codigoLote: null, dataValidade: null }]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Promise.all([ getFornecedores(), getProducts(), getInsumos(), getLotes() ])
            .then(([fornecedoresData, produtosData, insumosData, lotesData]) => {
                setFornecedores(fornecedoresData);
                setProdutos(produtosData);
                setInsumos(insumosData);
                setLotes(lotesData);
            }).catch(err => alert("Erro ao carregar dados de apoio."));
    }, []);

    const handleHeaderChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleItemChange = (index, event) => {
        const list = [...itens];
        list[index][event.target.name] = event.target.value;
        setItens(list);
    };

    const addItem = () => setItens([...itens, { tipo: 'insumo', itemId: '', quantidade: '', precoCompra: '', codigoLote: null, dataValidade: null }]);
    const removeItem = (index) => { if(itens.length > 1) { const list = [...itens]; list.splice(index, 1); setItens(list); }};
    const handleOpenLoteModal = (index) => { setCurrentItemIndex(index); setIsModalOpen(true); };
    const handleSaveLote = (loteData) => {
        const list = [...itens];
        list[currentItemIndex] = { ...list[currentItemIndex], ...loteData };
        setItens(list);
        setIsModalOpen(false);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setIsLoading(true);
        try {
            const response = await uploadNotaXml(file);
            const { dadosNota, produtos: produtosAtualizados, insumos: insumosAtualizados } = response;

            setProdutos(produtosAtualizados);
            setInsumos(insumosAtualizados);

            const parsedData = await uploadNotaXml(file);
            setFormData({
                chaveAcesso: dadosNota.chaveAcesso,
                idFornecedor: dadosNota.idFornecedor,
                data: dadosNota.data,
                valorTotal: dadosNota.valorTotal,
            });

            const itensDoXml = dadosNota.itens.map(itemXml => {
                const insumo = insumosAtualizados.find(i => i.nome.toLowerCase() === itemXml.nomeProduto.toLowerCase());
                const produto = produtosAtualizados.find(p => p.nome.toLowerCase() === itemXml.nomeProduto.toLowerCase());
                
                return {
                    tipo: insumo ? 'insumo' : (produto ? 'produto' : 'insumo'),
                    itemId: insumo?.id || produto?.id || '',
                    quantidade: itemXml.quantidade,
                    precoCompra: itemXml.precoCompra,
                    codigoLote: itemXml.codigoLote,
                    dataValidade: itemXml.dataValidade || null,
                };
            });
            setItens(itensDoXml);
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao processar o arquivo XML.");
        } finally {
            setIsLoading(false);
        }
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
                precoCompra: parseFloat(item.precoCompra),
                codigoLote: item.codigoLote,
                dataValidade: item.dataValidade || undefined,
                idProduto: item.tipo === 'produto' ? parseInt(item.itemId) : null,
                idInsumo: item.tipo === 'insumo' ? parseInt(item.itemId) : null,
            })),
        };
        try {
            await createNotaCompra(payload);
            alert('Nota de compra registrada com sucesso!');
            navigate('/entradas');
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao registrar nota de compra.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h3>Registrar Nova Nota de Compra</h3>
            
            <div className="form-group">
                <label htmlFor="xml-upload" className="upload-label">
                    Carregar a partir de um XML da NF-e
                </label>
                <input id="xml-upload" type="file" accept=".xml" onChange={handleFileUpload} style={{ display: 'none' }} />
            </div>

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
                            <input name="precoCompra" type="number" step="0.01" value={item.precoCompra} onChange={e => handleItemChange(index, e)} placeholder="Preço Compra" required />
                            <input name="quantidade" type="number" step="0.01" value={item.quantidade} onChange={e => handleItemChange(index, e)} placeholder="Quantidade" required />
                            <button type="button" onClick={() => handleOpenLoteModal(index)}>
                                {item.codigoLote ? `Lote: ${item.codigoLote}` : 'Adicionar Lote'}
                            </button>
                            {itens.length > 1 && <button type="button" onClick={() => removeItem(index)}>-</button>}
                        </div>
                    ))}
                    <button type="button" onClick={addItem}>+ Adicionar Item</button>
                </fieldset>
                
                {isModalOpen && (
                    <LoteModal 
                        onSave={handleSaveLote} 
                        onCancel={() => setIsModalOpen(false)}
                        lotesExistentes={lotes}
                    />
                )}

                <div className="form-actions">
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrar Compra'}</button>
                    <button type="button" onClick={() => navigate('/entradas')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default NotasComprasForm;