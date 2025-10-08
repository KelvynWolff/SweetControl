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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasComprasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const notas_compras_entity_1 = require("./entities/notas-compras.entity");
const itens_notas_compras_entity_1 = require("../itens-notas-compras/entities/itens-notas-compras.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const movimentacao_estoque_entity_1 = require("../movimentacao-estoque/entities/movimentacao-estoque.entity");
let NotasComprasService = class NotasComprasService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async create(createNotaCompraDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const notaRepo = queryRunner.manager.getRepository(notas_compras_entity_1.NotasCompras);
            const loteRepo = queryRunner.manager.getRepository(lote_entity_1.Lote);
            const movEstoqueRepo = queryRunner.manager.getRepository(movimentacao_estoque_entity_1.MovimentacaoEstoque);
            const nota = notaRepo.create({
                chaveAcesso: createNotaCompraDto.chaveAcesso,
                idFornecedor: createNotaCompraDto.idFornecedor,
                data: createNotaCompraDto.data,
                valorTotal: createNotaCompraDto.valorTotal,
            });
            const novaNota = await queryRunner.manager.save(nota);
            for (const itemDto of createNotaCompraDto.itens) {
                const novoLote = loteRepo.create({
                    codigoLote: itemDto.codigoLote,
                    dataValidade: itemDto.dataValidade,
                    idProduto: itemDto.idProduto,
                    idInsumo: itemDto.idInsumo,
                });
                const loteSalvo = await queryRunner.manager.save(novoLote);
                const movimentacao = movEstoqueRepo.create({
                    idLote: loteSalvo.id,
                    tipo: movimentacao_estoque_entity_1.TipoMovimentacao.ENTRADA_COMPRA,
                    quantidade: itemDto.quantidade,
                });
                await queryRunner.manager.save(movimentacao);
                const itemNotaRepo = queryRunner.manager.getRepository(itens_notas_compras_entity_1.ItensNotasCompras);
                const itemNota = itemNotaRepo.create({
                    idNotasCompras: novaNota.id,
                    idProduto: itemDto.idProduto,
                    idInsumo: itemDto.idInsumo,
                    quantidade: itemDto.quantidade,
                });
                await queryRunner.manager.save(itemNota);
            }
            await queryRunner.commitTransaction();
            return novaNota;
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
        return this.dataSource.getRepository(notas_compras_entity_1.NotasCompras).find({
            relations: ['fornecedor', 'fornecedor.pessoa', 'itens', 'itens.produto', 'itens.insumo'],
            order: { data: 'DESC' }
        });
    }
};
exports.NotasComprasService = NotasComprasService;
exports.NotasComprasService = NotasComprasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], NotasComprasService);
//# sourceMappingURL=notas-compras.service.js.map