import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProdutosHub.css';

export default function ProdutosHub() {
  return (
    <section className="hub">
      <h2>Área de Produtos</h2>
      <p>Escolha o que deseja gerenciar.</p>
      <div className="hub-grid">
        <NavLink to="/produtos" className="hub-card">
          📦 Lista de Produtos
        </NavLink>
        <NavLink to="/insumos" className="hub-card">
          🧺 Insumos
        </NavLink>
        <NavLink to="/receitas" className="hub-card">
          📒 Receitas
        </NavLink>
        <NavLink to="/promocoes" className="hub-card">
          📢 Promoções
        </NavLink>
      </div>
    </section>
  );
}
