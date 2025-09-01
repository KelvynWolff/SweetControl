import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCidadeByCodigo, updateCidade, createCidade } from '../../services/cidadesService';
import { getEstados } from '../../services/estadosService';
import '../forms.css';

const CidadesForm = () => {
  const { codigobge } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(codigobge);

  const [formData, setFormData] = useState({ codigobge: '', nome: '', estado: '' });
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    getEstados().then(setEstados).catch(err => alert("Erro ao carregar estados."));

    if (isEditing) {
      getCidadeByCodigo(codigobge)
        .then(data => setFormData(data))
        .catch(err => {
          alert("Cidade não encontrada.");
          navigate('/cidades');
        });
    }
  }, [codigobge, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        codigobge: parseInt(formData.codigobge, 10),
      };

      if (isEditing) {
        await updateCidade(codigobge, { nome: payload.nome });
        alert('Cidade atualizada com sucesso!');
      } else {
        await createCidade(payload);
        alert('Cidade criada com sucesso!');
      }
      navigate('/cidades');
    } catch (error) {
      alert('Erro ao salvar cidade.');
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Cidade` : 'Cadastrar Nova Cidade'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="codigobge" value={formData.codigobge} onChange={handleChange} placeholder="Código IBGE" type="number" required disabled={isEditing} />
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome da Cidade" required />
        <select name="estado" value={formData.estado} onChange={handleChange} required disabled={isEditing}>
          <option value="">Selecione um Estado</option>
          {estados.map(estado => (
            <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
          ))}
        </select>
        <button style={{marginTop: '10px'}} type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
        <button style={{marginTop: '10px', backgroundColor: '#6c757d'}} type="button" onClick={() => navigate('/cidades')}>Cancelar</button>
      </form>
    </div>
  );
};

export default CidadesForm;