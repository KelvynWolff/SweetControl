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
exports.CreateNotaCompraDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateItemNotaDto {
    quantidade;
    precoCompra;
    idProduto;
    idInsumo;
    codigoLote;
    dataValidade;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateItemNotaDto.prototype, "quantidade", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateItemNotaDto.prototype, "precoCompra", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateItemNotaDto.prototype, "idProduto", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateItemNotaDto.prototype, "idInsumo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemNotaDto.prototype, "codigoLote", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'dataValidade deve estar no formato ISO 8601 (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreateItemNotaDto.prototype, "dataValidade", void 0);
class CreateNotaCompraDto {
    chaveAcesso;
    idFornecedor;
    data;
    valorTotal;
    itens;
}
exports.CreateNotaCompraDto = CreateNotaCompraDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNotaCompraDto.prototype, "chaveAcesso", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateNotaCompraDto.prototype, "idFornecedor", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'data deve estar no formato ISO 8601 (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreateNotaCompraDto.prototype, "data", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateNotaCompraDto.prototype, "valorTotal", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateItemNotaDto),
    __metadata("design:type", Array)
], CreateNotaCompraDto.prototype, "itens", void 0);
//# sourceMappingURL=create-nota-compra.dto.js.map