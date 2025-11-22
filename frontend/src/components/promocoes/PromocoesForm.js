import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPromocao, getPromocaoById, updatePromocao } from '../../services/promocoesService';
import { getProducts } from '../../services/productService';
import '../forms.css';

const PromocoesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    tipoDeDesconto: 'Percentual',
    valor: '',
    dataInicio: '',
    dataFim: '',
    idProduto: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts().then(setProdutos).catch(err => console.error("Erro ao carregar produtos"));

    if (isEditing) {
      setIsLoading(true);
      getPromocaoById(id)
        .then((data) => {
            const formatData = (dateStr) => dateStr ? new Date(dateStr).toISOString().split('T')[0] : '';
            
            setFormData({
                nome: data.nome,
                tipoDeDesconto: data.tipoDeDesconto,
                valor: data.valor,
                idProduto: data.idProduto,
                dataInicio: formatData(data.dataInicio),
                dataFim: formatData(data.dataFim),
            });
        })
        .catch(() => {
          alert('Promoção não encontrada.');
          navigate('/promocoes');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
        ...formData,
        idProduto: formData.idProduto ? parseInt(formData.idProduto) : null,
        valor: parseFloat(formData.valor),
    };

    try {
      if (isEditing) {
        await updatePromocao(id, payload);
        alert('Promoção atualizada com sucesso!');
      } else {
        await createPromocao(payload);
        alert('Promoção criada com sucesso!');
      }
      navigate('/promocoes');
    } catch (error) {
      const msg = error.response?.data?.message || 'Erro ao salvar promoção.';
      alert(`Erro: ${Array.isArray(msg) ? msg.join(', ') : msg}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Promoção' : 'Nova Promoção'}</h3>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
            <label>Nome da Promoção</label>
            <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Ex: Oferta de Natal" required />
        </div>

        <div className="form-group">
            <label>Produto Alvo</label>
            <select name="idProduto" value={formData.idProduto} onChange={handleChange}>
              <option value="">-- Promoção Geral (Todos os Produtos) --</option>
              {produtos.map(p => (
                  <option key={p.id} value={p.id}>{p.nome} ...</option>
              ))}
          </select>
        </div>

        <div className="form-grid">
            <div className="form-group">
                <label>Tipo de Desconto</label>
                <select name="tipoDeDesconto" value={formData.tipoDeDesconto} onChange={handleChange}>
                    <option value="Percentual">Percentual (%)</option>
                    <option value="Valor Fixo">Valor Fixo (R$)</option>
                </select>
            </div>

            <div className="form-group">
                <label>Valor do Desconto</label>
                <input type="number" step="0.01" name="valor" value={formData.valor} onChange={handleChange} required />
            </div>
        </div>

        <div className="form-grid">
            <div className="form-group">
                <label>Data Início</label>
                <input type="date" name="dataInicio" value={formData.dataInicio} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Data Fim</label>
                <input type="date" name="dataFim" value={formData.dataFim} onChange={handleChange} required />
            </div>
        </div>

        <div className="form-actions">
          <button type="submit" className='button-confirm' disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</button>
          <button type="button" className="button-cancel" onClick={() => navigate('/promocoes')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default PromocoesForm;