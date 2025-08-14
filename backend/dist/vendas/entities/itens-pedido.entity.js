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
exports.ItensPedido = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("./pedido.entity");
const produto_entity_1 = require("../../produtos/entities/produto.entity");
let ItensPedido = class ItensPedido {
    id;
    quantidade;
    preco;
    pedido;
    produto;
};
exports.ItensPedido = ItensPedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItensPedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], ItensPedido.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], ItensPedido.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, (pedido) => pedido.itens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idPedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], ItensPedido.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto, (produto) => produto.itensPedido),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], ItensPedido.prototype, "produto", void 0);
exports.ItensPedido = ItensPedido = __decorate([
    (0, typeorm_1.Entity)('itens_pedido')
], ItensPedido);
//# sourceMappingURL=itens-pedido.entity.js.map