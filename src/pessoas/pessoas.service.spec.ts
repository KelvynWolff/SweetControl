import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from './pessoa.service';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

const mockPessoaRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('PessoasService', () => {
  let service: PessoasService;
  let repository: Repository<Pessoa>;

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
    repository = module.get<Repository<Pessoa>>(getRepositoryToken(Pessoa));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new person and return it', async () => {
      const createPessoaDto: CreatePessoaDto = {
        nome: 'João Teste',
        cpfCnpj: '12345678901',
      };
      const expectedResult = {
        id: 1,
        ...createPessoaDto,
      };

      mockPessoaRepository.create.mockReturnValue(createPessoaDto);
      mockPessoaRepository.save.mockReturnValue(expectedResult);

      const result = await service.create(createPessoaDto);

      expect(result).toEqual(expectedResult);

      expect(repository.create).toHaveBeenCalledWith(createPessoaDto);
      expect(repository.save).toHaveBeenCalledWith(createPessoaDto);
    });
  });

});