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
exports.ItemPedido = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedidos/entities/pedido.entity");
const produto_entity_1 = require("../../produtos/entities/produto.entity");
let ItemPedido = class ItemPedido {
    id;
    idPedido;
    idProduto;
    quantidade;
    preco;
    desconto;
    pedido;
    produto;
};
exports.ItemPedido = ItemPedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItemPedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ItemPedido.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ItemPedido.prototype, "idProduto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], ItemPedido.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], ItemPedido.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], ItemPedido.prototype, "desconto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, pedido => pedido.itens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idPedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], ItemPedido.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], ItemPedido.prototype, "produto", void 0);
exports.ItemPedido = ItemPedido = __decorate([
    (0, typeorm_1.Entity)()
], ItemPedido);
//# sourceMappingURL=item-pedido.entity.js.map