import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Telefone } from '../telefones/entities/telefone.entity';
import { Email } from '../emails/entities/email.entity';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Pessoa, Endereco, Telefone, Email])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}