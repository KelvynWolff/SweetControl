import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBairroById, updateBairro, createBairro } from '../../services/bairrosService';
import { getCidades } from '../../services/cidadesService';
import '../forms.css';

const BairrosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ nome: '', ibgeCidade: '' });
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    getCidades().then(setCidades).catch(err => alert("Erro ao carregar cidades."));

    if (isEditing) {
      getBairroById(id)
        .then(data => setFormData(data))
        .catch(err => {
          alert("Bairro não encontrado.");
          navigate('/bairros');
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
        ibgeCidade: parseInt(formData.ibgeCidade, 10),
      };

      if (isEditing) {
        await updateBairro(id, { nome: payload.nome });
        alert('Bairro atualizado com sucesso!');
      } else {
        await createBairro(payload);
        alert('Bairro criado com sucesso!');
      }
      navigate('/bairros');
    } catch (error) {
      alert('Erro ao salvar bairro.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Bairro` : 'Cadastrar Novo Bairro'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Bairro" required />
        <select name="ibgeCidade" value={formData.ibgeCidade} onChange={handleChange} required disabled={isEditing}>
          <option value="">Selecione uma Cidade</option>
          {cidades.map(cidade => (
            <option key={cidade.codigobge} value={cidade.codigobge}>{cidade.nome}</option>
          ))}
        </select>
        <button style={{marginTop: '10px'}} type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
        <button style={{marginTop: '10px', backgroundColor: '#6c757d'}} type="button" onClick={() => navigate('/bairros')}>Cancelar</button>
      </form>
    </div>
  );
};

export default BairrosForm;