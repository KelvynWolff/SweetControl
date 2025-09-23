"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const producao_service_1 = require("./producao.service");
const producao_entity_1 = require("./entities/producao.entity");
const typeorm_2 = require("typeorm");
describe('ProducaoService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                producao_service_1.ProducaoService,
                { provide: (0, typeorm_1.getRepositoryToken)(producao_entity_1.Producao), useValue: {} },
                { provide: typeorm_2.DataSource, useValue: { createQueryRunner: jest.fn() } },
            ],
        }).compile();
        service = module.get(producao_service_1.ProducaoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=producao.service.spec.js.map