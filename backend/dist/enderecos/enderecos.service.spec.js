"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const enderecos_service_1 = require("./enderecos.service");
const endereco_entity_1 = require("./entities/endereco.entity");
const mockRepository = { create: jest.fn(), save: jest.fn() };
describe('EnderecosService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                enderecos_service_1.EnderecosService,
                { provide: (0, typeorm_1.getRepositoryToken)(endereco_entity_1.Endereco), useValue: mockRepository },
            ],
        }).compile();
        service = module.get(enderecos_service_1.EnderecosService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a new endereco', async () => {
        const dto = {
            rua: 'Rua Teste',
            numero: '122',
            CEP: '12345-678',
            idBairro: 1,
            idPessoa: 1,
            idCidade: 5570
        };
        mockRepository.create.mockReturnValue(dto);
        mockRepository.save.mockResolvedValue({ id: 1, ...dto });
        await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
    });
});
//# sourceMappingURL=enderecos.service.spec.js.map