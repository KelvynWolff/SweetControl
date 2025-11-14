import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getTelefoneById,
  updateTelefone,
  createTelefone,
} from '../../services/telefonesService';
import { getPessoas } from '../../services/pessoasService';
import '../forms.css';

const TelefonesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    numero: '',
    observacao: '',
    idPessoa: '',
  });
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    getPessoas()
      .then(setPessoas)
      .catch(() => alert('Erro ao carregar pessoas.'));

    if (isEditing) {
      getTelefoneById(id)
        .then((data) => setFormData(data))
        .catch(() => {
          alert('Telefone não encontrado.');
          navigate('/telefones');
        });
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateTelefone(id, {
          numero: formData.numero,
          observacao: formData.observacao,
        });
        alert('Telefone atualizado com sucesso!');
      } else {
        await createTelefone({
          ...formData,
          idPessoa: parseInt(formData.idPessoa),
        });
        alert('Telefone criado com sucesso!');
      }
      navigate('/telefones');
    } catch (error) {
      alert('Erro ao salvar telefone.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Telefone' : 'Cadastrar Novo Telefone'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="Número"
            required
          />

          <input
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            placeholder="Observação"
          />
        </div>

        <div className="form-row">
          <select
            name="idPessoa"
            value={formData.idPessoa}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma Pessoa</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
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
            onClick={() => navigate('/telefones')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TelefonesForm;
