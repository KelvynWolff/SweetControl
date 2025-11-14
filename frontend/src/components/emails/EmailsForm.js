import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getEmailById,
  updateEmail,
  createEmail,
} from '../../services/emailsService';
import { getPessoas } from '../../services/pessoasService';
import '../forms.css';

const EmailsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    email: '',
    observacao: '',
    idPessoa: '',
  });

  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    getPessoas()
      .then(setPessoas)
      .catch(() => alert('Erro ao carregar pessoas.'));

    if (isEditing) {
      getEmailById(id)
        .then((data) => setFormData(data))
        .catch(() => {
          alert('Email não encontrado.');
          navigate('/emails');
        });
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        idPessoa: parseInt(formData.idPessoa),
      };

      if (isEditing) {
        await updateEmail(id, payload);
        alert('Email atualizado com sucesso!');
      } else {
        await createEmail(payload);
        alert('Email criado com sucesso!');
      }

      navigate('/emails');
    } catch {
      alert('Erro ao salvar email.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Email' : 'Cadastrar Novo Email'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="observacao"
            placeholder="Observação"
            value={formData.observacao}
            onChange={handleChange}
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
          <button type="submit">
            {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          <button
            type="button"
            className="form-button-secondary"
            onClick={() => navigate('/emails')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailsForm;
