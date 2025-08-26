"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const fornecedores_service_1 = require("./fornecedores.service");
const fornecedor_entity_1 = require("./entities/fornecedor.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
const typeorm_2 = require("typeorm");
describe('FornecedoresService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                fornecedores_service_1.FornecedoresService,
                { provide: (0, typeorm_1.getRepositoryToken)(fornecedor_entity_1.Fornecedor), useValue: {} },
                { provide: (0, typeorm_1.getRepositoryToken)(pessoa_entity_1.Pessoa), useValue: {} },
                { provide: typeorm_2.DataSource, useValue: { createQueryRunner: jest.fn() } },
            ],
        }).compile();
        service = module.get(fornecedores_service_1.FornecedoresService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=fornecedores.service.spec.js.map