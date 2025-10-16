import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fornecedor } from './entities/fornecedor.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Telefone } from '../telefones/entities/telefone.entity';
import { Email } from '../emails/entities/email.entity';
import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresService } from './fornecedores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fornecedor, Pessoa, Endereco, Telefone, Email])],
  controllers: [FornecedoresController],
  providers: [FornecedoresService],
  exports: [FornecedoresService],
})
export class FornecedoresModule {}