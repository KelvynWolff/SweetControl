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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_entity_1 = require("./entities/email.entity");
const nodemailer = require("nodemailer");
let EmailsService = class EmailsService {
    emailRepository;
    transporter;
    constructor(emailRepository) {
        this.emailRepository = emailRepository;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'jerrold.upton@ethereal.email',
                pass: 'kMKTDjVkmHF7ceXAQW',
            },
        });
    }
    create(createEmailDto) {
        const email = this.emailRepository.create(createEmailDto);
        return this.emailRepository.save(email);
    }
    findAll() {
        return this.emailRepository.find({ relations: ['pessoa'] });
    }
    async findOne(id) {
        const email = await this.emailRepository.findOne({ where: { id }, relations: ['pessoa'] });
        if (!email) {
            throw new common_1.NotFoundException(`Email com o ID #${id} não encontrado.`);
        }
        return email;
    }
    async update(id, updateEmailDto) {
        const email = await this.emailRepository.preload({ id, ...updateEmailDto });
        if (!email) {
            throw new common_1.NotFoundException(`Email com o ID #${id} não encontrado.`);
        }
        return this.emailRepository.save(email);
    }
    async remove(id) {
        const email = await this.findOne(id);
        await this.emailRepository.remove(email);
    }
    async enviarEmailPedido(pedido, emailCliente) {
        console.log(`--- [EmailsService] Preparando para enviar email para ${emailCliente}... ---`);
        const htmlContent = `
      <h1>Olá, ${pedido.cliente.pessoa.nome}!</h1>
      <p>Seu pedido #${pedido.id} foi recebido com sucesso.</p>
      <p>Status: ${pedido.status}</p>
      <ul>
        ${pedido.itens.map(item => `<li>${item.produto.nome} (x${item.quantidade})</li>`).join('')}
      </ul>
      <p>Total: R$ ${pedido.pagamento.valor.toFixed(2)}</p>
    `;
        const info = await this.transporter.sendMail({
            to: emailCliente,
            from: '"Sweet Control" <noreply@sweetcontrol.com>',
            subject: `Confirmação do Pedido #${pedido.id}`,
            html: htmlContent,
        });
        console.log('--- [EmailsService] Email enviado com sucesso! ---');
        console.log('URL de Visualização (Ethereal):', nodemailer.getTestMessageUrl(info));
    }
};
exports.EmailsService = EmailsService;
exports.EmailsService = EmailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_entity_1.Email)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmailsService);
//# sourceMappingURL=emails.service.js.map