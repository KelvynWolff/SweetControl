import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getInsumos, deleteInsumo } from '../../services/insumosService';
import '../tables.css';

const InsumosList = () => {
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchInsumos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este insumo?')) {
      try {
        await deleteInsumo(id);
        alert('Insumo deletado com sucesso!');
        setInsumos(insumos.filter(i => i.id !== id));
      } catch (error) {
        alert('Erro ao deletar insumo.');
        console.error(error);
      }
    }
  };

  const handleEdit = (insumo) => {
    navigate(`/insumos/editar/${insumo.id}`);
  };

  const filteredInsumos = insumos.filter(insumo =>
    insumo.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/insumos/novo">+</Link>
        Gerenciar Insumos
      </h2>

      <input
        type="text"
        placeholder="Buscar insumos pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

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
          {filteredInsumos.length === 0 ? (
            <tr><td colSpan="5">Nenhum insumo encontrado.</td></tr>
          ) : (
            filteredInsumos.map((insumo) => (
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