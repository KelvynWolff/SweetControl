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
            auth: {
                user: 'user_ethereal',
                pass: 'pass_ethereal'
            }
        });
    }
    create(createEmailDto) {
        const email = this.emailRepository.create(createEmailDto);
        return this.emailRepository.save(email);
    }
    findAll() {
        return this.emailRepository.find();
    }
    async findOne(id) {
        const email = await this.emailRepository.findOneBy({ id });
        if (!email) {
            throw new common_1.NotFoundException(`Email com ID #${id} não encontrado.`);
        }
        return email;
    }
    async update(id, updateEmailDto) {
        const email = await this.emailRepository.preload({
            id,
            ...updateEmailDto,
        });
        if (!email) {
            throw new common_1.NotFoundException(`Email com ID #${id} não encontrado.`);
        }
        return this.emailRepository.save(email);
    }
    async remove(id) {
        const result = await this.emailRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Email com ID #${id} não encontrado.`);
        }
    }
    async enviarEmailPedido(pedido) {
        const emailDestino = pedido.cliente?.pessoa?.emails?.[0]?.email;
        if (!emailDestino) {
            console.warn(`Cliente do pedido #${pedido.id} não possui e-mail cadastrado.`);
            return { message: 'Cliente sem e-mail cadastrado.' };
        }
        const totalItens = pedido.itens ? pedido.itens.reduce((acc, item) => acc + (Number(item.preco) * item.quantidade), 0) : 0;
        const totalPago = pedido.pagamentos ? pedido.pagamentos.reduce((acc, p) => acc + Number(p.valor), 0) : 0;
        const htmlContent = `
      <h1>Olá, ${pedido.cliente.pessoa.nome}!</h1>
      <p>Seu pedido #${pedido.id} foi recebido com sucesso.</p>
      <p><strong>Status:</strong> ${pedido.status}</p>
      
      <h3>Resumo do Pedido:</h3>
      <ul>
        ${pedido.itens.map(item => `<li>${item.produto.nome} - ${item.quantidade}x - R$ ${Number(item.preco).toFixed(2)}</li>`).join('')}
      </ul>
      
      <p><strong>Valor Total do Pedido:</strong> R$ ${totalItens.toFixed(2)}</p>
      <p><strong>Total Pago:</strong> R$ ${totalPago.toFixed(2)}</p>
      
      <p>Obrigado pela preferência!</p>
    `;
        try {
            await this.transporter.sendMail({
                from: '"Sweet Control" <noreply@sweetcontrol.com>',
                to: emailDestino,
                subject: `Confirmação do Pedido #${pedido.id}`,
                html: htmlContent,
            });
            return { message: 'Email enviado com sucesso!' };
        }
        catch (error) {
            console.error("Erro ao enviar email:", error);
            return { message: 'Erro ao tentar enviar o email.', error: error.message };
        }
    }
};
exports.EmailsService = EmailsService;
exports.EmailsService = EmailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_entity_1.Email)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmailsService);
//# sourceMappingURL=emails.service.js.map