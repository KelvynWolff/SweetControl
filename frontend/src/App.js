import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
import './App.css';
import FornecedoresPage from './pages/fornecedores/FornecedoresPage';
import FuncionariosPage from './pages/funcionarios/FuncionariosPage';
import PedidosPage from './pages/pedidos/PedidosPage';
import NotificacoesPage from './pages/notificacoes/NotificacoesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Sweet Control</h1>
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>

              <li className="dropdown">
                <a href="#!" className="dropbtn">Produtos ▼</a>
                <ul className="submenu">
                  <li><Link to="/produtos">Produtos</Link></li>
                  <li><Link to="/insumos">Insumos</Link></li>
                  <li><Link to="/receitas">Receitas</Link></li>
                  <li><Link to="/promocoes">Promoções</Link></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#!" className="dropbtn">Pessoas & Cadastros ▼</a>
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
                <a href="#!" className="dropbtn">Pedidos ▼</a>
                <ul className="submenu">
                  <li><Link to="/pedidos">Pedidos</Link></li>
                  <li><Link to="/notificacoes">Notificações</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
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

const Dashboard = () => {
  return <h2>Bem-vindo ao seu Dashboard!</h2>;
}

export default App;