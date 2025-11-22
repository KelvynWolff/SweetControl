import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from '../../components/produtos/ProductList';
import ProductForm from '../../components/produtos/ProductForm';

function ProdutosPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        
        <Route path="novo" element={<ProductForm />} />
        <Route path="editar/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default ProdutosPage;