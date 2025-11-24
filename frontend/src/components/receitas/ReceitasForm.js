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

const unidadeReceitaOptions = [
  { value: 'g', label: 'Gramas (g)' },
  { value: 'kg', label: 'Quilogramas (kg)' },
  { value: 'ml', label: 'Mililitros (ml)' },
  { value: 'l', label: 'Litros (L)' },

  { value: 'ccafe', label: 'Colher Café (2g / 2ml)' },
  { value: 'ccha', label: 'Colher Chá (5g / 5ml)' },
  { value: 'csobremesa', label: 'Colher Sobremesa (8g / 8ml)' },
  { value: 'csopa', label: 'Colher Sopa (12g / 15ml)' },

  { value: 'xic', label: 'Xícara (ingrediente dependente)' },
  { value: 'copo', label: 'Copo Americano (190ml)' },
  { value: 'pitada', label: 'Pitada (0.5g)' },

  { value: 'un', label: 'Unidade (un)' },
];

const converterUnidade = (insumo, qtd, unidadeReceita) => {
  if (!insumo) return 0;

  const base = insumo.unidadeMedida;
  const quantidade = parseFloat(qtd);

  const colherPeso = {
    ccafe: 2,
    ccha: 5,
    csobremesa: 8,
    csopa: 12,
    pitada: 0.5,
  };

  const colherLiquido = {
    ccafe: 2,
    ccha: 5,
    csobremesa: 8,
    csopa: 15,
  };

  const gramasXicara = insumo.nome.toLowerCase().includes('farinha')
    ? 120
    : insumo.nome.toLowerCase().includes('açúcar')
    ? 200
    : 120;

  switch (base) {
    case 'g':
      if (unidadeReceita === 'g') return quantidade;
      if (unidadeReceita === 'kg') return quantidade * 1000;
      if (colherPeso[unidadeReceita]) return colherPeso[unidadeReceita];
      if (unidadeReceita === 'xic') return gramasXicara * quantidade;
      if (unidadeReceita === 'copo') return 200 * quantidade;
      return quantidade;

    case 'kg':
      if (unidadeReceita === 'g') return quantidade / 1000;
      if (unidadeReceita === 'kg') return quantidade;
      if (colherPeso[unidadeReceita]) return colherPeso[unidadeReceita] / 1000;
      if (unidadeReceita === 'xic') return (gramasXicara * quantidade) / 1000;
      if (unidadeReceita === 'copo') return (200 * quantidade) / 1000;
      return quantidade;

    case 'ml':
      if (unidadeReceita === 'ml') return quantidade;
      if (unidadeReceita === 'l') return quantidade * 1000;
      if (colherLiquido[unidadeReceita]) return colherLiquido[unidadeReceita];
      if (unidadeReceita === 'xic') return 240 * quantidade;
      if (unidadeReceita === 'copo') return 190 * quantidade;
      return quantidade;

    case 'l':
      if (unidadeReceita === 'ml') return quantidade / 1000;
      if (unidadeReceita === 'l') return quantidade;
      if (colherLiquido[unidadeReceita])
        return colherLiquido[unidadeReceita] / 1000;
      if (unidadeReceita === 'xic') return (240 * quantidade) / 1000;
      if (unidadeReceita === 'copo') return (190 * quantidade) / 1000;
      return quantidade;

    case 'un':
      return quantidade;

    default:
      return quantidade;
  }
};

const ReceitasForm = () => {
  const { id: produtoId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(produtoId);

  const [produtos, setProdutos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(produtoId || '');

  const [insumoList, setInsumoList] = useState([
    { idInsumo: '', qtdInsumo: '', unidadeReceita: '' },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const [totalCusto, setTotalCusto] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [produtosData, insumosData] = await Promise.all([
          getProducts(),
          getInsumos(),
        ]);

        setProdutos(produtosData);
        setInsumos(insumosData.sort((a, b) => a.nome.localeCompare(b.nome)));
      } catch {
        setNotification({ message: 'Erro ao carregar dados.', type: 'error' });
      }
    };

    load();
  }, []);

  useEffect(() => {
    let total = 0;

    insumoList.forEach((item) => {
      const insumo = insumos.find((i) => i.id === parseInt(item.idInsumo));
      if (insumo && item.qtdInsumo && item.unidadeReceita) {
        const qtdConvertida = converterUnidade(
          insumo,
          item.qtdInsumo,
          item.unidadeReceita,
        );

        total += qtdConvertida * insumo.valor;
      }
    });

    setTotalCusto(total);
  }, [insumoList, insumos]);

  const handleInsumoChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...insumoList];
    updated[index][name] = value;
    setInsumoList(updated);
  };

  const addInsumoField = () => {
    setInsumoList([
      ...insumoList,
      { idInsumo: '', qtdInsumo: '', unidadeReceita: '' },
    ]);
  };

  const removeInsumoField = (index) => {
    const list = [...insumoList];
    list.splice(index, 1);
    setInsumoList(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId) {
      setNotification({ message: 'Selecione um produto.', type: 'error' });
      return;
    }

    if (
      insumoList.some((i) => !i.idInsumo || !i.qtdInsumo || !i.unidadeReceita)
    ) {
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
        for (const item of antigas) await deleteReceita(item.id);
      }

      for (const item of insumoList) {
        const insumo = insumos.find((i) => i.id === parseInt(item.idInsumo));

        const quantidadeConvertida = converterUnidade(
          insumo,
          item.qtdInsumo,
          item.unidadeReceita,
        );

        await createReceita({
          idProduto: parseInt(selectedProductId),
          idInsumo: parseInt(item.idInsumo),
          qtdInsumo: quantidadeConvertida,
          unidadeReceita: item.unidadeReceita,
        });
      }

      setNotification({
        message: isEditing
          ? 'Receita atualizada com sucesso!'
          : 'Receita criada com sucesso!',
        type: 'success',
      });

      setTimeout(() => navigate('/receitas'), 1200);
    } catch {
      setNotification({ message: 'Erro ao salvar receita.', type: 'error' });
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

        <div className="form-separator" />

        <h4>Insumos da Receita</h4>

        {insumoList.map((item, index) => (
          <div className="form-row" key={index}>
            <select
              name="idInsumo"
              value={item.idInsumo}
              onChange={(e) => handleInsumoChange(index, e)}
              required
            >
              <option value="">Selecione...</option>
              {insumos.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nome} ({i.unidadeMedida})
                </option>
              ))}
            </select>

            <input
              type="number"
              name="qtdInsumo"
              step="0.01"
              min="0.01"
              value={item.qtdInsumo}
              onChange={(e) => handleInsumoChange(index, e)}
              placeholder="Qtd"
              required
            />

            <select
              name="unidadeReceita"
              value={item.unidadeReceita}
              onChange={(e) => handleInsumoChange(index, e)}
              required
            >
              <option value="">Unidade...</option>
              {unidadeReceitaOptions.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>

            {!isEditing && (
              <button
                type="button"
                onClick={() => removeInsumoField(index)}
                className="button-remove"
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

        <div className="form-separator" />

        <h4>
          Custo Total da Receita: <strong>R$ {totalCusto.toFixed(2)}</strong>
        </h4>

        <div className="form-actions">
          <button type="submit" className="button-confirm">
            Salvar Receita
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
