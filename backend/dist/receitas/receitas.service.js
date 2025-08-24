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
exports.ReceitasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const receita_entity_1 = require("./entities/receita.entity");
let ReceitasService = class ReceitasService {
    receitaRepository;
    constructor(receitaRepository) {
        this.receitaRepository = receitaRepository;
    }
    create(createReceitaDto) {
        const receita = this.receitaRepository.create(createReceitaDto);
        return this.receitaRepository.save(receita);
    }
    findAll() {
        return this.receitaRepository.find({ relations: ['produto', 'insumo'] });
    }
    async findOne(id) {
        const receita = await this.receitaRepository.findOne({ where: { id }, relations: ['produto', 'insumo'] });
        if (!receita) {
            throw new common_1.NotFoundException(`Receita com o ID #${id} não encontrada.`);
        }
        return receita;
    }
    async update(id, updateReceitaDto) {
        const receita = await this.receitaRepository.preload({
            id: id,
            ...updateReceitaDto,
        });
        if (!receita) {
            throw new common_1.NotFoundException(`Receita com o ID #${id} não encontrada para atualização.`);
        }
        return this.receitaRepository.save(receita);
    }
    async remove(id) {
        const receita = await this.findOne(id);
        await this.receitaRepository.remove(receita);
    }
};
exports.ReceitasService = ReceitasService;
exports.ReceitasService = ReceitasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(receita_entity_1.Receita)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReceitasService);
//# sourceMappingURL=receitas.service.js.map