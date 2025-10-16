import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
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

import './App.css';
import LotesPage from './pages/lotes/LotesPage';
import PagamentosPage from './components/pagamentos/PagamentosPage';
import NotasComprasPage from './pages/notas-compras/NotasComprasPage';

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
                    <li><Link to="/lotes">Lotes</Link></li>
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
                    <li><Link to="/pagamentos">Pagamentos</Link></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <span className="dropbtn">Entradas ▼</span>
                  <ul className="submenu">
                    <li><Link to="/entradas">Entrada</Link></li>
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
          <Route path="/lotes/*" element={<ProtectedRoute><LotesPage /></ProtectedRoute>} />
          <Route path="/pagamentos/*" element={<ProtectedRoute><PagamentosPage /></ProtectedRoute>} />
          <Route path="/notas-compras/*" element={<ProtectedRoute><NotasComprasPage /></ProtectedRoute>} />
          <Route path="/entradas/*" element={<ProtectedRoute><NotasComprasPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;