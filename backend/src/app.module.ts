import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PessoasModule } from './pessoas/pessoas.module';
import { ProdutosModule } from './produtos/produtos.module';
import { InsumosModule } from './insumos/insumos.module';
import { ReceitasModule } from './receitas/receitas.module';
import { PromocoesModule } from './promocoes/promocoes.module';
import { EstadosModule } from './estados/estados.module';
import { CidadesModule } from './cidades/cidades.module';
import { BairrosModule } from './bairros/bairros.module';
import { ClientesModule } from './clientes/clientes.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { EmailsModule } from './emails/emails.module';
import { TelefonesModule } from './telefones/telefones.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],

        synchronize: true,
      }),
    }),
    PessoasModule,
    ProdutosModule,
    InsumosModule,
    ReceitasModule,
    PromocoesModule,
    EstadosModule,
    CidadesModule,
    BairrosModule,
    PessoasModule,
    ClientesModule,
    EnderecosModule,
    EmailsModule,
    TelefonesModule,
    FuncionariosModule,
    FornecedoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}