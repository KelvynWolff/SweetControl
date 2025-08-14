import React from 'react';
import { deleteProduct } from '../services/productService';
import './tables.css';

const ProductList = ({ products, onEdit, onDelete }) => {

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await deleteProduct(id);
        alert('Produto deletado com sucesso!');
        onDelete();
      } catch (error) {
        alert('Erro ao deletar produto.');
      }
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Produtos</h2>
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nome}</td>
              <td>R$ {Number(product.preco).toFixed(2)}</td>
              <td>{product.estoque}</td>
              <td>R$ {Number(product.custo).toFixed(2)}</td>
              <td>
                <button className="icon-btn" onClick={() => onEdit(product)}>✏️</button>
                <button className="icon-btn-delete" onClick={() => handleDelete(product.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;