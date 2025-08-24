"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const receitas_service_1 = require("./receitas.service");
const receita_entity_1 = require("./entities/receita.entity");
const mockReceitaRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('ReceitasService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                receitas_service_1.ReceitasService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(receita_entity_1.Receita),
                    useValue: mockReceitaRepository,
                },
            ],
        }).compile();
        service = module.get(receitas_service_1.ReceitasService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(receita_entity_1.Receita));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new receita and return it', async () => {
            const createReceitaDto = {
                idProduto: 1,
                idInsumo: 5,
                qtdInsumo: 0.5,
            };
            const expectedResult = { id: 1, ...createReceitaDto };
            mockReceitaRepository.create.mockReturnValue(createReceitaDto);
            mockReceitaRepository.save.mockResolvedValue(expectedResult);
            const result = await service.create(createReceitaDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createReceitaDto);
            expect(repository.save).toHaveBeenCalledWith(createReceitaDto);
        });
    });
});
//# sourceMappingURL=receitas.service.spec.js.map