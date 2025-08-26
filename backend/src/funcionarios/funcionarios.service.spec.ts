import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FuncionariosService } from './funcionarios.service';
import { Funcionario } from './entities/funcionario.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { DataSource } from 'typeorm';

describe('FuncionariosService', () => {
  let service: FuncionariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuncionariosService,
        { provide: getRepositoryToken(Funcionario), useValue: {} },
        { provide: getRepositoryToken(Pessoa), useValue: {} },
        { provide: DataSource, useValue: { createQueryRunner: jest.fn() } },
      ],
    }).compile();

    service = module.get<FuncionariosService>(FuncionariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});