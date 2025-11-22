import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/dashboardService';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import './dashboard.css'; 

const Dashboard = () => {
  const [stats, setStats] = useState({ 
      totalDia: 0, 
      totalMes: 0, 
      ticketMedio: 0, 
      quantidadePedidosDia: 0, 
      graficoVendas: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
        .then(data => {
            setStats(data || { totalDia: 0, totalMes: 0, ticketMedio: 0, graficoVendas: [] });
        })
        .catch(err => console.error("Erro dashboard", err))
        .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (value) => `R$ ${Number(value).toFixed(2)}`;

  if (loading) return <div className="dashboard-container"><p>Carregando...</p></div>;

  return (
    <div className="dashboard-container">
      <h2>Visão Geral do Negócio</h2>
      
      <div className="kpi-grid">
        <div className="kpi-card blue">
            <h3>Vendas de Hoje</h3>
            <p className="kpi-value">{formatCurrency(stats.totalDia)}</p>
            <span className="kpi-sub">{stats.quantidadePedidosDia} pedido(s) realizados</span>
        </div>
        
        <div className="kpi-card green">
            <h3>Vendas do Mês</h3>
            <p className="kpi-value">{formatCurrency(stats.totalMes)}</p>
            <span className="kpi-sub">Faturamento acumulado</span>
        </div>

        <div className="kpi-card purple">
            <h3>Ticket Médio</h3>
            <p className="kpi-value">{formatCurrency(stats.ticketMedio)}</p>
            <span className="kpi-sub">Média por pedido</span>
        </div>
      </div>

      <div className="chart-section">
        <h3>Evolução Diária (Mês Atual)</h3>
        <div style={{ width: '100%', height: 350, marginTop: '20px' }}>
            {stats.graficoVendas.length > 0 ? (
                <ResponsiveContainer>
                    <AreaChart data={stats.graficoVendas} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            tick={{fontSize: 12}} 
                            tickLine={false}
                        />
                        <YAxis 
                            tickFormatter={(val) => `R$${val}`} 
                            tick={{fontSize: 12}} 
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip 
                            formatter={(value) => [formatCurrency(value), "Vendas"]}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="valor" 
                            stroke="#8884d8" 
                            fillOpacity={1} 
                            fill="url(#colorVendas)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <p style={{textAlign: 'center', color: '#999', marginTop: '50px'}}>
                    Nenhuma venda registrada neste mês.
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;