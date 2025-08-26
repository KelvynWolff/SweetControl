"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const pessoas_service_1 = require("./pessoas.service");
const pessoa_entity_1 = require("./entities/pessoa.entity");
const mockPessoaRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('PessoasService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                pessoas_service_1.PessoasService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(pessoa_entity_1.Pessoa),
                    useValue: mockPessoaRepository,
                },
            ],
        }).compile();
        service = module.get(pessoas_service_1.PessoasService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a new pessoa', async () => {
        const createDto = { nome: 'João da Silva', cpfCnpj: '123.456.789-00', idCidade: 12345 };
        mockPessoaRepository.create.mockReturnValue(createDto);
        mockPessoaRepository.save.mockResolvedValue({ id: 1, ...createDto });
        await expect(service.create(createDto)).resolves.toEqual({ id: 1, ...createDto });
    });
});
//# sourceMappingURL=pessoas.service.spec.js.map