import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReceitas, updateReceita, createReceita, deleteReceita } from '../../services/receitasService';
import { getProducts } from '../../services/productService';
import { getInsumos } from '../../services/insumosService';

const ReceitasForm = () => {
    const styles = {
        formContainer: {
            maxWidth: '800px', margin: '2rem auto', padding: '2rem', backgroundColor: '#f9f9f9',
            borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        },
        formGroup: { marginBottom: '1.5rem' },
        label: { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' },
        select: { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' },
        selectDisabled: { backgroundColor: '#e9ecef', cursor: 'not-allowed' },
        input: { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' },
        hr: { border: 'none', borderTop: '1px solid #eee', margin: '2rem 0' },
        insumoListHeader: {
            display: 'flex', gap: '10px', fontWeight: 'bold', paddingBottom: '0.5rem',
            borderBottom: '2px solid #eee', marginBottom: '1rem'
        },
        insumoRow: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '0.5rem' },
        insumoName: { flex: 3 },
        insumoQtd: { flex: 2 },
        insumoAction: { flex: 1 },
        btn: {
            padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer',
            fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s'
        },
        btnPrimary: { backgroundColor: '#007bff', color: 'white' },
        btnSecondary: { backgroundColor: '#6c757d', color: 'white', marginTop: '1rem' },
        btnDanger: { backgroundColor: '#dc3545', color: 'white' },
        btnCancel: { backgroundColor: '#a0a0a0', color: 'white' },
        btnDisabled: { backgroundColor: '#a0cfff', cursor: 'not-allowed' },
        formActions: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' },
        notification: {
            padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px',
            color: 'white', textAlign: 'center'
        },
        notificationSuccess: { backgroundColor: '#28a745' },
        notificationError: { backgroundColor: '#dc3545' },
    };

    const { id: produtoId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(produtoId);

    const [produtos, setProdutos] = useState([]);
    const [insumos, setInsumos] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(produtoId || '');
    const [insumoList, setInsumoList] = useState([{ idInsumo: '', qtdInsumo: '' }]);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [existingInsumoIds, setExistingInsumoIds] = useState(new Set());
    const [dependenciesLoaded, setDependenciesLoaded] = useState(false);

    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const [produtosData, insumosData] = await Promise.all([getProducts(), getInsumos()]);
                setProdutos(produtosData);
                setInsumos(insumosData);
                setDependenciesLoaded(true);
            } catch (err) {
                console.error("ERRO ao buscar dependências:", err);
                setNotification({ message: 'Erro ao carregar dependências.', type: 'error' });
            }
        };
        fetchDependencies();
    }, []);

    useEffect(() => {
        if (!dependenciesLoaded) {
            console.log("Aguardando dependências serem carregadas...");
            return;
        }

        setSelectedProductId(produtoId || '');

        const loadFormData = async () => {
            setIsLoading(true);
            setInsumoList([{ idInsumo: '', qtdInsumo: '' }]);

            if (isEditing) {
                try {
                    const todasAsReceitas = await getReceitas();

                    const idNumerico = parseInt(produtoId, 10);
                    
                    const receitaDoProduto = todasAsReceitas.filter(item => {
                        if (item.idProduto === idNumerico) return true;
                        return false;
                    });
                    

                    if (receitaDoProduto.length > 0) {
                        const novaListaInsumos = receitaDoProduto.map(item => ({ idInsumo: item.idInsumo, qtdInsumo: item.qtdInsumo }));
                        setInsumoList(novaListaInsumos);
                    }
                } catch (err) {
                    setNotification({ message: 'Erro ao buscar receita para edição.', type: 'error' });
                }
            }
            setIsLoading(false);
        };

        loadFormData();
    }, [produtoId, isEditing, dependenciesLoaded]);

    useEffect(() => {
        if (!dependenciesLoaded) return;
        const checkForExistingRecipe = async () => {
            if (!isEditing && selectedProductId) {
                try {
                    const todasAsReceitas = await getReceitas();
                    const receitaDoProduto = todasAsReceitas.filter(item => item.idProduto === parseInt(selectedProductId, 10));
                    const ids = new Set(receitaDoProduto.map(item => item.idInsumo));
                    setExistingInsumoIds(ids);
                } catch (error) {
                    console.error("Erro ao verificar receita existente:", error);
                }
            } else {
                setExistingInsumoIds(new Set());
            }
        };
        checkForExistingRecipe();
    }, [selectedProductId, isEditing, dependenciesLoaded]);

    const handleInsumoChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...insumoList];
        list[index][name] = name === 'idInsumo' ? parseInt(value, 10) : value;
        setInsumoList(list);
    };

    const addInsumoField = () => setInsumoList([...insumoList, { idInsumo: '', qtdInsumo: '' }]);
    const removeInsumoField = (index) => {
        const list = [...insumoList];
        list.splice(index, 1);
        setInsumoList(list);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProductId || insumoList.some(i => !i.idInsumo || !i.qtdInsumo || i.qtdInsumo <= 0)) {
            setNotification({ message: 'Por favor, preencha todos os campos corretamente.', type: 'error' });
            return;
        }
        setIsLoading(true);
        setNotification({ message: '', type: '' });

        try {
            if (isEditing) {
                const todasAsReceitas = await getReceitas();
                const idNumerico = parseInt(produtoId, 10);
                const receitaDoProduto = todasAsReceitas.filter(item => item.idProduto === idNumerico);

                for (const item of receitaDoProduto) {
                    await deleteReceita(item.id);
                }
            }

            for (const insumo of insumoList) {
                const payload = {
                    idProduto: parseInt(selectedProductId),
                    idInsumo: parseInt(insumo.idInsumo),
                    qtdInsumo: parseFloat(insumo.qtdInsumo)
                };
                await createReceita(payload);
            }
            
            setNotification({ 
                message: isEditing ? 'Receita atualizada com sucesso!' : 'Receita criada com sucesso!', 
                type: 'success' 
            });

            setTimeout(() => navigate('/receitas'), 1500);
        } catch (error) {
            console.error("Erro ao salvar receita:", error);
            setNotification({ message: 'Erro ao salvar a receita. Verifique o console.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h3>{isEditing ? 'Editar Receita' : 'Cadastrar Nova Receita'}</h3>
            {notification.message && (
                <div style={{ ...styles.notification, ...(notification.type === 'success' ? styles.notificationSuccess : styles.notificationError) }}>
                    {notification.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="produto" style={styles.label}>Produto:</label>
                    <select id="produto" value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} disabled={isEditing} required style={{ ...styles.select, ...(isEditing && styles.selectDisabled) }}>
                        <option value="">Selecione um Produto</option>
                        {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </div>
                <hr style={styles.hr} />
                <h4>Insumos da Receita</h4>
                <div style={styles.insumoListHeader}>
                    <div style={styles.insumoName}>Insumo</div>
                    <div style={styles.insumoQtd}>Quantidade</div>
                    {!isEditing && <div style={styles.insumoAction}>Ação</div>}
                </div>
                {insumoList.map((insumoField, index) => (
                    <div key={index} style={styles.insumoRow}>
                        <div style={styles.insumoName}>
                            <select name="idInsumo" value={insumoField.idInsumo} onChange={e => handleInsumoChange(index, e)} required
                                disabled={isEditing}
                                style={{ ...styles.select, ...(isEditing && styles.selectDisabled) }}
                            >
                                <option value="">Selecione...</option>
                                {
                                    insumos
                                    .filter(insumo => {
                                        if (isEditing) {
                                            return insumo.id === insumoField.idInsumo;
                                        }
                                        return !existingInsumoIds.has(insumo.id) || insumo.id === insumoField.idInsumo;
                                    })
                                    .map(insumo => (
                                        <option key={insumo.id} value={insumo.id}>{insumo.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div style={styles.insumoQtd}>
                            <input type="number" step="0.01" min="0.01" name="qtdInsumo" value={insumoField.qtdInsumo}
                                onChange={e => handleInsumoChange(index, e)} placeholder="Ex: 0.5" required style={styles.input} />
                        </div>
                        {!isEditing && (
                            <div style={styles.insumoAction}>
                                 <button type="button" onClick={() => removeInsumoField(index)}
                                    style={{ ...styles.btn, ...styles.btnDanger }} disabled={insumoList.length === 1}>
                                     -
                                 </button>
                            </div>
                        )}
                    </div>
                ))}
                {!isEditing && (
                    <button type="button" onClick={addInsumoField} style={{ ...styles.btn, ...styles.btnSecondary }}>
                        + Adicionar Insumo
                    </button>
                )}
                <hr style={styles.hr} />
                <div style={styles.formActions}>
                    <button type="button" onClick={() => navigate('/receitas')} style={{ ...styles.btn, ...styles.btnCancel }}>
                        Cancelar
                    </button>
                    <button type="submit" style={{ ...styles.btn, ...styles.btnPrimary, ...(isLoading && styles.btnDisabled) }} disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Salvar Receita'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReceitasForm;