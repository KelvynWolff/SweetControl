import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getInsumoById,
  updateInsumo,
  createInsumo,
} from '../../services/insumosService';
import '../forms.css';

const InsumosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const initialFormState = {
    nome: '',
    valor: 0,
    unidadeMedida: '',
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
            console.error('API retornou dados nulos ou indefinidos.');
            navigate('/insumos');
          }
        } catch (error) {
          console.error('Erro na API:', error.response || error);
          alert('Erro ao carregar dados do insumo.');
          navigate('/insumos');
        }
      };

      fetchInsumo();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'valor' ? parseFloat(value) || 0 : value;

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
      console.error('Erro ao salvar:', error.response?.data || error);
      alert('Erro ao salvar insumo.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Insumo' : 'Cadastrar Novo Insumo'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <label htmlFor="nome">Nome</label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-column">
            <label htmlFor="valor">Valor</label>
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

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="unidadeMedida">Unidade de Medida</label>
            <input
              name="unidadeMedida"
              value={formData.unidadeMedida}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className='button-confirm'>
            {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          <button
            type="button"
            className="form-button-secondary button-cancel"
            onClick={() => navigate('/insumos')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsumosForm;
