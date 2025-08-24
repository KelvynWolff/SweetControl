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
exports.InsumosController = void 0;
const common_1 = require("@nestjs/common");
const insumos_service_1 = require("./insumos.service");
const create_insumo_dto_1 = require("./dto/create-insumo.dto");
const update_insumo_dto_1 = require("./dto/update-insumo.dto");
let InsumosController = class InsumosController {
    insumosService;
    constructor(insumosService) {
        this.insumosService = insumosService;
    }
    create(createInsumoDto) {
        return this.insumosService.create(createInsumoDto);
    }
    findAll() {
        return this.insumosService.findAll();
    }
    findOne(id) {
        return this.insumosService.findOne(id);
    }
    update(id, updateInsumoDto) {
        return this.insumosService.update(id, updateInsumoDto);
    }
    remove(id) {
        return this.insumosService.remove(id);
    }
};
exports.InsumosController = InsumosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_insumo_dto_1.CreateInsumoDto]),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_insumo_dto_1.UpdateInsumoDto]),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "remove", null);
exports.InsumosController = InsumosController = __decorate([
    (0, common_1.Controller)('insumos'),
    __metadata("design:paramtypes", [insumos_service_1.InsumosService])
], InsumosController);
//# sourceMappingURL=insumos.controller.js.map