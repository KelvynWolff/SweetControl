"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const funcionarios_service_1 = require("./funcionarios.service");
const funcionario_entity_1 = require("./entities/funcionario.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
const typeorm_2 = require("typeorm");
describe('FuncionariosService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                funcionarios_service_1.FuncionariosService,
                { provide: (0, typeorm_1.getRepositoryToken)(funcionario_entity_1.Funcionario), useValue: {} },
                { provide: (0, typeorm_1.getRepositoryToken)(pessoa_entity_1.Pessoa), useValue: {} },
                { provide: typeorm_2.DataSource, useValue: { createQueryRunner: jest.fn() } },
            ],
        }).compile();
        service = module.get(funcionarios_service_1.FuncionariosService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=funcionarios.service.spec.js.map