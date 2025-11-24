import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register, login as loginService } from '../services/authService';

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [permissao, setPermissao] = useState('Funcionario'); // mantido, porém desabilitado
  const [mostrarSenha, setMostrarSenha] = useState(false);

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
      const errorMessage =
        err?.response?.data?.message ||
        'Falha no cadastro. Verifique os dados.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="form-card"
        style={{ width: '100%', maxWidth: 480, display: 'grid', gap: 14 }}
      >
        <h2 style={{ margin: 0 }}>Cadastro de Usuário</h2>

        <div className="form-group">
          <label className="label required" htmlFor="nome">
            Nome Completo
          </label>
          <input
            id="nome"
            className="input"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="label required" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="label required" htmlFor="senha">
            Senha
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="senha"
              className="input"
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="mínimo 8 caracteres"
              minLength={8}
              required
            />
            <button
              type="button"
              className="btn-icon"
              onClick={() => setMostrarSenha((v) => !v)}
              title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              style={{ position: 'absolute', right: 6, top: 6 }}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
          <span className="help">
            Use ao menos 8 caracteres e evite senhas óbvias.
          </span>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="permissao">
            Permissão
          </label>
          <select
            id="permissao"
            className="select"
            value={permissao}
            onChange={(e) => setPermissao(e.target.value)}
            disabled
          >
            <option value="Funcionario">Funcionário</option>
            <option value="Administrador">Administrador</option>
          </select><br></br>
          <span className="help">
            Definido automaticamente. Altere depois no painel de usuários.
          </span>
        </div>

        {error && (
          <div
            className="card"
            style={{
              padding: 10,
              borderColor: 'transparent',
              background: 'rgba(242,82,125,.12)',
              color: '#F8B9C8',
            }}
          >
            {error}
          </div>
        )}

        <div className="actions" style={{ marginTop: 4 }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Salvar Usuário'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 4, color: 'var(--muted)' }}>
          Já tem uma conta?{' '}
          <Link to="/login" className="tab">
            Faça o login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
