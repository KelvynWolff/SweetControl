"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const pedidos_service_1 = require("./pedidos.service");
const pedido_entity_1 = require("./entities/pedido.entity");
const mockPedidoRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('PedidosService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                pedidos_service_1.PedidosService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(pedido_entity_1.Pedido),
                    useValue: mockPedidoRepository,
                },
            ],
        }).compile();
        service = module.get(pedidos_service_1.PedidosService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(pedido_entity_1.Pedido));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new order and return it', async () => {
            const createPedidoDto = {
                idCliente: 1,
                status: 'PENDENTE',
                enderecoEntrega: 'Rua Teste Unitário, 123',
                observacao: 'Observação de teste',
            };
            const expectedResult = {
                id: 1,
                data: new Date(),
                ...createPedidoDto,
            };
            mockPedidoRepository.create.mockReturnValue(createPedidoDto);
            mockPedidoRepository.save.mockReturnValue(expectedResult);
            const result = await service.create(createPedidoDto);
            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createPedidoDto);
            expect(repository.save).toHaveBeenCalledWith(createPedidoDto);
        });
    });
});
//# sourceMappingURL=pedidos.service.spec.js.map