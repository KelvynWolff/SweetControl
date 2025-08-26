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
exports.TelefonesController = void 0;
const common_1 = require("@nestjs/common");
const telefones_service_1 = require("./telefones.service");
const create_telefone_dto_1 = require("./dto/create-telefone.dto");
const update_telefone_dto_1 = require("./dto/update-telefone.dto");
let TelefonesController = class TelefonesController {
    telefonesService;
    constructor(telefonesService) {
        this.telefonesService = telefonesService;
    }
    create(createTelefoneDto) {
        return this.telefonesService.create(createTelefoneDto);
    }
    findAll() {
        return this.telefonesService.findAll();
    }
    findOne(id) {
        return this.telefonesService.findOne(id);
    }
    update(id, updateTelefoneDto) {
        return this.telefonesService.update(id, updateTelefoneDto);
    }
    remove(id) {
        return this.telefonesService.remove(id);
    }
};
exports.TelefonesController = TelefonesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_telefone_dto_1.CreateTelefoneDto]),
    __metadata("design:returntype", void 0)
], TelefonesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TelefonesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TelefonesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_telefone_dto_1.UpdateTelefoneDto]),
    __metadata("design:returntype", void 0)
], TelefonesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TelefonesController.prototype, "remove", null);
exports.TelefonesController = TelefonesController = __decorate([
    (0, common_1.Controller)('telefones'),
    __metadata("design:paramtypes", [telefones_service_1.TelefonesService])
], TelefonesController);
//# sourceMappingURL=telefones.controller.js.map