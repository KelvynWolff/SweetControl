import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register, login as loginService } from '../services/authService';

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [permissao, setPermissao] = useState('Funcionario');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const dataValidade = new Date();
    dataValidade.setFullYear(dataValidade.getFullYear() + 1);

    const payload = {
      nome,
      login,
      senha,
      dataValidade: dataValidade.toISOString().split('T')[0],
    };

    try {
      await register(payload);
      
      const loginData = await loginService(login, senha);
      auth.login(loginData.access_token);
      
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Falha no cadastro. Verifique os dados.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ margin: '5rem auto' }}>
      <h3>Cadastro de Usuário</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome Completo" required />
        <input type="email" value={login} onChange={e => setLogin(e.target.value)} placeholder="E-mail" required />
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha (mínimo 8 caracteres)" required />
        
        <select value={permissao} onChange={e => setPermissao(e.target.value)} disabled>
          <option value="Funcionario">Funcionário</option>
          <option value="Administrador">Administrador</option>
        </select>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Salvar Usuário'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Já tem uma conta? <Link to="/login">Faça o login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;