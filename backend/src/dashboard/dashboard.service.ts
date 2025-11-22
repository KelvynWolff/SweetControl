import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not } from 'typeorm';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async getDashboardStats() {
    const agora = new Date();

    const inicioDia = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), 0, 0, 0, 0);
    const fimDia = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), 23, 59, 59, 999);
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1, 0, 0, 0, 0);
    const fimMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0, 23, 59, 59, 999);

    const pedidosDiaBrutos = await this.pedidoRepository.find({
      where: { 
        data: Between(inicioDia, fimDia),
        status: Not('Cancelado')
      },
      relations: ['pagamentos'],
    });

    const calcularTotalPago = (p: Pedido) => {
        if (!p.pagamentos || p.pagamentos.length === 0) return 0;
        return p.pagamentos.reduce((acc, pag) => acc + Number(pag.valor), 0);
    };

    const pedidosDiaValidos = pedidosDiaBrutos.filter(p => calcularTotalPago(p) > 0);
    const totalDia = pedidosDiaValidos.reduce((acc, p) => acc + calcularTotalPago(p), 0);

    const pedidosMesBrutos = await this.pedidoRepository.find({
      where: { 
        data: Between(inicioMes, fimMes),
        status: Not('Cancelado') 
      },
      relations: ['pagamentos'],
      order: { data: 'ASC' }
    });

    const pedidosMesValidos = pedidosMesBrutos.filter(p => calcularTotalPago(p) > 0);
    const totalMes = pedidosMesValidos.reduce((acc, p) => acc + calcularTotalPago(p), 0);
    
    const ticketMedio = pedidosMesValidos.length > 0 ? totalMes / pedidosMesValidos.length : 0;

    const graficoVendas = this.agruparVendasPorDia(pedidosMesValidos);

    return {
      totalDia,
      totalMes,
      ticketMedio,
      quantidadePedidosDia: pedidosDiaValidos.length,
      graficoVendas
    };
  }

  private agruparVendasPorDia(pedidos: Pedido[]) {
    const mapa = new Map<string, number>();
    
    pedidos.forEach(p => {
        const dataObj = new Date(p.data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const chaveData = `${dia}/${mes}`;
        
        const valor = p.pagamentos ? p.pagamentos.reduce((acc, pag) => acc + Number(pag.valor), 0) : 0;
        
        if (valor > 0) {
            const valorAtual = mapa.get(chaveData) || 0;
            mapa.set(chaveData, valorAtual + valor);
        }
    });

    return Array.from(mapa, ([name, valor]) => ({ name, valor }));
  }
}