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
exports.LotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lote_entity_1 = require("./entities/lote.entity");
const movimentacao_estoque_entity_1 = require("../movimentacao-estoque/entities/movimentacao-estoque.entity");
let LotesService = class LotesService {
    loteRepository;
    dataSource;
    constructor(loteRepository, dataSource) {
        this.loteRepository = loteRepository;
        this.dataSource = dataSource;
    }
    async create(createLoteDto) {
        const { quantidadeInicial, ...loteData } = createLoteDto;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const lote = this.loteRepository.create(loteData);
            const novoLote = await queryRunner.manager.save(lote);
            const movimentacaoRepo = queryRunner.manager.getRepository(movimentacao_estoque_entity_1.MovimentacaoEstoque);
            const movimentacao = movimentacaoRepo.create({
                idLote: novoLote.id,
                tipo: movimentacao_estoque_entity_1.TipoMovimentacao.ENTRADA_COMPRA,
                quantidade: quantidadeInicial,
            });
            await queryRunner.manager.save(movimentacao);
            await queryRunner.commitTransaction();
            return novoLote;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        const lotes = await this.loteRepository.find({
            relations: ['produto', 'insumo', 'movimentacoes']
        });
        return lotes.map(lote => {
            const estoqueAtual = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
            return { ...lote, estoqueAtual };
        });
    }
    async findOne(id) {
        const lote = await this.loteRepository.findOne({ where: { id }, relations: ['produto'] });
        if (!lote) {
            throw new common_1.NotFoundException(`Lote com ID #${id} não encontrado.`);
        }
        return lote;
    }
    async update(id, updateLoteDto) {
        const lote = await this.loteRepository.preload({ id, ...updateLoteDto });
        if (!lote) {
            throw new common_1.NotFoundException(`Lote com ID #${id} não encontrado.`);
        }
        return this.loteRepository.save(lote);
    }
    async remove(id) {
        const result = await this.loteRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Lote com ID #${id} não encontrado.`);
        }
    }
};
exports.LotesService = LotesService;
exports.LotesService = LotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lote_entity_1.Lote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], LotesService);
//# sourceMappingURL=lotes.service.js.map