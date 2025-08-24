"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const promocoes_service_1 = require("./promocoes.service");
const promocao_entity_1 = require("./entities/promocao.entity");
const mockPromocaoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('PromocoesService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                promocoes_service_1.PromocoesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(promocao_entity_1.Promocao),
                    useValue: mockPromocaoRepository,
                },
            ],
        }).compile();
        service = module.get(promocoes_service_1.PromocoesService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(promocao_entity_1.Promocao));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new promocao and return it', async () => {
            const createPromocaoDto = {
                nome: 'Promoção de Verão',
                tipoDeDesconto: 'Percentual',
                valor: 10,
                dataInicio: new Date('2025-01-01'),
                dataFim: new Date('2025-01-31'),
                idProduto: 1,
            };
            const expectedResult = { id: 1, ...createPromocaoDto };
            mockPromocaoRepository.create.mockReturnValue(createPromocaoDto);
            mockPromocaoRepository.save.mockResolvedValue(expectedResult);
            const result = await service.create(createPromocaoDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createPromocaoDto);
            expect(repository.save).toHaveBeenCalledWith(createPromocaoDto);
        });
    });
});
//# sourceMappingURL=promocoes.service.spec.js.map