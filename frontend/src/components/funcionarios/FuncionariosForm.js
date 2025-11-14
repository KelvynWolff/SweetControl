import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createFuncionario,
  getFuncionarioById,
  updateFuncionario,
} from '../../services/funcionariosService';

import { getCidades } from '../../services/cidadesService';
import { getEstados } from '../../services/estadosService';
import {
  createBairro,
  getBairrosByCidade,
} from '../../services/bairrosService';

import '../forms.css';

const FuncionariosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    dataAdmissao: '',
  });

  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    CEP: '',
    idBairro: '',
  });

  const [telefones, setTelefones] = useState([{ numero: '', observacao: '' }]);
  const [emails, setEmails] = useState([{ email: '', observacao: '' }]);

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');

  const [showNovoBairro, setShowNovoBairro] = useState(false);
  const [novoBairroNome, setNovoBairroNome] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCidades().then(setCidades);
    getEstados().then(setEstados);

    if (isEditing) {
      setIsLoading(true);

      getFuncionarioById(id)
        .then((data) => {
          setFormData({
            nome: data.pessoa.nome,
            cpfCnpj: data.pessoa.cpfCnpj,
            dataAdmissao: new Date(data.dataAdmissao)
              .toISOString()
              .substring(0, 10),
          });
        })
        .catch(() => {
          alert('Funcionário não encontrado.');
          navigate('/funcionarios');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  useEffect(() => {
    if (selectedCidade) {
      getBairrosByCidade(selectedCidade).then(setBairros);
    } else {
      setBairros([]);
    }
  }, [selectedCidade]);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEnderecoChange = (e) =>
    setEndereco({ ...endereco, [e.target.name]: e.target.value });

  const handleBairroChange = (e) => {
    const value = e.target.value;
    setShowNovoBairro(value === 'novo');
    setEndereco((prev) => ({ ...prev, idBairro: value }));
  };

  const handleListChange = (index, event, list, setList) => {
    const updated = [...list];
    updated[index][event.target.name] = event.target.value;
    setList(updated);
  };

  const addField = (list, setList, field) => setList([...list, field]);

  const removeField = (index, list, setList) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let finalEndereco = { ...endereco };

    if (showNovoBairro && novoBairroNome) {
      try {
        const novoBairro = await createBairro({
          nome: novoBairroNome,
          ibgeCidade: parseInt(selectedCidade),
        });
        finalEndereco.idBairro = novoBairro.id;
      } catch {
        alert('Erro ao criar novo bairro.');
        setIsLoading(false);
        return;
      }
    }

    const payload = {
      ...formData,
      endereco: {
        ...finalEndereco,
        idBairro: parseInt(finalEndereco.idBairro),
        idCidade: parseInt(selectedCidade),
      },
      telefones,
      emails,
    };

    try {
      if (isEditing) {
        await updateFuncionario(id, payload);
        alert('Funcionário atualizado com sucesso!');
      } else {
        await createFuncionario(payload);
        alert('Funcionário criado com sucesso!');
      }

      navigate('/funcionarios');
    } catch {
      alert('Erro ao salvar funcionário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}</h3>

      <form onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <fieldset>
          <legend>Dados Pessoais e Contratuais</legend>

          <div className="form-row">
            <input
              name="nome"
              value={formData.nome}
              onChange={handleFormChange}
              placeholder="Nome Completo"
              required
            />
            <input
              name="cpfCnpj"
              value={formData.cpfCnpj}
              onChange={handleFormChange}
              placeholder="CPF"
              required
            />
          </div>

          <div className="form-row">
            <input
              name="dataAdmissao"
              type="date"
              value={formData.dataAdmissao}
              onChange={handleFormChange}
              required
            />
          </div>
        </fieldset>

        {/* Endereço */}
        <fieldset>
          <legend>Endereço</legend>

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
              required
              disabled={!selectedEstado}
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
              value={endereco.idBairro}
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

          <div className="form-row">
            <input
              name="rua"
              value={endereco.rua}
              onChange={handleEnderecoChange}
              placeholder="Rua"
              required
            />
            <input
              name="numero"
              value={endereco.numero}
              onChange={handleEnderecoChange}
              placeholder="Número"
              required
            />
            <input
              name="CEP"
              value={endereco.CEP}
              onChange={handleEnderecoChange}
              placeholder="CEP"
              required
            />
          </div>
        </fieldset>

        {/* Telefones */}
        <fieldset>
          <legend>Telefones</legend>

          {telefones.map((tel, index) => (
            <div className="form-row" key={index}>
              <input
                name="numero"
                value={tel.numero}
                onChange={(e) =>
                  handleListChange(index, e, telefones, setTelefones)
                }
                placeholder="Número"
              />
              <input
                name="observacao"
                value={tel.observacao}
                onChange={(e) =>
                  handleListChange(index, e, telefones, setTelefones)
                }
                placeholder="Observação"
              />

              {telefones.length > 1 && (
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => removeField(index, telefones, setTelefones)}
                >
                  -
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              addField(telefones, setTelefones, {
                numero: '',
                observacao: '',
              })
            }
          >
            + Adicionar Telefone
          </button>
        </fieldset>

        {/* Emails */}
        <fieldset>
          <legend>Emails</legend>

          {emails.map((mail, index) => (
            <div className="form-row" key={index}>
              <input
                name="email"
                type="email"
                value={mail.email}
                onChange={(e) => handleListChange(index, e, emails, setEmails)}
                placeholder="Email"
              />
              <input
                name="observacao"
                value={mail.observacao}
                onChange={(e) => handleListChange(index, e, emails, setEmails)}
                placeholder="Observação"
              />

              {emails.length > 1 && (
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => removeField(index, emails, setEmails)}
                >
                  -
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              addField(emails, setEmails, { email: '', observacao: '' })
            }
          >
            + Adicionar Email
          </button>
        </fieldset>

        {/* Ações */}
        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Funcionário'}
          </button>

          <button
            type="button"
            className="form-button-secondary"
            onClick={() => navigate('/funcionarios')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionariosForm;
