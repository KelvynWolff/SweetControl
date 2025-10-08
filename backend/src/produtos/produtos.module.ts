import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';

import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Lote, MovimentacaoEstoque])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}