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
const cidade_entity_1 = require("../../cidades/entities/cidade.entity");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
const fornecedor_entity_1 = require("../../fornecedores/entities/fornecedor.entity");
const funcionario_entity_1 = require("../../funcionarios/entities/funcionario.entity");
const telefone_entity_1 = require("../../telefones/entities/telefone.entity");
const email_entity_1 = require("../../emails/entities/email.entity");
const endereco_entity_1 = require("../../enderecos/entities/endereco.entity");
let Pessoa = class Pessoa {
    id;
    nome;
    cpfCnpj;
    idCidade;
    cidade;
    cliente;
    fornecedor;
    funcionario;
    telefones;
    emails;
    enderecos;
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pessoa.prototype, "idCidade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cidade_entity_1.Cidade),
    (0, typeorm_1.JoinColumn)({ name: 'idCidade', referencedColumnName: 'codigobge' }),
    __metadata("design:type", cidade_entity_1.Cidade)
], Pessoa.prototype, "cidade", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cliente_entity_1.Cliente, cliente => cliente.pessoa, { cascade: true }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Pessoa.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => fornecedor_entity_1.Fornecedor, fornecedor => fornecedor.pessoa, { cascade: true }),
    __metadata("design:type", fornecedor_entity_1.Fornecedor)
], Pessoa.prototype, "fornecedor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => funcionario_entity_1.Funcionario, funcionario => funcionario.pessoa, { cascade: true }),
    __metadata("design:type", funcionario_entity_1.Funcionario)
], Pessoa.prototype, "funcionario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => telefone_entity_1.Telefone, telefone => telefone.pessoa, { cascade: true }),
    __metadata("design:type", Array)
], Pessoa.prototype, "telefones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => email_entity_1.Email, email => email.pessoa, { cascade: true }),
    __metadata("design:type", Array)
], Pessoa.prototype, "emails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => endereco_entity_1.Endereco, endereco => endereco.pessoa, { cascade: true }),
    __metadata("design:type", Array)
], Pessoa.prototype, "enderecos", void 0);
exports.Pessoa = Pessoa = __decorate([
    (0, typeorm_1.Entity)()
], Pessoa);
//# sourceMappingURL=pessoa.entity.js.map