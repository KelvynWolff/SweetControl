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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const pessoa_entity_1 = require("./pessoa.entity");
const pedido_entity_1 = require("../../vendas/entities/pedido.entity");
const typeorm_2 = require("typeorm");
const producao_entity_1 = require("../../producao/entities/producao.entity");
let Cliente = class Cliente {
    id;
    pessoa;
    pedidos;
    producoes;
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pessoa_entity_1.Pessoa, pessoa => pessoa.cliente),
    (0, typeorm_1.JoinColumn)({ name: 'idPessoa' }),
    __metadata("design:type", pessoa_entity_1.Pessoa)
], Cliente.prototype, "pessoa", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => pedido_entity_1.Pedido, (pedido) => pedido.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "pedidos", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => producao_entity_1.Producao, (producao) => producao.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "producoes", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)('clientes')
], Cliente);
//# sourceMappingURL=cliente.entity.js.map