"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsumosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const insumo_entity_1 = require("./entities/insumo.entity");
const insumos_controller_1 = require("./insumos.controller");
const insumos_service_1 = require("./insumos.service");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const movimentacao_estoque_entity_1 = require("../movimentacao-estoque/entities/movimentacao-estoque.entity");
let InsumosModule = class InsumosModule {
};
exports.InsumosModule = InsumosModule;
exports.InsumosModule = InsumosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([insumo_entity_1.Insumo, lote_entity_1.Lote, movimentacao_estoque_entity_1.MovimentacaoEstoque])],
        controllers: [insumos_controller_1.InsumosController],
        providers: [insumos_service_1.InsumosService],
    })
], InsumosModule);
//# sourceMappingURL=insumos.module.js.map