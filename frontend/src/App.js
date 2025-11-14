import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProducaoPage from './pages/producao/ProducaoPage';

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
import Dashboard from './pages/Dashboard';
import './components/forms.css';
import './components/tables.css';
import './components/tabs.css';
import LotesPage from './pages/lotes/LotesPage';
import PagamentosPage from './components/pagamentos/PagamentosPage';
import NotasComprasPage from './pages/notas-compras/NotasComprasPage';
import StyleGuide from './pages/StyleGuide';

import './App.css';

const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) return null;

  return (
    <button
      className="btn btn-secondary"
      style={{ marginLeft: 'auto' }}
      onClick={() => {
        auth.logout();
        navigate('/login');
      }}
    >
      Sair
    </button>
  );
};

const activeClass = ({ isActive }) => (isActive ? 'is-active' : undefined);

function App() {
  return (
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
      {/* HEADER */}
      <header className="navbar">
        <img
          src="/Logo Sweet Control.jpg"
          alt="Sweet Control"
          className="navbar-logo"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallback) {
              e.currentTarget.src = '/Logo Sweet Control.png';
              e.currentTarget.dataset.fallback = '1';
            }
          }}
        />

        <h1 className="navbar-title">SWEET CONTROL</h1>

        {isAuthenticated && (
          <>
            <nav className="main-nav-wrapper">
              <ul className="main-nav">
                <li>
                  <NavLink to="/" end className={activeClass}>
                    Dashboard
                  </NavLink>
                </li>

                <li className="dropdown">
                  <span className="dropbtn">Produtos ▼</span>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/produtos" className={activeClass}>
                        Produtos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/insumos" className={activeClass}>
                        Insumos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/receitas" className={activeClass}>
                        Receitas
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/promocoes" className={activeClass}>
                        Promoções
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/producao" className={activeClass}>
                        Produção
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/lotes" className={activeClass}>
                        Lotes
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <span className="dropbtn">Cadastros ▼</span>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/clientes" className={activeClass}>
                        Clientes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/fornecedores" className={activeClass}>
                        Fornecedores
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/funcionarios" className={activeClass}>
                        Funcionários
                      </NavLink>
                    </li>

                    <li className="separator">
                      <hr />
                    </li>

                    <li>
                      <NavLink to="/estados" className={activeClass}>
                        Estados
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/cidades" className={activeClass}>
                        Cidades
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/bairros" className={activeClass}>
                        Bairros
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/enderecos" className={activeClass}>
                        Endereços
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/emails" className={activeClass}>
                        Emails
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/telefones" className={activeClass}>
                        Telefones
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <span className="dropbtn">Vendas ▼</span>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/pedidos" className={activeClass}>
                        Pedidos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/notificacoes" className={activeClass}>
                        Notificações
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/pagamentos" className={activeClass}>
                        Pagamentos
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <span className="dropbtn">Entradas ▼</span>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/entradas" className={activeClass}>
                        Entrada
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            <AuthStatus />
          </>
        )}
      </header>

      {/* CONTEÚDO */}
      <main className="container main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produtos/*"
            element={
              <ProtectedRoute>
                <ProdutosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insumos/*"
            element={
              <ProtectedRoute>
                <InsumosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/receitas/*"
            element={
              <ProtectedRoute>
                <ReceitasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/promocoes/*"
            element={
              <ProtectedRoute>
                <PromocoesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/estados/*"
            element={
              <ProtectedRoute>
                <EstadosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cidades/*"
            element={
              <ProtectedRoute>
                <CidadesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bairros/*"
            element={
              <ProtectedRoute>
                <BairrosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/*"
            element={
              <ProtectedRoute>
                <ClientesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enderecos/*"
            element={
              <ProtectedRoute>
                <EnderecosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emails/*"
            element={
              <ProtectedRoute>
                <EmailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/telefones/*"
            element={
              <ProtectedRoute>
                <TelefonesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fornecedores/*"
            element={
              <ProtectedRoute>
                <FornecedoresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/funcionarios/*"
            element={
              <ProtectedRoute>
                <FuncionariosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos/*"
            element={
              <ProtectedRoute>
                <PedidosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notificacoes"
            element={
              <ProtectedRoute>
                <NotificacoesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/producao/*"
            element={
              <ProtectedRoute>
                <ProducaoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lotes/*"
            element={
              <ProtectedRoute>
                <LotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pagamentos/*"
            element={
              <ProtectedRoute>
                <PagamentosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notas-compras/*"
            element={
              <ProtectedRoute>
                <NotasComprasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entradas/*"
            element={
              <ProtectedRoute>
                <NotasComprasPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
