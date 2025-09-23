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
exports.Producao = void 0;
const typeorm_1 = require("typeorm");
const produto_entity_1 = require("../../produtos/entities/produto.entity");
let Producao = class Producao {
    id;
    data;
    idProduto;
    quantidade;
    dataValidade;
    observacao;
    produto;
};
exports.Producao = Producao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Producao.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producao.prototype, "idProduto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Producao.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Producao.prototype, "dataValidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Producao.prototype, "observacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto),
    (0, typeorm_1.JoinColumn)({ name: 'idProduto' }),
    __metadata("design:type", produto_entity_1.Produto)
], Producao.prototype, "produto", void 0);
exports.Producao = Producao = __decorate([
    (0, typeorm_1.Entity)()
], Producao);
//# sourceMappingURL=producao.entity.js.map