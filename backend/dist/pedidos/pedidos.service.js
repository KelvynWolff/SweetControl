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
const produto_entity_1 = require("../produtos/entities/produto.entity");
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
            const produtoRepo = queryRunner.manager.getRepository(produto_entity_1.Produto);
            for (const item of createPedidoDto.itens) {
                const produto = await produtoRepo.findOneBy({ id: item.idProduto });
                if (!produto) {
                    throw new common_1.NotFoundException(`Produto com ID #${item.idProduto} não encontrado.`);
                }
                if (produto.estoque < item.quantidade) {
                    throw new common_1.UnprocessableEntityException(`Estoque insuficiente para o produto "${produto.nome}".`);
                }
                produto.estoque -= item.quantidade;
                await queryRunner.manager.save(produto);
            }
            const pedido = this.pedidoRepository.create({
                ...createPedidoDto,
                data: new Date(),
            });
            const novoPedido = await queryRunner.manager.save(pedido);
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
            relations: ['cliente', 'cliente.pessoa', 'cliente.pessoa.emails', 'itens', 'itens.produto', 'pagamento']
        });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido com o ID #${id} não encontrado.`);
        }
        return pedido;
    }
    async update(id, updatePedidoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const produtoRepo = queryRunner.manager.getRepository(produto_entity_1.Produto);
            const pedidoRepo = queryRunner.manager.getRepository(pedido_entity_1.Pedido);
            const itemPedidoRepo = queryRunner.manager.getRepository(item_pedido_entity_1.ItemPedido);
            const pedidoExistente = await this.findOne(id);
            if (updatePedidoDto.itens) {
                for (const item of pedidoExistente.itens) {
                    const produto = await produtoRepo.findOneBy({ id: item.idProduto });
                    if (produto) {
                        produto.estoque += item.quantidade;
                        await queryRunner.manager.save(produto);
                    }
                }
                for (const item of updatePedidoDto.itens) {
                    const produto = await produtoRepo.findOneBy({ id: item.idProduto });
                    if (!produto || produto.estoque < item.quantidade) {
                        throw new common_1.UnprocessableEntityException(`Estoque insuficiente para o novo item "${produto?.nome || 'desconhecido'}".`);
                    }
                    produto.estoque -= item.quantidade;
                    await queryRunner.manager.save(produto);
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
            const produtoRepo = queryRunner.manager.getRepository(produto_entity_1.Produto);
            const pedido = await this.findOne(id);
            for (const item of pedido.itens) {
                const produto = await produtoRepo.findOneBy({ id: item.idProduto });
                if (produto) {
                    produto.estoque += item.quantidade;
                    await queryRunner.manager.save(produto);
                }
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
        return this.pedidoRepository.save(pedido);
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