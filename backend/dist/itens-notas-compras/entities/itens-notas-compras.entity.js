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
exports.ItensNotasCompras = void 0;
const typeorm_1 = require("typeorm");
const notas_compras_entity_1 = require("../../notas-compras/entities/notas-compras.entity");
const produto_entity_1 = require("../../produtos/entities/produto.entity");
const insumo_entity_1 = require("../../insumos/entities/insumo.entity");
let ItensNotasCompras = class ItensNotasCompras {
    id;
    idNotasCompras;
    idProduto;
    idInsumo;
    quantidade;
    notaCompra;
    produto;
    insumo;
};
exports.ItensNotasCompras = ItensNotasCompras;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItensNotasCompras.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ItensNotasCompras.prototype, "idNotasCompras", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], ItensNotasCompras.prototype, "idProduto", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], ItensNotasCompras.prototype, "idInsumo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], ItensNotasCompras.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notas_compras_entity_1.NotasCompras, nota => nota.itens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idNotasCompras' }),
    __metadata("design:type", notas_compras_entity_1.NotasCompras)
], ItensNotasCompras.prototype, "notaCompra", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], ItensNotasCompras.prototype, "produto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => insumo_entity_1.Insumo, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'idInsumo' }),
    __metadata("design:type", insumo_entity_1.Insumo)
], ItensNotasCompras.prototype, "insumo", void 0);
exports.ItensNotasCompras = ItensNotasCompras = __decorate([
    (0, typeorm_1.Entity)()
], ItensNotasCompras);
//# sourceMappingURL=itens-notas-compras.entity.js.map