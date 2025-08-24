import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receita } from './entities/receita.entity';
import { ReceitasController } from './receitas.controller';
import { ReceitasService } from './receitas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Receita])],
  controllers: [ReceitasController],
  providers: [ReceitasService],
})
export class ReceitasModule {}