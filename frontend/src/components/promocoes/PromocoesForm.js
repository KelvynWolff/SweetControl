import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPromocaoById,
  updatePromocao,
  createPromocao,
} from '../../services/promocoesService';
import { getProducts } from '../../services/productService';
import '../forms.css';

const PromocoesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const initialFormState = {
    nome: '',
    tipoDeDesconto: 'Percentual',
    valor: 0,
    dataInicio: '',
    dataFim: '',
    idProduto: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosData = await getProducts();
        setProdutos(produtosData);
      } catch (err) {
        alert('Erro ao carregar produtos.');
      }
    };

    fetchData();

    if (isEditing) {
      setIsLoading(true);
      getPromocaoById(id)
        .then((data) => {
          setFormData({
            nome: data.nome,
            tipoDeDesconto: data.tipoDeDesconto,
            valor: data.valor,
            dataInicio: data.dataInicio.substring(0, 10),
            dataFim: data.dataFim.substring(0, 10),
            idProduto: data.idProduto || '',
          });
        })
        .catch(() => {
          alert('Promoção não encontrada.');
          navigate('/promocoes');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        idProduto: formData.idProduto || null,
      };

      if (isEditing) {
        await updatePromocao(id, payload);
        alert('Promoção atualizada com sucesso!');
      } else {
        await createPromocao(payload);
        alert('Promoção criada com sucesso!');
      }

      navigate('/promocoes');
    } catch (error) {
      alert('Erro ao salvar promoção.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) return <p>Carregando dados...</p>;

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Promoção' : 'Cadastrar Nova Promoção'}</h3>

      <form onSubmit={handleSubmit}>
        {/* Nome + Tipo */}
        <div className="form-row">
          <div>
            <label>Nome da Promoção</label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Tipo de Desconto</label>
            <select
              name="tipoDeDesconto"
              value={formData.tipoDeDesconto}
              onChange={handleChange}
            >
              <option value="Percentual">Percentual (%)</option>
              <option value="Valor Fixo">Valor Fixo (R$)</option>
            </select>
          </div>
        </div>

        {/* Valor */}
        <div className="form-row">
          <div>
            <label>Valor do Desconto</label>
            <input
              name="valor"
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Datas */}
        <div className="form-row">
          <div>
            <label>Data de Início</label>
            <input
              type="date"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Data de Fim</label>
            <input
              type="date"
              name="dataFim"
              value={formData.dataFim}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Produto */}
        <div className="form-row">
          <div>
            <label>Produto Aplicável (Opcional)</label>
            <select
              name="idProduto"
              value={formData.idProduto}
              onChange={handleChange}
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

        {/* Botões */}
        <div className="form-row">
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>

          <button
            type="button"
            className="form-button form-button-secondary"
            onClick={() => navigate('/promocoes')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromocoesForm;
