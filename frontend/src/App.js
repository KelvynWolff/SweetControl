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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Sweet Control</h1>
          <nav>
            <Link to="/">Dashboard</Link> | 
            <Link to="/produtos">Produtos</Link> |
            <Link to="/insumos">Insumos</Link> |
            <Link to="/receitas">Receitas</Link> |
            <Link to="/promocoes">Promoções</Link> |
            <Link to="/estados">Estados</Link> |
            <Link to="/cidades">Cidades</Link> |
            <Link to="/bairros">Bairros</Link> |
            <Link to="/enderecos">Endereços</Link> |
            <Link to="/clientes">Clientes</Link> |
            <Link to="/emails">Emails</Link> |
            <Link to="/telefones">Telefones</Link> |
            <Link to="/fornecedores">Fornecedores</Link> |
            <Link to="/funcionarios">Funcionarios</Link>
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