import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Producao } from './entities/producao.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { Receita } from '../receitas/entities/receita.entity';
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
      const produtoRepo = queryRunner.manager.getRepository(Produto);
      const insumoRepo = queryRunner.manager.getRepository(Insumo);
      const receitaRepo = queryRunner.manager.getRepository(Receita);

      const produto = await produtoRepo.findOneBy({ id: createProducaoDto.idProduto });
      if (!produto) {
        throw new NotFoundException(`Produto com ID #${createProducaoDto.idProduto} não encontrado.`);
      }

      const receitaItens = await receitaRepo.find({ where: { idProduto: produto.id } });
      if (receitaItens.length === 0) {
        throw new UnprocessableEntityException(`O produto "${produto.nome}" não possui uma receita cadastrada.`);
      }

      for (const item of receitaItens) {
        const insumo = await insumoRepo.findOneBy({ id: item.idInsumo });
        const quantidadeNecessaria = item.qtdInsumo * createProducaoDto.quantidade;
        
        if (!insumo || insumo.estoque < quantidadeNecessaria) {
          throw new UnprocessableEntityException(`Estoque insuficiente para o insumo "${insumo?.nome || 'desconhecido'}".`);
        }
        insumo.estoque -= quantidadeNecessaria;
        await queryRunner.manager.save(insumo);
      }
      
      produto.estoque += createProducaoDto.quantidade;
      await queryRunner.manager.save(produto);

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
}