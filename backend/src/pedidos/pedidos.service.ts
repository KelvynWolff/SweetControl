import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque, TipoMovimentacao } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ItemPedido } from '../itens-pedido/entities/item-pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private dataSource: DataSource,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      for (const item of createPedidoDto.itens) {
        const estoqueTotal = await this.calcularEstoqueItem(item.idProduto, 'produto', queryRunner);
        if (estoqueTotal < item.quantidade) {
          throw new UnprocessableEntityException(`Estoque insuficiente para o produto ID #${item.idProduto}.`);
        }
        await this.registrarSaidaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, TipoMovimentacao.SAIDA_VENDA);
      }

      const { pagamento, ...dadosPedido } = createPedidoDto as any;

      const pedido = this.pedidoRepository.create({ 
          ...dadosPedido, 
          data: new Date(),
          status: 'AGUARDANDO PAGAMENTO' 
      });
      
      const novoPedido = (await queryRunner.manager.save(pedido)) as unknown as Pedido;

      await queryRunner.commitTransaction();
      
      return this.findOne(novoPedido.id); 

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({ 
      relations: ['cliente', 'cliente.pessoa'], 
      order: { id: 'DESC' } 
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ 
      where: { id }, 
      relations: [
          'cliente', 
          'cliente.pessoa', 
          'cliente.pessoa.emails', 
          'itens', 
          'itens.produto', 
          'pagamentos' 
      ] 
    });
    if (!pedido) throw new NotFoundException(`Pedido com o ID #${id} não encontrado.`);
    return pedido;
  }
  
  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const pedidoRepo = queryRunner.manager.getRepository(Pedido);
        const itemPedidoRepo = queryRunner.manager.getRepository(ItemPedido);
        const pedidoExistente = await this.findOne(id);

        if (updatePedidoDto.itens) {
            for (const item of pedidoExistente.itens) {
                await this.registrarEntradaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, TipoMovimentacao.ENTRADA_DEVOLUCAO);
            }
            for (const item of updatePedidoDto.itens) {
                if(!item.idProduto || !item.quantidade) continue;
                const estoqueTotal = await this.calcularEstoqueItem(item.idProduto, 'produto', queryRunner);
                if (estoqueTotal < item.quantidade) {
                    throw new UnprocessableEntityException(`Estoque insuficiente para o item de ID #${item.idProduto}.`);
                }
                await this.registrarSaidaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, TipoMovimentacao.SAIDA_VENDA);
            }
            await itemPedidoRepo.delete({ idPedido: id });
        }

        const pedidoAtualizado = pedidoRepo.merge(pedidoExistente, updatePedidoDto);
        await queryRunner.manager.save(pedidoAtualizado);

        await queryRunner.commitTransaction();
        return this.findOne(id);
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
        const pedido = await this.pedidoRepository.findOne({ 
            where: { id }, 
            relations: ['itens', 'pagamentos']
        });

        if (!pedido) {
            throw new NotFoundException(`Pedido #${id} não encontrado.`);
        }

        for (const item of pedido.itens) {
            await this.registrarEntradaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, TipoMovimentacao.ENTRADA_DEVOLUCAO);
        }

        if (pedido.pagamentos && pedido.pagamentos.length > 0) {
            const pagamentoRepo = queryRunner.manager.getRepository('Pagamento');
            await pagamentoRepo.remove(pedido.pagamentos);
        }

        await queryRunner.manager.remove(pedido);

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
  }

  async updateStatus(id: number, status: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.preload({ id, status });
    if (!pedido) {
        throw new NotFoundException(`Pedido com o ID #${id} não encontrado.`);
    }
    await this.pedidoRepository.save(pedido);
    return this.findOne(id);
  }
  
  private async registrarSaidaEstoque(itemId: number, tipoItem: 'produto' | 'insumo', quantidadeTotalSaida: number, queryRunner: QueryRunner, tipoMovimentacao: TipoMovimentacao) {
    const loteRepo = queryRunner.manager.getRepository(Lote);
    const movEstoqueRepo = queryRunner.manager.getRepository(MovimentacaoEstoque);
    const whereCondition = tipoItem === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };

    const lotes = await loteRepo.find({ where: whereCondition, relations: ['movimentacoes'], order: { dataValidade: 'ASC' } });

    let quantidadeRestante = quantidadeTotalSaida;
    for (const lote of lotes) {
      if (quantidadeRestante <= 0) break;
      const estoqueLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
      if (estoqueLote > 0) {
        const quantidadeASerRetirada = Math.min(estoqueLote, quantidadeRestante);
        const movimentacao = movEstoqueRepo.create({ idLote: lote.id, tipo: tipoMovimentacao, quantidade: -quantidadeASerRetirada });
        await queryRunner.manager.save(movimentacao);
        quantidadeRestante -= quantidadeASerRetirada;
      }
    }
  }

  private async registrarEntradaEstoque(itemId: number, tipoItem: 'produto' | 'insumo', quantidadeTotalEntrada: number, queryRunner: QueryRunner, tipoMovimentacao: TipoMovimentacao) {
    const loteRepo = queryRunner.manager.getRepository(Lote);
    const movEstoqueRepo = queryRunner.manager.getRepository(MovimentacaoEstoque);
    const whereCondition = tipoItem === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };

    const loteMaisRecente = await loteRepo.findOne({ where: whereCondition, order: { dataValidade: 'DESC' } });
    if (!loteMaisRecente) throw new NotFoundException(`Nenhum lote encontrado para o item #${itemId} para reverter o estoque.`);
    
    const movimentacao = movEstoqueRepo.create({ idLote: loteMaisRecente.id, tipo: tipoMovimentacao, quantidade: quantidadeTotalEntrada });
    await queryRunner.manager.save(movimentacao);
  }
  
  private async calcularEstoqueItem(itemId: number, tipo: 'produto' | 'insumo', queryRunner: QueryRunner): Promise<number> {
    const loteRepo = queryRunner.manager.getRepository(Lote);
    const whereCondition = tipo === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };
    const lotes = await loteRepo.find({ where: whereCondition, relations: ['movimentacoes'] });
    return lotes.reduce((total, lote) => total + lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0), 0);
  }
}