import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createLote, getLoteById, updateLote } from '../../services/lotesService';
import { getProducts } from '../../services/productService';
import { getInsumos } from '../../services/insumosService';
import '../forms.css';

const LotesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({ codigoLote: '', dataValidade: '', quantidadeInicial: '' });
  const [tipoItem, setTipoItem] = useState('produto');
  const [selectedItemId, setSelectedItemId] = useState('');
  
  const [produtos, setProdutos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts().then(setProdutos);
    getInsumos().then(setInsumos);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      getLoteById(id)
        .then(data => {
          const formattedDate = new Date(data.dataValidade).toISOString().split('T')[0];
          
          setFormData({
            codigoLote: data.codigoLote,
            dataValidade: formattedDate,
            quantidadeInicial: data.movimentacoes?.[0]?.quantidade || '',
          });

          if (data.idProduto) {
            setTipoItem('produto');
            setSelectedItemId(data.idProduto);
          } else if (data.idInsumo) {
            setTipoItem('insumo');
            setSelectedItemId(data.idInsumo);
          }
        })
        .catch(error => console.error("Erro ao buscar o lote:", error));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      codigoLote: parseInt(formData.codigoLote),
      quantidadeInicial: parseFloat(formData.quantidadeInicial),
      idProduto: tipoItem === 'produto' ? parseInt(selectedItemId) : null,
      idInsumo: tipoItem === 'insumo' ? parseInt(selectedItemId) : null,
    };

    try {
      if (isEditMode) {
        await updateLote(id, payload);
        alert('Lote atualizado com sucesso!');
      } else {
        await createLote(payload);
        alert('Lote cadastrado com sucesso!');
      }
      navigate('/lotes');
    } catch (error) {
      const errorMessage = error.response?.data?.message || (isEditMode ? 'Erro ao atualizar lote.' : 'Erro ao cadastrar lote.');
      alert(Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditMode ? 'Editar Lote' : 'Cadastrar Novo Lote'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo de Item</label>
          <select value={tipoItem} onChange={e => { setTipoItem(e.target.value); setSelectedItemId(''); }} disabled={isEditMode}>
            <option value="produto">Produto Final</option>
            <option value="insumo">Insumo</option>
          </select>
        </div>

        <div className="form-group">
          <label>{tipoItem === 'produto' ? 'Produto' : 'Insumo'}</label>
          <select value={selectedItemId} onChange={e => setSelectedItemId(e.target.value)} required disabled={isEditMode}>
            <option value="">Selecione um item...</option>
            {tipoItem === 'produto' 
              ? produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)
              : insumos.map(i => <option key={i.id} value={i.id}>{i.nome}</option>)
            }
          </select>
        </div>
        
        <div className="form-group">
          <label>Código do Lote</label>
          <input name="codigoLote" type="number" value={formData.codigoLote} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Quantidade Inicial</label>
          <input name="quantidadeInicial" type="number" step="0.01" value={formData.quantidadeInicial} onChange={handleChange} required disabled={isEditMode} />
        </div>
        <div className="form-group">
          <label>Data de Validade</label>
          <input name="dataValidade" type="date" value={formData.dataValidade} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : (isEditMode ? 'Atualizar Lote' : 'Salvar Lote')}</button>
          <button type="button" onClick={() => navigate('/lotes')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default LotesForm;