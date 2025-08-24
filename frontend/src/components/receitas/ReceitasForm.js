import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReceitaById, updateReceita, createReceita } from '../../services/receitasService';
import { getProducts } from '../../services/productService';
import { getInsumos } from '../../services/insumosService';
import '../forms.css';

const ReceitasForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [produtos, setProdutos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [insumoList, setInsumoList] = useState([{ idInsumo: '', qtdInsumo: 0 }]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const [produtosData, insumosData] = await Promise.all([getProducts(), getInsumos()]);
        setProdutos(produtosData);
        setInsumos(insumosData);
      } catch (err) {
        console.error("Erro ao carregar produtos e insumos:", err);
        alert("Não foi possível carregar os dados de produtos e insumos.");
      }
    };
    fetchDependencies();

    if (isEditing) {
      setIsLoading(true);
      getReceitaById(id)
        .then(data => {
          setSelectedProductId(data.idProduto);
          setInsumoList([{ idInsumo: data.idInsumo, qtdInsumo: data.qtdInsumo }]);
        })
        .catch(err => {
          console.error("Erro ao buscar receita para edição:", err);
          alert("Receita não encontrada.");
          navigate('/receitas');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  const addInsumoField = () => {
    setInsumoList([...insumoList, { idInsumo: '', qtdInsumo: 0 }]);
  };

  const removeInsumoField = (index) => {
    const list = [...insumoList];
    list.splice(index, 1);
    setInsumoList(list);
  };

  const handleInsumoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...insumoList];
    list[index][name] = (name === 'idInsumo') ? parseInt(value, 10) : parseFloat(value) || 0;
    setInsumoList(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateReceita(id, {
          idProduto: selectedProductId,
          idInsumo: insumoList[0].idInsumo,
          qtdInsumo: insumoList[0].qtdInsumo
        });
        alert('Item da receita atualizado com sucesso!');
      } else {
        for (const insumo of insumoList) {
          if (insumo.idInsumo && insumo.qtdInsumo > 0) {
            await createReceita({
              idProduto: selectedProductId,
              idInsumo: insumo.idInsumo,
              qtdInsumo: insumo.qtdInsumo
            });
          }
        }
        alert('Receita criada com sucesso!');
      }
      navigate('/receitas');
    } catch (error) {
      console.error("Erro ao salvar:", error.response?.data || error);
      alert('Erro ao salvar receita.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Item da Receita' : 'Cadastrar Nova Receita'}</h3>
      <form onSubmit={handleSubmit}>
        <label>Produto:</label>
        <select
          value={selectedProductId}
          onChange={e => setSelectedProductId(parseInt(e.target.value, 10))}
          disabled={isEditing}
          required
        >
          <option value="">Selecione um Produto</option>
          {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        
        <hr/>
        
        {!isEditing && insumoList.map((insumoField, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <label>Insumo {index + 1}:</label>
            <select name="idInsumo" value={insumoField.idInsumo} onChange={e => handleInsumoChange(e, index)} required>
              <option value="">Selecione um Insumo</option>
              {insumos.map(i => <option key={i.id} value={i.id}>{i.nome}</option>)}
            </select>
            <label>Quantidade:</label>
            <input
              type="number"
              step="0.01"
              name="qtdInsumo"
              value={insumoField.qtdInsumo}
              onChange={e => handleInsumoChange(e, index)}
              placeholder="Quantidade do Insumo"
              required
            />
            {insumoList.length > 1 && (
              <button type="button" onClick={() => removeInsumoField(index)} style={{ backgroundColor: '#dc3545' }}>-</button>
            )}
          </div>
        ))}
        
        {!isEditing && <button type="button" onClick={addInsumoField} style={{ marginTop: '10px' }}>+ Adicionar Insumo</button>}
        
        <hr/>

        <button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</button>
        <button type="button" onClick={() => navigate('/receitas')} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Cancelar</button>
      </form>
    </div>
  );
};

export default ReceitasForm;