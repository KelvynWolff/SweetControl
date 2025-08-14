import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalizacaoService } from './localizacao.service';
import { Estado } from './entities/estado.entity';
import { Cidade } from './entities/cidade.entity';
import { Bairro } from './entities/bairro.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { CreateBairroDto } from './dto/create-bairro.dto';

const mockEstadoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};
const mockCidadeRepository = {
  create: jest.fn(),
  save: jest.fn(),
};
const mockBairroRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('LocalizacaoService', () => {
  let service: LocalizacaoService;
  let estadoRepo: Repository<Estado>;
  let cidadeRepo: Repository<Cidade>;
  let bairroRepo: Repository<Bairro>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalizacaoService,
        {
          provide: getRepositoryToken(Estado),
          useValue: mockEstadoRepository,
        },
        {
          provide: getRepositoryToken(Cidade),
          useValue: mockCidadeRepository,
        },
        {
          provide: getRepositoryToken(Bairro),
          useValue: mockBairroRepository,
        },
      ],
    }).compile();

    service = module.get<LocalizacaoService>(LocalizacaoService);
    estadoRepo = module.get<Repository<Estado>>(getRepositoryToken(Estado));
    cidadeRepo = module.get<Repository<Cidade>>(getRepositoryToken(Cidade));
    bairroRepo = module.get<Repository<Bairro>>(getRepositoryToken(Bairro));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEstado', () => {
    it('should create a new state and return it', async () => {
      const createDto: CreateEstadoDto = { nome: 'Paraná', sigla: 'PR' };
      const expectedResult = { id: 2, ...createDto };
      mockEstadoRepository.create.mockReturnValue(createDto);
      mockEstadoRepository.save.mockReturnValue(expectedResult);

      const result = await service.createEstado(createDto);
      expect(result).toEqual(expectedResult);
      expect(estadoRepo.create).toHaveBeenCalledWith(createDto);
      expect(estadoRepo.save).toHaveBeenCalledWith(createDto);
    });
  });

  describe('createCidade', () => {
    it('should create a new city and return it', async () => {
      const createDto: CreateCidadeDto = { nome: 'Curitiba', codigoIbge: 4106902, idEstado: 1 };
      const expectedResult = { id: 1, ...createDto };
      mockCidadeRepository.create.mockReturnValue(createDto);
      mockCidadeRepository.save.mockReturnValue(expectedResult);

      const result = await service.createCidade(createDto);
      expect(result).toEqual(expectedResult);
      expect(cidadeRepo.create).toHaveBeenCalledWith(createDto);
      expect(cidadeRepo.save).toHaveBeenCalledWith(createDto);
    });
  });

  describe('createBairro', () => {
    it('should create a new neighborhood and return it', async () => {
      const createDto: CreateBairroDto = { nome: 'Centro Cívico', idCidade: 1 };
      const expectedResult = { id: 1, ...createDto };
      mockBairroRepository.create.mockReturnValue(createDto);
      mockBairroRepository.save.mockReturnValue(expectedResult);

      const result = await service.createBairro(createDto);
      expect(result).toEqual(expectedResult);
      expect(bairroRepo.create).toHaveBeenCalledWith(createDto);
      expect(bairroRepo.save).toHaveBeenCalledWith(createDto);
    });
  });
});