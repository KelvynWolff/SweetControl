import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getEstados, deleteEstado } from '../../services/estadosService';
import '../tables.css';

const EstadosList = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
        console.error(error);
      }
    }
  };

  const handleEdit = (estado) => {
    navigate(`/estados/editar/${estado.sigla}`);
  };

  const filteredEstados = estados.filter(estado =>
    estado.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/estados/novo">+</Link>
        Gerenciar Estados
      </h2>

      <input
        type="text"
        placeholder="Buscar estados pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Sigla</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredEstados.length === 0 ? (
            <tr><td colSpan="3">Nenhum estado encontrado.</td></tr>
          ) : (
            filteredEstados.map((estado) => (
              <tr key={estado.sigla}>
                <td>{estado.sigla}</td>
                <td>{estado.nome}</td>
                <td>
                  <button className="icon-btn" onClick={() => handleEdit(estado)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(estado.sigla)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EstadosList;