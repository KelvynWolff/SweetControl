import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutosService } from './produtos.service';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';

const mockProdutoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('ProdutosService', () => {
  let service: ProdutosService;
  let repository: Repository<Produto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: getRepositoryToken(Produto),
          useValue: mockProdutoRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
    repository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product and return it', async () => {
      const createProdutoDto: CreateProdutoDto = {
        nome: 'Produto Teste',
        preco: 75.00,
        unidadeMedida: 'UN',
        estoque: 10,
        custo: 50,
        margem: 1.5,
        descricao: 'Um produto de teste',
        ativo: true,
      };
      const expectedResult = { id: 1, ...createProdutoDto };

      mockProdutoRepository.create.mockReturnValue(createProdutoDto);
      mockProdutoRepository.save.mockReturnValue(expectedResult);

      const result = await service.create(createProdutoDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createProdutoDto);
      expect(repository.save).toHaveBeenCalledWith(createProdutoDto);
    });
  });
});