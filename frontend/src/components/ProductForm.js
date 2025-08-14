import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productService';
import './forms.css';

const ProductForm = ({ onFormSubmit, productToEdit, clearEdit }) => {
  const initialFormState = {
    nome: '',
    preco: 0,
    unidadeMedida: '',
    estoque: 0,
    custo: 0,
    margem: 0,
    descricao: '',
    ativo: true,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
      setIsEditing(true);
    } else {
      setFormData(initialFormState);
      setIsEditing(false);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let parsedValue;
    if (type === 'checkbox') {
      parsedValue = checked;
    } else if (['preco', 'estoque', 'custo', 'margem'].includes(name)) {
      parsedValue = parseFloat(value) || 0;
    } else {
      parsedValue = value;
    }
    
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(formData.id, formData);
        alert('Produto atualizado com sucesso!');
      } else {
        await createProduct(formData);
        alert('Produto criado com sucesso!');
      }
      clearEditAndForm();
      onFormSubmit();
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error);
      alert('Erro ao salvar produto. Verifique o console.');
    }
  };

  const clearEditAndForm = () => {
    clearEdit();
    setFormData(initialFormState);
    setIsEditing(false);
  }

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do produto" required />
        <input name="preco" type="number" step="0.01" value={formData.preco} onChange={handleChange} placeholder="Preço de Venda" required />
        <input name="unidadeMedida" value={formData.unidadeMedida} onChange={handleChange} placeholder="Unidade de Medida (ex: UN, KG)" required />
        <input name="estoque" type="number" value={formData.estoque} onChange={handleChange} placeholder="Estoque" required />
        <input name="custo" type="number" step="0.01" value={formData.custo} onChange={handleChange} placeholder="Custo do Produto" required />
        <input name="margem" type="number" step="0.01" value={formData.margem} onChange={handleChange} placeholder="Margem de Lucro" required />
        
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar Produto'}</button>
        {isEditing && (
          <button type="button" onClick={clearEditAndForm} style={{marginTop: '10px', backgroundColor: '#6c757d'}}>
            Cancelar Edição
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;