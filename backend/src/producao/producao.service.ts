import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { Producao } from './entities/producao.entity';
import { Receita } from '../receitas/entities/receita.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque, TipoMovimentacao } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';
import { CreateProducaoDto } from './dto/create-producao.dto';

@Injectable()
export class ProducaoService {
  constructor(
    @InjectRepository(Producao)
    private readonly producaoRepository: Repository<Producao>,
    private dataSource: DataSource,
  ) {}

  async create(createProducaoDto: CreateProducaoDto): Promise<Producao> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const receitaRepo = queryRunner.manager.getRepository(Receita);
      const loteRepo = queryRunner.manager.getRepository(Lote);
      const movEstoqueRepo = queryRunner.manager.getRepository(MovimentacaoEstoque);

      const receitaItens = await receitaRepo.find({ where: { idProduto: createProducaoDto.idProduto }, relations: ['insumo'] });
      if (receitaItens.length === 0) {
        throw new UnprocessableEntityException(`Produto não possui receita.`);
      }

      for (const item of receitaItens) {
        const quantidadeNecessaria = item.qtdInsumo * createProducaoDto.quantidade;
        const estoqueInsumo = await this.calcularEstoqueItem(item.idInsumo, 'insumo', queryRunner);
        if (estoqueInsumo < quantidadeNecessaria) {
          throw new UnprocessableEntityException(`Estoque insuficiente para o insumo "${item.insumo.nome}".`);
        }
        await this.registrarSaidaEstoque(item.idInsumo, 'insumo', quantidadeNecessaria, queryRunner, TipoMovimentacao.SAIDA_PRODUCAO);
      }
      
      const novoLoteProduto = loteRepo.create({
        idProduto: createProducaoDto.idProduto,
        codigoLote: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 100),
        dataValidade: createProducaoDto.dataValidade,
      });
      const loteSalvo = await queryRunner.manager.save(novoLoteProduto);

      const movimentacaoEntrada = movEstoqueRepo.create({
        idLote: loteSalvo.id,
        tipo: TipoMovimentacao.ENTRADA_PRODUCAO,
        quantidade: createProducaoDto.quantidade,
      });
      await queryRunner.manager.save(movimentacaoEntrada);

      const producao = this.producaoRepository.create(createProducaoDto);
      const novaProducao = await queryRunner.manager.save(producao);
      
      await queryRunner.commitTransaction();
      return novaProducao;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Producao[]> {
    return this.producaoRepository.find({ relations: ['produto'], order: { data: 'DESC' } });
  }

  private async calcularEstoqueItem(itemId: number, tipo: 'produto' | 'insumo', queryRunner: QueryRunner): Promise<number> {
    const loteRepo = queryRunner.manager.getRepository(Lote);
    const whereCondition = tipo === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };
    const lotes = await loteRepo.find({ where: whereCondition, relations: ['movimentacoes'] });
    return lotes.reduce((total, lote) => {
        const saldoLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
        return total + saldoLote;
    }, 0);
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
}