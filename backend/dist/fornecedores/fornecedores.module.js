"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FornecedoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fornecedor_entity_1 = require("./entities/fornecedor.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
const endereco_entity_1 = require("../enderecos/entities/endereco.entity");
const telefone_entity_1 = require("../telefones/entities/telefone.entity");
const email_entity_1 = require("../emails/entities/email.entity");
const fornecedores_controller_1 = require("./fornecedores.controller");
const fornecedores_service_1 = require("./fornecedores.service");
let FornecedoresModule = class FornecedoresModule {
};
exports.FornecedoresModule = FornecedoresModule;
exports.FornecedoresModule = FornecedoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([fornecedor_entity_1.Fornecedor, pessoa_entity_1.Pessoa, endereco_entity_1.Endereco, telefone_entity_1.Telefone, email_entity_1.Email])],
        controllers: [fornecedores_controller_1.FornecedoresController],
        providers: [fornecedores_service_1.FornecedoresService],
    })
], FornecedoresModule);
//# sourceMappingURL=fornecedores.module.js.map