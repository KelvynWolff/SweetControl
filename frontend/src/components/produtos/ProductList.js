import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import '../tables.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      alert("Erro ao carregar produtos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await deleteProduct(id);
        alert('Produto deletado com sucesso!');
        fetchProducts();
      } catch (error) {
        alert('Erro ao deletar produto.');
        console.error(error);
      }
    }
  };

  const handleEdit = (product) => {
    navigate(`/produtos/editar/${product.id}`);
  };

  if (loading) {
    return <p>Carregando lista...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <a class="btn" href="/produtos/novo">+</a>
        Gerenciar Produtos
      </h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Custo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="5">Nenhum produto cadastrado.</td></tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.nome}</td>
                <td>R$ {Number(product.preco).toFixed(2)}</td>
                <td>{product.estoque}</td>
                <td>R$ {Number(product.custo).toFixed(2)}</td>
                <td>
                  <button className="icon-btn" onClick={() => handleEdit(product)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(product.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;