import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import '../tables.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await deleteProduct(id);
        alert('Produto deletado com sucesso!');
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert('Erro ao deletar produto.');
        console.error(error);
      }
    }
  };

  const handleEdit = (product) => {
    navigate(`/produtos/editar/${product.id}`);
  };

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/produtos/novo">+</Link>
        Gerenciar Produtos
      </h2>
      
      <input
        type="text"
        placeholder="Buscar produtos pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredProducts.length === 0 ? (
            <tr><td colSpan="5">Nenhum produto encontrado.</td></tr>
          ) : (
            filteredProducts.map((product) => (
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