"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const localizacao_service_1 = require("./localizacao.service");
const estado_entity_1 = require("./entities/estado.entity");
const cidade_entity_1 = require("./entities/cidade.entity");
const bairro_entity_1 = require("./entities/bairro.entity");
const mockEstadoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
const mockCidadeRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
const mockBairroRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('LocalizacaoService', () => {
    let service;
    let estadoRepo;
    let cidadeRepo;
    let bairroRepo;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                localizacao_service_1.LocalizacaoService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(estado_entity_1.Estado),
                    useValue: mockEstadoRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(cidade_entity_1.Cidade),
                    useValue: mockCidadeRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(bairro_entity_1.Bairro),
                    useValue: mockBairroRepository,
                },
            ],
        }).compile();
        service = module.get(localizacao_service_1.LocalizacaoService);
        estadoRepo = module.get((0, typeorm_1.getRepositoryToken)(estado_entity_1.Estado));
        cidadeRepo = module.get((0, typeorm_1.getRepositoryToken)(cidade_entity_1.Cidade));
        bairroRepo = module.get((0, typeorm_1.getRepositoryToken)(bairro_entity_1.Bairro));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('createEstado', () => {
        it('should create a new state and return it', async () => {
            const createDto = { nome: 'Paraná', sigla: 'PR' };
            const expectedResult = { id: 2, ...createDto };
            mockEstadoRepository.create.mockReturnValue(createDto);
            mockEstadoRepository.save.mockReturnValue(expectedResult);
            const result = await service.createEstado(createDto);
            expect(result).toEqual(expectedResult);
            expect(estadoRepo.create).toHaveBeenCalledWith(createDto);
            expect(estadoRepo.save).toHaveBeenCalledWith(createDto);
        });
    });
    describe('createCidade', () => {
        it('should create a new city and return it', async () => {
            const createDto = { nome: 'Curitiba', codigoIbge: 4106902, idEstado: 1 };
            const expectedResult = { id: 1, ...createDto };
            mockCidadeRepository.create.mockReturnValue(createDto);
            mockCidadeRepository.save.mockReturnValue(expectedResult);
            const result = await service.createCidade(createDto);
            expect(result).toEqual(expectedResult);
            expect(cidadeRepo.create).toHaveBeenCalledWith(createDto);
            expect(cidadeRepo.save).toHaveBeenCalledWith(createDto);
        });
    });
    describe('createBairro', () => {
        it('should create a new neighborhood and return it', async () => {
            const createDto = { nome: 'Centro Cívico', idCidade: 1 };
            const expectedResult = { id: 1, ...createDto };
            mockBairroRepository.create.mockReturnValue(createDto);
            mockBairroRepository.save.mockReturnValue(expectedResult);
            const result = await service.createBairro(createDto);
            expect(result).toEqual(expectedResult);
            expect(bairroRepo.create).toHaveBeenCalledWith(createDto);
            expect(bairroRepo.save).toHaveBeenCalledWith(createDto);
        });
    });
});
//# sourceMappingURL=localizacao.service.spec.js.map