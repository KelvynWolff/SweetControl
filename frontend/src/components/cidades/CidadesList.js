import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCidades, deleteCidade } from '../../services/cidadesService';
import '../tables.css';

const CidadesList = () => {
  const [cidades, setCidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCidades().then(setCidades).catch(err => alert("Erro ao carregar cidades."));
  }, []);

  const handleDelete = async (codigobge, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar a cidade de ${nome}?`)) {
      await deleteCidade(codigobge);
      setCidades(cidades.filter(c => c.codigobge !== codigobge));
    }
  };

  return (
    <div className="list-container">
      <h2>Gerenciar Cidades</h2>
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
          {cidades.map((cidade) => (
            <tr key={cidade.codigobge}>
              <td>{cidade.codigobge}</td>
              <td>{cidade.nome}</td>
              <td>{cidade.estadoRel.nome} ({cidade.estado})</td>
              <td>
                <button onClick={() => navigate(`/cidades/editar/${cidade.codigobge}`)}>✏️</button>
                <button onClick={() => handleDelete(cidade.codigobge, cidade.nome)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CidadesList;