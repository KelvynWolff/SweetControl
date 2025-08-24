"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const cidades_service_1 = require("./cidades.service");
const cidade_entity_1 = require("./entities/cidade.entity");
const mockCidadeRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('CidadesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                cidades_service_1.CidadesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(cidade_entity_1.Cidade),
                    useValue: mockCidadeRepository,
                },
            ],
        }).compile();
        service = module.get(cidades_service_1.CidadesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a new cidade', async () => {
        const createDto = { codigobge: 12345, nome: 'Cidade Teste', estado: 'SP' };
        mockCidadeRepository.create.mockReturnValue(createDto);
        mockCidadeRepository.save.mockResolvedValue({ ...createDto });
        await expect(service.create(createDto)).resolves.toEqual(createDto);
    });
});
//# sourceMappingURL=cidades.service.spec.js.map