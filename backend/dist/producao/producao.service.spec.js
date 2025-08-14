"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const producao_service_1 = require("./producao.service");
const producao_entity_1 = require("./entities/producao.entity");
const mockProducaoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('ProducaoService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                producao_service_1.ProducaoService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(producao_entity_1.Producao),
                    useValue: mockProducaoRepository,
                },
            ],
        }).compile();
        service = module.get(producao_service_1.ProducaoService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(producao_entity_1.Producao));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new production record and return it', async () => {
            const createProducaoDto = {
                dataValidade: new Date().toISOString(),
                quantidade: 100,
                idCliente: 1,
                idProduto: 1,
            };
            const expectedResult = { id: 1, data: new Date(), ...createProducaoDto };
            mockProducaoRepository.create.mockReturnValue(createProducaoDto);
            mockProducaoRepository.save.mockReturnValue(expectedResult);
            const result = await service.create(createProducaoDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createProducaoDto);
            expect(repository.save).toHaveBeenCalledWith(createProducaoDto);
        });
    });
});
//# sourceMappingURL=producao.service.spec.js.map