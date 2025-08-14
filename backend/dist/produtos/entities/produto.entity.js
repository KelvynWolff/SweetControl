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
exports.Produto = void 0;
const typeorm_1 = require("typeorm");
const promocao_entity_1 = require("./promocao.entity");
const receita_entity_1 = require("./receita.entity");
const itens_pedido_entity_1 = require("../../vendas/entities/itens-pedido.entity");
let Produto = class Produto {
    id;
    nome;
    preco;
    unidadeMedida;
    estoque;
    custo;
    margem;
    descricao;
    ativo;
    receitas;
    promocoes;
    itensPedido;
};
exports.Produto = Produto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Produto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], Produto.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Produto.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produto.prototype, "unidadeMedida", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], Produto.prototype, "estoque", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], Produto.prototype, "custo", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], Produto.prototype, "margem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Produto.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receita_entity_1.Receita, (receita) => receita.produto),
    __metadata("design:type", Array)
], Produto.prototype, "receitas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => promocao_entity_1.Promocao, (promocao) => promocao.produto),
    __metadata("design:type", Array)
], Produto.prototype, "promocoes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itens_pedido_entity_1.ItensPedido, (item) => item.produto),
    __metadata("design:type", Array)
], Produto.prototype, "itensPedido", void 0);
exports.Produto = Produto = __decorate([
    (0, typeorm_1.Entity)('produtos')
], Produto);
//# sourceMappingURL=produto.entity.js.map