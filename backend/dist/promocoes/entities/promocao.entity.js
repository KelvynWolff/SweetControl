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
exports.Promocao = void 0;
const typeorm_1 = require("typeorm");
const produto_entity_1 = require("../../produtos/entities/produto.entity");
let Promocao = class Promocao {
    id;
    nome;
    tipoDeDesconto;
    valor;
    dataInicio;
    dataFim;
    idProduto;
    produto;
};
exports.Promocao = Promocao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Promocao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Promocao.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Promocao.prototype, "tipoDeDesconto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Promocao.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Promocao.prototype, "dataInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Promocao.prototype, "dataFim", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Promocao.prototype, "idProduto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], Promocao.prototype, "produto", void 0);
exports.Promocao = Promocao = __decorate([
    (0, typeorm_1.Entity)()
], Promocao);
//# sourceMappingURL=promocao.entity.js.map