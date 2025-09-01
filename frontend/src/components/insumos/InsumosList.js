import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInsumos, deleteInsumo } from '../../services/insumosService';
import '../tables.css';

const InsumosList = () => {
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInsumos = async () => {
    try {
      const data = await getInsumos();
      setInsumos(data);
    } catch (error) {
      alert("Erro ao carregar insumos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsumos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este insumo?')) {
      try {
        await deleteInsumo(id);
        alert('Insumo deletado com sucesso!');
        fetchInsumos();
      } catch (error) {
        alert('Erro ao deletar insumo.');
        console.error(error);
      }
    }
  };

  const handleEdit = (insumo) => {
    navigate(`/insumos/editar/${insumo.id}`);
  };

  if (loading) {
    return <p>Carregando lista...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <a class="btn" href="/insumos/novo">+</a>
        Gerenciar Insumos
      </h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Unidade de Medida</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {insumos.length === 0 ? (
            <tr><td colSpan="5">Nenhum insumo cadastrado.</td></tr>
          ) : (
            insumos.map((insumo) => (
              <tr key={insumo.id}>
                <td>{insumo.nome}</td>
                <td>R$ {Number(insumo.valor).toFixed(2)}</td>
                <td>{insumo.unidadeMedida}</td>
                <td>{insumo.estoque}</td>
                <td>
                  <button className="icon-btn" onClick={() => handleEdit(insumo)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(insumo.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InsumosList;