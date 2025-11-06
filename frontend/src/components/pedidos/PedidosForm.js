import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createPedido,
  getPedidoById,
  updatePedido,
} from '../../services/pedidosService';
import { getClientes } from '../../services/clientesService';
import { getProducts } from '../../services/productService';
import { getPromocoesAtivas } from '../../services/promocoesService';
import '../forms.css';

const PedidosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [promocoes, setPromocoes] = useState([]);

  const [selectedCliente, setSelectedCliente] = useState('');
  const [itens, setItens] = useState([
    {
      idProduto: '',
      quantidade: 1,
      precoUnitario: 0,
      descontoPercentual: 0,
      precoFinal: 0,
      descontoMsg: '',
    },
  ]);
  const [pagamento, setPagamento] = useState({ formaPagamento: 'PIX' });
  const [observacao, setObservacao] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [isLoading, setIsLoading] = useState(false);

  // ===== Helpers
  const formatBRL = (n) =>
    (Number(n) || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const totalPedido = useMemo(
    () =>
      itens.reduce(
        (acc, item) => acc + Number(item.precoFinal) * Number(item.quantidade),
        0,
      ),
    [itens],
  );

  // Load
  useEffect(() => {
    setIsLoading(true);
    Promise.all([getClientes(), getProducts(), getPromocoesAtivas()])
      .then(([clientesData, produtosData, promocoesData]) => {
        setClientes(clientesData);
        setProdutos(produtosData);
        setPromocoes(promocoesData);

        if (isEditing) {
          getPedidoById(id)
            .then((data) => {
              setSelectedCliente(data.idCliente);
              setDataEntrega(
                new Date(data.dataEntrega).toISOString().split('T')[0],
              );
              setObservacao(data.observacao || '');
              setStatus(data.status);
              setPagamento(data.pagamento || { formaPagamento: 'PIX' });

              if (data.itens && data.itens.length > 0) {
                const itensDoPedido = data.itens.map((item) => {
                  const produto = produtosData.find(
                    (p) => p.id === item.idProduto,
                  );
                  const precoOriginal = produto ? produto.preco : item.preco;
                  const descontoEmValor = precoOriginal - item.preco;
                  const descontoPercentual =
                    precoOriginal > 0
                      ? (descontoEmValor / precoOriginal) * 100
                      : 0;

                  return {
                    idProduto: item.idProduto,
                    quantidade: item.quantidade,
                    precoUnitario: precoOriginal,
                    descontoPercentual: descontoPercentual,
                    precoFinal: item.preco,
                    descontoMsg:
                      descontoPercentual > 0
                        ? 'Promoção/Desconto aplicado'
                        : '',
                  };
                });
                setItens(itensDoPedido);
              }
            })
            .catch(() => {
              alert('Pedido não encontrado.');
              navigate('/pedidos');
            });
        }
      })
      .catch(() =>
        alert('Erro ao carregar dados necessários para o formulário.'),
      )
      .finally(() => setIsLoading(false));
  }, [id, isEditing, navigate]);

  // Item handlers
  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...itens];
    const item = list[index];
    item[name] = value;

    const produtoSelecionado = produtos.find(
      (p) => p.id === parseInt(item.idProduto),
    );

    if (produtoSelecionado) {
      if (name === 'idProduto') {
        item.precoUnitario = produtoSelecionado.preco;
        item.descontoPercentual = 0;

        const promocao = promocoes.find(
          (p) => p.idProduto === produtoSelecionado.id,
        );
        if (promocao) {
          if (promocao.tipoDeDesconto === 'Percentual') {
            item.descontoPercentual = promocao.valor;
          } else if (promocao.tipoDeDesconto === 'Valor Fixo') {
            item.descontoPercentual =
              (promocao.valor / produtoSelecionado.preco) * 100;
          }
          item.descontoMsg = `Promoção: ${promocao.nome}`;
        } else {
          item.descontoMsg = '';
        }
      }
      const desconto = item.precoUnitario * (item.descontoPercentual / 100);
      item.precoFinal = item.precoUnitario - desconto;
      if (item.precoFinal < 0) item.precoFinal = 0;
    }
    setItens(list);
  };

  const addItem = () => {
    setItens([
      ...itens,
      {
        idProduto: '',
        quantidade: 1,
        precoUnitario: 0,
        descontoPercentual: 0,
        precoFinal: 0,
        descontoMsg: '',
      },
    ]);
  };

  const removeItem = (index) => {
    if (itens.length <= 1) return;
    const list = [...itens];
    list.splice(index, 1);
    setItens(list);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const itensValidos = itens
      .filter((item) => item.idProduto && Number(item.quantidade) > 0)
      .map((item) => ({
        idProduto: parseInt(item.idProduto),
        quantidade: parseFloat(item.quantidade),
        preco: parseFloat(item.precoFinal),
        desconto: parseFloat(item.precoUnitario) - parseFloat(item.precoFinal),
      }));

    if (itensValidos.length === 0) {
      alert('Adicione pelo menos um item válido ao pedido.');
      setIsLoading(false);
      return;
    }

    const payload = {
      idCliente: parseInt(selectedCliente),
      status,
      dataEntrega,
      observacao,
      itens: itensValidos,
      pagamento: { ...pagamento, valor: totalPedido },
    };

    try {
      if (isEditing) {
        await updatePedido(id, payload);
        alert('Pedido atualizado com sucesso!');
      } else {
        await createPedido(payload);
        alert('Pedido criado com sucesso!');
      }
      navigate('/pedidos');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao salvar o pedido.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isEditing) {
    return <p>Carregando...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-card"
      style={{ display: 'grid', gap: 16 }}
    >
      <h2 style={{ marginTop: 0 }}>
        {isEditing ? `Editar Pedido #${id}` : 'Novo Pedido'}
      </h2>
      /* DADOS PRINCIPAIS */
      <div className="form-grid">
        <div className="form-group">
          <label className="label required" htmlFor="cliente">
            Cliente
          </label>
          <select
            id="cliente"
            className="select"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
            required
            disabled={isEditing}
          >
            <option value="">Selecione um Cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.pessoa?.nome ?? c.nome}
              </option>
            ))}
          </select>
          <span className="help">Obrigatório para emissão do pedido.</span>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="dataEntrega">
            Data de Entrega
          </label>
          <input
            id="dataEntrega"
            type="date"
            className="input"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="formaPagamento">
            Forma de Pagamento
          </label>
          <select
            id="formaPagamento"
            className="select"
            value={pagamento.formaPagamento}
            onChange={(e) =>
              setPagamento({ ...pagamento, formaPagamento: e.target.value })
            }
          >
            <option value="PIX">PIX</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão Débito">Cartão Débito</option>
          </select>
        </div>

        {isEditing && (
          <div className="form-group">
            <label className="label">Status do Pedido</label>
            <select
              className="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pendente</option>
              <option>Em Produção</option>
              <option>Pronto</option>
              <option>Entregue</option>
              <option>Cancelado</option>
            </select>
          </div>
        )}
      </div>
      /* ITENS DO PEDIDO */
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div className="form-section-title">Itens do Pedido</div>
        /* Linha de edição */
        <div className="form-grid">
          <div className="form-group">
            <label className="label required">Produto</label>
            <select
              className="select"
              name="idProduto"
              value={itens[0]?.idProduto ?? ''}
              onChange={(e) => handleItemChange(0, e)}
              required
            >
              <option value="">Selecione…</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
            {itens[0]?.descontoMsg && (
              <span className="help">{itens[0].descontoMsg}</span>
            )}
          </div>

          <div className="form-group">
            <label className="label required">Qtd</label>
            <input
              className="input"
              name="quantidade"
              type="number"
              min="1"
              value={itens[0]?.quantidade ?? 1}
              onChange={(e) => handleItemChange(0, e)}
            />
          </div>

          <div className="form-group">
            <label className="label">Preço Unit.</label>
            <input
              className="input"
              name="precoUnitario"
              type="number"
              step="0.01"
              min="0"
              value={itens[0]?.precoUnitario ?? 0}
              onChange={(e) => handleItemChange(0, e)}
            />
          </div>

          <div className="form-group">
            <label className="label">Desconto (%)</label>
            <input
              className="input"
              name="descontoPercentual"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={itens[0]?.descontoPercentual ?? 0}
              onChange={(e) => handleItemChange(0, e)}
            />
          </div>

          <div className="form-group">
            <label className="label">Final</label>
            <input
              className="input"
              disabled
              value={formatBRL(
                itens[0]
                  ? (Number(itens[0].quantidade) || 0) *
                      (Number(itens[0].precoUnitario) || 0) *
                      (1 -
                        Math.min(
                          Math.max(Number(itens[0].descontoPercentual) || 0, 0),
                          100,
                        ) /
                          100)
                  : 0,
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" className="btn btn-primary" onClick={addItem}>
            + Adicionar Item
          </button>
        </div>
        /* Tabela de itens */
        <div className="list-container" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 56 }}>Qtd</th>
                <th>Produto</th>
                <th style={{ width: 140 }}>Unitário</th>
                <th style={{ width: 120 }}>Desc. (%)</th>
                <th style={{ width: 160 }}>Subtotal</th>
                <th style={{ width: 80, textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ color: 'var(--muted)' }}>
                    Nenhum item adicionado.
                  </td>
                </tr>
              ) : (
                itens.map((item, index) => {
                  const subtotal =
                    (Number(item.precoFinal) || 0) *
                    (Number(item.quantidade) || 0);
                  const produtoNome =
                    produtos.find((p) => p.id === parseInt(item.idProduto))
                      ?.nome || 'Produto';

                  return (
                    <tr key={`${item.idProduto}-${index}`}>
                      <td>{item.quantidade}</td>
                      <td>{produtoNome}</td>
                      <td>{formatBRL(item.precoUnitario)}</td>
                      <td>
                        {Number(item.descontoPercentual || 0).toFixed(2)}%
                      </td>
                      <td>{formatBRL(subtotal)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="icon-btn-delete"
                          title="Remover"
                          onClick={() => removeItem(index)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      /* OBS + TOTAL + AÇÕES */
      <div className="form-grid">
        <div className="form-group">
          <label className="label" htmlFor="observacao">
            Observações
          </label>
          <textarea
            id="observacao"
            className="textarea"
            rows={3}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Observações adicionais..."
          />
        </div>

        <div
          className="card"
          style={{ display: 'grid', gap: 12, alignContent: 'space-between' }}
        >
          <div>
            <div className="label" style={{ marginBottom: 8 }}>
              Total do Pedido
            </div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>
              {formatBRL(totalPedido)}
            </div>
          </div>

          <div className="actions" style={{ marginTop: 8 }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Pedido'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => navigate('/pedidos')}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PedidosForm;
