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
exports.NotificacoesController = void 0;
const common_1 = require("@nestjs/common");
const notificacoes_service_1 = require("./notificacoes.service");
const create_notificacao_dto_1 = require("./dto/create-notificacao.dto");
const update_notificacao_dto_1 = require("./dto/update-notificacao.dto");
let NotificacoesController = class NotificacoesController {
    notificacoesService;
    constructor(notificacoesService) {
        this.notificacoesService = notificacoesService;
    }
    create(createNotificacaoDto) {
        return this.notificacoesService.create(createNotificacaoDto);
    }
    findAll() {
        return this.notificacoesService.findAll();
    }
    markAsRead(id, updateNotificacaoDto) {
        return this.notificacoesService.markAsRead(id, updateNotificacaoDto);
    }
    remove(id) {
        return this.notificacoesService.remove(id);
    }
};
exports.NotificacoesController = NotificacoesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notificacao_dto_1.CreateNotificacaoDto]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/leitura'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_notificacao_dto_1.UpdateNotificacaoDto]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "remove", null);
exports.NotificacoesController = NotificacoesController = __decorate([
    (0, common_1.Controller)('notificacoes'),
    __metadata("design:paramtypes", [notificacoes_service_1.NotificacoesService])
], NotificacoesController);
//# sourceMappingURL=notificacoes.controller.js.map