import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from '../../components/produtos/ProductList';
import ProductForm from '../../components/produtos/ProductForm';

function ProdutosPage() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4', borderRadius: '5px' }}>
        <Link to="/produtos" style={{ marginRight: '15px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
          📦 Lista de Produtos
        </Link>
        <Link to="/produtos/novo" style={{ textDecoration: 'none', color: '#2980b9', fontWeight: 'bold' }}>
          + Novo Produto
        </Link>
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