import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNotaCompraById } from '../../services/notasComprasService';
import '../tables.css';

const NotaCompraDetalhes = () => {
    const [nota, setNota] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        getNotaCompraById(id)
            .then(setNota)
            .catch(err => alert("Erro ao carregar detalhes da nota."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Carregando detalhes...</p>;
    if (!nota) return <p>Nota de compra não encontrada.</p>;

    return (
        <div className="list-container">
            <h3>Detalhes da Nota de Compra #{nota.id}</h3>
            <div className="card">
                <h4>Dados da Nota</h4>
                <p><strong>Chave de Acesso:</strong> {nota.chaveAcesso}</p>
                <p><strong>Fornecedor:</strong> {nota.fornecedor.pessoa.nome}</p>
                <p><strong>Data:</strong> {new Date(nota.data).toLocaleDateString()}</p>
                <p><strong>Valor Total:</strong> R$ {Number(nota.valorTotal).toFixed(2)}</p>
            </div>
            <div className="card">
                <h4>Itens da Nota</h4>
                <table className="itens-table">
                    <thead>
                        <tr>
                            <th>Item (Produto/Insumo)</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nota.itens.map(item => (
                            <tr key={item.id}>
                                <td>{item.produto?.nome || item.insumo?.nome}</td>
                                <td>{item.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/entradas">Voltar para o Histórico</Link>
        </div>
    );
};

export default NotaCompraDetalhes;