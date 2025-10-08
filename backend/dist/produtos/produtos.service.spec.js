"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const produtos_service_1 = require("./produtos.service");
const produto_entity_1 = require("./entities/produto.entity");
const mockProdutoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('ProdutosService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                produtos_service_1.ProdutosService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(produto_entity_1.Produto),
                    useValue: mockProdutoRepository,
                },
            ],
        }).compile();
        service = module.get(produtos_service_1.ProdutosService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(produto_entity_1.Produto));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new product and return it', async () => {
            const createProdutoDto = {
                nome: 'Produto Teste',
                preco: 75.00,
                unidadeMedida: 'UN',
                custo: 50,
                margem: 1.5,
                descricao: 'Um produto de teste',
                ativo: true,
            };
            const expectedResult = { id: 1, ...createProdutoDto };
            mockProdutoRepository.create.mockReturnValue(createProdutoDto);
            mockProdutoRepository.save.mockReturnValue(expectedResult);
            const result = await service.create(createProdutoDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createProdutoDto);
            expect(repository.save).toHaveBeenCalledWith(createProdutoDto);
        });
    });
});
//# sourceMappingURL=produtos.service.spec.js.map