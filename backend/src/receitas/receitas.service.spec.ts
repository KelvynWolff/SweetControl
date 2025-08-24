import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReceitasService } from './receitas.service';
import { Receita } from './entities/receita.entity';
import { CreateReceitaDto } from './dto/create-receita.dto';

const mockReceitaRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('ReceitasService', () => {
  let service: ReceitasService;
  let repository: Repository<Receita>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceitasService,
        {
          provide: getRepositoryToken(Receita),
          useValue: mockReceitaRepository,
        },
      ],
    }).compile();

    service = module.get<ReceitasService>(ReceitasService);
    repository = module.get<Repository<Receita>>(getRepositoryToken(Receita));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new receita and return it', async () => {
      const createReceitaDto: CreateReceitaDto = {
        idProduto: 1,
        idInsumo: 5,
        qtdInsumo: 0.5,
      };
      
      const expectedResult = { id: 1, ...createReceitaDto };

      mockReceitaRepository.create.mockReturnValue(createReceitaDto);
      mockReceitaRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createReceitaDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createReceitaDto);
      expect(repository.save).toHaveBeenCalledWith(createReceitaDto);
    });
  });
});