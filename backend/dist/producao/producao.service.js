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
exports.ProducaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producao_entity_1 = require("./entities/producao.entity");
const produto_entity_1 = require("../produtos/entities/produto.entity");
const insumo_entity_1 = require("../insumos/entities/insumo.entity");
const receita_entity_1 = require("../receitas/entities/receita.entity");
let ProducaoService = class ProducaoService {
    producaoRepository;
    dataSource;
    constructor(producaoRepository, dataSource) {
        this.producaoRepository = producaoRepository;
        this.dataSource = dataSource;
    }
    async create(createProducaoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const produtoRepo = queryRunner.manager.getRepository(produto_entity_1.Produto);
            const insumoRepo = queryRunner.manager.getRepository(insumo_entity_1.Insumo);
            const receitaRepo = queryRunner.manager.getRepository(receita_entity_1.Receita);
            const produto = await produtoRepo.findOneBy({ id: createProducaoDto.idProduto });
            if (!produto) {
                throw new common_1.NotFoundException(`Produto com ID #${createProducaoDto.idProduto} não encontrado.`);
            }
            const receitaItens = await receitaRepo.find({ where: { idProduto: produto.id } });
            if (receitaItens.length === 0) {
                throw new common_1.UnprocessableEntityException(`O produto "${produto.nome}" não possui uma receita cadastrada.`);
            }
            for (const item of receitaItens) {
                const insumo = await insumoRepo.findOneBy({ id: item.idInsumo });
                const quantidadeNecessaria = item.qtdInsumo * createProducaoDto.quantidade;
                if (!insumo || insumo.estoque < quantidadeNecessaria) {
                    throw new common_1.UnprocessableEntityException(`Estoque insuficiente para o insumo "${insumo?.nome || 'desconhecido'}".`);
                }
                insumo.estoque -= quantidadeNecessaria;
                await queryRunner.manager.save(insumo);
            }
            produto.estoque += createProducaoDto.quantidade;
            await queryRunner.manager.save(produto);
            const producao = this.producaoRepository.create(createProducaoDto);
            const novaProducao = await queryRunner.manager.save(producao);
            await queryRunner.commitTransaction();
            return novaProducao;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    findAll() {
        return this.producaoRepository.find({ relations: ['produto'], order: { data: 'DESC' } });
    }
};
exports.ProducaoService = ProducaoService;
exports.ProducaoService = ProducaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producao_entity_1.Producao)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ProducaoService);
//# sourceMappingURL=producao.service.js.map