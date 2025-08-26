"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const telefones_service_1 = require("./telefones.service");
const telefone_entity_1 = require("./entities/telefone.entity");
const mockRepository = { create: jest.fn(), save: jest.fn() };
describe('TelefonesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                telefones_service_1.TelefonesService,
                { provide: (0, typeorm_1.getRepositoryToken)(telefone_entity_1.Telefone), useValue: mockRepository },
            ],
        }).compile();
        service = module.get(telefones_service_1.TelefonesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a new telefone', async () => {
        const dto = { numero: '(99) 99999-9999', idPessoa: 1 };
        mockRepository.create.mockReturnValue(dto);
        mockRepository.save.mockResolvedValue({ id: 1, ...dto });
        await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
    });
});
//# sourceMappingURL=telefones.service.spec.js.map