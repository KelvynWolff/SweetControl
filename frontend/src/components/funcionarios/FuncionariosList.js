import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getFuncionarios, deleteFuncionario } from '../../services/funcionariosService';
import { createUsuarioVinculado } from '../../services/usuariosService';
import { isSupervisor, getCurrentUserRole } from '../../services/authService';
import '../tables.css';
import '../forms.css';

const GrantAccessModal = ({ funcionario, onClose, onSuccess }) => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login || !senha) return alert("Preencha login e senha.");

        setLoading(true);
        try {
            await createUsuarioVinculado({
                login,
                senha,
                role,
                nome: funcionario.pessoa.nome,
                dataValidade: '2030-12-31',
                idFuncionario: funcionario.id
            });
            alert(`Acesso criado para ${funcionario.pessoa.nome}!`);
            onSuccess();
        } catch (error) {
            alert("Erro: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal" style={{ minWidth: '400px' }}>
                <h3>Criar Acesso ao Sistema</h3>
                <p>Funcionário: <strong>{funcionario.pessoa.nome}</strong></p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Login de Acesso</label>
                        <input 
                            value={login} 
                            onChange={e => setLogin(e.target.value)} 
                            placeholder="Ex: joao.silva" 
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha Inicial</label>
                        <input 
                            type="password" 
                            value={senha} 
                            onChange={e => setSenha(e.target.value)} 
                            placeholder="******" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Nível de Acesso</label>
                        <select value={role} onChange={e => setRole(e.target.value)}>
                            <option value="user">Funcionário</option>
                            <option value="supervisor">Gerente</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Criando...' : 'Confirmar Criação'}
                        </button>
                        <button type="button" onClick={onClose} className="form-button-secondary">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [isUserSupervisor, setIsUserSupervisor] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  const loadData = () => {
    setLoading(true);
    getFuncionarios()
      .then(setFuncionarios)
      .catch(err => console.error("Erro ao carregar funcionários", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const role = getCurrentUserRole();
    const checkSupervisor = isSupervisor();
    setIsUserSupervisor(isSupervisor());
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        await deleteFuncionario(id);
        setFuncionarios(funcionarios.filter(f => f.id !== id));
      } catch (error) {
        alert('Erro ao excluir funcionário. Verifique vínculos.');
      }
    }
  };

  const filteredFuncionarios = funcionarios.filter(f =>
    f.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.pessoa.cpfCnpj.includes(searchTerm)
  );

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/funcionarios/novo">+</Link>
        Colaboradores
      </h2>

      <input
        type="text"
        placeholder="Buscar por nome ou CPF..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data Admissão</th>
            <th>Usuário do Sistema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuncionarios.map((func) => (
            <tr key={func.id}>
              <td>{func.pessoa.nome}</td>
              <td>{func.pessoa.cpfCnpj}</td>
              <td>{new Date(func.dataAdmissao).toLocaleDateString()}</td>
              
              <td>
                {func.usuario ? (
                  <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.85em' }}>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Ativo</span>
                    <span>User: {func.usuario.login}</span>
                    <span>Cargo: {func.usuario.role}</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#999', fontStyle: 'italic' }}>Sem acesso</span>
                    
                    {isUserSupervisor && (
                        <button 
                            className="icon-btn" 
                            style={{ backgroundColor: '#27ae60', fontSize: '0.8em', padding: '5px 10px', width: 'auto' }}
                            onClick={() => setSelectedFuncionario(func)}
                            title="Criar login para este funcionário"
                        >
                            + Criar Acesso
                        </button>
                    )}
                  </div>
                )}
              </td>

              <td>
                <button className="icon-btn" onClick={() => navigate(`/funcionarios/editar/${func.id}`)}>✏️</button>
                <button className="icon-btn-delete" onClick={() => handleDelete(func.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFuncionario && (
          <GrantAccessModal 
              funcionario={selectedFuncionario}
              onClose={() => setSelectedFuncionario(null)}
              onSuccess={() => {
                  setSelectedFuncionario(null);
                  loadData();
              }}
          />
      )}
    </div>
  );
};

export default FuncionariosList;