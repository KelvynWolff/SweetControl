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
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const pessoas_module_1 = require("./pessoas/pessoas.module");
const produtos_module_1 = require("./produtos/produtos.module");
const insumos_module_1 = require("./insumos/insumos.module");
const receitas_module_1 = require("./receitas/receitas.module");
const promocoes_module_1 = require("./promocoes/promocoes.module");
const estados_module_1 = require("./estados/estados.module");
const cidades_module_1 = require("./cidades/cidades.module");
const bairros_module_1 = require("./bairros/bairros.module");
const clientes_module_1 = require("./clientes/clientes.module");
const enderecos_module_1 = require("./enderecos/enderecos.module");
const emails_module_1 = require("./emails/emails.module");
const telefones_module_1 = require("./telefones/telefones.module");
const funcionarios_module_1 = require("./funcionarios/funcionarios.module");
const fornecedores_module_1 = require("./fornecedores/fornecedores.module");
const pedidos_module_1 = require("./pedidos/pedidos.module");
const notificacoes_module_1 = require("./notificacoes/notificacoes.module");
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
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'alana.labadie15@ethereal.email',
                        pass: 'EXvHgDW7JBdjJtf8a9',
                    },
                },
            }),
            produtos_module_1.ProdutosModule,
            insumos_module_1.InsumosModule,
            receitas_module_1.ReceitasModule,
            promocoes_module_1.PromocoesModule,
            estados_module_1.EstadosModule,
            cidades_module_1.CidadesModule,
            bairros_module_1.BairrosModule,
            pessoas_module_1.PessoasModule,
            clientes_module_1.ClientesModule,
            enderecos_module_1.EnderecosModule,
            emails_module_1.EmailsModule,
            telefones_module_1.TelefonesModule,
            funcionarios_module_1.FuncionariosModule,
            fornecedores_module_1.FornecedoresModule,
            pedidos_module_1.PedidosModule,
            notificacoes_module_1.NotificacoesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map