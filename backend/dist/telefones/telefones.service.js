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
exports.TelefonesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const telefone_entity_1 = require("./entities/telefone.entity");
let TelefonesService = class TelefonesService {
    telefoneRepository;
    constructor(telefoneRepository) {
        this.telefoneRepository = telefoneRepository;
    }
    create(createTelefoneDto) {
        const telefone = this.telefoneRepository.create(createTelefoneDto);
        return this.telefoneRepository.save(telefone);
    }
    findAll() {
        return this.telefoneRepository.find({ relations: ['pessoa'] });
    }
    async findOne(id) {
        const telefone = await this.telefoneRepository.findOne({
            where: { id },
            relations: ['pessoa']
        });
        if (!telefone) {
            throw new common_1.NotFoundException(`Telefone com o ID #${id} não encontrado.`);
        }
        return telefone;
    }
    async update(id, updateTelefoneDto) {
        const telefone = await this.telefoneRepository.preload({
            id: id,
            ...updateTelefoneDto,
        });
        if (!telefone) {
            throw new common_1.NotFoundException(`Telefone com o ID #${id} não encontrado.`);
        }
        return this.telefoneRepository.save(telefone);
    }
    async remove(id) {
        const telefone = await this.findOne(id);
        await this.telefoneRepository.remove(telefone);
    }
};
exports.TelefonesService = TelefonesService;
exports.TelefonesService = TelefonesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(telefone_entity_1.Telefone)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TelefonesService);
//# sourceMappingURL=telefones.service.js.map