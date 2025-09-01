import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEnderecoById, updateEndereco, createEndereco } from '../../services/enderecosService';
import { getPessoas } from '../../services/pessoasService';
import { getCidades } from '../../services/cidadesService';
import { createBairro, getBairrosByCidade } from '../../services/bairrosService';
import { getEstados } from '../../services/estadosService';
import '../forms.css';

const EnderecosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({ rua: '', numero: '', CEP: '', idBairro: '', idPessoa: '' });

  // Estados para popular e controlar os dropdowns
  const [pessoas, setPessoas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');

  // Estados para a lógica de criação de um novo bairro
  const [showNovoBairro, setShowNovoBairro] = useState(false);
  const [novoBairroNome, setNovoBairroNome] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Efeito para carregar dados iniciais e dados para edição
  useEffect(() => {
    getPessoas().then(setPessoas).catch(err => console.error("Erro ao carregar pessoas", err));
    getEstados().then(setEstados).catch(err => console.error("Erro ao carregar estados", err));
    getCidades().then(setCidades).catch(err => console.error("Erro ao carregar cidades", err));

    if (isEditing) {
      setIsLoading(true);
      getEnderecoById(id)
        .then(data => {
          setFormData(data);
          // Pré-seleciona os dropdowns com base nos dados do endereço
          if (data.bairro && data.bairro.cidade) {
            setSelectedEstado(data.bairro.cidade.estado);
            setSelectedCidade(data.bairro.cidade.codigobge);
          }
        })
        .catch(err => {
          alert("Endereço não encontrado.");
          navigate('/enderecos');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  // Efeito para carregar bairros quando uma cidade é selecionada
  useEffect(() => {
    if (selectedCidade) {
      getBairrosByCidade(selectedCidade).then(setBairros).catch(err => console.error("Erro ao carregar bairros", err));
    } else {
      setBairros([]);
    }
  }, [selectedCidade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleBairroChange = (e) => {
    const { value } = e.target;
    setShowNovoBairro(value === 'novo');
    setFormData({ ...formData, idBairro: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    let finalFormData = { ...formData };

    if (showNovoBairro && novoBairroNome) {
      try {
        const novoBairro = await createBairro({ nome: novoBairroNome, ibgeCidade: parseInt(selectedCidade) });
        finalFormData.idBairro = novoBairro.id;
      } catch (err) {
        alert("Erro ao criar o novo bairro.");
        setIsLoading(false);
        return;
      }
    }

    const payload = {
      ...finalFormData,
      idBairro: parseInt(finalFormData.idBairro),
      idPessoa: parseInt(finalFormData.idPessoa),
    };

    try {
      if (isEditing) {
        await updateEndereco(id, payload);
        alert('Endereço atualizado com sucesso!');
      } else {
        await createEndereco(payload);
        alert('Endereço criado com sucesso!');
      }
      navigate('/enderecos');
    } catch (error) {
      alert('Erro ao salvar endereço.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) return <p>Carregando dados do endereço...</p>;

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Endereço` : 'Cadastrar Novo Endereço'}</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Associação</legend>
          <select name="idPessoa" value={formData.idPessoa} onChange={handleChange} required>
            <option value="">Selecione uma Pessoa</option>
            {pessoas.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </fieldset>

        <fieldset>
          <legend>Localização</legend>
          <select value={selectedEstado} onChange={e => setSelectedEstado(e.target.value)} required>
              <option value="">Selecione um Estado</option>
              {estados.map(e => <option key={e.sigla} value={e.sigla}>{e.nome}</option>)}
          </select>
          
          <select value={selectedCidade} onChange={e => setSelectedCidade(e.target.value)} required disabled={!selectedEstado}>
            <option value="">Selecione uma Cidade</option>
            {cidades
              .filter(c => c.estado === selectedEstado)
              .map(c => <option key={c.codigobge} value={c.codigobge}>{c.nome}</option>)
            }
          </select>

          <select name="idBairro" value={formData.idBairro} onChange={handleBairroChange} disabled={!selectedCidade} required>
            <option value="">Selecione um Bairro</option>
            {bairros.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
            <option value="novo">-- Cadastrar Novo Bairro --</option>
          </select>

          {showNovoBairro && (
            <input type="text" placeholder="Nome do Novo Bairro" value={novoBairroNome} onChange={e => setNovoBairroNome(e.target.value)} required />
          )}
        </fieldset>
        
        <fieldset>
          <legend>Detalhes</legend>
          <input name="rua" value={formData.rua} onChange={handleChange} placeholder="Rua" required />
          <input name="numero" value={formData.numero} onChange={handleChange} placeholder="Número" required />
          <input name="CEP" value={formData.CEP} onChange={handleChange} placeholder="CEP" required />
        </fieldset>

        <div className="form-actions">
          <button style={{marginTop: '10px'}} type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar Endereço'}</button>
          <button style={{marginTop: '10px', backgroundColor: '#6c757d'}} type="button" onClick={() => navigate('/enderecos')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EnderecosForm;