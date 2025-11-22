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
exports.PedidosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entity_1 = require("./entities/pedido.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const movimentacao_estoque_entity_1 = require("../movimentacao-estoque/entities/movimentacao-estoque.entity");
const item_pedido_entity_1 = require("../itens-pedido/entities/item-pedido.entity");
let PedidosService = class PedidosService {
    pedidoRepository;
    dataSource;
    constructor(pedidoRepository, dataSource) {
        this.pedidoRepository = pedidoRepository;
        this.dataSource = dataSource;
    }
    async create(createPedidoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const item of createPedidoDto.itens) {
                const estoqueTotal = await this.calcularEstoqueItem(item.idProduto, 'produto', queryRunner);
                if (estoqueTotal < item.quantidade) {
                    throw new common_1.UnprocessableEntityException(`Estoque insuficiente para o produto ID #${item.idProduto}.`);
                }
                await this.registrarSaidaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, movimentacao_estoque_entity_1.TipoMovimentacao.SAIDA_VENDA);
            }
            const { pagamento, ...dadosPedido } = createPedidoDto;
            const pedido = this.pedidoRepository.create({
                ...dadosPedido,
                data: new Date(),
                status: 'AGUARDANDO PAGAMENTO'
            });
            const novoPedido = (await queryRunner.manager.save(pedido));
            await queryRunner.commitTransaction();
            return this.findOne(novoPedido.id);
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
        return this.pedidoRepository.find({
            relations: ['cliente', 'cliente.pessoa'],
            order: { id: 'DESC' }
        });
    }
    async findOne(id) {
        const pedido = await this.pedidoRepository.findOne({
            where: { id },
            relations: [
                'cliente',
                'cliente.pessoa',
                'cliente.pessoa.emails',
                'itens',
                'itens.produto',
                'pagamentos'
            ]
        });
        if (!pedido)
            throw new common_1.NotFoundException(`Pedido com o ID #${id} não encontrado.`);
        return pedido;
    }
    async update(id, updatePedidoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const pedidoRepo = queryRunner.manager.getRepository(pedido_entity_1.Pedido);
            const itemPedidoRepo = queryRunner.manager.getRepository(item_pedido_entity_1.ItemPedido);
            const pedidoExistente = await this.findOne(id);
            if (updatePedidoDto.itens) {
                for (const item of pedidoExistente.itens) {
                    await this.registrarEntradaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, movimentacao_estoque_entity_1.TipoMovimentacao.ENTRADA_DEVOLUCAO);
                }
                for (const item of updatePedidoDto.itens) {
                    if (!item.idProduto || !item.quantidade)
                        continue;
                    const estoqueTotal = await this.calcularEstoqueItem(item.idProduto, 'produto', queryRunner);
                    if (estoqueTotal < item.quantidade) {
                        throw new common_1.UnprocessableEntityException(`Estoque insuficiente para o item de ID #${item.idProduto}.`);
                    }
                    await this.registrarSaidaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, movimentacao_estoque_entity_1.TipoMovimentacao.SAIDA_VENDA);
                }
                await itemPedidoRepo.delete({ idPedido: id });
            }
            const pedidoAtualizado = pedidoRepo.merge(pedidoExistente, updatePedidoDto);
            await queryRunner.manager.save(pedidoAtualizado);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const pedido = await this.pedidoRepository.findOne({
                where: { id },
                relations: ['itens', 'pagamentos']
            });
            if (!pedido) {
                throw new common_1.NotFoundException(`Pedido #${id} não encontrado.`);
            }
            for (const item of pedido.itens) {
                await this.registrarEntradaEstoque(item.idProduto, 'produto', item.quantidade, queryRunner, movimentacao_estoque_entity_1.TipoMovimentacao.ENTRADA_DEVOLUCAO);
            }
            if (pedido.pagamentos && pedido.pagamentos.length > 0) {
                const pagamentoRepo = queryRunner.manager.getRepository('Pagamento');
                await pagamentoRepo.remove(pedido.pagamentos);
            }
            await queryRunner.manager.remove(pedido);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateStatus(id, status) {
        const pedido = await this.pedidoRepository.preload({ id, status });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido com o ID #${id} não encontrado.`);
        }
        await this.pedidoRepository.save(pedido);
        return this.findOne(id);
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
    async registrarEntradaEstoque(itemId, tipoItem, quantidadeTotalEntrada, queryRunner, tipoMovimentacao) {
        const loteRepo = queryRunner.manager.getRepository(lote_entity_1.Lote);
        const movEstoqueRepo = queryRunner.manager.getRepository(movimentacao_estoque_entity_1.MovimentacaoEstoque);
        const whereCondition = tipoItem === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };
        const loteMaisRecente = await loteRepo.findOne({ where: whereCondition, order: { dataValidade: 'DESC' } });
        if (!loteMaisRecente)
            throw new common_1.NotFoundException(`Nenhum lote encontrado para o item #${itemId} para reverter o estoque.`);
        const movimentacao = movEstoqueRepo.create({ idLote: loteMaisRecente.id, tipo: tipoMovimentacao, quantidade: quantidadeTotalEntrada });
        await queryRunner.manager.save(movimentacao);
    }
    async calcularEstoqueItem(itemId, tipo, queryRunner) {
        const loteRepo = queryRunner.manager.getRepository(lote_entity_1.Lote);
        const whereCondition = tipo === 'produto' ? { idProduto: itemId } : { idInsumo: itemId };
        const lotes = await loteRepo.find({ where: whereCondition, relations: ['movimentacoes'] });
        return lotes.reduce((total, lote) => total + lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0), 0);
    }
};
exports.PedidosService = PedidosService;
exports.PedidosService = PedidosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_entity_1.Pedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], PedidosService);
//# sourceMappingURL=pedidos.service.js.map