import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; 
import ProdutosPage from './pages/produtos/ProdutosPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Sweet Control</h1>
          <nav>
            <Link to="/">Dashboard</Link> | <Link to="/produtos">Gerenciar Produtos</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produtos/*" element={<ProdutosPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;