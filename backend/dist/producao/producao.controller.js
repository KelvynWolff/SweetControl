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
exports.ProducaoController = void 0;
const common_1 = require("@nestjs/common");
const producao_service_1 = require("./producao.service");
const create_producao_dto_1 = require("./dto/create-producao.dto");
let ProducaoController = class ProducaoController {
    producaoService;
    constructor(producaoService) {
        this.producaoService = producaoService;
    }
    create(createProducaoDto) {
        return this.producaoService.create(createProducaoDto);
    }
};
exports.ProducaoController = ProducaoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producao_dto_1.CreateProducaoDto]),
    __metadata("design:returntype", void 0)
], ProducaoController.prototype, "create", null);
exports.ProducaoController = ProducaoController = __decorate([
    (0, common_1.Controller)('producao'),
    __metadata("design:paramtypes", [producao_service_1.ProducaoService])
], ProducaoController);
//# sourceMappingURL=producao.controller.js.map