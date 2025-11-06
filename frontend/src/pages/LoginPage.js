import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError('');
    setSubmitting(true);
    try {
      const data = await loginService(login, senha);
      auth.login(data.access_token);
      navigate('/');
    } catch {
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container"
      style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}
    >
      <form
        onSubmit={handleSubmit}
        className="form-card"
        style={{ width: '100%', maxWidth: 420, display: 'grid', gap: 14 }}
        noValidate
      >
        <h2 style={{ margin: 0 }}>Login</h2>

        <div className="form-group">
          <label className="label" htmlFor="email">
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
            autoFocus
            aria-invalid={!!error}
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="senha">
            Senha
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="senha"
              className="input"
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              aria-invalid={!!error}
            />
            <button
              type="button"
              className="btn-icon"
              onClick={() => setMostrarSenha((v) => !v)}
              title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              style={{ position: 'absolute', right: 6, top: 6 }}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
          <span className="help">Mínimo de 8 caracteres.</span>
        </div>

        {error && (
          <div
            className="card"
            role="alert"
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
            disabled={submitting}
          >
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 4, color: 'var(--muted)' }}>
          Não tem uma conta?{' '}
          <Link to="/register" className="tab">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
