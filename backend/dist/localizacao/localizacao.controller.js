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
exports.LocalizacaoController = void 0;
const common_1 = require("@nestjs/common");
const localizacao_service_1 = require("./localizacao.service");
const create_estado_dto_1 = require("./dto/create-estado.dto");
const create_cidade_dto_1 = require("./dto/create-cidade.dto");
const create_bairro_dto_1 = require("./dto/create-bairro.dto");
let LocalizacaoController = class LocalizacaoController {
    localizacaoService;
    constructor(localizacaoService) {
        this.localizacaoService = localizacaoService;
    }
    createEstado(createEstadoDto) {
        return this.localizacaoService.createEstado(createEstadoDto);
    }
    createCidade(createCidadeDto) {
        return this.localizacaoService.createCidade(createCidadeDto);
    }
    createBairro(createBairroDto) {
        return this.localizacaoService.createBairro(createBairroDto);
    }
};
exports.LocalizacaoController = LocalizacaoController;
__decorate([
    (0, common_1.Post)('estados'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estado_dto_1.CreateEstadoDto]),
    __metadata("design:returntype", void 0)
], LocalizacaoController.prototype, "createEstado", null);
__decorate([
    (0, common_1.Post)('cidades'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cidade_dto_1.CreateCidadeDto]),
    __metadata("design:returntype", void 0)
], LocalizacaoController.prototype, "createCidade", null);
__decorate([
    (0, common_1.Post)('bairros'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bairro_dto_1.CreateBairroDto]),
    __metadata("design:returntype", void 0)
], LocalizacaoController.prototype, "createBairro", null);
exports.LocalizacaoController = LocalizacaoController = __decorate([
    (0, common_1.Controller)('localizacao'),
    __metadata("design:paramtypes", [localizacao_service_1.LocalizacaoService])
], LocalizacaoController);
//# sourceMappingURL=localizacao.controller.js.map