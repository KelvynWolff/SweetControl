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
exports.PromocoesController = void 0;
const common_1 = require("@nestjs/common");
const promocoes_service_1 = require("./promocoes.service");
const create_promocao_dto_1 = require("./dto/create-promocao.dto");
const update_promocao_dto_1 = require("./dto/update-promocao.dto");
let PromocoesController = class PromocoesController {
    promocoesService;
    constructor(promocoesService) {
        this.promocoesService = promocoesService;
    }
    create(createPromocaoDto) {
        return this.promocoesService.create(createPromocaoDto);
    }
    findAtivas() {
        return this.promocoesService.findAtivas();
    }
    findAll() {
        return this.promocoesService.findAll();
    }
    findOne(id) {
        return this.promocoesService.findOne(id);
    }
    update(id, updatePromocaoDto) {
        return this.promocoesService.update(id, updatePromocaoDto);
    }
    remove(id) {
        return this.promocoesService.remove(id);
    }
};
exports.PromocoesController = PromocoesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promocao_dto_1.CreatePromocaoDto]),
    __metadata("design:returntype", void 0)
], PromocoesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('ativas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromocoesController.prototype, "findAtivas", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromocoesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PromocoesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_promocao_dto_1.UpdatePromocaoDto]),
    __metadata("design:returntype", void 0)
], PromocoesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PromocoesController.prototype, "remove", null);
exports.PromocoesController = PromocoesController = __decorate([
    (0, common_1.Controller)('promocoes'),
    __metadata("design:paramtypes", [promocoes_service_1.PromocoesService])
], PromocoesController);
//# sourceMappingURL=promocoes.controller.js.map