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
exports.Receita = void 0;
const typeorm_1 = require("typeorm");
const produto_entity_1 = require("../../produtos/entities/produto.entity");
const insumo_entity_1 = require("../../insumos/entities/insumo.entity");
let Receita = class Receita {
    id;
    idProduto;
    idInsumo;
    qtdInsumo;
    produto;
    insumo;
};
exports.Receita = Receita;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Receita.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Receita.prototype, "idProduto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Receita.prototype, "idInsumo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Receita.prototype, "qtdInsumo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto, produto => produto.receitas),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], Receita.prototype, "produto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => insumo_entity_1.Insumo, insumo => insumo.receitas),
    (0, typeorm_1.JoinColumn)({ name: 'idInsumo' }),
    __metadata("design:type", insumo_entity_1.Insumo)
], Receita.prototype, "insumo", void 0);
exports.Receita = Receita = __decorate([
    (0, typeorm_1.Entity)()
], Receita);
//# sourceMappingURL=receita.entity.js.map