import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getBairroById,
  updateBairro,
  createBairro,
} from '../../services/bairrosService';
import { getCidades } from '../../services/cidadesService';
import '../forms.css';

const BairrosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ nome: '', ibgeCidade: '' });
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    getCidades()
      .then(setCidades)
      .catch(() => alert('Erro ao carregar cidades.'));

    if (isEditing) {
      getBairroById(id)
        .then((data) => setFormData(data))
        .catch(() => {
          alert('Bairro não encontrado.');
          navigate('/bairros');
        });
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        ibgeCidade: parseInt(formData.ibgeCidade),
      };

      if (isEditing) {
        await updateBairro(id, { nome: payload.nome });
        alert('Bairro atualizado com sucesso!');
      } else {
        await createBairro(payload);
        alert('Bairro criado com sucesso!');
      }

      navigate('/bairros');
    } catch (err) {
      alert('Erro ao salvar bairro.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Bairro' : 'Cadastrar Novo Bairro'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome do Bairro"
            required
          />
        </div>

        <div className="form-row">
          <select
            name="ibgeCidade"
            value={formData.ibgeCidade}
            onChange={handleChange}
            required
            disabled={isEditing}
          >
            <option value="">Selecione uma Cidade</option>
            {cidades.map((c) => (
              <option key={c.codigobge} value={c.codigobge}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <button type="submit" className="form-button button-confirm">
            {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          <button
            type="button"
            className="form-button form-button-secondary button-cancel"
            onClick={() => navigate('/bairros')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BairrosForm;
