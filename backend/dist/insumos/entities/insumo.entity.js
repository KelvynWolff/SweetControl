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
exports.Insumo = void 0;
const typeorm_1 = require("typeorm");
const lote_entity_1 = require("../../lotes/entities/lote.entity");
const receita_entity_1 = require("../../receitas/entities/receita.entity");
let Insumo = class Insumo {
    id;
    nome;
    valor;
    unidadeMedida;
    lotes;
    receitas;
};
exports.Insumo = Insumo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Insumo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Insumo.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Insumo.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Insumo.prototype, "unidadeMedida", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lote_entity_1.Lote, lote => lote.insumo),
    __metadata("design:type", Array)
], Insumo.prototype, "lotes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receita_entity_1.Receita, receita => receita.insumo),
    __metadata("design:type", Array)
], Insumo.prototype, "receitas", void 0);
exports.Insumo = Insumo = __decorate([
    (0, typeorm_1.Entity)()
], Insumo);
//# sourceMappingURL=insumo.entity.js.map