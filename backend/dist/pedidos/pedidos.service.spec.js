"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const pedidos_service_1 = require("./pedidos.service");
const pedido_entity_1 = require("./entities/pedido.entity");
const typeorm_2 = require("typeorm");
describe('PedidosService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                pedidos_service_1.PedidosService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(pedido_entity_1.Pedido),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: typeorm_2.DataSource,
                    useValue: {
                        createQueryRunner: jest.fn(() => ({
                            connect: jest.fn(),
                            startTransaction: jest.fn(),
                            commitTransaction: jest.fn(),
                            rollbackTransaction: jest.fn(),
                            release: jest.fn(),
                            manager: {
                                getRepository: jest.fn(),
                            },
                        })),
                    },
                },
            ],
        }).compile();
        service = module.get(pedidos_service_1.PedidosService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(pedido_entity_1.Pedido));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=pedidos.service.spec.js.map