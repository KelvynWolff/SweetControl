"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagamento_entity_1 = require("./entities/pagamento.entity");
const pedido_entity_1 = require("../pedidos/entities/pedido.entity");
const pagamentos_controller_1 = require("./pagamentos.controller");
const pagamentos_service_1 = require("./pagamentos.service");
let PagamentosModule = class PagamentosModule {
};
exports.PagamentosModule = PagamentosModule;
exports.PagamentosModule = PagamentosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pagamento_entity_1.Pagamento, pedido_entity_1.Pedido])],
        controllers: [pagamentos_controller_1.PagamentosController],
        providers: [pagamentos_service_1.PagamentosService],
    })
], PagamentosModule);
//# sourceMappingURL=pagamentos.module.js.map