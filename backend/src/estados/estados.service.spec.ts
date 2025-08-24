import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadosService } from './estados.service';
import { Estado } from './entities/estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';

const mockEstadoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('EstadosService', () => {
  let service: EstadosService;
  let repository: Repository<Estado>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstadosService,
        {
          provide: getRepositoryToken(Estado),
          useValue: mockEstadoRepository,
        },
      ],
    }).compile();

    service = module.get<EstadosService>(EstadosService);
    repository = module.get<Repository<Estado>>(getRepositoryToken(Estado));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new estado and return it', async () => {
      const createEstadoDto: CreateEstadoDto = { sigla: 'SP', nome: 'São Paulo' };
      const expectedResult = { ...createEstadoDto };

      mockEstadoRepository.create.mockReturnValue(createEstadoDto);
      mockEstadoRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createEstadoDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createEstadoDto);
      expect(repository.save).toHaveBeenCalledWith(createEstadoDto);
    });
  });
});