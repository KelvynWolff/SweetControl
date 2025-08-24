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
exports.EstadosController = void 0;
const common_1 = require("@nestjs/common");
const estados_service_1 = require("./estados.service");
const create_estado_dto_1 = require("./dto/create-estado.dto");
const update_estado_dto_1 = require("./dto/update-estado.dto");
let EstadosController = class EstadosController {
    estadosService;
    constructor(estadosService) {
        this.estadosService = estadosService;
    }
    create(createEstadoDto) {
        return this.estadosService.create(createEstadoDto);
    }
    findAll() {
        return this.estadosService.findAll();
    }
    findOne(sigla) {
        return this.estadosService.findOne(sigla.toUpperCase());
    }
    update(sigla, updateEstadoDto) {
        return this.estadosService.update(sigla.toUpperCase(), updateEstadoDto);
    }
    remove(sigla) {
        return this.estadosService.remove(sigla.toUpperCase());
    }
};
exports.EstadosController = EstadosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estado_dto_1.CreateEstadoDto]),
    __metadata("design:returntype", void 0)
], EstadosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EstadosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':sigla'),
    __param(0, (0, common_1.Param)('sigla')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstadosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':sigla'),
    __param(0, (0, common_1.Param)('sigla')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_estado_dto_1.UpdateEstadoDto]),
    __metadata("design:returntype", void 0)
], EstadosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sigla'),
    __param(0, (0, common_1.Param)('sigla')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstadosController.prototype, "remove", null);
exports.EstadosController = EstadosController = __decorate([
    (0, common_1.Controller)('estados'),
    __metadata("design:paramtypes", [estados_service_1.EstadosService])
], EstadosController);
//# sourceMappingURL=estados.controller.js.map