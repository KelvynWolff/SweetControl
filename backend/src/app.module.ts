import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PessoasModule } from './pessoas/pessoas.module';
import { LocalizacaoModule } from './localizacao/localizacao.module';
import { ProdutosModule } from './produtos/produtos.module';
import { VendasModule } from './vendas/vendas.module';
import { ProducaoModule } from './producao/producao.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { InsumosModule } from './insumos/insumos.module';
import { ReceitasModule } from './receitas/receitas.module';
import { PromocoesModule } from './promocoes/promocoes.module';

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
    LocalizacaoModule,
    ProdutosModule,
    VendasModule,
    ProducaoModule,
    NotificacoesModule,
    InsumosModule,
    ReceitasModule,
    PromocoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}