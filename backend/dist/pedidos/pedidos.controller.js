"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosController = void 0;
const common_1 = require("@nestjs/common");
const pedidos_service_1 = require("./pedidos.service");
const create_pedido_dto_1 = require("./dto/create-pedido.dto");
const update_pedido_dto_1 = require("./dto/update-pedido.dto");
const notificacoes_service_1 = require("../notificacoes/notificacoes.service");
let PedidosController = class PedidosController {
    pedidosService;
    notificacoesService;
    constructor(pedidosService, notificacoesService) {
        this.pedidosService = pedidosService;
        this.notificacoesService = notificacoesService;
    }
    create(createPedidoDto) {
        return this.pedidosService.create(createPedidoDto);
    }
    findAll() {
        return this.pedidosService.findAll();
    }
    findOne(id) {
        return this.pedidosService.findOne(id);
    }
    updateStatus(id, updatePedidoDto) {
        if (!updatePedidoDto.status) {
            throw new common_1.BadRequestException('O campo status é obrigatório para esta operação.');
        }
        return this.pedidosService.updateStatus(id, updatePedidoDto.status);
    }
    remove(id) {
        return this.pedidosService.remove(id);
    }
    async enviarEmailConfirmacao(id) {
        const pedido = await this.pedidosService.findOne(id);
        await this.notificacoesService.criarEEnviarNotificacaoDePedido(pedido);
        return { message: 'Notificação salva no histórico e email de confirmação enviado!' };
    }
};
exports.PedidosController = PedidosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pedido_dto_1.CreatePedidoDto]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pedido_dto_1.UpdatePedidoDto]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/enviar-email'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidosController.prototype, "enviarEmailConfirmacao", null);
exports.PedidosController = PedidosController = __decorate([
    (0, common_1.Controller)('pedidos'),
    __metadata("design:paramtypes", [pedidos_service_1.PedidosService,
        notificacoes_service_1.NotificacoesService])
], PedidosController);
//# sourceMappingURL=pedidos.controller.js.map