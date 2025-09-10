import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createCliente, getClienteById, updateCliente } from '../../services/clientesService';
import { getEstados } from '../../services/estadosService';
import { getCidades } from '../../services/cidadesService';
import { createBairro, getBairrosByCidade } from '../../services/bairrosService';
import '../forms.css';

const ClientesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ nome: '', cpfCnpj: '' });
  const [endereco, setEndereco] = useState({ rua: '', numero: '', CEP: '', idBairro: '' });
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
    getEstados().then(setEstados).catch(err => console.error("Erro ao carregar estados", err));
    getCidades().then(setCidades).catch(err => console.error("Erro ao carregar cidades", err));
  }, []);

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      getClienteById(id)
        .then(data => {
          setClienteData(data);
          setFormData({ nome: data.pessoa.nome, cpfCnpj: data.pessoa.cpfCnpj });
          if (data.pessoa.telefones?.length > 0) setTelefones(data.pessoa.telefones);
          if (data.pessoa.emails?.length > 0) setEmails(data.pessoa.emails);
        })
        .catch(err => {
          alert("Cliente não encontrado.");
          navigate('/clientes');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  useEffect(() => {
    if (isEditing && clienteData && cidades.length > 0) {
      const end = clienteData.pessoa.enderecos?.[0];
      if (end) {
        const cidadeDoEndereco = cidades.find(c => c.bairros?.some(b => b.id === end.idBairro));
        if (cidadeDoEndereco) {
          setSelectedEstado(cidadeDoEndereco.estado);
          setSelectedCidade(cidadeDoEndereco.codigobge);
        }
        setEndereco({
          rua: end.rua,
          numero: end.numero,
          CEP: end.CEP,
          idBairro: end.idBairro
        });
      }
    }
  }, [clienteData, cidades, isEditing]);

  useEffect(() => {
    if (selectedCidade) {
      getBairrosByCidade(selectedCidade).then(setBairros).catch(err => console.error("Erro ao carregar bairros", err));
    } else {
      setBairros([]);
    }
  }, [selectedCidade]);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEnderecoChange = (e) => setEndereco({ ...endereco, [e.target.name]: e.target.value });
  const handleBairroChange = (e) => {
    const { value } = e.target;
    setShowNovoBairro(value === 'novo');
    setEndereco({ ...endereco, idBairro: value });
  };
  const handleListChange = (index, event, list, setList) => {
    const newList = [...list];
    newList[index][event.target.name] = event.target.value;
    setList(newList);
  };
  const addField = (list, setList, field) => setList([...list, field]);
  const removeField = (index, list, setList) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let finalEndereco = { ...endereco };
    if (showNovoBairro && novoBairroNome) {
      try {
        const novoBairro = await createBairro({ nome: novoBairroNome, ibgeCidade: parseInt(selectedCidade) });
        finalEndereco.idBairro = novoBairro.id;
      } catch (err) {
        alert("Erro ao criar o novo bairro.");
        setIsLoading(false);
        return;
      }
    }
    const payload = {
      ...formData,
      endereco: { ...finalEndereco, idBairro: parseInt(finalEndereco.idBairro), idCidade: parseInt(selectedCidade) },
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
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar cliente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? `Editar Cliente` : 'Cadastrar Novo Cliente'}</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <input name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Nome Completo" required />
          <input name="cpfCnpj" value={formData.cpfCnpj} onChange={handleFormChange} placeholder="CPF ou CNPJ" required />
        </fieldset>
        <fieldset>
          <legend>Endereço</legend>
          <select value={selectedEstado} onChange={e => setSelectedEstado(e.target.value)} required>
            <option value="">Selecione um Estado</option>
            {estados.map(e => <option key={e.sigla} value={e.sigla}>{e.nome}</option>)}
          </select>
          <select value={selectedCidade} onChange={e => setSelectedCidade(e.target.value)} required disabled={!selectedEstado}>
            <option value="">Selecione uma Cidade</option>
            {cidades.filter(c => c.estado === selectedEstado).map(c => <option key={c.codigobge} value={c.codigobge}>{c.nome}</option>)}
          </select>
          <select value={endereco.idBairro} onChange={handleBairroChange} disabled={!selectedCidade} required>
            <option value="">Selecione um Bairro</option>
            {bairros.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
            <option value="novo">-- Cadastrar Novo Bairro --</option>
          </select>
          {showNovoBairro && (<input type="text" placeholder="Nome do Novo Bairro" value={novoBairroNome} onChange={e => setNovoBairroNome(e.target.value)} required />)}
          <input name="rua" value={endereco.rua} onChange={handleEnderecoChange} placeholder="Rua" required />
          <input name="numero" value={endereco.numero} onChange={handleEnderecoChange} placeholder="Número" required />
          <input name="CEP" value={endereco.CEP} onChange={handleEnderecoChange} placeholder="CEP" required />
        </fieldset>
        <fieldset>
          <legend>Telefones</legend>
          {telefones.map((tel, index) => (
            <div key={index} className="dynamic-field">
              <input name="numero" value={tel.numero} onChange={e => handleListChange(index, e, telefones, setTelefones)} placeholder="Número" />
              <input name="observacao" value={tel.observacao} onChange={e => handleListChange(index, e, telefones, setTelefones)} placeholder="Observação" />
              {telefones.length > 1 && <button type="button" onClick={() => removeField(index, telefones, setTelefones)}>-</button>}
            </div>
          ))}
          <button type="button" onClick={() => addField(telefones, setTelefones, { numero: '', observacao: '' })}>+ Adicionar Telefone</button>
        </fieldset>
        <fieldset>
          <legend>Emails</legend>
          {emails.map((mail, index) => (
            <div key={index} className="dynamic-field">
              <input name="email" type="email" value={mail.email} onChange={e => handleListChange(index, e, emails, setEmails)} placeholder="Email" />
              <input name="observacao" value={mail.observacao} onChange={e => handleListChange(index, e, emails, setEmails)} placeholder="Observação" />
              {emails.length > 1 && <button type="button" onClick={() => removeField(index, emails, setEmails)}>-</button>}
            </div>
          ))}
          <button type="button" onClick={() => addField(emails, setEmails, { email: '', observacao: '' })}>+ Adicionar Email</button>
        </fieldset>
        <div className="form-actions">
          <button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar Cliente'}</button>
          <button type="button" onClick={() => navigate('/clientes')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ClientesForm;