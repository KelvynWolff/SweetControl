import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstados, deleteEstado } from '../../services/estadosService';
import '../tables.css';

const EstadosList = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const data = await getEstados();
        setEstados(data);
      } catch (error) {
        alert("Erro ao carregar estados.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstados();
  }, []);

  const handleDelete = async (sigla) => {
    if (window.confirm(`Tem certeza que deseja deletar o estado ${sigla}?`)) {
      try {
        await deleteEstado(sigla);
        alert('Estado deletado com sucesso!');
        setEstados(estados.filter(e => e.sigla !== sigla));
      } catch (error) {
        alert('Erro ao deletar estado.');
      }
    }
  };

  const handleEdit = (estado) => {
    navigate(`/estados/editar/${estado.sigla}`);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="list-container">
      <h2>Gerenciar Estados</h2>
      <table>
        <thead>
          <tr>
            <th>Sigla</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((estado) => (
            <tr key={estado.sigla}>
              <td>{estado.sigla}</td>
              <td>{estado.nome}</td>
              <td>
                <button onClick={() => handleEdit(estado)}>✏️</button>
                <button onClick={() => handleDelete(estado.sigla)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstadosList;