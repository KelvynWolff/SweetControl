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
exports.MovimentacaoEstoque = exports.TipoMovimentacao = void 0;
const typeorm_1 = require("typeorm");
const lote_entity_1 = require("../../lotes/entities/lote.entity");
var TipoMovimentacao;
(function (TipoMovimentacao) {
    TipoMovimentacao["ENTRADA_COMPRA"] = "ENTRADA_COMPRA";
    TipoMovimentacao["ENTRADA_PRODUCAO"] = "ENTRADA_PRODUCAO";
    TipoMovimentacao["ENTRADA_DEVOLUCAO"] = "ENTRADA_DEVOLUCAO";
    TipoMovimentacao["SAIDA_VENDA"] = "SAIDA_VENDA";
    TipoMovimentacao["SAIDA_PRODUCAO"] = "SAIDA_PRODUCAO";
    TipoMovimentacao["PERDA"] = "PERDA";
})(TipoMovimentacao || (exports.TipoMovimentacao = TipoMovimentacao = {}));
let MovimentacaoEstoque = class MovimentacaoEstoque {
    id;
    idLote;
    data;
    tipo;
    quantidade;
    lote;
};
exports.MovimentacaoEstoque = MovimentacaoEstoque;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovimentacaoEstoque.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MovimentacaoEstoque.prototype, "idLote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MovimentacaoEstoque.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoMovimentacao,
    }),
    __metadata("design:type", String)
], MovimentacaoEstoque.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], MovimentacaoEstoque.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lote_entity_1.Lote, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idLote' }),
    __metadata("design:type", lote_entity_1.Lote)
], MovimentacaoEstoque.prototype, "lote", void 0);
exports.MovimentacaoEstoque = MovimentacaoEstoque = __decorate([
    (0, typeorm_1.Entity)()
], MovimentacaoEstoque);
//# sourceMappingURL=movimentacao-estoque.entity.js.map