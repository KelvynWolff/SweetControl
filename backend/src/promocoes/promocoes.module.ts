import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocao } from './entities/promocao.entity';
import { PromocoesController } from './promocoes.controller';
import { PromocoesService } from './promocoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Promocao])],
  controllers: [PromocoesController],
  providers: [PromocoesService],
})
export class PromocoesModule {}