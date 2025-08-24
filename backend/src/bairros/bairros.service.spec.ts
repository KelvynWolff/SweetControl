import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BairrosService } from './bairros.service';
import { Bairro } from './entities/bairro.entity';
import { CreateBairroDto } from './dto/create-bairro.dto';

const mockBairroRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('BairrosService', () => {
  let service: BairrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BairrosService,
        {
          provide: getRepositoryToken(Bairro),
          useValue: mockBairroRepository,
        },
      ],
    }).compile();

    service = module.get<BairrosService>(BairrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new bairro', async () => {
    const createDto: CreateBairroDto = { nome: 'Centro', ibgeCidade: 12345 };
    mockBairroRepository.create.mockReturnValue(createDto);
    mockBairroRepository.save.mockResolvedValue({ id: 1, ...createDto });
    await expect(service.create(createDto)).resolves.toEqual({ id: 1, ...createDto });
  });
});