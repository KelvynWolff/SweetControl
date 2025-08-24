"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const pessoas_module_1 = require("./pessoas/pessoas.module");
const localizacao_module_1 = require("./localizacao/localizacao.module");
const produtos_module_1 = require("./produtos/produtos.module");
const vendas_module_1 = require("./vendas/vendas.module");
const producao_module_1 = require("./producao/producao.module");
const notificacoes_module_1 = require("./notificacoes/notificacoes.module");
const insumos_module_1 = require("./insumos/insumos.module");
const receitas_module_1 = require("./receitas/receitas.module");
const promocoes_module_1 = require("./promocoes/promocoes.module");
const estados_module_1 = require("./estados/estados.module");
const cidades_module_1 = require("./cidades/cidades.module");
const bairros_module_1 = require("./bairros/bairros.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: parseInt(configService.get('DB_PORT') || '3306', 10),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
                    synchronize: true,
                }),
            }),
            pessoas_module_1.PessoasModule,
            localizacao_module_1.LocalizacaoModule,
            produtos_module_1.ProdutosModule,
            vendas_module_1.VendasModule,
            producao_module_1.ProducaoModule,
            notificacoes_module_1.NotificacoesModule,
            insumos_module_1.InsumosModule,
            receitas_module_1.ReceitasModule,
            promocoes_module_1.PromocoesModule,
            estados_module_1.EstadosModule,
            cidades_module_1.CidadesModule,
            bairros_module_1.BairrosModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map