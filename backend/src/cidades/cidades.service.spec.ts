import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CidadesService } from './cidades.service';
import { Cidade } from './entities/cidade.entity';
import { CreateCidadeDto } from './dto/create-cidade.dto';

const mockCidadeRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('CidadesService', () => {
  let service: CidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CidadesService,
        {
          provide: getRepositoryToken(Cidade),
          useValue: mockCidadeRepository,
        },
      ],
    }).compile();

    service = module.get<CidadesService>(CidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new cidade', async () => {
    const createDto: CreateCidadeDto = { codigobge: 12345, nome: 'Cidade Teste', estado: 'SP' };
    mockCidadeRepository.create.mockReturnValue(createDto);
    mockCidadeRepository.save.mockResolvedValue({ ...createDto });
    await expect(service.create(createDto)).resolves.toEqual(createDto);
  });
});