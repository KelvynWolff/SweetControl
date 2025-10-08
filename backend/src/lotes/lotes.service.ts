import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Lote } from './entities/lote.entity';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { MovimentacaoEstoque, TipoMovimentacao } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';

@Injectable()
export class LotesService {
  constructor(
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
    private dataSource: DataSource,
  ) {}

  async create(createLoteDto: CreateLoteDto): Promise<Lote> {
    const { quantidadeInicial, ...loteData } = createLoteDto;
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const lote = this.loteRepository.create(loteData);
      const novoLote = await queryRunner.manager.save(lote);

      const movimentacaoRepo = queryRunner.manager.getRepository(MovimentacaoEstoque);
      const movimentacao = movimentacaoRepo.create({
        idLote: novoLote.id,
        tipo: TipoMovimentacao.ENTRADA_COMPRA,
        quantidade: quantidadeInicial,
      });
      await queryRunner.manager.save(movimentacao);

      await queryRunner.commitTransaction();
      return novoLote;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<any[]> {
    const lotes = await this.loteRepository.find({ 
        relations: ['produto', 'insumo', 'movimentacoes'] 
    });
    
    return lotes.map(lote => {
        const estoqueAtual = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
        return { ...lote, estoqueAtual };
    });
  }

  async findOne(id: number): Promise<Lote> {
    const lote = await this.loteRepository.findOne({ where: { id }, relations: ['produto'] });
    if (!lote) {
      throw new NotFoundException(`Lote com ID #${id} não encontrado.`);
    }
    return lote;
  }

  async update(id: number, updateLoteDto: UpdateLoteDto): Promise<Lote> {
    const lote = await this.loteRepository.preload({ id, ...updateLoteDto });
    if (!lote) {
      throw new NotFoundException(`Lote com ID #${id} não encontrado.`);
    }
    return this.loteRepository.save(lote);
  }

  async remove(id: number): Promise<void> {
    const result = await this.loteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lote com ID #${id} não encontrado.`);
    }
  }
}