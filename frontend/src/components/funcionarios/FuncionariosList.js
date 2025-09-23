import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getFuncionarios, deleteFuncionario } from '../../services/funcionariosService';
import '../tables.css';

const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getFuncionarios()
      .then(setFuncionarios)
      .catch(err => alert("Erro ao carregar funcionários."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o funcionário ${nome}?`)) {
      try {
        await deleteFuncionario(id);
        alert('Funcionário deletado com sucesso!');
        setFuncionarios(funcionarios.filter(f => f.id !== id));
      } catch (error) {
        alert('Erro ao deletar funcionário.');
        console.error(error);
      }
    }
  };

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando lista de funcionários...</p>;
  }

  return (
    <div className="list-container">
      <h2>
        <Link className="btn" to="/funcionarios/novo">+</Link>
        Gerenciar Funcionários
      </h2>

      <input
        type="text"
        placeholder="Buscar funcionários pelo nome..."
        className="search-input"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Data Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuncionarios.length === 0 ? (
            <tr><td colSpan="5">Nenhum funcionário encontrado.</td></tr>
          ) : (
            filteredFuncionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.pessoa.nome}</td>
                <td>{funcionario.pessoa.cpfCnpj}</td>
                <td>{new Date(funcionario.dataAdmissao).toLocaleDateString()}</td>
                <td>
                  <button className="icon-btn" onClick={() => navigate(`/funcionarios/editar/${funcionario.id}`)}>✏️</button>
                  <button className="icon-btn-delete" onClick={() => handleDelete(funcionario.id, funcionario.pessoa.nome)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FuncionariosList;