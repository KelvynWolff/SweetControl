import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTelefoneById, updateTelefone, createTelefone } from '../../services/telefonesService';
import { getPessoas } from '../../services/pessoasService';
import '../forms.css';

const TelefonesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ numero: '', observacao: '', idPessoa: '' });
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    getPessoas().then(setPessoas).catch(err => alert("Erro ao carregar pessoas."));

    if (isEditing) {
      getTelefoneById(id)
        .then(data => setFormData(data))
        .catch(err => {
          alert("Telefone não encontrado.");
          navigate('/telefones');
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
        await updateTelefone(id, payload);
        alert('Telefone atualizado com sucesso!');
      } else {
        await createTelefone(payload);
        alert('Telefone criado com sucesso!');
      }
      navigate('/telefones');
    } catch (error) {
      alert('Erro ao salvar telefone.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Telefone` : 'Cadastrar Novo Telefone'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="numero" value={formData.numero} onChange={handleChange} placeholder="Número" required />
        <input name="observacao" value={formData.observacao} onChange={handleChange} placeholder="Observação" />
        <select name="idPessoa" value={formData.idPessoa} onChange={handleChange} required>
          <option value="">Selecione uma Pessoa</option>
          {pessoas.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        <button style={{marginTop: '10px'}} type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
        <button style={{marginTop: '10px', backgroundColor: '#6c757d'}} type="button" onClick={() => navigate('/telefones')}>Cancelar</button>
      </form>
    </div>
  );
};

export default TelefonesForm;