import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FornecedoresService } from './fornecedores.service';
import { Fornecedor } from './entities/fornecedor.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { DataSource } from 'typeorm';

describe('FornecedoresService', () => {
  let service: FornecedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FornecedoresService,
        { provide: getRepositoryToken(Fornecedor), useValue: {} },
        { provide: getRepositoryToken(Pessoa), useValue: {} },
        { provide: DataSource, useValue: { createQueryRunner: jest.fn() } },
      ],
    }).compile();

    service = module.get<FornecedoresService>(FornecedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});