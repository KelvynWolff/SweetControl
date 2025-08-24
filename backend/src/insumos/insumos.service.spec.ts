import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsumosService } from './insumos.service';
import { Insumo } from './entities/insumo.entity';
import { CreateInsumoDto } from './dto/create-insumo.dto';

const mockInsumoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('InsumosService', () => {
  let service: InsumosService;
  let repository: Repository<Insumo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsumosService,
        {
          provide: getRepositoryToken(Insumo),
          useValue: mockInsumoRepository,
        },
      ],
    }).compile();

    service = module.get<InsumosService>(InsumosService);
    repository = module.get<Repository<Insumo>>(getRepositoryToken(Insumo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new insumo and return it', async () => {
      const createInsumoDto: CreateInsumoDto = {
        nome: 'Farinha de Trigo',
        valor: 5.50,
        unidadeMedida: 'KG',
        estoque: 100,
      };
      
      const expectedResult = { id: 1, ...createInsumoDto };

      mockInsumoRepository.create.mockReturnValue(createInsumoDto);
      mockInsumoRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createInsumoDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createInsumoDto);
      expect(repository.save).toHaveBeenCalledWith(createInsumoDto);
    });
  });
});