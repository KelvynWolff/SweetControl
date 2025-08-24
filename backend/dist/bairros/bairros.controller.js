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
exports.BairrosController = void 0;
const common_1 = require("@nestjs/common");
const bairros_service_1 = require("./bairros.service");
const create_bairro_dto_1 = require("./dto/create-bairro.dto");
const update_bairro_dto_1 = require("./dto/update-bairro.dto");
let BairrosController = class BairrosController {
    bairrosService;
    constructor(bairrosService) {
        this.bairrosService = bairrosService;
    }
    create(createBairroDto) {
        return this.bairrosService.create(createBairroDto);
    }
    findAll() {
        return this.bairrosService.findAll();
    }
    findOne(id) {
        return this.bairrosService.findOne(id);
    }
    update(id, updateBairroDto) {
        return this.bairrosService.update(id, updateBairroDto);
    }
    remove(id) {
        return this.bairrosService.remove(id);
    }
};
exports.BairrosController = BairrosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bairro_dto_1.CreateBairroDto]),
    __metadata("design:returntype", void 0)
], BairrosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BairrosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BairrosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bairro_dto_1.UpdateBairroDto]),
    __metadata("design:returntype", void 0)
], BairrosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BairrosController.prototype, "remove", null);
exports.BairrosController = BairrosController = __decorate([
    (0, common_1.Controller)('bairros'),
    __metadata("design:paramtypes", [bairros_service_1.BairrosService])
], BairrosController);
//# sourceMappingURL=bairros.controller.js.map