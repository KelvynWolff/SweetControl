import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailsService } from './emails.service';
import { Email } from './entities/email.entity';
import { CreateEmailDto } from './dto/create-email.dto';

const mockRepository = { create: jest.fn(), save: jest.fn() };

describe('EmailsService', () => {
  let service: EmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsService,
        { provide: getRepositoryToken(Email), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<EmailsService>(EmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new email', async () => {
    const dto: CreateEmailDto = { email: 'teste@teste.com', idPessoa: 1 };
    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue({ id: 1, ...dto });
    await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
  });
});