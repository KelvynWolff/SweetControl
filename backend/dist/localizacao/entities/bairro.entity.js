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
exports.Bairro = void 0;
const cidade_entity_1 = require("./cidade.entity");
const endereco_entity_1 = require("../../pessoas/entities/endereco.entity");
const typeorm_1 = require("typeorm");
let Bairro = class Bairro {
    id;
    nome;
    cidade;
    enderecos;
};
exports.Bairro = Bairro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bairro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bairro.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cidade_entity_1.Cidade, (cidade) => cidade.bairros),
    __metadata("design:type", cidade_entity_1.Cidade)
], Bairro.prototype, "cidade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => endereco_entity_1.Endereco, (endereco) => endereco.bairro),
    __metadata("design:type", Array)
], Bairro.prototype, "enderecos", void 0);
exports.Bairro = Bairro = __decorate([
    (0, typeorm_1.Entity)('bairros')
], Bairro);
//# sourceMappingURL=bairro.entity.js.map