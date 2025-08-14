import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { getProducts } from './services/productService';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setProductToEdit(product);
  };

  const clearEdit = () => {
    setProductToEdit(null);
  }
  
  return (
    <div className="App">
      <header>
        <h1>Sweet Control</h1>
      </header>
      <main>
        <ProductForm 
          onFormSubmit={fetchProducts} 
          productToEdit={productToEdit}
          clearEdit={clearEdit}
        />
        <hr />
        <ProductList 
          products={products}
          onEdit={handleEdit}
          onDelete={fetchProducts}
        />
      </main>
    </div>
  );
}

export default App;