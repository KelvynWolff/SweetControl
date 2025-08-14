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
exports.Pedido = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../../pessoas/entities/cliente.entity");
const itens_pedido_entity_1 = require("./itens-pedido.entity");
const pagamento_entity_1 = require("./pagamento.entity");
const notificacao_entity_1 = require("../../notificacoes/entities/notificacao.entity");
let Pedido = class Pedido {
    id;
    data;
    status;
    enderecoEntrega;
    observacao;
    cliente;
    itens;
    pagamento;
    notificacoes;
};
exports.Pedido = Pedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Pedido.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pedido.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Pedido.prototype, "enderecoEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Pedido.prototype, "observacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, (cliente) => cliente.pedidos),
    (0, typeorm_1.JoinColumn)({ name: 'idCliente' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Pedido.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itens_pedido_entity_1.ItensPedido, (item) => item.pedido),
    __metadata("design:type", Array)
], Pedido.prototype, "itens", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pagamento_entity_1.Pagamento, (pagamento) => pagamento.pedido),
    __metadata("design:type", pagamento_entity_1.Pagamento)
], Pedido.prototype, "pagamento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notificacao_entity_1.Notificacao, (notificacao) => notificacao.pedido),
    __metadata("design:type", Array)
], Pedido.prototype, "notificacoes", void 0);
exports.Pedido = Pedido = __decorate([
    (0, typeorm_1.Entity)('pedidos')
], Pedido);
//# sourceMappingURL=pedido.entity.js.map