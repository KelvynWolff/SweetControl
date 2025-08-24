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
exports.InsumosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const insumo_entity_1 = require("./entities/insumo.entity");
let InsumosService = class InsumosService {
    insumoRepository;
    constructor(insumoRepository) {
        this.insumoRepository = insumoRepository;
    }
    create(createInsumoDto) {
        const insumo = this.insumoRepository.create(createInsumoDto);
        return this.insumoRepository.save(insumo);
    }
    findAll() {
        return this.insumoRepository.find();
    }
    async findOne(id) {
        const insumo = await this.insumoRepository.findOneBy({ id });
        if (!insumo) {
            throw new common_1.NotFoundException(`Insumo com o ID #${id} não encontrado.`);
        }
        return insumo;
    }
    async update(id, updateInsumoDto) {
        const insumo = await this.insumoRepository.preload({
            id: id,
            ...updateInsumoDto,
        });
        if (!insumo) {
            throw new common_1.NotFoundException(`Insumo com o ID #${id} não encontrado para atualização.`);
        }
        return this.insumoRepository.save(insumo);
    }
    async remove(id) {
        const insumo = await this.findOne(id);
        await this.insumoRepository.remove(insumo);
    }
};
exports.InsumosService = InsumosService;
exports.InsumosService = InsumosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(insumo_entity_1.Insumo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InsumosService);
//# sourceMappingURL=insumos.service.js.map