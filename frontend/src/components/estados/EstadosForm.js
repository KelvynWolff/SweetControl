import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getEstadoBySigla,
  updateEstado,
  createEstado,
} from '../../services/estadosService';
import '../forms.css';

const EstadosForm = () => {
  const { sigla } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(sigla);

  const [formData, setFormData] = useState({ sigla: '', nome: '' });

  useEffect(() => {
    if (isEditing) {
      getEstadoBySigla(sigla)
        .then((data) => setFormData(data))
        .catch(() => {
          alert('Estado não encontrado.');
          navigate('/estados');
        });
    }
  }, [sigla, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sigla' ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateEstado(sigla, { nome: formData.nome });
        alert('Estado atualizado com sucesso!');
      } else {
        await createEstado(formData);
        alert('Estado criado com sucesso!');
      }

      navigate('/estados');
    } catch {
      alert('Erro ao salvar estado.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Estado: ${sigla}` : 'Cadastrar Novo Estado'}</h3>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Informações do Estado</legend>

          <div className="form-row">
            <input
              name="sigla"
              value={formData.sigla}
              onChange={handleChange}
              placeholder="Sigla (ex: SP)"
              maxLength="2"
              required
              disabled={isEditing}
            />

            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome do Estado (ex: São Paulo)"
              required
            />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className='button-confirm'>
            {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          <button
            type="button"
            className="form-button-secondary button-cancel"
            onClick={() => navigate('/estados')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EstadosForm;
