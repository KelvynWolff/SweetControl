import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { EnderecosController } from './enderecos.controller';
import { EnderecosService } from './enderecos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco])],
  controllers: [EnderecosController],
  providers: [EnderecosService],
})
export class EnderecosModule {}