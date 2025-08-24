import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReceitas, deleteReceita } from '../../services/receitasService';
import '../tables.css';

const ReceitasList = () => {
  const [groupedReceitas, setGroupedReceitas] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAndGroupReceitas = async () => {
    try {
      setLoading(true);
      const flatReceitas = await getReceitas();

      const groupedData = flatReceitas.reduce((acc, receita) => {
        const productName = receita.produto.nome;
        if (!acc[productName]) {
          acc[productName] = [];
        }
        acc[productName].push(receita);
        return acc;
      }, {});

      setGroupedReceitas(groupedData);
    } catch (error) {
      alert("Erro ao carregar receitas.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndGroupReceitas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este item da receita?')) {
      try {
        await deleteReceita(id);
        alert('Item da receita deletado com sucesso!');
        fetchAndGroupReceitas();
      } catch (error) {
        alert('Erro ao deletar item da receita.');
        console.error(error);
      }
    }
  };

  const handleEdit = (receita) => {
    navigate(`/receitas/editar/${receita.id}`);
  };

  if (loading) {
    return <p>Carregando lista de receitas...</p>;
  }

  return (
    <div className="list-container">
      <h2>Gerenciar Receitas</h2>
      {Object.keys(groupedReceitas).length === 0 ? (
        <p>Nenhuma receita cadastrada.</p>
      ) : (
        Object.keys(groupedReceitas).map((productName) => (
          <div key={productName} className="recipe-group">
            <h3>{productName}</h3>
            <table>
              <thead>
                <tr>
                  <th>Insumo</th>
                  <th>Quantidade</th>
                  <th>Unidade de Medida</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {groupedReceitas[productName].map((receita) => (
                  <tr key={receita.id}>
                    <td>{receita.insumo.nome}</td>
                    <td>{receita.qtdInsumo}</td>
                    <td>{receita.insumo.unidadeMedida}</td>
                    <td>
                      <button className="icon-btn" onClick={() => handleEdit(receita)}>✏️</button>
                      <button className="icon-btn-delete" onClick={() => handleDelete(receita.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default ReceitasList;
