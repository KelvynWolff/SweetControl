import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCidades, deleteCidade } from '../../services/cidadesService';
import '../tables.css';

const CidadesList = () => {
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getCidades()
      .then(setCidades)
      .catch(err => alert("Erro ao carregar cidades."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (codigobge, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar a cidade de ${nome}?`)) {
      try {
          await deleteCidade(codigobge);
          alert('Cidade deletada com sucesso!');
          setCidades(cidades.filter(c => c.codigobge !== codigobge));
      } catch (error) {
          alert('Erro ao deletar cidade.');
          console.error(error);
      }
    }
  };

  const filteredCidades = cidades.filter(cidade =>
    cidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista de cidades...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/cidades/novo">+</Link>
        Gerenciar Cidades
      </h2>

      <input
        type="text"
        placeholder="Buscar cidades pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Código IBGE</th>
            <th>Nome</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCidades.length === 0 ? (
            <tr><td colSpan="4">Nenhuma cidade encontrada.</td></tr>
          ) : (
            filteredCidades.map((cidade) => (
              <tr key={cidade.codigobge}>
                <td>{cidade.codigobge}</td>
                <td>{cidade.nome}</td>
                <td>{cidade.estadoRel.nome} ({cidade.estado})</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/cidades/editar/${cidade.codigobge}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(cidade.codigobge, cidade.nome)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CidadesList;