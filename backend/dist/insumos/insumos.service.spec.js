"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const insumos_service_1 = require("./insumos.service");
const insumo_entity_1 = require("./entities/insumo.entity");
const mockInsumoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('InsumosService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                insumos_service_1.InsumosService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(insumo_entity_1.Insumo),
                    useValue: mockInsumoRepository,
                },
            ],
        }).compile();
        service = module.get(insumos_service_1.InsumosService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(insumo_entity_1.Insumo));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new insumo and return it', async () => {
            const createInsumoDto = {
                nome: 'Farinha de Trigo',
                valor: 5.50,
                unidadeMedida: 'KG',
            };
            const expectedResult = { id: 1, ...createInsumoDto };
            mockInsumoRepository.create.mockReturnValue(createInsumoDto);
            mockInsumoRepository.save.mockResolvedValue(expectedResult);
            const result = await service.create(createInsumoDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createInsumoDto);
            expect(repository.save).toHaveBeenCalledWith(createInsumoDto);
        });
    });
});
//# sourceMappingURL=insumos.service.spec.js.map