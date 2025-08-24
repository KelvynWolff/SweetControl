import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cidade } from './entities/cidade.entity';
import { CidadesController } from './cidades.controller';
import { CidadesService } from './cidades.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade])],
  controllers: [CidadesController],
  providers: [CidadesService],
})
export class CidadesModule {}