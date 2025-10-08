import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from './entities/lote.entity';
import { LotesController } from './lotes.controller';
import { LotesService } from './lotes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lote])],
  controllers: [LotesController],
  providers: [LotesService],
})
export class LotesModule {}