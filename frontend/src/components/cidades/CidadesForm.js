import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCidadeByCodigo,
  updateCidade,
  createCidade,
} from '../../services/cidadesService';
import { getEstados } from '../../services/estadosService';
import '../forms.css';

const CidadesForm = () => {
  const { codigobge } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(codigobge);

  const [formData, setFormData] = useState({
    codigobge: '',
    nome: '',
    estado: '',
  });
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    getEstados()
      .then(setEstados)
      .catch(() => alert('Erro ao carregar estados.'));

    if (isEditing) {
      getCidadeByCodigo(codigobge)
        .then((data) => setFormData(data))
        .catch(() => {
          alert('Cidade não encontrada.');
          navigate('/cidades');
        });
    }
  }, [codigobge, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        codigobge: parseInt(formData.codigobge),
      };

      if (isEditing) {
        await updateCidade(codigobge, { nome: payload.nome });
        alert('Cidade atualizada com sucesso!');
      } else {
        await createCidade(payload);
        alert('Cidade criada com sucesso!');
      }

      navigate('/cidades');
    } catch (err) {
      alert('Erro ao salvar cidade.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Cidade' : 'Cadastrar Nova Cidade'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            name="codigobge"
            value={formData.codigobge}
            onChange={handleChange}
            placeholder="Código IBGE"
            type="number"
            required
            disabled={isEditing}
          />

          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome da Cidade"
            required
          />
        </div>

        <div className="form-row">
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            disabled={isEditing}
          >
            <option value="">Selecione um Estado</option>
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <button type="submit" className="form-button">
            {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          <button
            type="button"
            className="form-button form-button-secondary"
            onClick={() => navigate('/cidades')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CidadesForm;
