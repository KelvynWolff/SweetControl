import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createNotaCompra,
  uploadNotaXml,
} from '../../services/notasComprasService';
import { getFornecedores } from '../../services/fornecedoresService';
import { getProducts } from '../../services/productService';
import { getInsumos } from '../../services/insumosService';
import { getLotes } from '../../services/lotesService';
import '../forms.css';

const LoteModal = ({ onSave, onCancel, lotesExistentes }) => {
  const [codigoLote, setCodigoLote] = useState('');
  const [loteEncontrado, setLoteEncontrado] = useState(null);
  const [dataValidade, setDataValidade] = useState('');

  const handleSearch = () => {
    const encontrado = lotesExistentes.find(
      (l) => l.codigoLote.toString() === codigoLote,
    );
    setLoteEncontrado(encontrado || false);
  };

  const handleSave = () => {
    if (!codigoLote) {
      alert('Por favor, informe um código para o lote.');
      return;
    }

    if (loteEncontrado) {
      onSave({ codigoLote, dataValidade: undefined });
    } else if (loteEncontrado === false && dataValidade) {
      onSave({ codigoLote, dataValidade });
    } else {
      alert('Busque o lote ou informe a data de validade.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h4>Buscar ou Cadastrar Lote</h4>

        <div className="form-group">
          <label>Código do Lote</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              value={codigoLote}
              onChange={(e) => setCodigoLote(e.target.value)}
              placeholder="Ex: L2025-A1"
            />
            <button
              type="button"
              className="button-primary"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>

        {loteEncontrado && (
          <p style={{ color: 'green' }}>
            Lote encontrado – validade:{' '}
            {new Date(loteEncontrado.dataValidade).toLocaleDateString()}
          </p>
        )}

        {loteEncontrado === false && (
          <div className="form-group">
            <label>Data de Validade</label>
            <input
              type="date"
              value={dataValidade}
              onChange={(e) => setDataValidade(e.target.value)}
            />
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="button-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button
            type="button"
            className="button-primary"
            onClick={handleSave}
            disabled={loteEncontrado === null && !dataValidade}
          >
            Salvar Lote
          </button>
        </div>
      </div>
    </div>
  );
};

const NotasComprasForm = () => {
  const navigate = useNavigate();

  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    chaveAcesso: '',
    idFornecedor: '',
    data: '',
    valorTotal: '',
  });

  const [itens, setItens] = useState([
    {
      tipo: 'insumo',
      itemId: '',
      quantidade: '',
      precoCompra: '',
      codigoLote: null,
      dataValidade: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([getFornecedores(), getProducts(), getInsumos(), getLotes()])
      .then(([f, p, i, l]) => {
        setFornecedores(f);
        setProdutos(p);
        setInsumos(i);
        setLotes(l);
      })
      .catch(() => alert('Erro ao carregar dados.'));
  }, []);

  const handleHeaderChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleItemChange = (index, e) => {
    const list = [...itens];
    list[index][e.target.name] = e.target.value;
    setItens(list);
  };

  const addItem = () =>
    setItens([
      ...itens,
      {
        tipo: 'insumo',
        itemId: '',
        quantidade: '',
        precoCompra: '',
        codigoLote: null,
        dataValidade: null,
      },
    ]);

  const removeItem = (index) => {
    if (itens.length > 1) {
      const list = [...itens];
      list.splice(index, 1);
      setItens(list);
    }
  };

  const handleOpenLoteModal = (index) => {
    setCurrentItemIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveLote = (loteData) => {
    const list = [...itens];
    list[currentItemIndex] = { ...list[currentItemIndex], ...loteData };
    setItens(list);
    setIsModalOpen(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const response = await uploadNotaXml(file);
      const { dadosNota, produtos: p2, insumos: i2, fornecedores: fornecedoresAtualizados } = response;

      setProdutos(p2);
      setInsumos(i2);
      setFornecedores(fornecedoresAtualizados);

      setFormData({
        chaveAcesso: dadosNota.chaveAcesso,
        idFornecedor: dadosNota.idFornecedor,
        data: dadosNota.data,
        valorTotal: dadosNota.valorTotal,
      });

      const itensXml = dadosNota.itens.map((itemXml) => {
        const insumo = i2.find(
          (x) => x.nome.toLowerCase() === itemXml.nomeProduto.toLowerCase(),
        );
        const produto = p2.find(
          (x) => x.nome.toLowerCase() === itemXml.nomeProduto.toLowerCase(),
        );

        return {
          tipo: insumo ? 'insumo' : produto ? 'produto' : 'insumo',
          itemId: insumo?.id || produto?.id || '',
          quantidade: itemXml.quantidade,
          precoCompra: itemXml.precoCompra,
          codigoLote: itemXml.codigoLote,
          dataValidade: itemXml.dataValidade || null,
        };
      });

      setItens(itensXml);
    } catch {
      alert('Erro ao processar XML.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      idFornecedor: parseInt(formData.idFornecedor, 10),
      valorTotal: parseFloat(formData.valorTotal),
      itens: itens.map((item) => ({
        quantidade: parseFloat(item.quantidade),
        precoCompra: parseFloat(item.precoCompra),
        codigoLote: item.codigoLote,
        dataValidade: item.dataValidade || undefined,
        idProduto: item.tipo === 'produto' ? parseInt(item.itemId, 10) : null,
        idInsumo: item.tipo === 'insumo' ? parseInt(item.itemId, 10) : null,
      })),
    };

    try {
      await createNotaCompra(payload);
      alert('Compra registrada!');
      navigate('/entradas');
    } catch {
      alert('Erro ao registrar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>Registrar Nova Nota de Compra</h3>

      <label htmlFor="xml-upload" className="upload-label">
        Carregar XML da NF-e
      </label>
      <input
        id="xml-upload"
        type="file"
        accept=".xml"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dados da Nota</legend>

          <input
            name="chaveAcesso"
            value={formData.chaveAcesso}
            onChange={handleHeaderChange}
            placeholder="Chave da NFe"
            required
          />

          <select
            name="idFornecedor"
            value={formData.idFornecedor}
            onChange={handleHeaderChange}
            required
          >
            <option value="">Selecione um Fornecedor</option>
            {fornecedores.map((f) => (
              <option key={f.id} value={f.id}>
                {f.pessoa.nome}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleHeaderChange}
            required
          />

          <input
            name="valorTotal"
            type="number"
            step="0.01"
            value={formData.valorTotal}
            onChange={handleHeaderChange}
            placeholder="Valor Total"
            required
          />
        </fieldset>

        <fieldset>
          <legend>Itens da Nota</legend>

          {itens.map((item, index) => (
            <div key={index} className="dynamic-field-row">
              <select
                name="tipo"
                value={item.tipo}
                onChange={(e) => handleItemChange(index, e)}
              >
                <option value="insumo">Insumo</option>
                <option value="produto">Produto</option>
              </select>

              <select
                name="itemId"
                value={item.itemId}
                onChange={(e) => handleItemChange(index, e)}
                required
              >
                <option value="">Selecione o Item</option>
                {(item.tipo === 'insumo' ? insumos : produtos).map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nome}
                  </option>
                ))}
              </select>

              <input
                name="precoCompra"
                type="number"
                step="0.01"
                value={item.precoCompra}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="Preço"
                required
              />

              <input
                name="quantidade"
                type="number"
                step="0.01"
                value={item.quantidade}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="Qtd"
                required
              />

              <button
                type="button"
                className="button-secondary"
                onClick={() => handleOpenLoteModal(index)}
              >
                {item.codigoLote
                  ? `Lote: ${item.codigoLote}`
                  : 'Adicionar Lote'}
              </button>

              {itens.length > 1 && (
                <button
                  type="button"
                  className="button-remove"
                  onClick={() => removeItem(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}

          <button type="button" className="button-secondary" onClick={addItem}>
            + Adicionar Item
          </button>
        </fieldset>

        {isModalOpen && (
          <LoteModal
            onSave={handleSaveLote}
            onCancel={() => setIsModalOpen(false)}
            lotesExistentes={lotes}
          />
        )}

        <div className="form-actions">
          <button type="submit" className="button-primary" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar Compra'}
          </button>

          <button
            type="button"
            className="button-cancel"
            onClick={() => navigate('/entradas')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotasComprasForm;
