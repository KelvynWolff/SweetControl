"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const bairros_service_1 = require("./bairros.service");
const bairro_entity_1 = require("./entities/bairro.entity");
const mockBairroRepository = {
    create: jest.fn(),
    save: jest.fn(),
};
describe('BairrosService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                bairros_service_1.BairrosService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(bairro_entity_1.Bairro),
                    useValue: mockBairroRepository,
                },
            ],
        }).compile();
        service = module.get(bairros_service_1.BairrosService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a new bairro', async () => {
        const createDto = { nome: 'Centro', ibgeCidade: 12345 };
        mockBairroRepository.create.mockReturnValue(createDto);
        mockBairroRepository.save.mockResolvedValue({ id: 1, ...createDto });
        await expect(service.create(createDto)).resolves.toEqual({ id: 1, ...createDto });
    });
});
//# sourceMappingURL=bairros.service.spec.js.map