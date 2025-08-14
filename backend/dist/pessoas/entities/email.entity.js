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
exports.Email = void 0;
const pessoa_entity_1 = require("./pessoa.entity");
const typeorm_1 = require("typeorm");
let Email = class Email {
    id;
    email;
    observacao;
    pessoa;
};
exports.Email = Email;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Email.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Email.prototype, "observacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_entity_1.Pessoa, (pessoa) => pessoa.emails, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idPessoa' }),
    __metadata("design:type", pessoa_entity_1.Pessoa)
], Email.prototype, "pessoa", void 0);
exports.Email = Email = __decorate([
    (0, typeorm_1.Entity)('emails')
], Email);
//# sourceMappingURL=email.entity.js.map