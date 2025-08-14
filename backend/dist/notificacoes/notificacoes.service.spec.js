"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const notificacoes_service_1 = require("./notificacoes.service");
const notificacao_entity_1 = require("./entities/notificacao.entity");
const mockNotificacaoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('NotificacoesService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                notificacoes_service_1.NotificacoesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(notificacao_entity_1.Notificacao),
                    useValue: mockNotificacaoRepository,
                },
            ],
        }).compile();
        service = module.get(notificacoes_service_1.NotificacoesService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(notificacao_entity_1.Notificacao));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new notification and return it', async () => {
            const createNotificacaoDto = {
                mensagem: 'Seu pedido foi enviado!',
                idPedido: 1,
            };
            const expectedResult = {
                id: 1,
                data: new Date(),
                status_leitura: false,
                ...createNotificacaoDto,
            };
            mockNotificacaoRepository.create.mockReturnValue(createNotificacaoDto);
            mockNotificacaoRepository.save.mockReturnValue(expectedResult);
            const result = await service.create(createNotificacaoDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createNotificacaoDto);
            expect(repository.save).toHaveBeenCalledWith(createNotificacaoDto);
        });
    });
});
//# sourceMappingURL=notificacoes.service.spec.js.map