import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducao } from '../../services/producaoService';
import { getProducts } from '../../services/productService';
import { getReceitas } from '../../services/receitasService';
import { getInsumos } from '../../services/insumosService';
import '../forms.css';

const ProducaoForm = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [insumos, setInsumos] = useState([]);
    
    const [selectedProduto, setSelectedProduto] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [observacao, setObservacao] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [codigoLote, setCodigoLote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Promise.all([
            getProducts(),
            getReceitas(),
            getInsumos()
        ])
        .then(([produtosData, receitasData, insumosData]) => {
            setProdutos(produtosData);
            setReceitas(receitasData);
            setInsumos(insumosData);
        })
        .catch(err => alert("Erro ao carregar dados cadastrais."));
    }, []);

    const receitaDoProdutoBase = receitas.filter(r => r.idProduto === parseInt(selectedProduto));

    const receitaDetalhada = receitaDoProdutoBase.map(item => {
        const insumoInfo = insumos.find(i => i.id === item.idInsumo);
        return {
            ...item,
            nomeInsumo: insumoInfo?.nome || 'Insumo não encontrado',
            unidadeMedida: insumoInfo?.unidadeMedida || 'UN',
            quantidadeTotal: (item.qtdInsumo * parseFloat(quantidade)) || 0,
        };
    });
    
    const isReceitaVazia = selectedProduto && receitaDoProdutoBase.length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isReceitaVazia) {
             return alert("Não é possível produzir. Este produto não possui receita cadastrada.");
        }
        if (!codigoLote) {
            return alert("O Código do Lote Final é obrigatório.");
        }
        
        setIsLoading(true);
        
        const payload = {
            idProduto: parseInt(selectedProduto),
            quantidade: parseFloat(quantidade),
            dataValidade: dataValidade,
            codigoLote: codigoLote,
            observacao,
        };
        
        try {
            await createProducao(payload);
            alert('Ordem de produção registrada com sucesso!');
            navigate('/producao');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao registrar produção.';
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h3>Registrar Nova Produção</h3>
            
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Dados da Ordem e Lote</legend>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Produto a Fabricar *</label>
                            <select value={selectedProduto} onChange={e => setSelectedProduto(e.target.value)} required>
                                <option value="">Selecione um Produto...</option>
                                {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Quantidade a Produzir *</label>
                            <input type="number" min="0.1" step="0.1" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
                        </div>
                        
                        <div className="form-group">
                            <label>Código do Lote Final *</label>
                            <input
                                type="text"
                                value={codigoLote}
                                onChange={e => setCodigoLote(e.target.value)}
                                placeholder="Ex: P2025-001"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Data de Validade (Lote Final) *</label>
                            <input
                                type="date"
                                value={dataValidade}
                                onChange={e => setDataValidade(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </fieldset>
                
                {selectedProduto && (
                    <fieldset style={{ borderColor: isReceitaVazia ? 'red' : '#3498db' }}>
                        <legend>Receita Necessária</legend>
                        
                        {isReceitaVazia ? (
                            <p style={{color: 'red', fontWeight: 'bold'}}>ATENÇÃO: Este produto não possui receita cadastrada. A produção será bloqueada.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {receitaDetalhada.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '5px' }}>
                                        {item.nomeInsumo}: <strong>{item.quantidadeTotal.toFixed(2)} {item.unidadeMedida}</strong>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </fieldset>
                )}
                
                <div className="form-group form-full">
                    <label>Observações</label>
                    <textarea value={observacao} onChange={e => setObservacao(e.target.value)} placeholder="Lote, data de validade, etc."></textarea>
                </div>
                
                <div className="form-actions">
                    <button type="submit" disabled={isLoading || isReceitaVazia} className='button-confirm'>
                        {isLoading ? 'Registrando...' : 'Registrar Produção'}
                    </button>
                    <button type="button" className='form-button-secondary button-cancel' onClick={() => navigate('/producao')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ProducaoForm;