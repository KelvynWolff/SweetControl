"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const estados_service_1 = require("./estados.service");
const estado_entity_1 = require("./entities/estado.entity");
const mockEstadoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('EstadosService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                estados_service_1.EstadosService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(estado_entity_1.Estado),
                    useValue: mockEstadoRepository,
                },
            ],
        }).compile();
        service = module.get(estados_service_1.EstadosService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(estado_entity_1.Estado));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new estado and return it', async () => {
            const createEstadoDto = { sigla: 'SP', nome: 'São Paulo' };
            const expectedResult = { ...createEstadoDto };
            mockEstadoRepository.create.mockReturnValue(createEstadoDto);
            mockEstadoRepository.save.mockResolvedValue(expectedResult);
            const result = await service.create(createEstadoDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createEstadoDto);
            expect(repository.save).toHaveBeenCalledWith(createEstadoDto);
        });
    });
});
//# sourceMappingURL=estados.service.spec.js.map