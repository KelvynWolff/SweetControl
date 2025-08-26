"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const clientes_service_1 = require("./clientes.service");
const cliente_entity_1 = require("./entities/cliente.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
const typeorm_2 = require("typeorm");
describe('ClientesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                clientes_service_1.ClientesService,
                { provide: (0, typeorm_1.getRepositoryToken)(cliente_entity_1.Cliente), useValue: {} },
                { provide: (0, typeorm_1.getRepositoryToken)(pessoa_entity_1.Pessoa), useValue: {} },
                { provide: typeorm_2.DataSource, useValue: { createQueryRunner: jest.fn() } },
            ],
        }).compile();
        service = module.get(clientes_service_1.ClientesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=clientes.service.spec.js.map