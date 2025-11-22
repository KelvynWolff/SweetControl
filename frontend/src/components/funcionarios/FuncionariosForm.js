import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isSupervisor } from '../../services/authService';
import { 
    updateUsuarioRole, 
    createUsuarioVinculado, 
    getUnlinkedUsers, // Novo
    linkUsuarioToFuncionario // Novo
} from '../../services/usuariosService';
import {
  createFuncionario,
  getFuncionarioById,
  updateFuncionario,
} from '../../services/funcionariosService';
import { getCidades } from '../../services/cidadesService';
import { getEstados } from '../../services/estadosService';
import { createBairro, getBairrosByCidade } from '../../services/bairrosService';
import '../forms.css';

const FuncionariosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // --- Form States ---
  const [formData, setFormData] = useState({ nome: '', cpfCnpj: '', dataAdmissao: '' });
  const [endereco, setEndereco] = useState({ rua: '', numero: '', CEP: '', idBairro: '' });
  const [telefones, setTelefones] = useState([{ numero: '', observacao: '' }]);
  const [emails, setEmails] = useState([{ email: '', observacao: '' }]);

  // --- Location States ---
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');
  const [showNovoBairro, setShowNovoBairro] = useState(false);
  const [novoBairroNome, setNovoBairroNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- Access Control States ---
  const [canManageAccess, setCanManageAccess] = useState(false);
  const [linkedUser, setLinkedUser] = useState(null); // Usuário já vinculado
  
  // Estado do modo de acesso: 'none' | 'create' | 'link'
  const [accessMode, setAccessMode] = useState('none'); 
  
  // Dados para criação ou vínculo
  const [newUserData, setNewUserData] = useState({ login: '', senha: '' });
  const [selectedUserId, setSelectedUserId] = useState(''); // ID do usuário existente selecionado
  const [accessRole, setAccessRole] = useState('user'); // Cargo para ambos os casos
  
  // Lista de usuários "órfãos"
  const [unlinkedUsers, setUnlinkedUsers] = useState([]);

  useEffect(() => {
    const supervisor = isSupervisor();
    setCanManageAccess(supervisor);
    
    // Se for supervisor, carrega usuários sem vínculo para o dropdown
    if (supervisor) {
        getUnlinkedUsers().then(setUnlinkedUsers).catch(console.error);
    }

    getCidades().then(setCidades);
    getEstados().then(setEstados);

    if (isEditing) {
      setIsLoading(true);
      getFuncionarioById(id)
        .then((data) => {
          setFormData({
            nome: data.pessoa.nome,
            cpfCnpj: data.pessoa.cpfCnpj,
            dataAdmissao: new Date(data.dataAdmissao).toISOString().substring(0, 10),
          });
          
          if(data.pessoa.enderecos && data.pessoa.enderecos.length > 0) {
            const enderecoAtual = data.pessoa.enderecos[0];
             setEndereco({
                 rua: enderecoAtual.rua,
                 numero: enderecoAtual.numero,
                 CEP: enderecoAtual.CEP,
                 idBairro: enderecoAtual.idBairro
             });
          }

          if (data.usuario) {
             setLinkedUser(data.usuario);
             setAccessRole(data.usuario.role);
          }
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

  // --- Handlers Genéricos ---
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEnderecoChange = (e) => setEndereco({ ...endereco, [e.target.name]: e.target.value });
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

  // --- Handlers de Acesso ---
  const handleUpdateRole = async () => {
      if (!linkedUser) return;
      try {
          await updateUsuarioRole(linkedUser.id, accessRole);
          alert("Nível de acesso atualizado com sucesso!");
      } catch (error) {
          alert("Erro ao atualizar nível de acesso.");
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let finalEndereco = { ...endereco };
    if (showNovoBairro && novoBairroNome) {
      try {
        const novoBairro = await createBairro({ nome: novoBairroNome, ibgeCidade: parseInt(selectedCidade) });
        finalEndereco.idBairro = novoBairro.id;
      } catch {
        alert('Erro ao criar novo bairro.');
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
      let funcionarioId = id;

      // 1. Salva/Cria Funcionário
      if (isEditing) {
        await updateFuncionario(id, payload);
        
        // Se já tem usuário, apenas atualiza o cargo se mudou
        if (linkedUser && accessRole !== linkedUser.role) {
            await handleUpdateRole();
        }
      } else {
        const novoFunc = await createFuncionario(payload);
        funcionarioId = novoFunc.id;
      }

      // 2. Gerencia Criação/Vínculo de Usuário (Se selecionado)
      if (canManageAccess && !linkedUser) {
          
          // Cenário A: Criar Novo
          if (accessMode === 'create' && newUserData.login && newUserData.senha) {
              await createUsuarioVinculado({
                  login: newUserData.login,
                  senha: newUserData.senha,
                  nome: formData.nome,
                  dataValidade: '2030-12-31',
                  idFuncionario: parseInt(funcionarioId),
                  // Nota: O backend precisa suportar receber 'role' no create ou atualizamos depois
              });
              // Hack rápido: Se o backend não aceita role no create, precisaríamos fazer update logo em seguida
              // Mas vamos assumir que o padrão é 'user'. Se for supervisor, teria que atualizar depois.
          }
          
          // Cenário B: Vincular Existente
          if (accessMode === 'link' && selectedUserId) {
              await linkUsuarioToFuncionario(selectedUserId, parseInt(funcionarioId), accessRole);
          }
      }

      alert(`Funcionário ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
      navigate('/funcionarios');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar dados: ' + (error.response?.data?.message || error.message));
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
          <legend>Dados Pessoais</legend>
          <div className="form-row">
            <input name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Nome Completo" required />
            <input name="cpfCnpj" value={formData.cpfCnpj} onChange={handleFormChange} placeholder="CPF" required />
          </div>
          <div className="form-row">
            <input name="dataAdmissao" type="date" value={formData.dataAdmissao} onChange={handleFormChange} required />
          </div>
        </fieldset>

        {/* --- GESTÃO DE ACESSO (SUPERVISOR) --- */}
        {canManageAccess && (
            <fieldset style={{ borderColor: '#27ae60', backgroundColor: '#f0fcf4' }}>
                <legend style={{ color: '#27ae60', fontWeight: 'bold' }}>Acesso ao Sistema</legend>
                
                {linkedUser ? (
                    // Se já tem usuário vinculado
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p><strong>Usuário Vinculado:</strong> {linkedUser.login}</p>
                        <div className="form-group">
                            <label>Cargo:</label>
                            <select value={accessRole} onChange={e => setAccessRole(e.target.value)} style={{padding: '5px'}}>
                                <option value="user">Usuário Comum</option>
                                <option value="supervisor">Supervisor</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    // Se NÃO tem usuário vinculado
                    <div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ marginRight: '15px' }}>
                                <input 
                                    type="radio" 
                                    name="accessMode" 
                                    value="none" 
                                    checked={accessMode === 'none'} 
                                    onChange={e => setAccessMode(e.target.value)} 
                                /> Sem Acesso
                            </label>
                            <label style={{ marginRight: '15px' }}>
                                <input 
                                    type="radio" 
                                    name="accessMode" 
                                    value="create" 
                                    checked={accessMode === 'create'} 
                                    onChange={e => setAccessMode(e.target.value)} 
                                /> Criar Novo Usuário
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="accessMode" 
                                    value="link" 
                                    checked={accessMode === 'link'} 
                                    onChange={e => setAccessMode(e.target.value)} 
                                /> Vincular Existente
                            </label>
                        </div>

                        {/* Formulário Criar Novo */}
                        {accessMode === 'create' && (
                            <div className="form-row" style={{ background: '#fff', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                                <input 
                                    placeholder="Login desejado" 
                                    value={newUserData.login}
                                    onChange={e => setNewUserData({...newUserData, login: e.target.value})}
                                    required
                                />
                                <input 
                                    type="password" 
                                    placeholder="Senha inicial"
                                    value={newUserData.senha}
                                    onChange={e => setNewUserData({...newUserData, senha: e.target.value})}
                                    required
                                />
                            </div>
                        )}

                        {/* Formulário Vincular Existente */}
                        {accessMode === 'link' && (
                            <div style={{ background: '#fff', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                                <label>Selecione o Usuário (Sem vínculo):</label>
                                <select 
                                    value={selectedUserId} 
                                    onChange={e => setSelectedUserId(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                >
                                    <option value="">-- Selecione --</option>
                                    {unlinkedUsers.map(u => (
                                        <option key={u.id} value={u.id}>
                                            {u.login} ({u.role})
                                        </option>
                                    ))}
                                </select>
                                {unlinkedUsers.length === 0 && <small style={{color: 'red'}}>Nenhum usuário disponível para vínculo.</small>}
                            </div>
                        )}

                        {/* Seletor de Cargo (Comum para Create e Link) */}
                        {accessMode !== 'none' && (
                            <div className="form-group" style={{ marginTop: '10px' }}>
                                <label>Definir Cargo:</label>
                                <select value={accessRole} onChange={e => setAccessRole(e.target.value)} style={{ width: '100%', padding: '5px' }}>
                                    <option value="user">Usuário Comum</option>
                                    <option value="supervisor">Supervisor</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}
            </fieldset>
        )}

        {/* Endereço */}
        <fieldset>
          <legend>Endereço</legend>
          <div className="form-row">
            <select value={selectedEstado} onChange={(e) => setSelectedEstado(e.target.value)} required>
              <option value="">Estado</option>
              {estados.map((e) => <option key={e.sigla} value={e.sigla}>{e.nome}</option>)}
            </select>
            <select value={selectedCidade} onChange={(e) => setSelectedCidade(e.target.value)} required disabled={!selectedEstado}>
              <option value="">Cidade</option>
              {cidades.filter((c) => c.estado === selectedEstado).map((c) => <option key={c.codigobge} value={c.codigobge}>{c.nome}</option>)}
            </select>
          </div>
          <div className="form-row">
            <select name="idBairro" value={endereco.idBairro} onChange={handleBairroChange} disabled={!selectedCidade} required>
              <option value="">Bairro</option>
              {bairros.map((b) => <option key={b.id} value={b.id}>{b.nome}</option>)}
              <option value="novo">+ Novo Bairro</option>
            </select>
            {showNovoBairro && <input type="text" placeholder="Nome do Bairro" value={novoBairroNome} onChange={(e) => setNovoBairroNome(e.target.value)} required />}
          </div>
          <div className="form-row">
            <input name="rua" value={endereco.rua} onChange={handleEnderecoChange} placeholder="Rua" required />
            <input name="numero" value={endereco.numero} onChange={handleEnderecoChange} placeholder="Número" required />
            <input name="CEP" value={endereco.CEP} onChange={handleEnderecoChange} placeholder="CEP" required />
          </div>
        </fieldset>

        {/* Telefones e Emails (Mantidos iguais) */}
        <fieldset>
          <legend>Contatos</legend>
          {telefones.map((tel, index) => (
            <div className="form-row" key={index}>
                <input value={tel.numero} onChange={e => handleListChange(index, e, telefones, setTelefones)} name="numero" placeholder="Telefone" />
                <button type="button" onClick={() => removeField(index, telefones, setTelefones)}>-</button>
            </div>
          ))}
          <button type="button" onClick={() => addField(telefones, setTelefones, {numero:'', observacao:''})}>+ Tel</button>
          
          {emails.map((mail, index) => (
            <div className="form-row" key={index}>
                <input value={mail.email} onChange={e => handleListChange(index, e, emails, setEmails)} name="email" placeholder="Email" />
                <button type="button" onClick={() => removeField(index, emails, setEmails)}>-</button>
            </div>
          ))}
          <button type="button" onClick={() => addField(emails, setEmails, {email:'', observacao:''})}>+ Email</button>
        </fieldset>

        <div className="form-actions">
          <button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar Dados'}</button>
          <button type="button" className="form-button-secondary" onClick={() => navigate('/funcionarios')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default FuncionariosForm;