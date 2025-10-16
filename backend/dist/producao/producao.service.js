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
const receita_entity_1 = require("../receitas/entities/receita.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const movimentacao_estoque_entity_1 = require("../movimentacao-estoque/entities/movimentacao-estoque.entity");
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
            const receitaRepo = queryRunner.manager.getRepository(receita_entity_1.Receita);
            const loteRepo = queryRunner.manager.getRepository(lote_entity_1.Lote);
            const movEstoqueRepo = queryRunner.manager.getRepository(movimentacao_estoque_entity_1.MovimentacaoEstoque);
            const receitaItens = await receitaRepo.find({
                where: { idProduto: createProducaoDto.idProduto },
                relations: ['insumo'],
            });
            if (receitaItens.length === 0)
                throw new common_1.UnprocessableEntityException(`Produto não possui receita.`);
            for (const item of receitaItens) {
                const quantidadeNecessaria = item.qtdInsumo * createProducaoDto.quantidade;
                const estoqueInsumo = await this.calcularEstoqueItem(item.idInsumo, 'insumo', queryRunner);
                if (estoqueInsumo < quantidadeNecessaria)
                    throw new common_1.UnprocessableEntityException(`Estoque insuficiente para o insumo "${item.insumo.nome}".`);
                await this.registrarSaidaEstoque(item.idInsumo, 'insumo', quantidadeNecessaria, queryRunner, movimentacao_estoque_entity_1.TipoMovimentacao.SAIDA_PRODUCAO);
            }
            const novoLoteProdutoData = {
                codigoLote: String(Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 100)),
                dataValidade: createProducaoDto.dataValidade,
            };
            if (createProducaoDto.idProduto) {
                novoLoteProdutoData.produto = { id: createProducaoDto.idProduto };
            }
            const novoLoteProduto = loteRepo.create(novoLoteProdutoData);
            const loteSalvo = await queryRunner.manager.save(novoLoteProduto);
            const movimentacaoEntrada = movEstoqueRepo.create({
                idLote: loteSalvo.id,
                tipo: movimentacao_estoque_entity_1.TipoMovimentacao.ENTRADA_PRODUCAO,
                quantidade: createProducaoDto.quantidade,
            });
            await queryRunner.manager.save(movimentacaoEntrada);
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
    async calcularEstoqueItem(itemId, tipo, queryRunner) {
        const loteRepo = queryRunner.manager.getRepository(lote_entity_1.Lote);
        const whereCondition = tipo === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };
        const lotes = await loteRepo.find({ where: whereCondition, relations: ['movimentacoes'] });
        return lotes.reduce((total, lote) => total + lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0), 0);
    }
    async registrarSaidaEstoque(itemId, tipoItem, quantidadeTotalSaida, queryRunner, tipoMovimentacao) {
        const loteRepo = queryRunner.manager.getRepository(lote_entity_1.Lote);
        const movEstoqueRepo = queryRunner.manager.getRepository(movimentacao_estoque_entity_1.MovimentacaoEstoque);
        const whereCondition = tipoItem === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };
        const lotes = await loteRepo.find({ where: whereCondition, relations: ['movimentacoes'], order: { dataValidade: 'ASC' } });
        let quantidadeRestante = quantidadeTotalSaida;
        for (const lote of lotes) {
            if (quantidadeRestante <= 0)
                break;
            const estoqueLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
            if (estoqueLote > 0) {
                const quantidadeASerRetirada = Math.min(estoqueLote, quantidadeRestante);
                const movimentacao = movEstoqueRepo.create({ idLote: lote.id, tipo: tipoMovimentacao, quantidade: -quantidadeASerRetirada });
                await queryRunner.manager.save(movimentacao);
                quantidadeRestante -= quantidadeASerRetirada;
            }
        }
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