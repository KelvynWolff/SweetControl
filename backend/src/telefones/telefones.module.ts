import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telefone } from './entities/telefone.entity';
import { TelefonesController } from './telefones.controller';
import { TelefonesService } from './telefones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Telefone])],
  controllers: [TelefonesController],
  providers: [TelefonesService],
})
export class TelefonesModule {}