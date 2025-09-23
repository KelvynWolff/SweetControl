<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ProdutosHub from './pages/produtos/ProdutosHub';
=======
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProducaoPage from './pages/producao/ProducaoPage';

>>>>>>> d6862ef3b3f41442d1ba992191aca92c07547a77
import ProdutosPage from './pages/produtos/ProdutosPage';
import InsumosPage from './pages/insumos/InsumosPage';
import ReceitasPage from './pages/receitas/ReceitasPage';
import PromocoesPage from './pages/promocoes/PromocoesPage';
import EstadosPage from './pages/estados/EstadosPage';
import CidadesPage from './pages/cidades/CidadesPage';
import BairrosPage from './pages/bairros/BairrosPage';
import ClientesPage from './pages/clientes/ClientesPage';
import EnderecosPage from './pages/enderecos/EnderecosPage';
import EmailsPage from './pages/emails/EmailsPage';
import TelefonesPage from './pages/telefones/TelefonesPage';
import FornecedoresPage from './pages/fornecedores/FornecedoresPage';
import FuncionariosPage from './pages/funcionarios/FuncionariosPage';
import PedidosPage from './pages/pedidos/PedidosPage';
import NotificacoesPage from './pages/notificacoes/NotificacoesPage';
<<<<<<< HEAD
import './App.css';
=======
import Dashboard from './pages/Dashboard';

import './App.css';

const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="auth-status">
      <button onClick={() => {
        auth.logout();
        navigate('/login');
      }}>
        Sair
      </button>
    </div>
  );
};
>>>>>>> d6862ef3b3f41442d1ba992191aca92c07547a77

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <div className="logo-container">
            <img
              src="/Logo Sweet Control.jpg"
              alt="Logo Sweet Control"
              className="logo"
            />
            <h1 className="title">Sweet Control</h1>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Alternar menu"
          >
            ☰
          </button>
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <NavLink to="/" end>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/produtos" end>
                  Produtos
                </NavLink>
              </li>
              <li>
                <NavLink to="/clientes">Pessoas & Cadastros</NavLink>
              </li>
              <li>
                <NavLink to="/pedidos">Pedidos</NavLink>
              </li>
              <li>
                <NavLink to="/promocoes">Promoções</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produtos" element={<ProdutosHub />} />
            <Route path="/produtos/*" element={<ProdutosPage />} />
            <Route path="/insumos/*" element={<InsumosPage />} />
            <Route path="/receitas/*" element={<ReceitasPage />} />
            <Route path="/promocoes/*" element={<PromocoesPage />} />
            <Route path="/estados/*" element={<EstadosPage />} />
            <Route path="/cidades/*" element={<CidadesPage />} />
            <Route path="/bairros/*" element={<BairrosPage />} />
            <Route path="/clientes/*" element={<ClientesPage />} />
            <Route path="/enderecos/*" element={<EnderecosPage />} />
            <Route path="/emails/*" element={<EmailsPage />} />
            <Route path="/telefones/*" element={<TelefonesPage />} />
            <Route path="/fornecedores/*" element={<FornecedoresPage />} />
            <Route path="/funcionarios/*" element={<FuncionariosPage />} />
            <Route path="/pedidos/*" element={<PedidosPage />} />
            <Route path="/notificacoes/*" element={<NotificacoesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const Dashboard = () => (
  <section className="dashboard">
    <h2>Bem-vindo ao seu Dashboard!</h2>
    <p>
      Gerencie seus produtos, pedidos e clientes de forma prática e moderna 🚀
    </p>
    <div className="dashboard-cards">
      <NavLink to="/produtos" className="card">
        📦 Produtos
      </NavLink>
      <NavLink to="/clientes" className="card">
        👥 Clientes
      </NavLink>
      <NavLink to="/pedidos" className="card">
        🛒 Pedidos
      </NavLink>
      <NavLink to="/promocoes" className="card">
        📢 Promoções
      </NavLink>
    </div>
  </section>
);
=======
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <header>
        <h1>Sweet Control</h1>
        {isAuthenticated && (
          <>
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li className="dropdown">
                  <span className="dropbtn">Produtos ▼</span>
                  <ul className="submenu">
                    <li><Link to="/produtos">Produtos</Link></li>
                    <li><Link to="/insumos">Insumos</Link></li>
                    <li><Link to="/receitas">Receitas</Link></li>
                    <li><Link to="/promocoes">Promoções</Link></li>
                    <li><Link to="/producao">Produção</Link></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <span className="dropbtn">Cadastros ▼</span>
                  <ul className="submenu">
                    <li><Link to="/clientes">Clientes</Link></li>
                    <li><Link to="/fornecedores">Fornecedores</Link></li>
                    <li><Link to="/funcionarios">Funcionários</Link></li>
                    <li className="separator"><hr /></li>
                    <li><Link to="/estados">Estados</Link></li>
                    <li><Link to="/cidades">Cidades</Link></li>
                    <li><Link to="/bairros">Bairros</Link></li>
                    <li><Link to="/enderecos">Endereços</Link></li>
                    <li><Link to="/emails">Emails</Link></li>
                    <li><Link to="/telefones">Telefones</Link></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <span className="dropbtn">Vendas ▼</span>
                  <ul className="submenu">
                    <li><Link to="/pedidos">Pedidos</Link></li>
                    <li><Link to="/notificacoes">Notificações</Link></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <AuthStatus />
          </>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/produtos/*" element={<ProtectedRoute><ProdutosPage /></ProtectedRoute>} />
          <Route path="/insumos/*" element={<ProtectedRoute><InsumosPage /></ProtectedRoute>} />
          <Route path="/receitas/*" element={<ProtectedRoute><ReceitasPage /></ProtectedRoute>} />
          <Route path="/promocoes/*" element={<ProtectedRoute><PromocoesPage /></ProtectedRoute>} />
          <Route path="/estados/*" element={<ProtectedRoute><EstadosPage /></ProtectedRoute>} />
          <Route path="/cidades/*" element={<ProtectedRoute><CidadesPage /></ProtectedRoute>} />
          <Route path="/bairros/*" element={<ProtectedRoute><BairrosPage /></ProtectedRoute>} />
          <Route path="/clientes/*" element={<ProtectedRoute><ClientesPage /></ProtectedRoute>} />
          <Route path="/enderecos/*" element={<ProtectedRoute><EnderecosPage /></ProtectedRoute>} />
          <Route path="/emails/*" element={<ProtectedRoute><EmailsPage /></ProtectedRoute>} />
          <Route path="/telefones/*" element={<ProtectedRoute><TelefonesPage /></ProtectedRoute>} />
          <Route path="/fornecedores/*" element={<ProtectedRoute><FornecedoresPage /></ProtectedRoute>} />
          <Route path="/funcionarios/*" element={<ProtectedRoute><FuncionariosPage /></ProtectedRoute>} />
          <Route path="/pedidos/*" element={<ProtectedRoute><PedidosPage /></ProtectedRoute>} />
          <Route path="/notificacoes" element={<ProtectedRoute><NotificacoesPage /></ProtectedRoute>} />
          <Route path="/producao/*" element={<ProtectedRoute><ProducaoPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
};
>>>>>>> d6862ef3b3f41442d1ba992191aca92c07547a77

export default App;
