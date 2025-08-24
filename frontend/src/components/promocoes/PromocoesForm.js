import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPromocaoById, updatePromocao, createPromocao } from '../../services/promocoesService';
import { getProducts } from '../../services/productService';
import '../forms.css';

const PromocoesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const initialFormState = {
    nome: '',
    tipoDeDesconto: 'Percentual',
    valor: 0,
    dataInicio: '',
    dataFim: '',
    idProduto: '',
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const produtosData = await getProducts();
        setProdutos(produtosData);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        alert("Não foi possível carregar a lista de produtos.");
      }
    };
    fetchDependencies();

    if (isEditing) {
      setIsLoading(true);
      getPromocaoById(id)
        .then(data => setFormData({
          nome: data.nome,
          tipoDeDesconto: data.tipoDeDesconto,
          valor: data.valor,
          dataInicio: data.dataInicio.substring(0, 10),
          dataFim: data.dataFim.substring(0, 10),
          idProduto: data.idProduto || '',
        }))
        .catch(err => {
          console.error("Erro ao buscar promoção para edição:", err);
          alert("Promoção não encontrada.");
          navigate('/promocoes');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        idProduto: formData.idProduto || null,
      };

      if (isEditing) {
        await updatePromocao(id, payload);
        alert('Promoção atualizada com sucesso!');
      } else {
        await createPromocao(payload);
        alert('Promoção criada com sucesso!');
      }
      navigate('/promocoes');
    } catch (error) {
      console.error("Erro ao salvar:", error.response?.data || error);
      alert('Erro ao salvar promoção.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) return <p>Carregando dados da promoção...</p>;

  return (
    <div className="form-container">
      <h3>{isEditing ? 'Editar Promoção' : 'Cadastrar Nova Promoção'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome da Promoção" required />
        <select name="tipoDeDesconto" value={formData.tipoDeDesconto} onChange={handleChange} required>
          <option value="Percentual">Percentual</option>
          <option value="Valor Fixo">Valor Fixo</option>
        </select>
        <input name="valor" type="number" step="0.01" value={formData.valor} onChange={handleChange} placeholder="Valor do Desconto" required />
        <label htmlFor="dataInicio">Válido de:</label>
        <input type="date" id="dataInicio" name="dataInicio" value={formData.dataInicio} onChange={handleChange} required />
        <label htmlFor="dataFim">Até:</label>
        <input type="date" id="dataFim" name="dataFim" value={formData.dataFim} onChange={handleChange} required />
        <label>Produto Aplicável (Opcional):</label>
        <select name="idProduto" value={formData.idProduto} onChange={handleChange}>
          <option value="">Selecione um Produto</option>
          {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        
        <button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</button>
        <button type="button" onClick={() => navigate('/promocoes')} style={{marginLeft: '10px', backgroundColor: '#6c757d'}}>Cancelar</button>
      </form>
    </div>
  );
};

export default PromocoesForm;