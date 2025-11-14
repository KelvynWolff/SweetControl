import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createCliente,
  getClienteById,
  updateCliente,
} from '../../services/clientesService';
import { getEstados } from '../../services/estadosService';
import { getCidades } from '../../services/cidadesService';
import {
  createBairro,
  getBairrosByCidade,
} from '../../services/bairrosService';
import '../forms.css';

const ClientesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ nome: '', cpfCnpj: '' });
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

  const [clienteData, setClienteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getEstados()
      .then(setEstados)
      .catch(() => alert('Erro ao carregar estados.'));
    getCidades()
      .then(setCidades)
      .catch(() => alert('Erro ao carregar cidades.'));
  }, []);

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      getClienteById(id)
        .then((data) => {
          setClienteData(data);

          setFormData({
            nome: data.pessoa.nome,
            cpfCnpj: data.pessoa.cpfCnpj,
          });

          if (data.pessoa.telefones?.length)
            setTelefones(data.pessoa.telefones);

          if (data.pessoa.emails?.length) setEmails(data.pessoa.emails);
        })
        .catch(() => {
          alert('Cliente não encontrado.');
          navigate('/clientes');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  useEffect(() => {
    if (isEditing && clienteData && cidades.length > 0) {
      const end = clienteData.pessoa.enderecos?.[0];

      if (end) {
        const cidadeDoEndereco = cidades.find((c) =>
          c.bairros?.some((b) => b.id === end.idBairro),
        );

        if (cidadeDoEndereco) {
          setSelectedEstado(cidadeDoEndereco.estado);
          setSelectedCidade(cidadeDoEndereco.codigobge);
        }

        setEndereco({
          rua: end.rua,
          numero: end.numero,
          CEP: end.CEP,
          idBairro: end.idBairro,
        });
      }
    }
  }, [clienteData, cidades, isEditing]);

  useEffect(() => {
    if (selectedCidade) {
      getBairrosByCidade(selectedCidade)
        .then(setBairros)
        .catch(() => alert('Erro ao carregar bairros.'));
    } else {
      setBairros([]);
    }
  }, [selectedCidade]);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEnderecoChange = (e) =>
    setEndereco({ ...endereco, [e.target.name]: e.target.value });

  const handleBairroChange = (e) => {
    const { value } = e.target;
    setShowNovoBairro(value === 'novo');
    setEndereco({ ...endereco, idBairro: value });
  };

  const handleListChange = (index, e, list, setList) => {
    const updated = [...list];
    updated[index][e.target.name] = e.target.value;
    setList(updated);
  };

  const addField = (list, setList, emptyObj) => setList([...list, emptyObj]);

  const removeField = (index, list, setList) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let finalEndereco = { ...endereco };

    if (showNovoBairro) {
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
        await updateCliente(id, payload);
        alert('Cliente atualizado com sucesso!');
      } else {
        await createCliente(payload);
        alert('Cliente criado com sucesso!');
      }
      navigate('/clientes');
    } catch (err) {
      alert('Erro ao salvar cliente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h3>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dados Pessoais</legend>

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
              placeholder="CPF ou CNPJ"
              required
            />
          </div>
        </fieldset>

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
              <option value="novo">+ Cadastrar Novo Bairro</option>
            </select>

            {showNovoBairro && (
              <input
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

        <fieldset>
          <legend>Telefones</legend>

          {telefones.map((t, index) => (
            <div key={index} className="form-row">
              <input
                name="numero"
                value={t.numero}
                placeholder="Número"
                onChange={(e) =>
                  handleListChange(index, e, telefones, setTelefones)
                }
              />
              <input
                name="observacao"
                value={t.observacao}
                placeholder="Observação"
                onChange={(e) =>
                  handleListChange(index, e, telefones, setTelefones)
                }
              />

              {telefones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(index, telefones, setTelefones)}
                >
                  -
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addField(telefones, setTelefones, { numero: '', observacao: '' })
            }
          >
            + Adicionar Telefone
          </button>
        </fieldset>

        <fieldset>
          <legend>Emails</legend>

          {emails.map((m, index) => (
            <div key={index} className="form-row">
              <input
                type="email"
                name="email"
                value={m.email}
                placeholder="Email"
                onChange={(e) => handleListChange(index, e, emails, setEmails)}
              />
              <input
                name="observacao"
                value={m.observacao}
                placeholder="Observação"
                onChange={(e) => handleListChange(index, e, emails, setEmails)}
              />

              {emails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(index, emails, setEmails)}
                >
                  -
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addField(emails, setEmails, { email: '', observacao: '' })
            }
          >
            + Adicionar Email
          </button>
        </fieldset>

        <div className="form-row">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Cliente'}
          </button>

          <button
            type="button"
            className="form-button-secondary"
            onClick={() => navigate('/clientes')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientesForm;
