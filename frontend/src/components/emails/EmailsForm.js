import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmailById, updateEmail, createEmail } from '../../services/emailsService';
import { getPessoas } from '../../services/pessoasService';
import '../forms.css';

const EmailsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ email: '', observacao: '', idPessoa: '' });
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    getPessoas().then(setPessoas).catch(err => alert("Erro ao carregar pessoas."));

    if (isEditing) {
      getEmailById(id)
        .then(data => setFormData(data))
        .catch(err => {
          alert("Email não encontrado.");
          navigate('/emails');
        });
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
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
    } catch (error) {
      alert('Erro ao salvar email.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Email` : 'Cadastrar Novo Email'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="observacao" value={formData.observacao} onChange={handleChange} placeholder="Observação" />
        <select name="idPessoa" value={formData.idPessoa} onChange={handleChange} required>
          <option value="">Selecione uma Pessoa</option>
          {pessoas.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        <button style={{marginTop: '10px'}} type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
        <button style={{marginTop: '10px', backgroundColor: '#6c757d'}} type="button" onClick={() => navigate('/emails')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EmailsForm;