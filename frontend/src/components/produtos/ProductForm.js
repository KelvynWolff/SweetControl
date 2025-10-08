import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct, createProduct } from '../../services/productService';
import '../forms.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

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
            console.error("API retornou dados nulos ou indefinidos.");
          }
        } catch (error) {
          console.error("ERRO NA CHAMADA DA API:", error.response || error);
          alert("Falha ao buscar os dados do produto. Verifique o console.");
          navigate('/produtos');
        }
      };
      fetchProduct();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === 'checkbox' ? checked : (['preco', 'custo', 'margem'].includes(name) ? parseFloat(value) || 0 : value);
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
      console.error("Erro ao salvar:", error.response?.data || error);
      alert('Erro ao salvar produto.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required />
        
        <label htmlFor="preco">Preço de Venda</label>
        <input name="preco" type="number" step="0.01" value={formData.preco} onChange={handleChange} required />
        
        <label htmlFor="unidadeMedida">Unidade de Medida</label>
        <input name="unidadeMedida" value={formData.unidadeMedida} onChange={handleChange} required />
        
        <label htmlFor="custo">Preço de Custo</label>
        <input name="custo" type="number" step="0.01" value={formData.custo} onChange={handleChange} required />
        
        <label htmlFor="margem">Margem</label>
        <input name="margem" type="number" step="0.01" value={formData.margem} onChange={handleChange} required />
        
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
        <button type="button" onClick={() => navigate('/produtos')} style={{marginTop: '10px', backgroundColor: '#6c757d'}}>Cancelar</button>
      </form>
    </div>
  );
};

export default ProductForm;