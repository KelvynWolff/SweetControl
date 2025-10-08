"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasComprasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notas_compras_entity_1 = require("./entities/notas-compras.entity");
const itens_notas_compras_entity_1 = require("../itens-notas-compras/entities/itens-notas-compras.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const movimentacao_estoque_entity_1 = require("../movimentacao-estoque/entities/movimentacao-estoque.entity");
const notas_compras_controller_1 = require("./notas-compras.controller");
const notas_compras_service_1 = require("./notas-compras.service");
let NotasComprasModule = class NotasComprasModule {
};
exports.NotasComprasModule = NotasComprasModule;
exports.NotasComprasModule = NotasComprasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([notas_compras_entity_1.NotasCompras, itens_notas_compras_entity_1.ItensNotasCompras, lote_entity_1.Lote, movimentacao_estoque_entity_1.MovimentacaoEstoque])],
        controllers: [notas_compras_controller_1.NotasComprasController],
        providers: [notas_compras_service_1.NotasComprasService],
    })
], NotasComprasModule);
//# sourceMappingURL=notas-compras.module.js.map