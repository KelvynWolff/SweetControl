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
exports.ProdutosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const produto_entity_1 = require("./entities/produto.entity");
let ProdutosService = class ProdutosService {
    produtoRepository;
    constructor(produtoRepository) {
        this.produtoRepository = produtoRepository;
    }
    create(createProdutoDto) {
        const produto = this.produtoRepository.create(createProdutoDto);
        return this.produtoRepository.save(produto);
    }
    async findAll() {
        const produtos = await this.produtoRepository.find({
            relations: ['lotes', 'lotes.movimentacoes'],
        });
        return produtos.map(produto => {
            const estoqueAtual = produto.lotes.reduce((totalLote, lote) => {
                const saldoLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
                return totalLote + saldoLote;
            }, 0);
            const { lotes, ...result } = produto;
            return { ...result, estoqueAtual };
        });
    }
    async findOne(id) {
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: ['lotes', 'lotes.movimentacoes'],
        });
        if (!produto) {
            throw new common_1.NotFoundException(`Produto com ID #${id} não encontrado.`);
        }
        const estoqueAtual = produto.lotes.reduce((totalLote, lote) => {
            const saldoLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
            return totalLote + saldoLote;
        }, 0);
        return { ...produto, estoqueAtual };
    }
    async update(id, updateProdutoDto) {
        const produto = await this.produtoRepository.preload({ id, ...updateProdutoDto });
        if (!produto) {
            throw new common_1.NotFoundException(`Produto com ID #${id} não encontrado.`);
        }
        return this.produtoRepository.save(produto);
    }
    async remove(id) {
        const produto = await this.findOne(id);
        await this.produtoRepository.remove(produto);
    }
};
exports.ProdutosService = ProdutosService;
exports.ProdutosService = ProdutosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produto_entity_1.Produto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProdutosService);
//# sourceMappingURL=produtos.service.js.map