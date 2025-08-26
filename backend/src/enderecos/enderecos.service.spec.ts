import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnderecosService } from './enderecos.service';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

const mockRepository = { create: jest.fn(), save: jest.fn() };

describe('EnderecosService', () => {
  let service: EnderecosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnderecosService,
        { provide: getRepositoryToken(Endereco), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<EnderecosService>(EnderecosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new endereco', async () => {
    const dto: CreateEnderecoDto = { 
      rua: 'Rua Teste', 
      numero: '122', 
      CEP: '12345-678', 
      idBairro: 1, 
      idPessoa: 1,
      idCidade: 5570
    };
    
    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue({ id: 1, ...dto });
    await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
  });
}); 