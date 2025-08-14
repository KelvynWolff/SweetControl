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
exports.Cidade = void 0;
const bairro_entity_1 = require("./bairro.entity");
const estado_entity_1 = require("./estado.entity");
const typeorm_1 = require("typeorm");
let Cidade = class Cidade {
    id;
    codigoIbge;
    nome;
    estado;
    bairros;
};
exports.Cidade = Cidade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cidade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Cidade.prototype, "codigoIbge", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cidade.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estado_entity_1.Estado, (estado) => estado.cidades),
    __metadata("design:type", estado_entity_1.Estado)
], Cidade.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bairro_entity_1.Bairro, (bairro) => bairro.cidade),
    __metadata("design:type", Array)
], Cidade.prototype, "bairros", void 0);
exports.Cidade = Cidade = __decorate([
    (0, typeorm_1.Entity)('cidades')
], Cidade);
//# sourceMappingURL=cidade.entity.js.map