import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductById,
  updateProduct,
  createProduct,
} from '../../services/productService';
import '../forms.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const unidadesMedida = [
    { value: 'g', label: 'Gramas (g)' },
    { value: 'kg', label: 'Quilogramas (kg)' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'l', label: 'Litros (L)' },
    { value: 'cchá', label: 'Colher de Chá (cchá)' },
    { value: 'cs', label: 'Colher de Sopa (cs)' },
    { value: 'xic', label: 'Xícara (xic)' },
    { value: 'un', label: 'Unidade (un)' },
    { value: 'dz', label: 'Dúzia (dz)' },
    { value: 'pct', label: 'Pacote (pct)' },
    { value: 'cx', label: 'Caixa (cx)' },
    { value: 'lata', label: 'Lata' },
    { value: 'frasco', label: 'Frasco' },
    { value: 'rolo', label: 'Rolo' },
  ];

  const initialFormState = {
    nome: '',
    preco: 0,
    unidadeMedida: '',
    custo: 0,
    margem: 0,
    descricao: '',
    ativo: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(id);
          if (productData) {
            setFormData(productData);
          } else {
            console.error('API retornou dados nulos ou indefinidos.');
          }
        } catch (error) {
          console.error('ERRO NA CHAMADA DA API:', error.response || error);
          alert('Falha ao buscar os dados do produto. Verifique o console.');
          navigate('/produtos');
        }
      };
      fetchProduct();
    }
  }, [id, isEditing, navigate]);

  useEffect(() => {
    const { preco, custo } = formData;

    if (preco > 0 && custo >= 0) {
      const margemCalc = ((preco - custo) / preco) * 100;
      setFormData((prev) => ({
        ...prev,
        margem: parseFloat(margemCalc.toFixed(2)),
      }));
    } else {
      setFormData((prev) => ({ ...prev, margem: 0 }));
    }
  }, [formData.preco, formData.custo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsedValue =
      type === 'checkbox'
        ? checked
        : ['preco', 'custo'].includes(name)
        ? parseFloat(value) || 0
        : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(id, formData);
        alert('Produto atualizado com sucesso!');
      } else {
        await createProduct(formData);
        alert('Produto criado com sucesso!');
      }
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao salvar:', error.response?.data || error);
      alert('Erro ao salvar produto.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="preco">Preço de Venda</label>
        <input
          name="preco"
          type="number"
          step="0.01"
          value={formData.preco}
          onChange={handleChange}
          required
        />

        <label htmlFor="unidadeMedida">Unidade de Medida</label>
        <select
          name="unidadeMedida"
          value={formData.unidadeMedida}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          {unidadesMedida.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label}
            </option>
          ))}
        </select>

        <label htmlFor="custo">Preço de Custo</label>
        <input
          name="custo"
          type="number"
          step="0.01"
          value={formData.custo}
          onChange={handleChange}
          required
        />

        <label htmlFor="margem">Margem (%)</label>
        <input
          name="margem"
          type="number"
          step="0.01"
          value={formData.margem}
          readOnly
          style={{ backgroundColor: '#eee', cursor: 'not-allowed' }}
        />

        <button type="submit" className="button-confirm">
          {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
        </button>

        <button
          type="button"
          className="button-cancel"
          onClick={() => navigate('/produtos')}
          style={{ marginTop: '10px', marginLeft: '5px' }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
