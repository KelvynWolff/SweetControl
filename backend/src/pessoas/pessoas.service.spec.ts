import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

const mockPessoaRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('PessoasService', () => {
  let service: PessoasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoasService,
        {
          provide: getRepositoryToken(Pessoa),
          useValue: mockPessoaRepository,
        },
      ],
    }).compile();

    service = module.get<PessoasService>(PessoasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new pessoa', async () => {
    const createDto: CreatePessoaDto = { nome: 'João da Silva', cpfCnpj: '123.456.789-00', idCidade: 12345 };
    mockPessoaRepository.create.mockReturnValue(createDto);
    mockPessoaRepository.save.mockResolvedValue({ id: 1, ...createDto });
    await expect(service.create(createDto)).resolves.toEqual({ id: 1, ...createDto });
  });
});