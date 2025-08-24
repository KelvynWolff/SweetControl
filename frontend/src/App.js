import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProdutosPage from './pages/produtos/ProdutosPage';
import InsumosPage from './pages/insumos/InsumosPage';
import ReceitasPage from './pages/receitas/ReceitasPage';
import PromocoesPage from './pages/promocoes/PromocoesPage';
import './App.css';

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
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produtos/*" element={<ProdutosPage />} />
            <Route path="/insumos/*" element={<InsumosPage />} />
            <Route path="/receitas/*" element={<ReceitasPage />} />
            <Route path="/promocoes/*" element={<PromocoesPage />} />
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