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
exports.Telefone = void 0;
const typeorm_1 = require("typeorm");
const pessoa_entity_1 = require("../../pessoas/entities/pessoa.entity");
let Telefone = class Telefone {
    id;
    numero;
    observacao;
    idPessoa;
    pessoa;
};
exports.Telefone = Telefone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Telefone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Telefone.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Telefone.prototype, "observacao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Telefone.prototype, "idPessoa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_entity_1.Pessoa, pessoa => pessoa.telefones),
    (0, typeorm_1.JoinColumn)({ name: 'idPessoa' }),
    __metadata("design:type", pessoa_entity_1.Pessoa)
], Telefone.prototype, "pessoa", void 0);
exports.Telefone = Telefone = __decorate([
    (0, typeorm_1.Entity)()
], Telefone);
//# sourceMappingURL=telefone.entity.js.map