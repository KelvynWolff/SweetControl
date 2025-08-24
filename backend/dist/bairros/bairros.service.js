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
exports.BairrosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bairro_entity_1 = require("./entities/bairro.entity");
let BairrosService = class BairrosService {
    bairroRepository;
    constructor(bairroRepository) {
        this.bairroRepository = bairroRepository;
    }
    create(createBairroDto) {
        const bairro = this.bairroRepository.create(createBairroDto);
        return this.bairroRepository.save(bairro);
    }
    findAll() {
        return this.bairroRepository.find({ relations: ['cidade'] });
    }
    async findOne(id) {
        const bairro = await this.bairroRepository.findOne({
            where: { id },
            relations: ['cidade']
        });
        if (!bairro) {
            throw new common_1.NotFoundException(`Bairro com o ID #${id} não encontrado.`);
        }
        return bairro;
    }
    async update(id, updateBairroDto) {
        const bairro = await this.bairroRepository.preload({
            id: id,
            ...updateBairroDto,
        });
        if (!bairro) {
            throw new common_1.NotFoundException(`Bairro com o ID #${id} não encontrado.`);
        }
        return this.bairroRepository.save(bairro);
    }
    async remove(id) {
        const bairro = await this.findOne(id);
        await this.bairroRepository.remove(bairro);
    }
};
exports.BairrosService = BairrosService;
exports.BairrosService = BairrosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bairro_entity_1.Bairro)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BairrosService);
//# sourceMappingURL=bairros.service.js.map