"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const notas_compras_service_1 = require("./notas-compras.service");
const notas_compras_entity_1 = require("./entities/notas-compras.entity");
const typeorm_2 = require("typeorm");
describe('NotasComprasService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                notas_compras_service_1.NotasComprasService,
                { provide: (0, typeorm_1.getRepositoryToken)(notas_compras_entity_1.NotasCompras), useValue: {} },
                { provide: typeorm_2.DataSource, useValue: { createQueryRunner: jest.fn() } },
            ],
        }).compile();
        service = module.get(notas_compras_service_1.NotasComprasService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=notas-compras.service.spec.js.map