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
exports.Pessoa = void 0;
const typeorm_1 = require("typeorm");
const endereco_entity_1 = require("./endereco.entity");
const telefone_entity_1 = require("./telefone.entity");
const email_entity_1 = require("./email.entity");
const cliente_entity_1 = require("./cliente.entity");
const fornecedor_entity_1 = require("./fornecedor.entity");
const funcionario_entity_1 = require("./funcionario.entity");
let Pessoa = class Pessoa {
    id;
    nome;
    cpfCnpj;
    enderecos;
    telefones;
    emails;
    cliente;
    fornecedor;
    funcionario;
};
exports.Pessoa = Pessoa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pessoa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Pessoa.prototype, "cpfCnpj", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => endereco_entity_1.Endereco, (endereco) => endereco.pessoa),
    __metadata("design:type", Array)
], Pessoa.prototype, "enderecos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => telefone_entity_1.Telefone, (telefone) => telefone.pessoa),
    __metadata("design:type", Array)
], Pessoa.prototype, "telefones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => email_entity_1.Email, (email) => email.pessoa),
    __metadata("design:type", Array)
], Pessoa.prototype, "emails", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cliente_entity_1.Cliente, cliente => cliente.pessoa),
    __metadata("design:type", cliente_entity_1.Cliente)
], Pessoa.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => fornecedor_entity_1.Fornecedor, fornecedor => fornecedor.pessoa),
    __metadata("design:type", fornecedor_entity_1.Fornecedor)
], Pessoa.prototype, "fornecedor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => funcionario_entity_1.Funcionario, funcionario => funcionario.pessoa),
    __metadata("design:type", funcionario_entity_1.Funcionario)
], Pessoa.prototype, "funcionario", void 0);
exports.Pessoa = Pessoa = __decorate([
    (0, typeorm_1.Entity)('pessoas')
], Pessoa);
//# sourceMappingURL=pessoa.entity.js.map