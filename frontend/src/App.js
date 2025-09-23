import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ProdutosHub from './pages/produtos/ProdutosHub';
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
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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

export default App;
