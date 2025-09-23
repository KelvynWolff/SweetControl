import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producao } from './entities/producao.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { Receita } from '../receitas/entities/receita.entity';
import { ProducaoController } from './producao.controller';
import { ProducaoService } from './producao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producao, Produto, Insumo, Receita])],
  controllers: [ProducaoController],
  providers: [ProducaoService],
})
export class ProducaoModule {}