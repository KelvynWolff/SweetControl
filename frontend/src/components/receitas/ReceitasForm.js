import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getReceitas,
  updateReceita,
  createReceita,
  deleteReceita,
} from '../../services/receitasService';
import { getProducts } from '../../services/productService';
import { getInsumos } from '../../services/insumosService';

import '../forms.css';

const ReceitasForm = () => {
  const { id: produtoId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(produtoId);

  const [produtos, setProdutos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(produtoId || '');
  const [insumoList, setInsumoList] = useState([
    { idInsumo: '', qtdInsumo: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [existingInsumoIds, setExistingInsumoIds] = useState(new Set());
  const [dependenciesLoaded, setDependenciesLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [produtosData, insumosData] = await Promise.all([
          getProducts(),
          getInsumos(),
        ]);
        setProdutos(produtosData);
        setInsumos(insumosData);
        setDependenciesLoaded(true);
      } catch (err) {
        setNotification({
          message: 'Erro ao carregar produtos/insumos.',
          type: 'error',
        });
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!dependenciesLoaded) return;

    const loadForEdit = async () => {
      setInsumoList([{ idInsumo: '', qtdInsumo: '' }]);
      if (!isEditing) return;

      try {
        const todas = await getReceitas();
        const idNum = parseInt(produtoId);

        const receitaDoProduto = todas.filter((r) => r.idProduto === idNum);

        if (receitaDoProduto.length > 0) {
          setInsumoList(
            receitaDoProduto.map((r) => ({
              idInsumo: r.idInsumo,
              qtdInsumo: r.qtdInsumo,
            })),
          );
        }
      } catch (err) {
        setNotification({
          message: 'Erro ao carregar dados para edição.',
          type: 'error',
        });
      }
    };

    loadForEdit();
  }, [dependenciesLoaded, produtoId, isEditing]);

  useEffect(() => {
    if (!dependenciesLoaded) return;

    const check = async () => {
      if (!isEditing && selectedProductId) {
        const todas = await getReceitas();
        const existentes = todas.filter(
          (r) => r.idProduto === parseInt(selectedProductId),
        );
        setExistingInsumoIds(new Set(existentes.map((x) => x.idInsumo)));
      }
    };

    check();
  }, [selectedProductId, isEditing, dependenciesLoaded]);

  const handleInsumoChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...insumoList];
    list[index][name] = name === 'idInsumo' ? parseInt(value) : value;
    setInsumoList(list);
  };

  const addInsumoField = () => {
    setInsumoList([...insumoList, { idInsumo: '', qtdInsumo: '' }]);
  };

  const removeInsumoField = (index) => {
    const list = [...insumoList];
    list.splice(index, 1);
    setInsumoList(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId) {
      setNotification({
        message: 'Selecione um produto.',
        type: 'error',
      });
      return;
    }

    if (insumoList.some((i) => !i.idInsumo || !i.qtdInsumo)) {
      setNotification({
        message: 'Preencha todos os insumos corretamente.',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing) {
        const todas = await getReceitas();
        const antigas = todas.filter(
          (r) => r.idProduto === parseInt(produtoId),
        );
        for (const item of antigas) {
          await deleteReceita(item.id);
        }
      }

      for (const insumo of insumoList) {
        await createReceita({
          idProduto: parseInt(selectedProductId),
          idInsumo: parseInt(insumo.idInsumo),
          qtdInsumo: parseFloat(insumo.qtdInsumo),
        });
      }

      setNotification({
        message: isEditing
          ? 'Receita atualizada com sucesso!'
          : 'Receita criada com sucesso!',
        type: 'success',
      });

      setTimeout(() => navigate('/receitas'), 1200);
    } catch (err) {
      setNotification({
        message: 'Erro ao salvar receita.',
        type: 'error',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Receita' : 'Cadastrar Nova Receita'}</h3>

      {notification.message && (
        <div
          className={`form-message ${
            notification.type === 'error' ? 'form-error' : 'form-success'
          }`}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <label>Produto</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              disabled={isEditing}
              required
            >
              <option value="">Selecione um Produto</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-separator"></div>

        <h4>Insumos da Receita</h4>

        <div className="form-row">
          <div style={{ fontWeight: '600' }}>Insumo</div>
          <div style={{ fontWeight: '600' }}>Quantidade</div>
          {!isEditing && <div style={{ fontWeight: '600' }}>Ação</div>}
        </div>

        {insumoList.map((item, index) => (
          <div className="form-row" key={index}>
            <select
              name="idInsumo"
              value={item.idInsumo}
              onChange={(e) => handleInsumoChange(index, e)}
              disabled={isEditing}
              required
            >
              <option value="">Selecione...</option>
              {insumos
                .filter((i) => {
                  if (isEditing) return true;
                  return !existingInsumoIds.has(i.id) || i.id === item.idInsumo;
                })
                .map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nome}
                  </option>
                ))}
            </select>

            <input
              type="number"
              name="qtdInsumo"
              min="0.01"
              step="0.01"
              value={item.qtdInsumo}
              onChange={(e) => handleInsumoChange(index, e)}
              placeholder="Ex: 0.5"
              required
            />

            {!isEditing && (
              <button
                type="button"
                onClick={() => removeInsumoField(index)}
                className="form-button-secondary button-remove"
                disabled={insumoList.length === 1}
              >
                -
              </button>
            )}

             {!isEditing && (
              <button
                type="button"
                onClick={addInsumoField}
                className="button-primary"
              >
                +
              </button>
            )}
          </div>
        ))}

        <div className="form-separator"></div>

        <div className="form-actions">
          <button type="submit" className="button-confirm" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Receita'}
          </button>
          <button
            type="button"
            className="button-cancel"
            onClick={() => navigate('/receitas')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceitasForm;
