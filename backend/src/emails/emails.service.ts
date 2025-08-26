import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  create(createEmailDto: CreateEmailDto): Promise<Email> {
    const email = this.emailRepository.create(createEmailDto);
    return this.emailRepository.save(email);
  }

  findAll(): Promise<Email[]> {
    return this.emailRepository.find({ relations: ['pessoa'] });
  }

  async findOne(id: number): Promise<Email> {
    const email = await this.emailRepository.findOne({ 
      where: { id }, 
      relations: ['pessoa']
    });
    if (!email) {
      throw new NotFoundException(`Email com o ID #${id} não encontrado.`);
    }
    return email;
  }

  async update(id: number, updateEmailDto: UpdateEmailDto): Promise<Email> {
    const email = await this.emailRepository.preload({
      id: id,
      ...updateEmailDto,
    });
    if (!email) {
      throw new NotFoundException(`Email com o ID #${id} não encontrado.`);
    }
    return this.emailRepository.save(email);
  }

  async remove(id: number): Promise<void> {
    const email = await this.findOne(id);
    await this.emailRepository.remove(email);
  }
}