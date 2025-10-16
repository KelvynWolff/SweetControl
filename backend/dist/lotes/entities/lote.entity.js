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
exports.Lote = void 0;
const typeorm_1 = require("typeorm");
const produto_entity_1 = require("../../produtos/entities/produto.entity");
const insumo_entity_1 = require("../../insumos/entities/insumo.entity");
const movimentacao_estoque_entity_1 = require("../../movimentacao-estoque/entities/movimentacao-estoque.entity");
let Lote = class Lote {
    id;
    codigoLote;
    dataValidade;
    custoUnitario;
    idProduto;
    idInsumo;
    produto;
    insumo;
    movimentacoes;
};
exports.Lote = Lote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lote.prototype, "codigoLote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Lote.prototype, "dataValidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', default: 0 }),
    __metadata("design:type", Number)
], Lote.prototype, "custoUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Lote.prototype, "idProduto", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Lote.prototype, "idInsumo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], Lote.prototype, "produto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => insumo_entity_1.Insumo, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'idInsumo' }),
    __metadata("design:type", insumo_entity_1.Insumo)
], Lote.prototype, "insumo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movimentacao_estoque_entity_1.MovimentacaoEstoque, movimentacao => movimentacao.lote),
    __metadata("design:type", Array)
], Lote.prototype, "movimentacoes", void 0);
exports.Lote = Lote = __decorate([
    (0, typeorm_1.Entity)()
], Lote);
//# sourceMappingURL=lote.entity.js.map