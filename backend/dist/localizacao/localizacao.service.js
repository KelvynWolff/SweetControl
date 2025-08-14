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
exports.LocalizacaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estado_entity_1 = require("./entities/estado.entity");
const cidade_entity_1 = require("./entities/cidade.entity");
const bairro_entity_1 = require("./entities/bairro.entity");
let LocalizacaoService = class LocalizacaoService {
    estadoRepository;
    cidadeRepository;
    bairroRepository;
    constructor(estadoRepository, cidadeRepository, bairroRepository) {
        this.estadoRepository = estadoRepository;
        this.cidadeRepository = cidadeRepository;
        this.bairroRepository = bairroRepository;
    }
    createEstado(createEstadoDto) {
        const estado = this.estadoRepository.create(createEstadoDto);
        return this.estadoRepository.save(estado);
    }
    createCidade(createCidadeDto) {
        const cidade = this.cidadeRepository.create(createCidadeDto);
        return this.cidadeRepository.save(cidade);
    }
    createBairro(createBairroDto) {
        const bairro = this.bairroRepository.create(createBairroDto);
        return this.bairroRepository.save(bairro);
    }
};
exports.LocalizacaoService = LocalizacaoService;
exports.LocalizacaoService = LocalizacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estado_entity_1.Estado)),
    __param(1, (0, typeorm_1.InjectRepository)(cidade_entity_1.Cidade)),
    __param(2, (0, typeorm_1.InjectRepository)(bairro_entity_1.Bairro)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LocalizacaoService);
//# sourceMappingURL=localizacao.service.js.map