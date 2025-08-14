// src/localizacao/localizacao.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoController } from './localizacao.controller';
import { Estado } from './entities/estado.entity';
import { Cidade } from './entities/cidade.entity';
import { Bairro } from './entities/bairro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado, Cidade, Bairro])],
  controllers: [LocalizacaoController],
  providers: [LocalizacaoService],
})
export class LocalizacaoModule {}