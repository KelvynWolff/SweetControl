import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getTelefones, deleteTelefone } from '../../services/telefonesService';
import '../tables.css';

const TelefonesList = () => {
  const [telefones, setTelefones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getTelefones()
      .then(setTelefones)
      .catch(err => alert("Erro ao carregar telefones."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja deletar o telefone #${id}?`)) {
      try {
        await deleteTelefone(id);
        alert('Telefone deletado com sucesso!');
        setTelefones(telefones.filter(t => t.id !== id));
      } catch (error) {
        alert('Erro ao deletar telefone.');
        console.error(error);
      }
    }
  };

  const filteredTelefones = telefones.filter(telefone =>
    telefone.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (telefone.pessoa && telefone.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <p>Carregando lista de telefones...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/telefones/novo">+</Link>
        Gerenciar Telefones
      </h2>

      <input
        type="text"
        placeholder="Buscar por número ou nome da pessoa..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Observação</th>
            <th>Pessoa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTelefones.length === 0 ? (
            <tr><td colSpan="5">Nenhum telefone encontrado.</td></tr>
          ) : (
            filteredTelefones.map((telefone) => (
              <tr key={telefone.id}>
                <td>{telefone.id}</td>
                <td>{telefone.numero}</td>
                <td>{telefone.observacao}</td>
                <td>{telefone.pessoa ? telefone.pessoa.nome : 'N/A'}</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/telefones/editar/${telefone.id}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(telefone.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TelefonesList;