"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const emails_service_1 = require("./emails.service");
const email_entity_1 = require("./entities/email.entity");
const mockRepository = { create: jest.fn(), save: jest.fn() };
describe('EmailsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                emails_service_1.EmailsService,
                { provide: (0, typeorm_1.getRepositoryToken)(email_entity_1.Email), useValue: mockRepository },
            ],
        }).compile();
        service = module.get(emails_service_1.EmailsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a new email', async () => {
        const dto = { email: 'teste@teste.com', idPessoa: 1 };
        mockRepository.create.mockReturnValue(dto);
        mockRepository.save.mockResolvedValue({ id: 1, ...dto });
        await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
    });
});
//# sourceMappingURL=emails.service.spec.js.map