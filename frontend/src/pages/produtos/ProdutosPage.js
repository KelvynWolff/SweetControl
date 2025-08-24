import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import ProductList from '../../components/produtos/ProductList';
import ProductForm from '../../components/produtos/ProductForm';

function ProdutosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4' }}>
        <Link to="/produtos">Ver Produtos</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/produtos/novo">Cadastrar Novo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        
        <Route path="novo" element={<ProductForm />} />

        <Route path="editar/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default ProdutosPage;