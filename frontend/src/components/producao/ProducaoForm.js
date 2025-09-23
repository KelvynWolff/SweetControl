import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducao } from '../../services/producaoService';
import { getProducts } from '../../services/productService';
import { getReceitas } from '../../services/receitasService';
import '../forms.css';

const ProducaoForm = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [selectedProduto, setSelectedProduto] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [observacao, setObservacao] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProducts().then(setProdutos);
        getReceitas().then(setReceitas);
    }, []);

    const receitaDoProduto = receitas.filter(r => r.idProduto === parseInt(selectedProduto));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const payload = {
            idProduto: parseInt(selectedProduto),
            quantidade: parseFloat(quantidade),
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
                <div className="form-group">
                    <label>Produto a ser Produzido:</label>
                    <select value={selectedProduto} onChange={e => setSelectedProduto(e.target.value)} required>
                        <option value="">Selecione um Produto</option>
                        {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </div>

                {selectedProduto && (
                    <div className="card">
                        <h4>Receita Necessária:</h4>
                        {receitaDoProduto.length > 0 ? (
                            <ul>
                                {receitaDoProduto.map(item => (
                                    <li key={item.id}>
                                        {item.insumo.nome}: {item.qtdInsumo * quantidade} {item.insumo.unidadeMedida}
                                    </li>
                                ))}
                            </ul>
                        ) : <p style={{color: 'red'}}>Este produto não possui receita!</p>}
                    </div>
                )}
                
                <div className="form-group">
                    <label>Quantidade a Produzir:</label>
                    <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} min="1" required />
                </div>
                
                <div className="form-group">
                    <label>Observações:</label>
                    <textarea value={observacao} onChange={e => setObservacao(e.target.value)} placeholder="Lote, data de validade, etc."></textarea>
                </div>
                
                <div className="form-actions">
                    <button type="submit" disabled={isLoading || (selectedProduto && receitaDoProduto.length === 0)}>
                        {isLoading ? 'Registrando...' : 'Registrar Produção'}
                    </button>
                    <button type="button" onClick={() => navigate('/')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ProducaoForm;