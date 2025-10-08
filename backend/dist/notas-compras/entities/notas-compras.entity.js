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
exports.NotasCompras = void 0;
const typeorm_1 = require("typeorm");
const fornecedor_entity_1 = require("../../fornecedores/entities/fornecedor.entity");
const itens_notas_compras_entity_1 = require("../../itens-notas-compras/entities/itens-notas-compras.entity");
let NotasCompras = class NotasCompras {
    id;
    chaveAcesso;
    idFornecedor;
    data;
    valorTotal;
    xmlArquivo;
    fornecedor;
    itens;
};
exports.NotasCompras = NotasCompras;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotasCompras.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], NotasCompras.prototype, "chaveAcesso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotasCompras.prototype, "idFornecedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], NotasCompras.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], NotasCompras.prototype, "valorTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NotasCompras.prototype, "xmlArquivo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fornecedor_entity_1.Fornecedor),
    (0, typeorm_1.JoinColumn)({ name: 'idFornecedor' }),
    __metadata("design:type", fornecedor_entity_1.Fornecedor)
], NotasCompras.prototype, "fornecedor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itens_notas_compras_entity_1.ItensNotasCompras, item => item.notaCompra, { cascade: true }),
    __metadata("design:type", Array)
], NotasCompras.prototype, "itens", void 0);
exports.NotasCompras = NotasCompras = __decorate([
    (0, typeorm_1.Entity)()
], NotasCompras);
//# sourceMappingURL=notas-compras.entity.js.map