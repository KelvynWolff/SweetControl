"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const pessoa_service_1 = require("./pessoa.service");
const pessoa_entity_1 = require("./entities/pessoa.entity");
const mockPessoaRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('PessoasService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                pessoa_service_1.PessoasService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(pessoa_entity_1.Pessoa),
                    useValue: mockPessoaRepository,
                },
            ],
        }).compile();
        service = module.get(pessoa_service_1.PessoasService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(pessoa_entity_1.Pessoa));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new person and return it', async () => {
            const createPessoaDto = {
                nome: 'João Teste',
                cpfCnpj: '12345678901',
            };
            const expectedResult = {
                id: 1,
                ...createPessoaDto,
            };
            mockPessoaRepository.create.mockReturnValue(createPessoaDto);
            mockPessoaRepository.save.mockReturnValue(expectedResult);
            const result = await service.create(createPessoaDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createPessoaDto);
            expect(repository.save).toHaveBeenCalledWith(createPessoaDto);
        });
    });
});
//# sourceMappingURL=pessoas.service.spec.js.map