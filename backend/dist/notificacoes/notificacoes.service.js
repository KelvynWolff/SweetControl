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
exports.NotificacoesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notificacao_entity_1 = require("./entities/notificacao.entity");
const emails_service_1 = require("../emails/emails.service");
let NotificacoesService = class NotificacoesService {
    notificacaoRepository;
    emailsService;
    constructor(notificacaoRepository, emailsService) {
        this.notificacaoRepository = notificacaoRepository;
        this.emailsService = emailsService;
    }
    create(createNotificacaoDto) {
        const notificacao = this.notificacaoRepository.create(createNotificacaoDto);
        return this.notificacaoRepository.save(notificacao);
    }
    findAll() {
        return this.notificacaoRepository.find({ order: { data: 'DESC' } });
    }
    findOne(id) {
        return this.notificacaoRepository.findOneBy({ id });
    }
    async markAsRead(id, updateNotificacaoDto) {
        const notificacao = await this.findOne(id);
        if (!notificacao) {
            throw new common_1.NotFoundException(`Notificação #${id} não encontrada`);
        }
        this.notificacaoRepository.merge(notificacao, updateNotificacaoDto);
        return this.notificacaoRepository.save(notificacao);
    }
    async remove(id) {
        const result = await this.notificacaoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Notificação #${id} não encontrada`);
        }
    }
    async criarNotificacaoPedido(pedido) {
        const novaNotificacao = this.notificacaoRepository.create({
            mensagem: `Novo pedido #${pedido.id} realizado.`,
            data: new Date(),
            lida: false,
        });
        await this.notificacaoRepository.save(novaNotificacao);
        try {
            await this.emailsService.enviarEmailPedido(pedido);
        }
        catch (error) {
            console.error("Falha ao enviar notificação por email:", error.message);
        }
    }
};
exports.NotificacoesService = NotificacoesService;
exports.NotificacoesService = NotificacoesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notificacao_entity_1.Notificacao)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        emails_service_1.EmailsService])
], NotificacoesService);
//# sourceMappingURL=notificacoes.service.js.map