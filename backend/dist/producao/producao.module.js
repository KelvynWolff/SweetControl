"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducaoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const producao_entity_1 = require("./entities/producao.entity");
const produto_entity_1 = require("../produtos/entities/produto.entity");
const insumo_entity_1 = require("../insumos/entities/insumo.entity");
const receita_entity_1 = require("../receitas/entities/receita.entity");
const producao_controller_1 = require("./producao.controller");
const producao_service_1 = require("./producao.service");
let ProducaoModule = class ProducaoModule {
};
exports.ProducaoModule = ProducaoModule;
exports.ProducaoModule = ProducaoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([producao_entity_1.Producao, produto_entity_1.Produto, insumo_entity_1.Insumo, receita_entity_1.Receita])],
        controllers: [producao_controller_1.ProducaoController],
        providers: [producao_service_1.ProducaoService],
    })
], ProducaoModule);
//# sourceMappingURL=producao.module.js.map