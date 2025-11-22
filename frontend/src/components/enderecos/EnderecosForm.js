import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getEnderecoById,
  updateEndereco,
  createEndereco,
} from '../../services/enderecosService';
import { getPessoas } from '../../services/pessoasService';
import { getCidades } from '../../services/cidadesService';
import {
  createBairro,
  getBairrosByCidade,
} from '../../services/bairrosService';
import { getEstados } from '../../services/estadosService';
import '../forms.css';

const EnderecosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    rua: '',
    numero: '',
    CEP: '',
    idBairro: '',
    idPessoa: '',
  });

  const [pessoas, setPessoas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');

  const [showNovoBairro, setShowNovoBairro] = useState(false);
  const [novoBairroNome, setNovoBairroNome] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPessoas()
      .then(setPessoas)
      .catch(() => {});
    getEstados()
      .then(setEstados)
      .catch(() => {});
    getCidades()
      .then(setCidades)
      .catch(() => {});

    if (isEditing) {
      setIsLoading(true);
      getEnderecoById(id)
        .then((data) => {
          setFormData(data);
          if (data.bairro?.cidade) {
            setSelectedEstado(data.bairro.cidade.estado);
            setSelectedCidade(data.bairro.cidade.codigobge);
          }
        })
        .catch(() => {
          alert('Endereço não encontrado.');
          navigate('/enderecos');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  useEffect(() => {
    if (selectedCidade) {
      getBairrosByCidade(selectedCidade)
        .then(setBairros)
        .catch(() => {});
    } else {
      setBairros([]);
    }
  }, [selectedCidade]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBairroChange = (e) => {
    const { value } = e.target;
    setShowNovoBairro(value === 'novo');
    setFormData((prev) => ({ ...prev, idBairro: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let finalData = { ...formData };

    if (showNovoBairro && novoBairroNome) {
      try {
        const novo = await createBairro({
          nome: novoBairroNome,
          ibgeCidade: parseInt(selectedCidade),
        });
        finalData.idBairro = novo.id;
      } catch {
        alert('Erro ao criar novo bairro.');
        setIsLoading(false);
        return;
      }
    }

    const payload = {
      ...finalData,
      idBairro: parseInt(finalData.idBairro),
      idPessoa: parseInt(finalData.idPessoa),
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
    } catch {
      alert('Erro ao salvar endereço.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) return <p>Carregando dados...</p>;

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Endereço' : 'Cadastrar Novo Endereço'}</h3>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Associação</legend>

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
        </fieldset>

        <fieldset>
          <legend>Localização</legend>

          <div className="form-row">
            <select
              value={selectedEstado}
              onChange={(e) => setSelectedEstado(e.target.value)}
              required
            >
              <option value="">Selecione um Estado</option>
              {estados.map((e) => (
                <option key={e.sigla} value={e.sigla}>
                  {e.nome}
                </option>
              ))}
            </select>

            <select
              value={selectedCidade}
              onChange={(e) => setSelectedCidade(e.target.value)}
              disabled={!selectedEstado}
              required
            >
              <option value="">Selecione uma Cidade</option>
              {cidades
                .filter((c) => c.estado === selectedEstado)
                .map((c) => (
                  <option key={c.codigobge} value={c.codigobge}>
                    {c.nome}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-row">
            <select
              name="idBairro"
              value={formData.idBairro}
              onChange={handleBairroChange}
              disabled={!selectedCidade}
              required
            >
              <option value="">Selecione um Bairro</option>
              {bairros.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nome}
                </option>
              ))}
              <option value="novo">-- Cadastrar Novo Bairro --</option>
            </select>

            {showNovoBairro && (
              <input
                type="text"
                placeholder="Nome do Novo Bairro"
                value={novoBairroNome}
                onChange={(e) => setNovoBairroNome(e.target.value)}
                required
              />
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Detalhes</legend>

          <div className="form-row">
            <input
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              placeholder="Rua"
              required
            />
            <input
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Número"
              required
            />
          </div>

          <div className="form-row">
            <input
              name="CEP"
              value={formData.CEP}
              onChange={handleChange}
              placeholder="CEP"
              required
            />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" disabled={isLoading} className='button-confirm'>
            {isLoading ? 'Salvando...' : 'Salvar Endereço'}
          </button>

          <button
            type="button"
            className="form-button-secondary button-cancel"
            onClick={() => navigate('/enderecos')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnderecosForm;
