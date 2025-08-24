import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEstadoBySigla, updateEstado, createEstado } from '../../services/estadosService';
import '../forms.css';

const EstadosForm = () => {
  const { sigla } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(sigla);

  const [formData, setFormData] = useState({ sigla: '', nome: '' });

  useEffect(() => {
    if (isEditing) {
      getEstadoBySigla(sigla)
        .then(data => setFormData(data))
        .catch(err => {
          alert("Estado não encontrado.");
          navigate('/estados');
        });
    }
  }, [sigla, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
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
    } catch (error) {
      alert('Erro ao salvar estado.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Estado: ${sigla}` : 'Cadastrar Novo Estado'}</h3>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
        <button type="button" onClick={() => navigate('/estados')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EstadosForm;