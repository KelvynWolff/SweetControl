import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginService(login, senha);
      auth.login(data.access_token);
      navigate('/');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  

  return (
    <div className="form-container" style={{ margin: '5rem auto' }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input type="email" value={login} onChange={e => setLogin(e.target.value)} placeholder="E-mail" required />
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;