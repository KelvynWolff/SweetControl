import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path'; // <--- ADICIONE ESTA IMPORTAÇÃO

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importação de todos os nossos módulos de funcionalidades
import { PessoasModule } from './pessoas/pessoas.module';
import { LocalizacaoModule } from './localizacao/localizacao.module';
import { ProdutosModule } from './produtos/produtos.module';
import { VendasModule } from './vendas/vendas.module';
import { ProducaoModule } from './producao/producao.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';

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
        
        // ✨ CORREÇÃO APLICADA AQUI ✨
        // Este padrão é mais seguro e funciona tanto em dev quanto em prod (Docker)
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],

        synchronize: true,
      }),
    }),
    PessoasModule,
    LocalizacaoModule,
    ProdutosModule,
    VendasModule,
    ProducaoModule,
    NotificacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}