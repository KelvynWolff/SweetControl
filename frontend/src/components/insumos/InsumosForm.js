import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInsumoById, updateInsumo, createInsumo } from '../../services/insumosService';
import '../forms.css';

const InsumosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const initialFormState = {
    nome: '',
    valor: 0,
    unidadeMedida: '',
    estoque: 0,
  };
  
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isEditing) {
      const fetchInsumo = async () => {
        try {
          const insumoData = await getInsumoById(id);
          if (insumoData) {
            setFormData(insumoData);
          } else {
            console.error("API retornou dados nulos ou indefinidos.");
          }
        } catch (error) {
          console.error("ERRO NA CHAMADA DA API:", error.response || error);
          alert("Falha ao buscar os dados do insumo. Verifique o console.");
          navigate('/insumos');
        }
      };
      fetchInsumo();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = (name === 'valor' || name === 'estoque') ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateInsumo(id, formData);
        alert('Insumo atualizado com sucesso!');
      } else {
        await createInsumo(formData);
        alert('Insumo criado com sucesso!');
      }
      navigate('/insumos');
    } catch (error) {
      console.error("Erro ao salvar:", error.response?.data || error);
      alert('Erro ao salvar insumo.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Insumo' : 'Cadastrar Novo Insumo'}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required />
        <label htmlFor="valor">Valor</label>
        <input name="valor" type="number" step="0.01" value={formData.valor} onChange={handleChange} required />
        <label htmlFor="unidadeMedida">Unidade de Medida</label>
        <input name="unidadeMedida" value={formData.unidadeMedida} onChange={handleChange} required />
        <label htmlFor="estoque">Estoque</label>
        <input name="estoque" type="number" step="0.01" value={formData.estoque} onChange={handleChange} required />
        
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
        <button type="button" onClick={() => navigate('/insumos')} style={{marginTop: '10px', backgroundColor: '#6c757d'}}>Cancelar</button>
      </form>
    </div>
  );
};

export default InsumosForm;